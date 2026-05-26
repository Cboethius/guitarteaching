"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BookingForm } from "@/components/BookingForm";
import { useLocale } from "@/lib/i18n/context";
import type { Audience } from "@/lib/pricing";

function BookPageInner() {
  const { t } = useLocale();
  const params = useSearchParams();
  const audienceParam = params.get("audience");
  const audience: Audience | null =
    audienceParam === "child" ? "child" : audienceParam === "regular" ? "regular" : null;

  const title =
    audience === "child"
      ? t.book.titleChild
      : audience === "regular"
        ? t.book.titleRegular
        : t.book.title;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
      {audience && (
        <p className="text-forest/80 mt-3 text-base">{t.book.intro}</p>
      )}
      <div className="mt-10">
        <BookingForm />
      </div>
    </div>
  );
}

function BookPageFallback() {
  const { t } = useLocale();
  return (
    <p className="text-forest/70 p-12 text-center">{t.book.loading}</p>
  );
}

export function BookPage() {
  return (
    <Suspense fallback={<BookPageFallback />}>
      <BookPageInner />
    </Suspense>
  );
}
