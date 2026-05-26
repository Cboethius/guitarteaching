"use client";

import { LegalSection } from "@/components/legal/LegalSection";
import { useLocale } from "@/lib/i18n/context";

export function TermsContent() {
  const { t } = useLocale();
  const l = t.legal.terms;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">{l.title}</h1>
      {l.intro && (
        <p className="text-forest/80 mt-4 text-sm leading-relaxed">{l.intro}</p>
      )}
      <div className="mt-6 space-y-6 text-sm">
        {l.sections.map((section, i) => (
          <LegalSection key={i} heading={section.heading} paragraphs={section.paragraphs} />
        ))}
        <p className="text-forest/60 text-xs">{l.updated}</p>
      </div>
    </article>
  );
}
