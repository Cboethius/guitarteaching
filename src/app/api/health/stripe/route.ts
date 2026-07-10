import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

function stripeMode(key: string | undefined) {
  if (!key) return "missing" as const;
  if (key.startsWith("sk_live_")) return "live" as const;
  if (key.startsWith("sk_test_")) return "test" as const;
  return "unknown" as const;
}

/** Read-only Stripe config check (no charges, no bookings). */
export async function GET() {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim();
  const stripe = getStripe();

  let apiOk = false;
  let apiError: string | null = null;

  if (stripe) {
    try {
      await stripe.balance.retrieve();
      apiOk = true;
    } catch (error) {
      apiError = error instanceof Error ? error.message : "Stripe API error";
    }
  }

  return NextResponse.json({
    secretMode: stripeMode(secret),
    publishableMode: publishable?.startsWith("pk_live_")
      ? "live"
      : publishable?.startsWith("pk_test_")
        ? "test"
        : publishable
          ? "unknown"
          : "missing",
    apiOk,
    apiError,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    blobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    webhookConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
  });
}
