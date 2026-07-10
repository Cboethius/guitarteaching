import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  getProduct,
  productHasFlexibleDuration,
} from "@/lib/pricing";
import { saveBooking, type Booking } from "@/lib/bookings-store";
import { getStripe } from "@/lib/stripe";
import { site } from "@/lib/site";
import { getClientIp } from "@/lib/client-ip";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { validateBookingBody, type BookingInput } from "@/lib/validate-booking";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`bookings:${ip}`, 10, 60 * 60 * 1000);
  if (!limited.ok) {
    return rateLimitResponse(limited.retryAfterSec);
  }

  try {
    const body = (await request.json()) as BookingInput;
    const validated = validateBookingBody(body);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const data = validated.data;
    const product = getProduct(data.audience, data.productId);
    const lessonDurationMin = data.lessonDurationMin;

    const amountChf = product.paid
      ? data.paymentMethod === "stripe"
        ? product.stripePriceChf
        : product.lessonValueChf
      : 0;

    const booking: Booking = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      audience: data.audience,
      productId: data.productId,
      paymentMethod: data.paymentMethod,
      status: "pending_payment",
      lessonValueChf: product.lessonValueChf,
      amountChf,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
      note: data.note,
      childName: data.childName,
      childAge: data.childAge,
      address: data.address,
      travelConfirmed: data.travelConfirmed,
      preferredArea: data.preferredArea,
      lessonDurationMin,
    };

    await saveBooking(booking);

    if (data.paymentMethod === "stripe") {
      const stripe = getStripe();
      if (!stripe) {
        return NextResponse.json(
          {
            error:
              "Online payment is not configured yet. Choose direct payment or contact us.",
          },
          { status: 503 },
        );
      }

      const origin =
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: data.email,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "chf",
              unit_amount: product.stripePriceChf * 100,
              product_data: {
                name: `${product.nameDe}, ${site.name}`,
                description: productHasFlexibleDuration(product)
                  ? `${lessonDurationMin} Min. · ${site.teacher}`
                  : `Gitarrenunterricht Zürich · ${site.teacher}`,
              },
            },
          },
        ],
        metadata: {
          bookingId: booking.id,
          audience: data.audience,
          productId: data.productId,
          lessonValueChf: String(product.lessonValueChf),
          lessonDurationMin: String(lessonDurationMin),
        },
        success_url: `${origin}/success?booking=${booking.id}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cancel?audience=${data.audience}&product=${data.productId}`,
      });

      return NextResponse.json({
        bookingId: booking.id,
        checkoutUrl: session.url,
      });
    }

    console.log("[booking] direct payment created:", booking.id);

    return NextResponse.json({ bookingId: booking.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
