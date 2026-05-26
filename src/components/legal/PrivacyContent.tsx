"use client";

import { LegalSection } from "@/components/legal/LegalSection";
import { useLocale } from "@/lib/i18n/context";
import { site } from "@/lib/site";

export function PrivacyContent() {
  const { t } = useLocale();
  const l = t.legal.privacy;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">{l.title}</h1>
      {l.intro && (
        <p className="text-forest/80 mt-4 text-sm leading-relaxed">{l.intro}</p>
      )}
      <div className="mt-6 space-y-6 text-sm">
        <div className="text-forest/80 space-y-1 leading-relaxed">
          <p>
            <strong>{l.controllerLabel}</strong> {site.teacher}, {site.address},{" "}
            {t.legal.impressum.country}. {l.emailLabel}{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
          </p>
        </div>
        {l.sections.map((section, i) => (
          <LegalSection key={i} heading={section.heading} paragraphs={section.paragraphs} />
        ))}
        <p className="text-forest/60 text-xs">{l.updated}</p>
        <p className="text-forest/60 text-xs">
          EDÖB / FDPIC:{" "}
          <a
            href="https://www.edoeb.admin.ch"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            edoeb.admin.ch
          </a>
        </p>
      </div>
    </article>
  );
}
