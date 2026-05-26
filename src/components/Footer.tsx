"use client";

import Link from "next/link";
import { ScrollHashLink } from "@/components/ScrollHashLink";
import { useLocale } from "@/lib/i18n/context";
import { site } from "@/lib/site";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-pastel mt-auto border-t bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-x-12 lg:gap-x-16">
          <div>
            <p className="text-lg font-semibold">{site.name}</p>
            <p className="text-forest/80 mt-1 text-sm">{site.teacher}</p>
            <p className="text-forest/80 mt-1 text-sm leading-snug">
              {site.addressStreet}
              <br />
              {site.addressRest}
            </p>
          </div>
          <div>
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
          <div>
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
        </div>
        <p className="text-forest/60 mt-8 text-center text-xs">
          © {new Date().getFullYear()} {site.teacher}. {t.footer.copy}.
        </p>
      </div>
    </footer>
  );
}
