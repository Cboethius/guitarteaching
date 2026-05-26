"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ScrollHashLink } from "@/components/ScrollHashLink";
import { useLocale } from "@/lib/i18n/context";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [homeSection, setHomeSection] = useState("");
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const tagline = locale === "de" ? site.taglineDe : site.taglineEn;

  useEffect(() => {
    if (pathname !== "/") {
      setHomeSection("");
      return;
    }

    const sectionIds = ["how-i-teach", "pricing"] as const;
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);

    const updateFromScroll = () => {
      if (window.scrollY < 120) {
        setHomeSection("");
        return;
      }

      const marker = window.scrollY + 120;
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= marker) current = id;
      }
      setHomeSection(current);
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("hashchange", updateFromScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 120) {
          setHomeSection("");
          return;
        }
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setHomeSection(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    for (const el of elements) observer.observe(el);

    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("hashchange", updateFromScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const goHome = (e?: React.MouseEvent) => {
    if (pathname !== "/") return;
    e?.preventDefault();
    window.history.replaceState(null, "", "/");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    setHomeSection("");
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
    <header className="border-pastel sticky top-0 z-50 border-b bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          onClick={goHome}
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
        >
          <span className="text-forest block text-lg font-semibold">
            {site.name}
          </span>
          <span className="text-forest/70 block text-xs">{tagline}</span>
        </Link>

        <nav
          className="hidden items-center gap-5 md:flex"
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
          className="border-pastel flex flex-col gap-3 border-t px-4 py-4 md:hidden"
          aria-label={t.a11y.mainNav}
        >
          {links.map((l) => {
            const active = isActive(l.href, l.hash);
            const className = `min-h-11 inline-flex items-center text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 rounded-sm ${
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
