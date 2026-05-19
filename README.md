# Wameup

**WhatsApp business automation platform.** Automate conversations, manage your team inbox, run broadcast campaigns, and scale customer communication without adding headcount.

## Features

- **Smart Automation** — build chatbot flows that handle enquiries 24/7
- **Team Inbox** — shared inbox with agent handoff and conversation routing
- **Broadcast Campaigns** — bulk messaging with audience segmentation
- **Analytics & Reports** — delivery rates, read rates, automation performance
- **Multi-tenant** — every workspace is fully isolated

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) |
| Database | [PostgreSQL](https://www.postgresql.org/) + [Drizzle ORM](https://orm.drizzle.team/) |
| Auth | [Supabase](https://supabase.com/) (email + Google OAuth) |
| Payments | [Stripe](https://stripe.com/) (subscriptions + customer portal) |
| UI | [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS 4](https://tailwindcss.com/) |

## Getting Started

```bash
git clone https://github.com/wameup-com/wameup-saas
cd wameup-saas
pnpm install
```

### Environment Setup

```bash
pnpm db:setup        # interactive .env wizard
pnpm db:migrate      # run pending migrations
pnpm db:seed         # seed initial data
pnpm dev             # start dev server → http://localhost:3000
```

### Environment Variables

| Variable | Description |
|---|---|
| `BASE_URL` | Your domain (e.g. `http://localhost:3000`) |
| `POSTGRES_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |
| `AUTH_SECRET` | Random secret — `openssl rand -base64 32` |

### Stripe Webhooks (local)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Test card: `4242 4242 4242 4242` · any future expiry · any CVC

## Scripts

```bash
pnpm dev             # dev server with Turbopack
pnpm build           # production build
pnpm db:generate     # generate Drizzle migration files after schema changes
pnpm db:studio       # open Drizzle Studio (DB GUI)
```

## License

MIT © 2026 Wameup
