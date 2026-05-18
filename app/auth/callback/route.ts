import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db } from '@/lib/db/drizzle';
import { users, teams, teamMembers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (!code) {
    return NextResponse.redirect(`${origin}/sign-in?error=missing_code`);
  }

  const supabase = await createClient();
  const { error, data } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/sign-in?error=auth_failed`);
  }

  const supabaseUser = data.user;

  // Upsert user in our DB
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.supabaseId, supabaseUser.id))
    .limit(1);

  if (existing.length === 0) {
    const email = supabaseUser.email!;
    const name = supabaseUser.user_metadata?.full_name ?? supabaseUser.user_metadata?.name ?? null;

    const [newUser] = await db
      .insert(users)
      .values({ email, name, supabaseId: supabaseUser.id, role: 'owner' })
      .returning();

    const [newTeam] = await db
      .insert(teams)
      .values({ name: `${email}'s Team` })
      .returning();

    await db.insert(teamMembers).values({
      userId: newUser.id,
      teamId: newTeam.id,
      role: 'owner',
    });
  }

  return NextResponse.redirect(`${origin}${next}`);
}
