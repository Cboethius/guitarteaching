import { childMaxAge } from "./site";
import {
  getProduct,
  isChildLessonDuration,
  productHasFlexibleDuration,
  productListFor,
  type Audience,
  type ProductId,
} from "./pricing";

const LIMITS = {
  contactName: 120,
  email: 254,
  phone: 40,
  note: 2000,
  childName: 120,
  address: 300,
  preferredArea: 120,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+()./-]{6,40}$/;

export type BookingInput = {
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

function trimField(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

function optionalField(value: unknown, max: number): string | undefined {
  const trimmed = trimField(value, max);
  return trimmed || undefined;
}

export type ValidatedBooking = BookingInput & {
  contactName: string;
  email: string;
  phone: string;
  lessonDurationMin: number;
};

export function validateBookingBody(
  body: BookingInput,
): { ok: true; data: ValidatedBooking } | { ok: false; error: string } {
  if (!body.legalAccepted) {
    return { ok: false, error: "Please accept privacy and terms." };
  }

  if (body.audience !== "regular" && body.audience !== "child") {
    return { ok: false, error: "Invalid audience." };
  }

  if (body.paymentMethod !== "stripe" && body.paymentMethod !== "direct") {
    return { ok: false, error: "Invalid payment method." };
  }

  if (!productListFor(body.audience).includes(body.productId)) {
    return { ok: false, error: "Invalid product." };
  }

  const contactName = trimField(body.contactName, LIMITS.contactName);
  const email = trimField(body.email, LIMITS.email).toLowerCase();
  const phone = trimField(body.phone, LIMITS.phone);

  if (!contactName) {
    return { ok: false, error: "Please enter your name." };
  }

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!phone || !PHONE_RE.test(phone)) {
    return { ok: false, error: "Please enter a valid phone number." };
  }

  const product = getProduct(body.audience, body.productId);
  let childName: string | undefined;

  if (body.audience === "child") {
    if (!body.parentConsent) {
      return { ok: false, error: "Parent consent required." };
    }

    childName = trimField(body.childName, LIMITS.childName);
    if (!childName) {
      return { ok: false, error: "Please enter the child's name." };
    }

    if (body.childAge == null || !Number.isInteger(body.childAge)) {
      return { ok: false, error: "Please enter the child's age." };
    }

    if (body.childAge < 0 || body.childAge > childMaxAge) {
      return { ok: false, error: "Child pricing is for under 14 only." };
    }

    if (productHasFlexibleDuration(product)) {
      if (
        body.lessonDurationMin == null ||
        !isChildLessonDuration(body.lessonDurationMin)
      ) {
        return {
          ok: false,
          error: "Please choose lesson length: 30 or 45 minutes.",
        };
      }
    }
  }

  if (
    body.audience === "regular" &&
    body.lessonDurationMin != null &&
    body.lessonDurationMin !== product.durationMin
  ) {
    return { ok: false, error: "Invalid lesson duration." };
  }

  const lessonDurationMin =
    body.audience === "child" && productHasFlexibleDuration(product)
      ? body.lessonDurationMin!
      : product.durationMin;

  let address: string | undefined;

  if (product.format === "home") {
    address = trimField(body.address, LIMITS.address);
    if (!address) {
      return { ok: false, error: "Please enter your address." };
    }
    if (!body.travelConfirmed) {
      return {
        ok: false,
        error: "Please confirm travel time to your address.",
      };
    }
  }

  return {
    ok: true,
    data: {
      ...body,
      contactName,
      email,
      phone,
      note: optionalField(body.note, LIMITS.note),
      childName,
      address,
      preferredArea: optionalField(body.preferredArea, LIMITS.preferredArea),
      lessonDurationMin,
    },
  };
}
