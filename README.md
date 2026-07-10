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
3. Local webhooks: `npm run stripe:listen` (forwards to port 3001)
4. Test card: `4242 4242 4242 4242`

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
