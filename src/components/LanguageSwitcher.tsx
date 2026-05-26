"use client";

import { useLocale } from "@/lib/i18n/context";
import type { Locale } from "@/lib/i18n/types";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  function select(next: Locale) {
    setLocale(next);
  }

  return (
    <div
      className={`border-pastel flex items-center gap-0.5 rounded-full border bg-white p-0.5 text-xs font-semibold ${className}`}
      aria-label={t.lang.label}
      role="group"
    >
      {(["de", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => select(code)}
          className={`min-h-8 min-w-9 rounded-full px-2.5 transition-colors ${
            locale === code
              ? "bg-forest text-cream"
              : "text-forest/70 hover:text-forest"
          }`}
        >
          {t.lang[code]}
        </button>
      ))}
    </div>
  );
}
