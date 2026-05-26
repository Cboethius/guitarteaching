"use client";

import { useLocale } from "@/lib/i18n/context";

export function SkipLink() {
  const { t } = useLocale();

  return (
    <a
      href="#main-content"
      className="bg-forest text-cream sr-only fixed left-4 top-4 z-[100] rounded-lg px-4 py-2 text-sm font-semibold focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
    >
      {t.a11y.skipToContent}
    </a>
  );
}
