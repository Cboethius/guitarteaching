"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { ContactHint } from "@/components/ContactHint";
import { AcousticGuitarIcon } from "@/components/icons/AcousticGuitarIcon";
import { ElectricGuitarIcon } from "@/components/icons/ElectricGuitarIcon";
import { PricingTeaser } from "@/components/PricingTeaser";
import { ScrollHashLink, scrollToHashId } from "@/components/ScrollHashLink";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
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

/** Index matches t.about.whatIInstruments order (electric, acoustic) */
const instrumentIcons: (ReactNode | null)[] = [
  <ElectricGuitarIcon key="electric" />,
  <AcousticGuitarIcon key="acoustic" />,
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

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    scrollToHashId(id);
    const timer = window.setTimeout(() => scrollToHashId(id), 100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="bg-pastel-light/40 border-pastel overflow-x-hidden border-b">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative flex flex-col items-start gap-0 sm:flex-row sm:items-stretch sm:gap-4 md:min-h-[22rem] md:gap-0 xl:min-h-[24rem]">
            <div className="relative z-10 order-2 min-w-0 w-full py-8 sm:order-1 sm:flex-1 sm:py-10 md:flex md:w-1/2 md:flex-col md:justify-center md:pr-8">
              <p className="text-forest/70 text-[10px] font-medium uppercase tracking-[0.14em] sm:text-xs">
                {t.hero.tagline}
              </p>
              <h1 className="mt-1 leading-[1.12] sm:mt-1.5">
                <span className="text-forest block text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                  {t.hero.title}
                </span>
                <span className="text-forest/75 mt-1 block text-base font-medium sm:mt-1.5 sm:text-lg lg:text-2xl">
                  {t.hero.titleAccent}
                </span>
              </h1>
              <p className="text-forest/80 mt-2.5 max-w-lg text-sm leading-snug sm:mt-3 sm:text-base">
                {t.hero.subtitle}
              </p>
              <ContactHint showReason />
              <div className="mt-2.5 flex flex-wrap gap-2 sm:mt-3 sm:gap-2.5">
                <ScrollHashLink
                  href="/#pricing"
                  className="btn-secondary min-h-10 px-4 py-2 text-xs sm:min-h-11 sm:px-6 sm:py-2.5 sm:text-sm md:px-8 md:text-base"
                >
                  {t.nav.pricing}
                </ScrollHashLink>
                <Link
                  href="/book"
                  className="btn-primary min-h-10 px-4 py-2 text-xs sm:min-h-11 sm:px-6 sm:py-2.5 sm:text-sm md:px-8 md:text-base"
                >
                  {t.hero.ctaBook}
                </Link>
              </div>
            </div>

            <div className="bg-pastel-light/40 relative order-1 left-1/2 w-screen max-w-[100vw] -translate-x-1/2 shrink-0 overflow-hidden sm:left-auto sm:order-2 sm:w-[40%] sm:max-w-none sm:translate-x-0 sm:self-stretch md:w-1/2">
              <div className="relative aspect-[3/2] w-full sm:aspect-auto sm:h-full sm:min-h-[20rem] md:min-h-[22rem]">
                <Image
                  src="/hero/DSCF3249-hero.jpg"
                  alt={t.hero.photoAlt}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-[48%_18%]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-i-teach" className="scroll-mt-24 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t.about.pillarsTitle}
            </h2>
            <p className="text-forest/75 mt-2 text-sm leading-snug sm:text-base">
              {t.about.pillarsLead}
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
            <div className="flex flex-col gap-2.5">
              {t.about.pillars.map((item, i) => (
                <article key={item.title} className="section-card p-4">
                  <div className="flex items-start gap-2.5">
                    <div className="bg-pastel-light/60 text-forest flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                      {pillarIcons[i]}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold sm:text-base">{item.title}</h3>
                      <p className="text-forest/75 mt-1 text-sm leading-snug">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-forest/80 space-y-3 text-sm leading-snug sm:text-base">
              {t.about.pillarsBody.map((para, i) => (
                <p key={i}>{renderHighlighted(para)}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="what-i-teach"
        className="bg-pastel-light/30 border-pastel scroll-mt-24 border-y py-8 sm:py-10"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t.about.whatITitle}
            </h2>
            <p className="text-forest/75 mt-2 text-sm leading-snug sm:text-base">
              {t.about.whatILead}
            </p>
          </div>

          <div className="mt-6">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {t.about.whatIInstruments.map((item, i) => (
                <article key={item.title} className="section-card p-4">
                  <div className="flex items-start gap-2.5">
                    {instrumentIcons[i] ? (
                      <div className="bg-pastel-light/60 text-forest flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                        {instrumentIcons[i]}
                      </div>
                    ) : null}
                    <div>
                      <h3 className="text-sm font-semibold sm:text-base">{item.title}</h3>
                      <p className="text-forest/75 mt-1 text-sm leading-snug">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-forest/80 mt-6 max-w-3xl space-y-3 text-left text-sm leading-snug sm:text-base">
              {t.about.whatIBody.map((para, i) => (
                <p key={i}>{renderHighlighted(para)}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-pastel scroll-mt-24 border-b py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
              {t.hero.videoTitle}
            </h2>
            <div className="border-pastel mt-6 aspect-video overflow-hidden rounded-2xl border bg-white">
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
        </div>
      </section>

      <PricingTeaser />
      <TestimonialsSlider />
    </>
  );
}
