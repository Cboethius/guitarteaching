"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";

export function AboutPage() {
  const { t } = useLocale();
  const a = t.about;

  return (
    <>
      <div className="relative h-44 w-full overflow-hidden sm:h-52 md:h-60 lg:h-72">
        <Image
          src="/about/whale-header.png"
          alt={a.whaleHeaderAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-x-0 top-4 sm:top-6">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h1 className="text-xl font-semibold text-cream sm:text-2xl lg:text-3xl">
              {a.title}
            </h1>
          </div>
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
          <Link
            href="/#pricing"
            className="bg-forest hover:bg-forest/90 mt-5 inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3 text-center font-semibold text-cream"
          >
            {t.hero.ctaBook}
          </Link>
        </section>
      </article>
    </>
  );
}
