"use client";

import Link from "next/link";
import { PricingTeaser } from "@/components/PricingTeaser";
import { useLocale } from "@/lib/i18n/context";
import { site } from "@/lib/site";

const pillarIcons = [
  (
    <svg
      key="hands"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path d="M18 11V6a2 2 0 0 0-4 0" />
      <path d="M14 10V4a2 2 0 0 0-4 0v2" />
      <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  ),
  (
    <svg
      key="guitar"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path d="M11.9 12.1 4.51 19.49" />
      <path d="M21.44 4.5h-3.5l-2.5 2.5v3.5l2.5 2.5h3.5" />
      <path d="m20.54 5.4-5.07 5.07" />
      <path d="M5.74 21.3a1.6 1.6 0 0 1-2.26 0l-.78-.78a1.6 1.6 0 0 1 0-2.26l8.45-8.45 3.04 3.04Z" />
      <path d="m17 3 4 4" />
    </svg>
  ),
  (
    <svg
      key="music"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
];

const instrumentIcons = [
  (
    <svg
      key="electric"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path d="M3 17 L7 11 L13 11 L11 17 L7 18 Z" />
      <path d="M13 11 L20 4" />
      <path d="M19 3 L22 6" />
      <circle cx="6" cy="15" r="0.6" />
    </svg>
  ),
  (
    <svg
      key="acoustic"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <circle cx="8.5" cy="15.5" r="5.5" />
      <circle cx="8.5" cy="15.5" r="1.6" />
      <path d="M13 11 L20 4" />
      <path d="M19 3 L22 6" />
    </svg>
  ),
];

function renderHighlighted(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-forest font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function HomeContent() {
  const { t } = useLocale();

  return (
    <>
      <section className="bg-pastel-light/40 border-pastel border-b">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <p className="text-forest/80 text-sm font-medium uppercase tracking-wide">
              {t.hero.tagline}
            </p>
            <h1 className="mt-3 leading-tight">
              <span className="block text-4xl font-semibold sm:text-5xl">
                {t.hero.title}
              </span>
              <span className="text-forest/80 mt-2 block text-2xl font-medium sm:text-3xl">
                {t.hero.titleAccent}
              </span>
            </h1>
            <p className="text-forest/80 mt-5 max-w-lg text-lg leading-relaxed">
              {t.hero.subtitle}
            </p>
            <p className="text-forest/80 mt-6 max-w-lg text-base leading-relaxed">
              <strong className="font-semibold">{t.hero.whatsappHintLabel}</strong>{" "}
              {t.hero.whatsappHint}
            </p>
            <p className="text-forest/70 mt-1 max-w-lg text-base leading-relaxed">
              {t.hero.whatsappHintReason}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#pricing"
                className="bg-forest hover:bg-forest/90 inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3 text-center font-semibold text-cream"
              >
                {t.hero.ctaBook}
              </Link>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-forest text-forest hover:bg-pastel-light/60 inline-flex min-h-12 items-center justify-center rounded-full border-2 px-8 py-3 text-center font-semibold"
              >
                {t.hero.ctaWhatsapp}
              </a>
            </div>
            <p className="text-forest/70 mt-4 max-w-md text-sm leading-relaxed">
              {t.hero.signupNote}
            </p>
          </div>
          <div className="border-pastel aspect-video overflow-hidden rounded-2xl border bg-white shadow-sm">
            <iframe
              src={site.videoUrl}
              title={t.a11y.introVideo}
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section id="how-i-teach" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t.about.pillarsTitle}
            </h2>
            <p className="text-forest/80 mt-4 text-base leading-relaxed">
              {t.about.pillarsLead}
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div className="flex flex-col gap-5">
              {t.about.pillars.map((item, i) => (
                <article
                  key={item.title}
                  className="border-pastel rounded-2xl border bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-pastel-light/70 text-forest flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                      {pillarIcons[i]}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-forest/80 mt-2 text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-forest/80 space-y-4 text-base leading-relaxed">
              {t.about.pillarsBody.map((para, i) => (
                <p key={i}>{renderHighlighted(para)}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="what-i-teach" className="bg-pastel-light/40 border-pastel scroll-mt-24 border-y py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t.about.whatITitle}
            </h2>
            <p className="text-forest/80 mt-4 text-base leading-relaxed">
              {t.about.whatILead}
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div className="text-forest/80 space-y-4 text-base leading-relaxed">
              {t.about.whatIBody.map((para, i) => (
                <p key={i}>{renderHighlighted(para)}</p>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              {t.about.whatIInstruments.map((item, i) => (
                <article
                  key={item.title}
                  className="border-pastel rounded-2xl border bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-pastel-light/70 text-forest flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                      {instrumentIcons[i]}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-forest/80 mt-2 text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PricingTeaser />
    </>
  );
}
