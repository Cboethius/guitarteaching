"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/lib/i18n/context";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const tagline = locale === "de" ? site.taglineDe : site.taglineEn;

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/#how-i-teach", label: t.nav.howITeach },
    { href: "/#what-i-teach", label: t.nav.whatITeach },
    { href: "/about", label: t.nav.how },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="border-pastel sticky top-0 z-50 border-b bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/">
          <span className="text-forest block text-lg font-semibold">
            {site.name}
          </span>
          <span className="text-forest/70 block text-xs">{tagline}</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`group relative text-sm font-medium transition-colors ${
                  active ? "text-forest" : "text-forest/80 hover:text-forest"
                }`}
              >
                <span>{l.label}</span>
                <span
                  className={`bg-forest pointer-events-none absolute -bottom-1 left-0 h-0.5 origin-left transition-transform duration-300 ease-out ${
                    active ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="border-pastel rounded-lg border px-3 py-2 text-sm font-medium"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={t.nav.menu}
          >
            {t.nav.menu}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-pastel flex flex-col gap-3 border-t px-4 py-4 md:hidden">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`text-base font-medium ${
                  active ? "text-forest underline underline-offset-4" : "text-forest/80"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
