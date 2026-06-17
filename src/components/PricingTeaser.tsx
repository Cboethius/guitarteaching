"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocale } from "@/lib/i18n/context";
import {
  getPricingTeaserRows,
  type LessonFormat,
  type PricingTeaserRow,
} from "@/lib/pricing";

const CARD_CLASS =
  "w-[18.5rem] max-w-[calc(100vw-2rem)] shrink-0 snap-center";

function PricingCard({
  row,
  formatTitle,
  trialPrice,
  trialNote,
  bundle5,
  bundle10,
  className = "",
}: {
  row: PricingTeaserRow;
  formatTitle: (format: LessonFormat) => string;
  trialPrice: string;
  trialNote: string;
  bundle5: string;
  bundle10: string;
  className?: string;
}) {
  return (
    <article className={`section-card p-4 text-center ${className}`.trim()}>
      <h4 className="text-sm font-semibold sm:text-base">
        {formatTitle(row.format)}
      </h4>
      <p className="text-forest mt-1 text-base font-semibold tracking-tight sm:text-lg">
        {trialPrice.replace("{price}", String(row.trialChf))}
      </p>
      <p className="text-forest/75 mt-1 text-sm leading-snug">{trialNote}</p>
      <ul className="text-forest/75 mt-2 space-y-1 text-sm leading-snug">
        <li>{bundle5.replace("{price}", String(row.bundle5TotalChf))}</li>
        <li>{bundle10.replace("{price}", String(row.bundle10TotalChf))}</li>
      </ul>
    </article>
  );
}

type CardProps = {
  formatTitle: (format: LessonFormat) => string;
  trialPrice: string;
  trialNote: string;
  bundle5: string;
  bundle10: string;
};

function PricingCarousel({
  rows,
  ...cardProps
}: {
  rows: PricingTeaserRow[];
} & CardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isResetting = useRef(false);
  const count = rows.length;

  const loopRows = useMemo(
    () =>
      Array.from({ length: count * 3 }, (_, index) => ({
        row: rows[index % count]!,
        key: `${rows[index % count]!.format}-${Math.floor(index / count)}`,
      })),
    [count, rows],
  );

  const scrollToCardIndex = useCallback(
    (cardIndex: number, behavior: ScrollBehavior = "auto") => {
      const el = scrollRef.current;
      if (!el) return;

      const card = el.children[cardIndex + 1] as HTMLElement | undefined;
      if (!card) return;

      const left = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
      el.scrollTo({ left, behavior });
    },
    [],
  );

  useEffect(() => {
    scrollToCardIndex(count, "auto");
  }, [count, scrollToCardIndex]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let timer: number;

    const handleScroll = () => {
      if (isResetting.current) return;

      clearTimeout(timer);
      timer = window.setTimeout(() => {
        const center = el.scrollLeft + el.clientWidth / 2;
        let closestCardIndex = count;
        let minDistance = Infinity;

        for (let i = 1; i < el.children.length - 1; i++) {
          const child = el.children[i] as HTMLElement;
          const childCenter = child.offsetLeft + child.offsetWidth / 2;
          const distance = Math.abs(center - childCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestCardIndex = i - 1;
          }
        }

        const logicalIndex = closestCardIndex % count;
        const setIndex = Math.floor(closestCardIndex / count);

        if (setIndex === 0 || setIndex === 2) {
          isResetting.current = true;
          scrollToCardIndex(count + logicalIndex, "auto");
          requestAnimationFrame(() => {
            isResetting.current = false;
          });
        }
      }, 100);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", handleScroll);
    };
  }, [count, scrollToCardIndex]);

  return (
    <div
      ref={scrollRef}
      className="pricing-scroll mt-4 -mx-4 flex gap-3 overflow-x-auto pb-2 sm:hidden"
    >
      <div aria-hidden className="w-[calc(50%-9.25rem)] shrink-0 snap-none" />
      {loopRows.map(({ row, key }) => (
        <PricingCard
          key={key}
          row={row}
          {...cardProps}
          className={CARD_CLASS}
        />
      ))}
      <div aria-hidden className="w-[calc(50%-9.25rem)] shrink-0 snap-none" />
    </div>
  );
}

function PricingGrid({
  rows,
  formatTitle,
  trialPrice,
  trialNote,
  bundle5,
  bundle10,
}: {
  rows: PricingTeaserRow[];
  formatTitle: (format: LessonFormat) => string;
  trialPrice: string;
  trialNote: string;
  bundle5: string;
  bundle10: string;
}) {
  const cardProps = {
    formatTitle,
    trialPrice,
    trialNote,
    bundle5,
    bundle10,
  };

  return (
    <>
      <PricingCarousel rows={rows} {...cardProps} />

      <div className="mt-4 hidden gap-3 sm:grid sm:grid-cols-3">
        {rows.map((row) => (
          <PricingCard key={row.format} row={row} {...cardProps} />
        ))}
      </div>
    </>
  );
}

export function PricingTeaser() {
  const { t } = useLocale();
  const regularRows = getPricingTeaserRows("regular");
  const childRows = getPricingTeaserRows("child");

  const formatTitle = (format: LessonFormat) => {
    const key = { zoom: "zoomTitle", neutral: "neutralTitle", home: "homeTitle" }[
      format
    ] as "zoomTitle" | "neutralTitle" | "homeTitle";
    return t.pricing[key];
  };

  const gridProps = {
    formatTitle,
    trialPrice: t.pricing.trialPrice,
    trialNote: t.pricing.trialNote,
    bundle5: t.pricing.bundle5,
    bundle10: t.pricing.bundle10,
  };

  return (
    <section id="pricing" className="scroll-mt-24 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.pricing.title}
          </h2>
        </div>

        <div className="mt-6">
          <div>
            <h3 className="text-center text-sm font-semibold sm:text-base">
              {t.pricing.sectionRegular}
            </h3>
            <PricingGrid rows={regularRows} {...gridProps} />
          </div>

          <div className="mt-6">
            <h3 className="text-center text-sm font-semibold sm:text-base">
              {t.pricing.sectionChild}
            </h3>
            <PricingGrid rows={childRows} {...gridProps} />
          </div>

          <p className="text-forest/80 mt-6 text-center text-sm leading-snug sm:text-base">
            {t.pricing.chooseAge}
          </p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              href="/book?audience=regular"
              className="btn-primary min-h-11 min-w-[11rem] justify-center px-8"
            >
              {t.pricing.ctaRegular}
            </Link>
            <Link
              href="/book?audience=child"
              className="btn-secondary min-h-11 min-w-[11rem] justify-center px-8"
            >
              {t.pricing.ctaChild}
            </Link>
          </div>
          <p className="text-forest/75 mt-4 text-center text-sm leading-snug">
            {t.pricing.childBookHint}
          </p>
        </div>
      </div>
    </section>
  );
}
