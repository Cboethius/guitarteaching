# guitarteaching

# Axe School — Gitarrenunterricht Zürich

Marketing and booking website for Christian Boethius (Zurich). Mobile-first, responsive.

## What this is

- **Next.js** app (not a single HTML file you upload via FTP)
- Booking with date/time, Stripe Checkout, or direct TWINT/bank instructions
- Runs on a **Node.js host** (recommended: [Vercel](https://vercel.com))

## You cannot “upload one file” to a classic server

Old hosting (upload `index.html` only) does **not** work for this project because it needs:

- Server routes (`/api/bookings`, Stripe webhooks)
- Environment variables (Stripe keys)

### Easiest way to go live (recommended)

1. Push this folder to **GitHub**
2. Import the repo on **Vercel** (free tier is fine)
3. Add environment variables from `.env.example`
4. Point **axschool.ch** DNS to Vercel (instructions in Vercel dashboard)

### Swiss hosts with Node

Hosts like Infomaniak, Hostpoint, etc. can run Node apps — you deploy the built app and set env vars. Ask their support for “Next.js” or “Node 20”.

## Local development

**Node 20.9+ required** (Next.js 16). If you see `ERR_CONNECTION_REFUSED`, the dev server is not running — often because `node -v` is too old (e.g. 20.4 via nvm).

Use Homebrew Node (installed on this Mac at `/opt/homebrew/bin/node`):

```bash
cd axschool-web
cp .env.example .env.local
PATH="/opt/homebrew/bin:$PATH" npm install
PATH="/opt/homebrew/bin:$PATH" npm run dev
```

Or fix nvm: your `~/.npmrc` has a global `prefix=` which blocks `nvm install`. Either remove that line or run `nvm use --delete-prefix` then `nvm install 22`.

Open [http://localhost:3000](http://localhost:3000) — not `https://` for local dev.

## Stripe setup

1. Create a Stripe account (Switzerland, CHF)
2. Add keys to `.env.local`
3. For webhooks locally: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Use test card `4242 4242 4242 4242`

## Bookings storage

Bookings are saved to `data/bookings.json` on the server. On Vercel, use a database (e.g. Vercel Postgres) for production — file storage is for local dev / simple VPS only.

## Build

```bash
npm run build
npm start
```
