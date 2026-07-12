"use client";

import { useLocale } from "@/lib/i18n/context";
import { primaryMailtoHref, site } from "@/lib/site";

const linkClass = "text-forest font-medium underline";

export function ContactHint({
  showReason = false,
  variant = "default",
  tone = "formal",
}: {
  showReason?: boolean;
  variant?: "default" | "boxed";
  /** Informal German (du) on homepage; formal Sie on booking. */
  tone?: "formal" | "informal";
}) {
  const { t } = useLocale();
  const informal = tone === "informal";
  const sendLead = informal ? t.contact.sendLeadInformal : t.contact.sendLead;
  const reason = informal ? t.contact.reasonInformal : t.contact.reason;

  const text = (
    <>
      {!informal && (
        <>
          <strong className="font-semibold">{t.contact.label}</strong>{" "}
        </>
      )}
      {informal && (
        <>
          <strong className="font-semibold">
            {t.contact.interestPromptInformal}
          </strong>
        </>
      )}
      {sendLead}
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {t.hero.ctaWhatsapp}
      </a>
      {t.contact.or}
      <a href={primaryMailtoHref()} className={linkClass}>
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
      {showReason && reason ? (
        <p className="text-forest/70 mt-1 max-w-lg text-sm leading-snug sm:text-base">
          {reason}
        </p>
      ) : null}
    </>
  );
}
