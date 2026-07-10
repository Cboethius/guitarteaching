import { NextResponse } from "next/server";
import { findBooking, updateBooking } from "@/lib/bookings-store";
import { getStripe } from "@/lib/stripe";
import { stripeSessionAmountMatches } from "@/lib/stripe-session";

export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;
    if (bookingId) {
      const booking = await findBooking(bookingId);
      if (!booking) {
        console.warn(`[stripe webhook] booking not found: ${bookingId}`);
      } else if (!stripeSessionAmountMatches(session, booking.amountChf)) {
        console.warn(
          `[stripe webhook] amount mismatch for booking ${bookingId}`,
        );
      } else {
        const updated = await updateBooking(bookingId, { status: "paid" });
        if (!updated) {
          console.warn(`[stripe webhook] booking not found: ${bookingId}`);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
