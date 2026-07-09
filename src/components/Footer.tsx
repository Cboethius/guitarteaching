"use client";

import Link from "next/link";
import { ScrollHashLink } from "@/components/ScrollHashLink";
import { useLocale } from "@/lib/i18n/context";
import { site } from "@/lib/site";

export function Footer() {
  const { t } = useLocale();
  const [houseNumber, cityLine] = site.addressRest
    .split(",")
    .map((part) => part.trim());
  const streetLine = houseNumber
    ? `${site.addressStreet} ${houseNumber}`
    : site.addressStreet;
  const postalLine = cityLine ?? site.addressRest;

  return (
    <footer className="border-pastel mt-auto border-t bg-pastel-light/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="grid flex-1 grid-cols-2 items-start gap-x-6 gap-y-6 md:flex md:flex-row md:gap-x-12 lg:gap-x-16">
            <div>
              <p className="text-lg font-semibold">{site.displayName}</p>
              <p className="text-forest/80 mt-1 text-sm">{site.teacher}</p>
              <p className="text-forest/80 mt-1 text-sm leading-snug">
                <span className="block">{streetLine}</span>
                <span className="mt-1 block">{postalLine}</span>
              </p>
            </div>
            <div className="md:order-3">
              <p className="font-semibold">{t.footer.legal}</p>
              <nav className="text-forest/80 mt-2 flex flex-col gap-1 text-sm">
                <Link href="/impressum" className="hover:underline">
                  {t.footer.impressum}
                </Link>
                <Link href="/privacy" className="hover:underline">
                  {t.footer.privacy}
                </Link>
                <ScrollHashLink href="/#pricing" className="hover:underline">
                  {t.nav.pricing}
                </ScrollHashLink>
                <Link href="/terms" className="hover:underline">
                  {t.footer.terms}
                </Link>
              </nav>
            </div>
            <div className="col-span-1 md:order-2">
              <p className="font-semibold">{t.footer.contact}</p>
              <div className="text-forest/80 mt-2 flex flex-col gap-1 text-sm">
                <a href={`mailto:${site.email}`} className="hover:underline">
                  {site.email}
                </a>
                <a href={`tel:${site.phoneTel}`} className="hover:underline">
                  {site.phone}
                </a>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-end justify-end md:hidden">
              <img
                src={site.logoSrc}
                alt={site.name}
                width={120}
                height={120}
                className="h-20 w-auto"
                decoding="async"
              />
            </div>
          </div>

          <div className="hidden justify-end md:flex md:shrink-0 md:self-start">
            <img
              src={site.logoSrc}
              alt={site.name}
              width={160}
              height={160}
              className="h-20 w-auto lg:h-24"
              decoding="async"
            />
          </div>
        </div>
        <p className="text-forest/60 mt-8 text-center text-xs">
          © {new Date().getFullYear()} {site.teacher}. {t.footer.copy}.
        </p>
      </div>
    </footer>
  );
}
