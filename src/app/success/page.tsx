import { SuccessContent } from "@/components/SuccessContent";
import { toBookingSuccessSummary } from "@/lib/booking-summary";
import { findBooking } from "@/lib/bookings-store";
import { confirmStripeBookingFromSession } from "@/lib/verify-stripe-checkout";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ booking?: string; session_id?: string }>;
}) {
  const { booking: id, session_id: sessionId } = await searchParams;
  let booking = id ? await findBooking(id) : null;

  if (booking && sessionId && booking.status === "pending_payment") {
    booking =
      (await confirmStripeBookingFromSession(booking.id, sessionId)) ?? booking;
  }

  const summary = booking ? toBookingSuccessSummary(booking) : null;

  return <SuccessContent booking={summary} />;
}
