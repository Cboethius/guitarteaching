import type {
  Booking,
  BookingStatus,
  PaymentMethod,
} from "./bookings-store";
import type { Audience, ProductId } from "./pricing";

/** Safe subset of booking data for the public success page (no PII). */
export type BookingSuccessSummary = {
  idPrefix: string;
  audience: Audience;
  productId: ProductId;
  paymentMethod: PaymentMethod;
  status: BookingStatus;
  amountChf: number;
  lessonDurationMin?: number;
};

export function toBookingSuccessSummary(booking: Booking): BookingSuccessSummary {
  return {
    idPrefix: booking.id.slice(0, 8),
    audience: booking.audience,
    productId: booking.productId,
    paymentMethod: booking.paymentMethod,
    status: booking.status,
    amountChf: booking.amountChf,
    lessonDurationMin: booking.lessonDurationMin,
  };
}
