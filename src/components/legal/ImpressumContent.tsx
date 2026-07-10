"use client";

import { LegalSection } from "@/components/legal/LegalSection";
import { useLocale } from "@/lib/i18n/context";
import { primaryMailtoHref, site } from "@/lib/site";

export function ImpressumContent() {
  const { t } = useLocale();
  const l = t.legal.impressum;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">{l.title}</h1>
      <div className="mt-6 space-y-6 text-sm">
        <LegalSection heading={l.providerHeading} paragraphs={l.providerBody} />
        <div className="text-forest/80 space-y-1 text-sm leading-relaxed">
          <p>
            <strong>{site.teacher}</strong>
            <br />
            {site.address}
            <br />
            {l.country}
          </p>
          <p>
            {l.emailLabel}{" "}
            <a href={primaryMailtoHref()} className="underline">
              {site.email}
            </a>
            <br />
            {l.phoneLabel}{" "}
            <a href={`tel:${site.phoneTel}`} className="underline">
              {site.phone}
            </a>
          </p>
        </div>
        {l.sections.map((section, i) => (
          <LegalSection key={i} heading={section.heading} paragraphs={section.paragraphs} />
        ))}
      </div>
    </article>
  );
}
