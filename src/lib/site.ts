export const site = {
  name: "Learn2Strum",
  displayName: "Learn2Strum",
  logoSrc: "/logo.png",
  teacher: "Christian Boethius",
  taglineDe: "Gitarrenunterricht Zürich",
  taglineEn: "Guitar lessons in Zurich",
  email: "christian@boethius.ch",
  phone: "+41 76 805 86 68",
  phoneTel: "+41768058668",
  whatsappUrl: "https://wa.me/41768058668",
  address: "Birmensdorferstrasse 430, 8055 Zürich",
  addressStreet: "Birmensdorferstrasse",
  addressRest: "430, 8055 Zürich",
  videoUrl:
    process.env.NEXT_PUBLIC_INTRO_VIDEO_URL ??
    "https://player.vimeo.com/video/1194750080?h=1b63737d87&title=0&byline=0&portrait=0",
  twintLink: process.env.TWINT_PAYLINK ?? "",
  iban: process.env.PAYMENT_IBAN ?? "CH00 0000 0000 0000 0000 0",
  accountName: process.env.PAYMENT_ACCOUNT_NAME ?? "Christian Boethius",
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://guitarteaching.vercel.app";

export function siteHostname() {
  try {
    return new URL(siteUrl).hostname;
  } catch {
    return "guitarteaching.vercel.app";
  }
}

export const childMaxAge = 13; // under 14
