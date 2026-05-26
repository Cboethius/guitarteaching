"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";

export function PricingTeaser() {
  const { t } = useLocale();

  return (
    <section id="pricing" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-semibold sm:text-4xl">{t.pricing.title}</h2>
        <p className="text-forest/80 mt-4 text-base leading-relaxed">
          {t.pricing.teaserFormats}
        </p>
        <p className="text-forest/80 mt-2 text-base leading-relaxed">
          {t.pricing.teaserAudience}
        </p>
        <p className="text-forest/80 mt-2 text-base leading-relaxed">
          {t.pricing.teaserLessons}
        </p>
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
