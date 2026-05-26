"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { productName } from "@/lib/i18n/translations";
import type { Booking } from "@/lib/bookings-store";
import { formatProductDuration, getProduct } from "@/lib/pricing";
import { site } from "@/lib/site";

export function SuccessContent({ booking }: { booking: Booking | null }) {
  const { locale, t } = useLocale();
  const product = booking
    ? getProduct(booking.audience, booking.productId)
    : null;
  const name = product
    ? productName(locale, product.nameDe, product.nameEn)
    : null;

  const isDirectPending =
    booking?.paymentMethod === "direct" && booking.status === "pending_payment";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold">{t.success.title}</h1>
      {booking && product && name ? (
        <div className="mt-6 space-y-4 text-base leading-relaxed">
          <p>
            <strong>{name}</strong>
            {booking.lessonDurationMin != null && (
              <>
                {" "}
                ({formatProductDuration(locale, product, booking.lessonDurationMin)})
              </>
            )}
          </p>
          {isDirectPending ? (
            <>
              <p>
                {t.success.payDirect.replace(
                  "{amount}",
                  String(booking.amountChf),
                )}
              </p>
              <div className="border-pastel rounded-xl border bg-white p-5 text-sm">
                <p>
                  <strong>{t.success.account}:</strong> {site.accountName}
                </p>
                <p className="mt-2">
                  <strong>IBAN:</strong> {site.iban}
                </p>
                {site.twintLink && (
                  <p className="mt-2">
                    <a href={site.twintLink} className="underline">
                      {t.success.payTwint}
                    </a>
                  </p>
                )}
                <p className="text-forest/60 mt-3 text-xs">
                  {t.success.reference}: booking {booking.id.slice(0, 8)}
                </p>
              </div>
            </>
          ) : (
            <p>{t.success.confirmEmail}</p>
          )}
        </div>
      ) : (
        <p className="text-forest/80 mt-4">{t.success.generic}</p>
      )}
      <Link
        href="/"
        className="bg-forest hover:bg-forest/90 mt-8 inline-block rounded-full px-6 py-3 font-semibold text-cream"
      >
        {t.success.home}
      </Link>
    </div>
  );
}
