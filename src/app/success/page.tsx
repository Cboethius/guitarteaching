import { SuccessContent } from "@/components/SuccessContent";
import { findBooking } from "@/lib/bookings-store";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ booking?: string }>;
}) {
  const { booking: id } = await searchParams;
  const booking = id ? await findBooking(id) : null;

  return <SuccessContent booking={booking} />;
}
