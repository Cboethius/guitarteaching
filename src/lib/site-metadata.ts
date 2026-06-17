import type { Metadata } from "next";
import { getLowestTrialChf, getProduct } from "./pricing";
import { site, siteUrl } from "./site";

const lowestTrial = getLowestTrialChf("regular");
const lowestChildTrial = getLowestTrialChf("child");
const highestTrial = getProduct("regular", "home").lessonValueChf;

export function buildSiteMetadata(locale: "de" | "en"): Metadata {
  const isEn = locale === "en";
  const title = isEn
    ? `Guitar lessons in Zurich, ${site.name}, ${site.teacher}`
    : `Gitarrenunterricht Zürich, ${site.name}, ${site.teacher}`;
  const description = isEn
    ? `Guitar lessons in Zurich with ${site.teacher}. Online, neutral location, or at your home.`
    : `Gitarrenunterricht in Zürich mit ${site.teacher}. Online, neutraler Ort oder bei Ihnen zu Hause.`;
  const ogLocale = isEn ? "en_CH" : "de_CH";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s, ${site.name}`,
    },
    description,
    alternates: {
      canonical: isEn ? "/en" : "/",
      languages: {
        "de-CH": "/",
        en: "/en",
      },
    },
    openGraph: {
      title: isEn
        ? `Guitar lessons in Zurich, ${site.name}`
        : `Gitarrenunterricht Zürich, ${site.name}`,
      description: isEn
        ? `Private guitar lessons with ${site.teacher} in Zurich.`
        : `Einzelunterricht Gitarre mit ${site.teacher} in Zürich.`,
      locale: ogLocale,
      type: "website",
      siteName: site.name,
      url: isEn ? `${siteUrl}/en` : siteUrl,
      images: [
        {
          url: "/hero/DSCF3249-hero.jpg",
          width: 7728,
          height: 5152,
          alt: isEn
            ? "Christian Boethius playing electric guitar"
            : "Christian Boethius spielt E-Gitarre",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/hero/DSCF3249-hero.jpg"],
    },
    other: {
      "price:currency": "CHF",
      "price:amount": String(lowestTrial),
    },
  };
}

export function musicSchoolJsonLd(locale: "de" | "en") {
  const isEn = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
    name: site.name,
    description: isEn
      ? `Guitar lessons in Zurich with ${site.teacher}`
      : `Gitarrenunterricht in Zürich mit ${site.teacher}`,
    url: isEn ? `${siteUrl}/en` : siteUrl,
    image: `${siteUrl}/hero/DSCF3249-hero.jpg`,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.addressStreet,
      postalCode: "8055",
      addressLocality: "Zürich",
      addressCountry: "CH",
    },
    areaServed: {
      "@type": "City",
      name: "Zürich",
    },
    priceRange: `CHF ${lowestChildTrial}–${highestTrial}`,
    founder: {
      "@type": "Person",
      name: site.teacher,
    },
    offers: [
      {
        "@type": "Offer",
        name: isEn ? "Trial lesson (online)" : "Probelektion (Zoom)",
        price: getLowestTrialChf("regular"),
        priceCurrency: "CHF",
      },
    ],
  };
}
