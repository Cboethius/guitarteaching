# Axe School — Gitarrenunterricht Zürich

Marketing and booking website for Christian Boethius (Zurich). Mobile-first, bilingual (DE/EN), responsive.

## Features

- Home, About, and booking flow (adults/teens and under 14)
- Single trial lessons and 5- or 10-lesson bundles (Zoom, neutral ground, at home)
- Stripe Checkout or direct TWINT/bank payment
- Intro video (Vimeo embed)

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, TypeScript)
- Tailwind CSS v4
- Stripe (CHF)

This is a **Node.js app**, not a static HTML site. It needs server routes (`/api/bookings`, Stripe webhooks) and environment variables.

## Local development

**Node 20.9+** required.

```bash
npm install
cp .env.example .env.local   # then fill in your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Site URL (e.g. `https://www.learn2strum.ch`) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `ADMIN_PASSWORD` | Admin login for testimonial approval |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage (required on Vercel) |
| `PAYMENT_IBAN` | IBAN for direct bank transfer |
| `PAYMENT_ACCOUNT_NAME` | Account holder name |
| `TWINT_PAYLINK` | Optional TWINT payment link |

## Production checklist (Vercel)

Before going live, confirm all of these in **Vercel → Settings → Environment Variables** (Production):

1. **`NEXT_PUBLIC_SITE_URL`** = `https://www.learn2strum.ch`
2. **`BLOB_READ_WRITE_TOKEN`** — connect Vercel Blob storage to the project (bookings and testimonials persist here)
3. **`ADMIN_PASSWORD`** — long random password (20+ characters), not shared or committed
4. **Stripe live keys only** — `sk_live_...`, `pk_live_...`, and a live `whsec_...` from webhook `https://www.learn2strum.ch/api/webhooks/stripe` (event: `checkout.session.completed`)
5. **Redeploy** after changing env vars

Never mix test and live Stripe keys. Use test keys only in `.env.local` for local development.

## Deploy (recommended: Vercel)

1. Push this repo to GitHub
2. Import on [Vercel](https://vercel.com)
3. Add the environment variables above
4. Point **learn2strum.ch** DNS to Vercel

Swiss hosts with Node (Infomaniak, Hostpoint, etc.) can also work — ask for Next.js / Node 20 support.

## Stripe (test mode)

1. Create a Stripe account (Switzerland, CHF)
2. Add test keys to `.env.local`
3. Run `npm run check:stripe` to verify keys and API connectivity
4. Local webhooks: `npm run stripe:listen` (forwards to port 3001; paste `whsec_...` into `.env.local`)
5. Restart the dev server, then book at `/book` with card `4242 4242 4242 4242`

### Verify production payments

1. In Vercel Production env: `sk_live_...`, `pk_live_...`, live `whsec_...`, `NEXT_PUBLIC_SITE_URL`, `BLOB_READ_WRITE_TOKEN`
2. Stripe Dashboard (live mode) → Webhooks → `https://www.learn2strum.ch/api/webhooks/stripe` → event `checkout.session.completed`
3. Redeploy after env changes
4. Make a real small test payment on `/book` (or use Stripe test mode on a Preview deployment first)
5. In Stripe → Webhooks → recent deliveries should show **200** for `checkout.session.completed`
6. Success page should confirm payment; booking status becomes `paid` in storage

**Common errors**

| Message | Fix |
|---------|-----|
| Online payment is not configured yet | Add `STRIPE_SECRET_KEY` in Vercel and redeploy |
| Request was in test mode, but used a non-test card | Use live keys in Production, or test card with test keys |
| Webhook signature invalid | `STRIPE_WEBHOOK_SECRET` must match the endpoint (live vs test) |
| Booking not found in webhook logs | Set `BLOB_READ_WRITE_TOKEN` on Vercel |

## Bookings storage

- **Local dev:** `data/bookings.json`
- **Vercel production:** private Vercel Blob when `BLOB_READ_WRITE_TOKEN` is set

## Security

- Admin APIs require password auth; login is rate-limited
- Booking API validates input server-side and is rate-limited
- Stripe webhooks verify signatures and payment amounts
- Security headers (CSP, `X-Frame-Options`, etc.) are set in `next.config.ts`
- Success page exposes only non-sensitive booking summary data to the browser

## Build

```bash
npm run build
npm start
```
