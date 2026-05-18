'use server';

import { z } from 'zod';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {
  users,
  teams,
  teamMembers,
  invitations,
  ActivityType,
} from '@/lib/db/schema';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { getUser, getUserWithTeam } from '@/lib/db/queries';
import { validatedAction, validatedActionWithUser, ActionState } from '@/lib/auth/middleware';
import type { User as SupabaseUser } from '@supabase/supabase-js';

async function ensureUserInDb(supabaseUser: SupabaseUser, inviteId?: string) {
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.supabaseId, supabaseUser.id))
    .limit(1);

  if (existing.length > 0) return existing[0];

  const email = supabaseUser.email!;
  const name = supabaseUser.user_metadata?.full_name ?? supabaseUser.user_metadata?.name ?? null;

  const [newUser] = await db
    .insert(users)
    .values({ email, name, supabaseId: supabaseUser.id, role: 'owner' })
    .returning();

  let teamId: number;

  if (inviteId) {
    const [invitation] = await db
      .select()
      .from(invitations)
      .where(
        and(
          eq(invitations.id, parseInt(inviteId)),
          eq(invitations.email, email),
          eq(invitations.status, 'pending')
        )
      )
      .limit(1);

    if (invitation) {
      teamId = invitation.teamId;
      await db.update(invitations).set({ status: 'accepted' }).where(eq(invitations.id, invitation.id));
      await db.insert(teamMembers).values({ userId: newUser.id, teamId, role: invitation.role });
      return newUser;
    }
  }

  const [newTeam] = await db.insert(teams).values({ name: `${email}'s Team` }).returning();
  await db.insert(teamMembers).values({ userId: newUser.id, teamId: newTeam.id, role: 'owner' });

  return newUser;
}

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: 'Invalid email or password. Please try again.', email: data.email, password: data.password };
  }

  const { data: { user: supabaseUser } } = await supabase.auth.getUser();
  if (supabaseUser) await ensureUserInDb(supabaseUser);

  redirect('/dashboard');
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  inviteId: z.string().optional(),
});

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  const supabase = await createClient();
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message, email: data.email, password: data.password };
  }

  if (authData.user) {
    await ensureUserInDb(authData.user, data.inviteId);
  }

  redirect('/dashboard');
});

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/sign-in');
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin = (await headers()).get('origin') ?? process.env.BASE_URL;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${origin}/auth/callback` },
  });

  if (error || !data.url) {
    redirect('/sign-in?error=google_failed');
  }

  redirect(data.url);
}

const updatePasswordSchema = z.object({
  newPassword: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100),
});

export const updatePassword = validatedActionWithUser(
  updatePasswordSchema,
  async (data, _, user) => {
    const { newPassword, confirmPassword } = data;

    if (confirmPassword !== newPassword) {
      return { error: 'Passwords do not match.' };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) return { error: error.message };

    return { success: 'Password updated successfully.' };
  }
);

const deleteAccountSchema = z.object({
  password: z.string().min(1),
});

export const deleteAccount = validatedActionWithUser(
  deleteAccountSchema,
  async (data, _, user) => {
    const userWithTeam = await getUserWithTeam(user.id);

    await db
      .update(users)
      .set({
        deletedAt: sql`CURRENT_TIMESTAMP`,
        email: sql`CONCAT(email, '-', id, '-deleted')`,
      })
      .where(eq(users.id, user.id));

    if (userWithTeam?.teamId) {
      await db
        .delete(teamMembers)
        .where(
          and(
            eq(teamMembers.userId, user.id),
            eq(teamMembers.teamId, userWithTeam.teamId)
          )
        );
    }

    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/sign-in');
  }
);

const updateAccountSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
});

export const updateAccount = validatedActionWithUser(
  updateAccountSchema,
  async (data, _, user) => {
    const { name, email } = data;
    await db.update(users).set({ name, email }).where(eq(users.id, user.id));
    return { name, success: 'Account updated successfully.' };
  }
);

const removeTeamMemberSchema = z.object({
  memberId: z.number(),
});

export const removeTeamMember = validatedActionWithUser(
  removeTeamMemberSchema,
  async (data, _, user) => {
    const { memberId } = data;
    const userWithTeam = await getUserWithTeam(user.id);

    if (!userWithTeam?.teamId) {
      return { error: 'User is not part of a team' };
    }

    await db
      .delete(teamMembers)
      .where(
        and(
          eq(teamMembers.id, memberId),
          eq(teamMembers.teamId, userWithTeam.teamId)
        )
      );

    return { success: 'Team member removed successfully' };
  }
);

const inviteTeamMemberSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['member', 'owner']),
});

export const inviteTeamMember = validatedActionWithUser(
  inviteTeamMemberSchema,
  async (data, _, user) => {
    const { email, role } = data;
    const userWithTeam = await getUserWithTeam(user.id);

    if (!userWithTeam?.teamId) {
      return { error: 'User is not part of a team' };
    }

    const existingMember = await db
      .select()
      .from(users)
      .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
      .where(
        and(eq(users.email, email), eq(teamMembers.teamId, userWithTeam.teamId))
      )
      .limit(1);

    if (existingMember.length > 0) {
      return { error: 'User is already a member of this team' };
    }

    const existingInvitation = await db
      .select()
      .from(invitations)
      .where(
        and(
          eq(invitations.email, email),
          eq(invitations.teamId, userWithTeam.teamId),
          eq(invitations.status, 'pending')
        )
      )
      .limit(1);

    if (existingInvitation.length > 0) {
      return { error: 'An invitation has already been sent to this email' };
    }

    await db.insert(invitations).values({
      teamId: userWithTeam.teamId,
      email,
      role,
      invitedBy: user.id,
      status: 'pending',
    });

    return { success: 'Invitation sent successfully' };
  }
);
