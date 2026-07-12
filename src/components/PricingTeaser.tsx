"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLocale } from "@/lib/i18n/context";
import {
  buildProductId,
  getPricingTeaserRows,
  type Audience,
  type LessonFormat,
  type PricingTeaserRow,
} from "@/lib/pricing";

const mobileCardClass =
  "w-[18.5rem] max-w-[calc(100vw-2rem)] shrink-0 snap-center sm:w-auto sm:max-w-none";

function TrialCard({
  row,
  formatTitle,
  trialPrice,
  trialNote,
}: {
  row: PricingTeaserRow;
  formatTitle: (format: LessonFormat) => string;
  trialPrice: string;
  trialNote: string;
}) {
  const priceLabel = trialPrice.replace("{price}", String(row.trialChf));

  return (
    <Link
      href={`/book?product=${row.format}`}
      className="block h-full"
      aria-label={`${formatTitle(row.format)}, ${priceLabel}`}
    >
      <article className="section-card hover:border-forest/35 hover:shadow-sm flex h-full flex-col p-4 text-center transition-[border-color,box-shadow]">
        <h4 className="text-sm font-semibold sm:text-base">
          {formatTitle(row.format)}
        </h4>
        <p className="text-forest mt-2 text-base font-semibold tracking-tight sm:text-lg">
          {priceLabel}
        </p>
        <p className="text-forest/75 mt-1 text-sm leading-snug">{trialNote}</p>
      </article>
    </Link>
  );
}

function BundleCard({
  audience,
  row,
  formatTitle,
  bundle5,
  bundle10,
}: {
  audience: Audience;
  row: PricingTeaserRow;
  formatTitle: (format: LessonFormat) => string;
  bundle5: string;
  bundle10: string;
}) {
  const productId = buildProductId(row.format, "bundle", 5);

  return (
    <Link
      href={`/book?audience=${audience}&product=${productId}`}
      className="block h-full"
      aria-label={`${formatTitle(row.format)}, ${bundle5.replace("{price}", String(row.bundle5TotalChf))}`}
    >
      <article className="section-card hover:border-forest/35 hover:shadow-sm flex h-full flex-col p-4 text-center transition-[border-color,box-shadow]">
        <h4 className="text-sm font-semibold sm:text-base">
          {formatTitle(row.format)}
        </h4>
        <ul className="text-forest/80 mt-2 space-y-1.5 text-sm leading-snug">
          <li>{bundle5.replace("{price}", String(row.bundle5TotalChf))}</li>
          <li>{bundle10.replace("{price}", String(row.bundle10TotalChf))}</li>
        </ul>
      </article>
    </Link>
  );
}

function FormatGrid({
  rows,
  renderCard,
}: {
  rows: PricingTeaserRow[];
  renderCard: (row: PricingTeaserRow) => ReactNode;
}) {
  return (
    <>
      <div className="pricing-scroll mt-4 -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:hidden">
        {rows.map((row) => (
          <div key={`m-${row.format}`} className={mobileCardClass}>
            {renderCard(row)}
          </div>
        ))}
      </div>
      <div className="mt-4 hidden gap-3 sm:grid sm:grid-cols-3">
        {rows.map((row) => (
          <div key={`d-${row.format}`}>{renderCard(row)}</div>
        ))}
      </div>
    </>
  );
}

function BundleSection({
  audience,
  rows,
  formatTitle,
  heading,
}: {
  audience: Audience;
  rows: PricingTeaserRow[];
  formatTitle: (format: LessonFormat) => string;
  heading: string;
}) {
  const { t } = useLocale();
  const p = t.pricing;

  return (
    <div>
      <h3 className="text-center text-sm font-semibold tracking-wide uppercase sm:text-base">
        {heading}
      </h3>
      <FormatGrid
        rows={rows}
        renderCard={(row) => (
          <BundleCard
            audience={audience}
            row={row}
            formatTitle={formatTitle}
            bundle5={p.bundle5}
            bundle10={p.bundle10}
          />
        )}
      />
    </div>
  );
}

export function PricingTeaser() {
  const { t } = useLocale();
  const regularRows = getPricingTeaserRows("regular");
  const childRows = getPricingTeaserRows("child");
  const p = t.pricing;

  const formatTitle = (format: LessonFormat) => {
    const key = { zoom: "zoomTitle", neutral: "neutralTitle", home: "homeTitle" }[
      format
    ] as "zoomTitle" | "neutralTitle" | "homeTitle";
    return p[key];
  };

  return (
    <section id="pricing" className="scroll-mt-24 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {p.title}
          </h2>
        </div>

        <div className="mt-8 space-y-12">
          <div>
            <h3 className="text-center text-base font-semibold sm:text-lg">
              {p.trialSectionTitle}
            </h3>
            <p className="text-forest/80 mx-auto mt-2 max-w-2xl text-center text-sm leading-relaxed sm:text-base">
              {p.trialExplainer}
            </p>
            <FormatGrid
              rows={regularRows}
              renderCard={(row) => (
                <TrialCard
                  row={row}
                  formatTitle={formatTitle}
                  trialPrice={p.trialPrice}
                  trialNote={p.trialNote}
                />
              )}
            />
          </div>

          <div>
            <h3 className="text-center text-base font-semibold sm:text-lg">
              {p.bundleSectionTitle}
            </h3>
            <div className="mt-8 space-y-10">
              <BundleSection
                audience="regular"
                rows={regularRows}
                formatTitle={formatTitle}
                heading={p.sectionRegular}
              />
              <BundleSection
                audience="child"
                rows={childRows}
                formatTitle={formatTitle}
                heading={p.sectionChild}
              />
            </div>
          </div>
        </div>

        <p className="text-forest/80 mt-10 text-center text-sm leading-snug sm:text-base">
          {p.chooseAge}
        </p>
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <Link
            href="/book?audience=regular"
            className="btn-primary min-h-11 min-w-[11rem] justify-center px-8"
          >
            {p.ctaRegular}
          </Link>
          <Link
            href="/book?audience=child"
            className="btn-secondary min-h-11 min-w-[11rem] justify-center px-8"
          >
            {p.ctaChild}
          </Link>
        </div>
        <p className="text-forest/75 mt-4 text-center text-sm leading-snug">
          {p.childBookHint}
        </p>
      </div>
    </section>
  );
}
