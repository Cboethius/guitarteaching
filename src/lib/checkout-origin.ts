/** Origin used for Stripe Checkout success/cancel URLs. */
export function checkoutOrigin(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;

  const origin = request.headers.get("origin")?.replace(/\/$/, "");
  if (origin) return origin;

  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  if (host) return `${proto}://${host}`;

  return "http://localhost:3001";
}
