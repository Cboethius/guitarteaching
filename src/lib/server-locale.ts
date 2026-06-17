import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n/types";
import { defaultLocale } from "@/lib/i18n/types";
import { buildSiteMetadata, musicSchoolJsonLd } from "@/lib/site-metadata";
import type { Metadata } from "next";

const LOCALE_COOKIE = "axe-school-locale";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return value === "en" ? "en" : defaultLocale;
}

export async function generateSiteMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildSiteMetadata(locale);
}

export async function getJsonLdScript() {
  const locale = await getServerLocale();
  return JSON.stringify(musicSchoolJsonLd(locale));
}
