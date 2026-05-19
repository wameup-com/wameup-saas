'use client';

import Link from 'next/link';
import useSWR from 'swr';
import { TeamDataWithMembers, User } from '@/lib/db/schema';
import {
  MessageSquare,
  Users,
  Zap,
  Clock,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  Circle,
} from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const weeklyData = [
  { day: 'Mon', sent: 3200, received: 2100 },
  { day: 'Tue', sent: 4100, received: 2800 },
  { day: 'Wed', sent: 3800, received: 2500 },
  { day: 'Thu', sent: 5200, received: 3400 },
  { day: 'Fri', sent: 4700, received: 3100 },
  { day: 'Sat', sent: 2100, received: 1400 },
  { day: 'Sun', sent: 1400, received: 900 },
];

const maxVal = Math.max(...weeklyData.map((d) => d.sent));

const recentConversations = [
  { name: 'Sophie Müller', preview: 'Hi, I want to know more about your pricing...', time: '2m ago', status: 'bot', unread: 2 },
  { name: 'Lucas Bernard', preview: 'My order #4521 hasn\'t arrived yet', time: '8m ago', status: 'agent', unread: 0 },
  { name: 'Emma Johansson', preview: 'The automation flow is working perfectly!', time: '15m ago', status: 'resolved', unread: 0 },
  { name: 'Matteo Ricci', preview: 'Can I get a demo of the broadcast feature?', time: '34m ago', status: 'bot', unread: 1 },
  { name: 'Clara Dubois', preview: 'Thank you, issue resolved 🙏', time: '1h ago', status: 'resolved', unread: 0 },
];

const statusConfig = {
  bot: { label: 'Bot', color: 'bg-blue-100 text-blue-700' },
  agent: { label: 'Agent', color: 'bg-[#3758F9]/10 text-[#3758F9]' },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-700' },
};

export default function OverviewPage() {
  const { data: teamData } = useSWR<TeamDataWithMembers>('/api/team', fetcher);
  const { data: user } = useSWR<User>('/api/user', fetcher);

  const stats = [
    {
      label: 'Messages Sent',
      value: '24,521',
      delta: '+12% this week',
      up: true,
      icon: MessageSquare,
      color: 'bg-[#3758F9]/10 text-[#3758F9]',
    },
    {
      label: 'Conversations',
      value: '1,847',
      delta: '+8% this week',
      up: true,
      icon: Users,
      color: 'bg-[#13C296]/10 text-[#13C296]',
    },
    {
      label: 'Automation Rate',
      value: '73%',
      delta: '+4% vs last week',
      up: true,
      icon: Zap,
      color: 'bg-[#13C296]/10 text-[#13C296]',
    },
    {
      label: 'Avg Response Time',
      value: '1.2 min',
      delta: '-18% faster',
      up: true,
      icon: Clock,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <section className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111928]">Overview</h1>
          <p className="text-sm text-[#637381] mt-1">
            Welcome back{user?.name ? `, ${user.name}` : ''}. Here's what's happening.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#637381] bg-white border border-[#DFE4EA] rounded-lg px-3 py-2">
          <TrendingUp className="h-4 w-4 text-[#3758F9]" />
          Last 7 days
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-[#DFE4EA] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                <ArrowUpRight className="h-3 w-3" />
                {stat.delta}
              </span>
            </div>
            <p className="text-2xl font-bold text-[#111928]">{stat.value}</p>
            <p className="text-sm text-[#637381] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Weekly chart */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-[#DFE4EA] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-[#111928]">Weekly Message Volume</h2>
            <div className="flex items-center gap-4 text-xs text-[#637381]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#3758F9] inline-block" />
                Sent
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#3758F9]/20 inline-block" />
                Received
              </span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-40">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-0.5" style={{ height: '128px' }}>
                  <div className="w-full flex items-end gap-0.5 h-full">
                    <div
                      className="flex-1 bg-[#3758F9] rounded-t-sm transition-all"
                      style={{ height: `${(d.sent / maxVal) * 100}%` }}
                    />
                    <div
                      className="flex-1 bg-[#3758F9]/20 rounded-t-sm transition-all"
                      style={{ height: `${(d.received / maxVal) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-[#637381]">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plan & quick actions */}
        <div className="bg-white rounded-xl border border-[#DFE4EA] p-6">
          <h2 className="font-semibold text-[#111928] mb-4">Current Plan</h2>
          <div className="rounded-lg bg-[#3758F9]/5 border border-[#3758F9]/20 p-4 mb-4">
            <p className="font-bold text-[#3758F9] text-lg">{teamData?.planName || 'Free'}</p>
            <p className="text-xs text-[#637381] mt-1">
              {teamData?.subscriptionStatus === 'active'
                ? 'Active subscription'
                : teamData?.subscriptionStatus === 'trialing'
                ? 'Trial period'
                : 'Free tier'}
            </p>
          </div>
          <div className="space-y-2 mb-5">
            {['WhatsApp Automation', 'Team Inbox', 'Basic Analytics'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-[#637381]">
                <CheckCircle2 className="h-4 w-4 text-[#13C296] flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
          <Link
            href="/pricing"
            className="block w-full text-center rounded-md bg-[#3758F9] py-2.5 text-sm font-medium text-white hover:bg-[#1B44C8] transition-colors"
          >
            Upgrade Plan
          </Link>
        </div>
      </div>

      {/* Recent conversations */}
      <div className="bg-white rounded-xl border border-[#DFE4EA] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-[#111928]">Recent Conversations</h2>
          <span className="text-sm text-[#3758F9] hover:underline cursor-pointer">View all</span>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
          {recentConversations.map((conv) => {
            const s = statusConfig[conv.status as keyof typeof statusConfig];
            return (
              <div key={conv.name} className="flex items-center gap-4 py-3 hover:bg-[#F9FAFB] -mx-2 px-2 rounded-lg cursor-pointer transition-colors">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-[#3758F9]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-[#3758F9]">
                    {conv.name[0]}
                  </span>
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#111928]">{conv.name}</span>
                    <span className="text-xs text-[#637381] ml-2 flex-shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-sm text-[#637381] truncate mt-0.5">{conv.preview}</p>
                </div>
                {/* Status + unread */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.color}`}>
                    {s.label}
                  </span>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#3758F9] text-white text-xs flex items-center justify-center font-bold">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
