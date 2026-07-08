"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ScrollHashLink } from "@/components/ScrollHashLink";
import { useLocale } from "@/lib/i18n/context";
import { site } from "@/lib/site";

type HomeNavSection = "how-i-teach" | "pricing";

/** Match scroll-mt-24 sections — marker line below sticky header */
const SCROLL_MARKER_OFFSET = 120;

function activeHomeSection(): HomeNavSection | "" {
  const pos = window.scrollY + SCROLL_MARKER_OFFSET;
  const how = document.getElementById("how-i-teach");
  const pricing = document.getElementById("pricing");
  if (!how) return "";

  const howTop = how.offsetTop;
  const pricingTop = pricing?.offsetTop ?? Number.MAX_SAFE_INTEGER;

  if (pos < howTop) return "";
  if (pos < pricingTop) return "how-i-teach";
  return "pricing";
}

function syncHashToSection(section: HomeNavSection | "") {
  const path = window.location.pathname;
  const nextUrl = section ? `${path}#${section}` : path;
  const current = `${path}${window.location.hash}`;
  if (current !== nextUrl) {
    window.history.replaceState(null, "", nextUrl);
  }
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [homeSection, setHomeSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const tagline = locale === "de" ? site.taglineDe : site.taglineEn;

  useEffect(() => {
    if (pathname !== "/") return;

    const syncHomeSection = () => {
      const section = activeHomeSection();
      setHomeSection(section);
      syncHashToSection(section);
    };

    syncHomeSection();
    window.addEventListener("scroll", syncHomeSection, { passive: true });
    window.addEventListener("resize", syncHomeSection);

    return () => {
      window.removeEventListener("scroll", syncHomeSection);
      window.removeEventListener("resize", syncHomeSection);
    };
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHome = (e?: React.MouseEvent) => {
    if (pathname !== "/") return;
    e?.preventDefault();
    setHomeSection("");
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { href: "/", label: t.nav.home, hash: false },
    { href: "/#how-i-teach", label: t.nav.howITeach, hash: true },
    { href: "/#pricing", label: t.nav.pricing, hash: true },
    { href: "/about", label: t.nav.how, hash: false },
  ];

  const isActive = (href: string, isHash: boolean) => {
    if (pathname === "/") {
      if (href === "/") return homeSection === "";
      if (isHash) {
        const id = href.split("#")[1];
        return homeSection === id;
      }
      return false;
    }

    if (isHash) return false;
    if (href === "/") return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`border-pastel sticky top-0 z-50 border-b bg-cream/95 backdrop-blur-sm transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          onClick={goHome}
          className="flex min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 sm:gap-3"
        >
          <img
            src={site.logoSrc}
            alt={site.name}
            width={48}
            height={48}
            className="h-10 w-auto shrink-0 sm:h-11"
            decoding="async"
          />
          <div className="min-w-0">
            <span className="text-forest block text-base font-semibold leading-tight sm:text-lg">
              {site.displayName}
            </span>
            <span className="text-forest/70 block text-[0.6875rem] leading-tight sm:text-xs">
              {tagline}
            </span>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-4 md:flex"
          aria-label={t.a11y.mainNav}
        >
          {links.map((l) => {
            const active = isActive(l.href, l.hash);
            const className = `group relative min-h-11 inline-flex items-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 rounded-sm ${
              active ? "text-forest" : "text-forest/80 hover:text-forest"
            }`;
            const underline = (
              <span
                className={`bg-forest pointer-events-none absolute -bottom-1 left-0 h-0.5 origin-left transition-transform duration-300 ease-out ${
                  active ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                }`}
              />
            );
            return l.hash ? (
              <ScrollHashLink
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={className}
              >
                <span>{l.label}</span>
                {underline}
              </ScrollHashLink>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                onClick={l.href === "/" ? goHome : undefined}
                aria-current={active ? "page" : undefined}
                className={className}
              >
                <span>{l.label}</span>
                {underline}
              </Link>
            );
          })}
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="border-pastel min-h-11 rounded-lg border px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
          >
            {t.nav.menu}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-pastel flex flex-col gap-0.5 border-t bg-cream px-4 py-3 md:hidden"
          aria-label={t.a11y.mainNav}
        >
          {links.map((l) => {
            const active = isActive(l.href, l.hash);
            const className = `min-h-11 inline-flex items-center rounded-sm px-1 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ${
              active ? "text-forest underline underline-offset-4" : "text-forest/80"
            }`;
            return l.hash ? (
              <ScrollHashLink
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={className}
              >
                {l.label}
              </ScrollHashLink>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  if (l.href === "/") goHome(e);
                  setOpen(false);
                }}
                aria-current={active ? "page" : undefined}
                className={className}
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
