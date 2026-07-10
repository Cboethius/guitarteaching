import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key);
}

export function stripeClientErrorMessage(error: unknown): string | null {
  if (!(error instanceof Stripe.errors.StripeError)) return null;
  return error.message;
}
