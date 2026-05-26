import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  getProduct,
  isChildLessonDuration,
  productHasFlexibleDuration,
  productListFor,
  type Audience,
  type ProductId,
} from "@/lib/pricing";
import { saveBooking, type Booking } from "@/lib/bookings-store";
import { getStripe } from "@/lib/stripe";
import { childMaxAge, site } from "@/lib/site";

type Body = {
  audience: Audience;
  productId: ProductId;
  paymentMethod: "stripe" | "direct";
  contactName: string;
  email: string;
  phone: string;
  note?: string;
  childName?: string;
  childAge?: number;
  address?: string;
  preferredArea?: string;
  travelConfirmed?: boolean;
  parentConsent?: boolean;
  legalAccepted?: boolean;
  lessonDurationMin?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;

    if (!body.legalAccepted) {
      return NextResponse.json(
        { error: "Please accept privacy and terms." },
        { status: 400 },
      );
    }

    if (!productListFor(body.audience).includes(body.productId)) {
      return NextResponse.json({ error: "Invalid product." }, { status: 400 });
    }

    const product = getProduct(body.audience, body.productId);

    if (body.audience === "child") {
      if (!body.parentConsent) {
        return NextResponse.json(
          { error: "Parent consent required." },
          { status: 400 },
        );
      }
      if (body.childAge != null && body.childAge > childMaxAge) {
        return NextResponse.json(
          { error: "Child pricing is for under 14 only." },
          { status: 400 },
        );
      }
      if (productHasFlexibleDuration(product)) {
        if (
          body.lessonDurationMin == null ||
          !isChildLessonDuration(body.lessonDurationMin)
        ) {
          return NextResponse.json(
            { error: "Please choose lesson length: 30 or 45 minutes." },
            { status: 400 },
          );
        }
      }
    }

    if (
      body.audience === "regular" &&
      body.lessonDurationMin != null &&
      body.lessonDurationMin !== product.durationMin
    ) {
      return NextResponse.json({ error: "Invalid lesson duration." }, { status: 400 });
    }

    const lessonDurationMin =
      body.audience === "child" && productHasFlexibleDuration(product)
        ? body.lessonDurationMin!
        : product.durationMin;

    if (product.format === "home" && !body.travelConfirmed) {
      return NextResponse.json(
        { error: "Please confirm travel time to your address." },
        { status: 400 },
      );
    }

    const amountChf = product.paid
      ? body.paymentMethod === "stripe"
        ? product.stripePriceChf
        : product.lessonValueChf
      : 0;

    const booking: Booking = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      audience: body.audience,
      productId: body.productId,
      paymentMethod: body.paymentMethod,
      status: "pending_payment",
      lessonValueChf: product.lessonValueChf,
      amountChf,
      contactName: body.contactName,
      email: body.email,
      phone: body.phone,
      note: body.note,
      childName: body.childName,
      childAge: body.childAge,
      address: body.address,
      travelConfirmed: body.travelConfirmed,
      preferredArea: body.preferredArea,
      lessonDurationMin,
    };

    await saveBooking(booking);

    if (body.paymentMethod === "stripe") {
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
        customer_email: body.email,
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
          audience: body.audience,
          productId: body.productId,
          lessonValueChf: String(product.lessonValueChf),
          lessonDurationMin: String(lessonDurationMin),
        },
        success_url: `${origin}/success?booking=${booking.id}`,
        cancel_url: `${origin}/cancel?audience=${body.audience}&product=${body.productId}`,
      });

      return NextResponse.json({
        bookingId: booking.id,
        checkoutUrl: session.url,
      });
    }

    // TODO: send confirmation emails (Resend) when API keys are set
    console.log("[booking]", booking);

    return NextResponse.json({ bookingId: booking.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
