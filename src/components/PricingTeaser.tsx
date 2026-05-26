"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { lessonFormats } from "@/lib/pricing";

export function PricingTeaser() {
  const { t } = useLocale();

  const formatLabels = lessonFormats.map((format) => {
    const key = { zoom: "zoomTitle", neutral: "neutralTitle", home: "homeTitle" }[
      format
    ] as "zoomTitle" | "neutralTitle" | "homeTitle";
    return t.pricing[key];
  });

  return (
    <section id="pricing" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-semibold sm:text-4xl">{t.pricing.title}</h2>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-4">
          {formatLabels.map((label) => (
            <span key={label} className="text-forest text-base font-semibold">
              {label}
            </span>
          ))}
        </div>

        <div className="text-forest/80 mt-4 space-y-1 text-base leading-relaxed">
          <p>{t.pricing.teaserAudience}</p>
          <p>{t.pricing.teaserLessons}</p>
        </div>

        <p className="text-forest mt-6 font-medium">{t.pricing.chooseAge}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/book?audience=regular"
            className="btn-primary min-w-[11rem] justify-center"
          >
            {t.pricing.ctaRegular}
          </Link>
          <Link
            href="/book?audience=child"
            className="border-forest text-forest hover:bg-pastel-light/60 inline-flex min-h-12 min-w-[11rem] items-center justify-center rounded-full border-2 px-8 py-2.5 text-center font-semibold"
          >
            {t.pricing.ctaChild}
          </Link>
        </div>
        <p className="text-forest/60 mt-4 text-sm">{t.pricing.childBookHint}</p>
      </div>
    </section>
  );
}
