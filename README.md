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
| `NEXT_PUBLIC_SITE_URL` | Site URL (e.g. `https://axschool.ch`) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `PAYMENT_IBAN` | IBAN for direct bank transfer |
| `PAYMENT_ACCOUNT_NAME` | Account holder name |
| `TWINT_PAYLINK` | Optional TWINT payment link |

## Deploy (recommended: Vercel)

1. Push this repo to GitHub
2. Import on [Vercel](https://vercel.com)
3. Add the environment variables above
4. Point **axschool.ch** DNS to Vercel

Swiss hosts with Node (Infomaniak, Hostpoint, etc.) can also work — ask for Next.js / Node 20 support.

## Stripe (test mode)

1. Create a Stripe account (Switzerland, CHF)
2. Add test keys to `.env.local`
3. Local webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Test card: `4242 4242 4242 4242`

## Bookings storage

Bookings are saved locally to `data/bookings.json`. For production on Vercel, use a database (e.g. Postgres) — file storage is for local dev only.

## Build

```bash
npm run build
npm start
```
