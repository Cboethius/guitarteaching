"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { getTranslations } from "./translations";
import type { Locale } from "./types";
import { defaultLocale } from "./types";

const STORAGE_KEY = "axe-school-locale";
const LOCALE_COOKIE = "axe-school-locale";
const LOCALE_EVENT = "axe-school-locale-change";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof getTranslations>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readCookieLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`),
  );
  return match?.[1] === "en" ? "en" : match?.[1] === "de" ? "de" : null;
}

function persistLocale(next: Locale) {
  localStorage.setItem(STORAGE_KEY, next);
  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  if (
    window.location.pathname === "/en" ||
    window.location.pathname.startsWith("/en/")
  ) {
    return "en";
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "de") return stored;
  return readCookieLocale() ?? defaultLocale;
}

function subscribeLocale(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(LOCALE_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(LOCALE_EVENT, handler);
  };
}

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    readStoredLocale,
    () => initialLocale,
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    persistLocale(locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    persistLocale(next);
    window.dispatchEvent(new Event(LOCALE_EVENT));
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: getTranslations(locale),
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
