'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { customerPortalAction } from '@/lib/payments/actions';
import { useActionState } from 'react';
import { TeamDataWithMembers, User } from '@/lib/db/schema';
import { removeTeamMember, inviteTeamMember } from '@/app/(login)/actions';
import useSWR from 'swr';
import { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, PlusCircle } from 'lucide-react';

type ActionState = { error?: string; success?: string };

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ManageSubscription() {
  const { data: teamData } = useSWR<TeamDataWithMembers>('/api/team', fetcher);

  return (
    <Card className="mb-6 border-[#DFE4EA]">
      <CardHeader>
        <CardTitle className="text-[#111928]">Team Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="mb-4 sm:mb-0">
            <p className="font-semibold text-[#111928]">
              Current Plan:{' '}
              <span className="text-[#3758F9]">{teamData?.planName || 'Free'}</span>
            </p>
            <p className="text-sm text-[#637381] mt-1">
              {teamData?.subscriptionStatus === 'active'
                ? 'Billed monthly'
                : teamData?.subscriptionStatus === 'trialing'
                ? 'Trial period active'
                : 'No active subscription'}
            </p>
          </div>
          <form action={customerPortalAction}>
            <Button
              type="submit"
              className="border-[#3758F9] text-[#3758F9] hover:bg-[#3758F9] hover:text-white"
              variant="outline"
            >
              Manage Subscription
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamMembers() {
  const { data: teamData } = useSWR<TeamDataWithMembers>('/api/team', fetcher);
  const [removeState, removeAction, isRemovePending] = useActionState<ActionState, FormData>(
    removeTeamMember,
    {}
  );

  const getDisplayName = (user: Pick<User, 'id' | 'name' | 'email'>) =>
    user.name || user.email || 'Unknown';

  return (
    <Card className="mb-6 border-[#DFE4EA]">
      <CardHeader>
        <CardTitle className="text-[#111928]">Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        {!teamData?.teamMembers?.length ? (
          <p className="text-[#637381]">No team members yet.</p>
        ) : (
          <ul className="space-y-4">
            {teamData.teamMembers.map((member, index) => (
              <li key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-[#3758F9]/10 text-[#3758F9] font-semibold">
                      {getDisplayName(member.user)[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-[#111928]">{getDisplayName(member.user)}</p>
                    <p className="text-sm text-[#637381] capitalize">{member.role}</p>
                  </div>
                </div>
                {index > 1 && (
                  <form action={removeAction}>
                    <input type="hidden" name="memberId" value={member.id} />
                    <Button type="submit" variant="outline" size="sm" disabled={isRemovePending}
                      className="text-red-500 border-red-200 hover:bg-red-50">
                      {isRemovePending ? 'Removing...' : 'Remove'}
                    </Button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}
        {removeState?.error && <p className="text-red-500 mt-4 text-sm">{removeState.error}</p>}
      </CardContent>
    </Card>
  );
}

function InviteTeamMember() {
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const isOwner = user?.role === 'owner';
  const [inviteState, inviteAction, isInvitePending] = useActionState<ActionState, FormData>(
    inviteTeamMember,
    {}
  );

  return (
    <Card className="border-[#DFE4EA]">
      <CardHeader>
        <CardTitle className="text-[#111928]">Invite Team Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={inviteAction} className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-2 text-[#111928]">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="colleague@company.com"
              required
              disabled={!isOwner}
              className="border-[#DFE4EA] focus:border-[#3758F9] focus-visible:ring-0"
            />
          </div>
          <div>
            <Label className="text-[#111928]">Role</Label>
            <RadioGroup defaultValue="member" name="role" className="flex gap-6 mt-2" disabled={!isOwner}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="member" id="member" />
                <Label htmlFor="member" className="text-[#637381]">Member</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="owner" id="owner" />
                <Label htmlFor="owner" className="text-[#637381]">Owner</Label>
              </div>
            </RadioGroup>
          </div>
          {inviteState?.error && <p className="text-red-500 text-sm">{inviteState.error}</p>}
          {inviteState?.success && <p className="text-green-600 text-sm">{inviteState.success}</p>}
          <Button
            type="submit"
            disabled={isInvitePending || !isOwner}
            className="bg-[#3758F9] hover:bg-[#1B44C8] text-white"
          >
            {isInvitePending ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Inviting...</>
            ) : (
              <><PlusCircle className="mr-2 h-4 w-4" />Invite Member</>
            )}
          </Button>
        </form>
      </CardContent>
      {!isOwner && (
        <CardFooter>
          <p className="text-sm text-[#637381]">Only team owners can invite new members.</p>
        </CardFooter>
      )}
    </Card>
  );
}

export default function TeamPage() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-2xl font-bold text-[#111928] mb-6">Team</h1>
      <Suspense fallback={<Card className="mb-6 h-[100px] border-[#DFE4EA]" />}>
        <ManageSubscription />
      </Suspense>
      <Suspense fallback={<Card className="mb-6 h-[100px] border-[#DFE4EA]" />}>
        <TeamMembers />
      </Suspense>
      <Suspense fallback={<Card className="h-[200px] border-[#DFE4EA]" />}>
        <InviteTeamMember />
      </Suspense>
    </section>
  );
}
