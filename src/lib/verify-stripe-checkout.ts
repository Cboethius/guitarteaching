import { findBooking, updateBooking, type Booking } from "./bookings-store";
import { getStripe } from "./stripe";
import { stripeSessionAmountMatches } from "./stripe-session";

/** Confirm a Stripe Checkout session and mark the booking paid when appropriate. */
export async function confirmStripeBookingFromSession(
  bookingId: string,
  sessionId: string,
): Promise<Booking | null> {
  const booking = await findBooking(bookingId);
  if (!booking || booking.paymentMethod !== "stripe") return booking;
  if (booking.status === "paid") return booking;

  const stripe = getStripe();
  if (!stripe) return booking;

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (
    session.payment_status === "paid" &&
    session.metadata?.bookingId === bookingId &&
    stripeSessionAmountMatches(session, booking.amountChf)
  ) {
    return updateBooking(bookingId, { status: "paid" });
  }

  return booking;
}
