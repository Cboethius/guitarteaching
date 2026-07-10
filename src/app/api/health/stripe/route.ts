import { NextResponse } from "next/server";

function stripeMode(key: string | undefined) {
  if (!key) return "missing" as const;
  if (key.startsWith("sk_live_")) return "live" as const;
  if (key.startsWith("sk_test_")) return "test" as const;
  return "unknown" as const;
}

/** Read-only Stripe config check (no charges, no bookings). */
export async function GET() {
  const secret = process.env.STRIPE_SECRET_KEY;
  const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  return NextResponse.json({
    secretMode: stripeMode(secret),
    publishableMode: publishable?.startsWith("pk_live_")
      ? "live"
      : publishable?.startsWith("pk_test_")
        ? "test"
        : publishable
          ? "unknown"
          : "missing",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    blobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    webhookConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
  });
}
