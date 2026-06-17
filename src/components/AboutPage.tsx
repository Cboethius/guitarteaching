"use client";

import Image from "next/image";
import { ScrollHashLink } from "@/components/ScrollHashLink";
import { useLocale } from "@/lib/i18n/context";
import { ABOUT_GALLERY } from "@/lib/about-gallery";

export function AboutPage() {
  const { locale, t } = useLocale();
  const a = t.about;
  const lastIndex = ABOUT_GALLERY.length - 1;
  const lastIsOddDesktop = ABOUT_GALLERY.length % 3 === 1;
  const lastIsOddMobile = ABOUT_GALLERY.length % 2 === 1;

  return (
    <>
      <div className="from-forest via-forest/95 to-clay flex h-[100px] w-full items-center bg-gradient-to-br">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h1 className="text-cream text-xl font-semibold sm:text-2xl lg:text-3xl">
            {a.title}
          </h1>
        </div>
      </div>

      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <section className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="border-pastel relative aspect-[4/5] min-h-[280px] overflow-hidden rounded-2xl border bg-white sm:min-h-[360px]">
            <Image
              src="/about/portrait.png"
              alt={a.photoAltCoastal}
              fill
              className="object-cover grayscale"
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

        <section className="text-forest/80 mx-auto mt-8 max-w-4xl leading-relaxed">
          <p>{a.p5}</p>
          <ScrollHashLink
            href="/#pricing"
            className="bg-forest hover:bg-forest/90 text-cream mt-5 inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3 text-center font-semibold"
          >
            {t.hero.ctaBook}
          </ScrollHashLink>
        </section>

        <section
          aria-label={a.galleryTitle}
          className="mt-14 border-pastel border-t pt-12"
        >
          <p className="text-forest/75 mx-auto max-w-2xl text-center text-sm leading-relaxed sm:text-base">
            {a.galleryIntro}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {ABOUT_GALLERY.map((item, index) => {
              const isLast = index === lastIndex;
              const alt = locale === "de" ? item.altDe : item.altEn;
              const aspectClass =
                item.aspect === "16/9"
                  ? "aspect-video"
                  : item.aspect === "3/2"
                    ? "aspect-[3/2]"
                    : item.aspect === "9/16"
                      ? "aspect-[9/16]"
                      : "aspect-[3/4]";
              const objectClass =
                item.objectPosition === "bottom"
                  ? "object-cover object-bottom"
                  : "object-cover";

              return (
                <figure
                  key={item.src}
                  className={`border-pastel overflow-hidden rounded-xl border bg-white ${
                    item.wide ? "col-span-2 sm:col-span-3" : ""
                  } ${
                    isLast && lastIsOddMobile && !item.wide
                      ? "col-span-2 mx-auto w-full max-w-[min(100%,14rem)] sm:max-w-none"
                      : ""
                  } ${
                    isLast && lastIsOddDesktop && !item.wide
                      ? "sm:col-span-1 sm:col-start-2"
                      : ""
                  }`}
                >
                  <div className={`relative w-full ${aspectClass}`}>
                    {item.kind === "video" ? (
                      <video
                        src={item.src}
                        poster={item.poster}
                        controls
                        playsInline
                        preload="metadata"
                        aria-label={alt}
                        className={`absolute inset-0 h-full w-full bg-black ${objectClass}`}
                      />
                    ) : (
                      <Image
                        src={item.src}
                        alt={alt}
                        fill
                        className={objectClass}
                        sizes={
                          item.wide
                            ? "(max-width: 1024px) 100vw, 896px"
                            : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                        }
                      />
                    )}
                  </div>
                </figure>
              );
            })}
          </div>
        </section>
      </article>
    </>
  );
}
