"use client";

import Image from "next/image";
import { ScrollHashLink } from "@/components/ScrollHashLink";
import { useLocale } from "@/lib/i18n/context";

export function AboutPage() {
  const { t } = useLocale();
  const a = t.about;

  return (
    <>
      <div className="from-forest via-forest/95 to-clay flex h-[100px] w-full items-center bg-gradient-to-br">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h1 className="text-cream text-xl font-semibold sm:text-2xl lg:text-3xl">
            {a.title}
          </h1>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <section className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="border-pastel relative aspect-[4/5] min-h-[280px] overflow-hidden rounded-2xl border bg-white shadow-sm sm:min-h-[360px]">
            <Image
              src="/about/coastal.png"
              alt={a.photoAltCoastal}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
              priority
            />
          </div>

          <div className="text-forest/80 space-y-5 leading-relaxed">
            <p>{a.p1}</p>
            <p>{a.p2}</p>
            <p>{a.p3}</p>
            <p className="pt-4">{a.p4}</p>
          </div>
        </section>

        <section className="text-forest/80 mt-8 leading-relaxed">
          <p>{a.p5}</p>
          <ScrollHashLink
            href="/#pricing"
            className="bg-forest hover:bg-forest/90 text-cream mt-5 inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3 text-center font-semibold"
          >
            {t.hero.ctaBook}
          </ScrollHashLink>
        </section>
      </article>
    </>
  );
}
