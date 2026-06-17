"use client";

import { useLocale } from "@/lib/i18n/context";
import { site } from "@/lib/site";

const linkClass = "text-forest font-medium underline";

export function ContactHint({
  showReason = false,
  variant = "default",
}: {
  showReason?: boolean;
  variant?: "default" | "boxed";
}) {
  const { t } = useLocale();

  const text = (
    <>
      <strong className="font-semibold">{t.contact.label}</strong>{" "}
      {t.contact.sendLead}
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {t.hero.ctaWhatsapp}
      </a>
      {t.contact.or}
      <a href={`mailto:${site.email}`} className={linkClass}>
        {t.hero.ctaEmail}
      </a>
      .
    </>
  );

  if (variant === "boxed") {
    return (
      <p className="border-pastel rounded-xl border bg-pastel-light/40 px-4 py-3 text-sm leading-relaxed">
        {text}
      </p>
    );
  }

  return (
    <>
      <p className="text-forest/80 mt-4 max-w-lg text-sm leading-snug sm:text-base">
        {text}
      </p>
      {showReason && (
        <p className="text-forest/70 mt-1 max-w-lg text-sm leading-snug sm:text-base">
          {t.contact.reason}
        </p>
      )}
    </>
  );
}
