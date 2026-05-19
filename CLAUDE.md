# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm db:setup     # Interactive .env setup wizard
pnpm db:generate  # Generate Drizzle migration files after schema changes
pnpm db:migrate   # Run pending migrations against POSTGRES_URL
pnpm db:seed      # Seed the database with initial data
pnpm db:studio    # Open Drizzle Studio (DB GUI)
```

No test runner is configured. TypeScript checking: `pnpm tsc --noEmit`.

To test Stripe webhooks locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

## Architecture

### Dual identity system

Auth is split across two systems that must stay in sync:

- **Supabase** handles authentication (sessions, OAuth, password hashing). All auth state lives in Supabase.
- **Postgres (Drizzle)** holds the application's `users` table, linked to Supabase via `users.supabase_id`.

`getUser()` in `lib/db/queries.ts` bridges both: it calls `supabase.auth.getUser()`, then looks up the matching row in the Postgres `users` table. It uses React `cache()` so it's deduplicated per request. Any new auth flow must call `ensureUserInDb()` (in `app/(login)/actions.ts`) or the equivalent to create the Postgres user record after Supabase signup.

OAuth (Google) callback lands at `app/auth/callback/route.ts`, which also handles the upsert into Postgres.

### Team-centric data model

Every user belongs to a **team** (created automatically on sign-up). Stripe billing is on the team, not the user. The schema in `lib/db/schema.ts`:

- `users` → `team_members` → `teams` (many-to-many join)
- `teams` holds all Stripe fields (`stripeCustomerId`, `stripeSubscriptionId`, `planName`, `subscriptionStatus`)
- `activity_logs` is scoped to teams
- `invitations` link a pending email + role to a team

### Server Actions pattern

All form mutations use Next.js Server Actions. Two wrappers in `lib/auth/middleware.ts`:

- `validatedAction(schema, fn)` — validates FormData with Zod, no auth required
- `validatedActionWithUser(schema, fn)` — same + fetches and injects the current Postgres user; throws if unauthenticated
- `withTeam(fn)` — fetches and injects the full team (with members); redirects to `/sign-in` if no user

### Middleware and route protection

`middleware.ts` runs on `/dashboard/:path*` and `/pricing`. It creates a Supabase SSR client from cookies and redirects unauthenticated users to `/sign-in`. The middleware **must** pass the `supabaseResponse` (not a plain `NextResponse`) to preserve cookie state — see the cookie forwarding pattern already in place.

### Stripe integration

`lib/payments/stripe.ts` contains all Stripe logic:

- `createCheckoutSession` — starts a subscription checkout; creates a 14-day trial
- `createCustomerPortalSession` — opens Stripe's billing portal (creates a portal configuration if none exists)
- `handleSubscriptionChange` — called by the webhook handler; updates `teams` table on `customer.subscription.updated/deleted`

Webhook endpoint: `app/api/stripe/webhook/route.ts`. Stripe customer ID links back to a team row.

### Supabase client helpers

Two client factories, both use `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`:

- `lib/supabase/server.ts` — for Server Components, Server Actions, and Route Handlers (uses `next/headers`)
- `lib/supabase/client.ts` — for Client Components (browser-side)

### Route groups and UI

- `app/(dashboard)/` — public marketing pages + pricing (uses the shared header/nav layout)
- `app/(dashboard)/dashboard/` — authenticated settings pages (general, security, activity)
- `app/(login)/` — sign-in and sign-up pages

The `(dashboard)` layout (`app/(dashboard)/layout.tsx`) is a Client Component that fetches `/api/user` via SWR to drive the header's user menu.

### Environment variables

| Variable | Notes |
|---|---|
| `POSTGRES_URL` | Direct Postgres connection string |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (needed in middleware and client) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | For webhook signature verification |
| `BASE_URL` | Full origin (e.g. `http://localhost:3000`), used in Stripe redirect URLs |
| `AUTH_SECRET` | JWT secret (legacy; Supabase owns sessions now) |
