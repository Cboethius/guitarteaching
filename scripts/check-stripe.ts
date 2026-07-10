/**
 * Verifies Stripe env vars and API connectivity.
 *
 * Usage:
 *   npm run check:stripe
 *
 * Loads `.env.local` when present (does not override existing env vars).
 */

import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import Stripe from "stripe";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;

  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function stripeMode(key: string | undefined) {
  if (!key) return "missing";
  if (key.startsWith("sk_live_")) return "live";
  if (key.startsWith("sk_test_")) return "test";
  return "unknown";
}

function publishableMode(key: string | undefined) {
  if (!key) return "missing";
  if (key.startsWith("pk_live_")) return "live";
  if (key.startsWith("pk_test_")) return "test";
  return "unknown";
}

async function main() {
  loadEnvLocal();

  const secret = process.env.STRIPE_SECRET_KEY;
  const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const webhook = process.env.STRIPE_WEBHOOK_SECRET;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const blob = process.env.BLOB_READ_WRITE_TOKEN;

  const issues: string[] = [];
  const ok: string[] = [];

  if (!secret) issues.push("STRIPE_SECRET_KEY is not set");
  else ok.push(`STRIPE_SECRET_KEY present (${stripeMode(secret)} mode)`);

  if (!publishable) {
    issues.push(
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set (optional for Checkout redirect flow)",
    );
  } else {
    ok.push(
      `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY present (${publishableMode(publishable)} mode)`,
    );
    if (
      secret &&
      stripeMode(secret) !== "missing" &&
      publishableMode(publishable) !== "missing" &&
      stripeMode(secret) !== publishableMode(publishable)
    ) {
      issues.push("Stripe secret and publishable keys are not in the same mode (test vs live)");
    }
  }

  if (!webhook) {
    issues.push(
      "STRIPE_WEBHOOK_SECRET is not set (required for marking bookings paid via webhook)",
    );
  } else {
    ok.push("STRIPE_WEBHOOK_SECRET present");
  }

  if (!siteUrl) {
    issues.push("NEXT_PUBLIC_SITE_URL is not set (Checkout return URLs may be wrong)");
  } else {
    ok.push(`NEXT_PUBLIC_SITE_URL = ${siteUrl}`);
  }

  if (!blob && process.env.VERCEL) {
    issues.push("BLOB_READ_WRITE_TOKEN is not set on Vercel (bookings may not persist)");
  } else if (blob) {
    ok.push("BLOB_READ_WRITE_TOKEN present");
  }

  if (secret) {
    try {
      const stripe = new Stripe(secret);
      const balance = await stripe.balance.retrieve();
      const chf = balance.available.find((b) => b.currency === "chf");
      ok.push(
        `Stripe API connection OK (${stripeMode(secret)} mode${
          chf ? `, CHF available: ${chf.amount / 100}` : ""
        })`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      issues.push(`Stripe API call failed: ${message}`);
    }
  }

  console.log("Stripe configuration check\n");
  for (const line of ok) console.log(`  ✓ ${line}`);
  for (const line of issues) console.log(`  ✗ ${line}`);

  if (issues.length > 0) {
    console.log("\nLocal setup:");
    console.log("  1. Copy keys from Stripe Dashboard → Developers → API keys");
    console.log("  2. Add them to .env.local");
    console.log("  3. Run: npm run stripe:listen (paste whsec_... into .env.local)");
    console.log("  4. Test card: 4242 4242 4242 4242");
    console.log("\nProduction (Vercel):");
    console.log("  Webhook URL: https://www.learn2strum.ch/api/webhooks/stripe");
    console.log("  Event: checkout.session.completed");
    console.log("  Use sk_live_ / pk_live_ / live whsec_ only in Production env");
    process.exit(1);
  }

  console.log("\nStripe looks correctly configured.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
