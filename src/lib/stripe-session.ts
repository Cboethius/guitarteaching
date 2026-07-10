import type Stripe from "stripe";

export function stripeSessionAmountMatches(
  session: Stripe.Checkout.Session,
  expectedChf: number,
): boolean {
  if (session.amount_total == null) return false;
  return session.amount_total === expectedChf * 100;
}
