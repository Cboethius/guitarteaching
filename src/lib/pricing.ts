export type Audience = "regular" | "child";
export type LessonFormat = "zoom" | "neutral" | "home";

export type ProductId =
  | "zoom"
  | "neutral"
  | "home"
  | "zoom-bundle-5"
  | "zoom-bundle-10"
  | "neutral-bundle-5"
  | "neutral-bundle-10"
  | "home-bundle-5"
  | "home-bundle-10";

export const childLessonDurations = [30, 45] as const;
export type ChildLessonDuration = (typeof childLessonDurations)[number];

export type Product = {
  id: ProductId;
  format: LessonFormat;
  nameDe: string;
  nameEn: string;
  durationMin: number;
  durationMax?: number;
  lessonValueChf: number;
  stripePriceChf: number;
  isBundle: boolean;
  paid: boolean;
  perLessonChf?: number;
  bundleLessons?: number;
};

function stripeGross(net: number) {
  return Math.ceil((net + 0.3) / (1 - 0.029));
}

function bundle(
  id: ProductId,
  format: LessonFormat,
  nameDe: string,
  nameEn: string,
  perLesson: number,
  lessons: 5 | 10,
  extra?: Partial<Product>,
): Product {
  const total = perLesson * lessons;
  return {
    id,
    format,
    nameDe,
    nameEn,
    durationMin: 45,
    lessonValueChf: total,
    stripePriceChf: stripeGross(total),
    isBundle: true,
    paid: true,
    perLessonChf: perLesson,
    bundleLessons: lessons,
    ...extra,
  };
}

function single(
  id: ProductId,
  format: LessonFormat,
  nameDe: string,
  nameEn: string,
  directChf: number,
  durationMin: number,
  extra?: Partial<Product>,
): Product {
  return {
    id,
    format,
    nameDe,
    nameEn,
    durationMin,
    lessonValueChf: directChf,
    stripePriceChf: stripeGross(directChf),
    isBundle: false,
    paid: true,
    ...extra,
  };
}

const childFlex = { durationMin: 30, durationMax: 45 as const };

export const products: Record<Audience, Record<ProductId, Product>> = {
  regular: {
    zoom: single(
      "zoom",
      "zoom",
      "Zoom, Probelektion",
      "Single Zoom trial lesson",
      36,
      45,
    ),
    neutral: single(
      "neutral",
      "neutral",
      "Neutraler Ort, Probelektion",
      "Single trial lesson, neutral ground",
      39,
      45,
    ),
    home: single(
      "home",
      "home",
      "Bei Ihnen, Probelektion",
      "Single trial lesson, at your home",
      41,
      45,
    ),
    "zoom-bundle-5": bundle(
      "zoom-bundle-5",
      "zoom",
      "Zoom, 5 Lektionen",
      "5-lesson Zoom bundle (45 min each)",
      72,
      5,
    ),
    "zoom-bundle-10": bundle(
      "zoom-bundle-10",
      "zoom",
      "Zoom, 10 Lektionen",
      "10-lesson Zoom bundle (45 min each)",
      65,
      10,
    ),
    "neutral-bundle-5": bundle(
      "neutral-bundle-5",
      "neutral",
      "Neutraler Ort, 5 Lektionen",
      "5-lesson bundle, neutral ground",
      78,
      5,
    ),
    "neutral-bundle-10": bundle(
      "neutral-bundle-10",
      "neutral",
      "Neutraler Ort, 10 Lektionen",
      "10-lesson bundle, neutral ground",
      72,
      10,
    ),
    "home-bundle-5": bundle(
      "home-bundle-5",
      "home",
      "Bei Ihnen, 5 Lektionen",
      "5-lesson bundle, at your home",
      82,
      5,
    ),
    "home-bundle-10": bundle(
      "home-bundle-10",
      "home",
      "Bei Ihnen, 10 Lektionen",
      "10-lesson bundle, at your home",
      76,
      10,
    ),
  },
  child: {
    zoom: single(
      "zoom",
      "zoom",
      "Zoom, Probelektion (Kind, 30–45 Min.)",
      "Single Zoom trial lesson, child (30–45 min)",
      36,
      30,
      childFlex,
    ),
    neutral: single(
      "neutral",
      "neutral",
      "Neutraler Ort, Probelektion (Kind)",
      "Single trial lesson, neutral ground, child",
      39,
      30,
    ),
    home: single(
      "home",
      "home",
      "Bei Ihnen, Probelektion (Kind)",
      "Single trial lesson, at your home, child",
      41,
      30,
    ),
    "zoom-bundle-5": bundle(
      "zoom-bundle-5",
      "zoom",
      "Zoom, 5 Lektionen (Kind, 30–45 Min.)",
      "5-lesson Zoom bundle, child (30–45 min)",
      58,
      5,
      childFlex,
    ),
    "zoom-bundle-10": bundle(
      "zoom-bundle-10",
      "zoom",
      "Zoom, 10 Lektionen (Kind, 30–45 Min.)",
      "10-lesson Zoom bundle, child (30–45 min)",
      52,
      10,
      childFlex,
    ),
    "neutral-bundle-5": bundle(
      "neutral-bundle-5",
      "neutral",
      "Neutraler Ort, 5 Lektionen (Kind, 30–45 Min.)",
      "5-lesson neutral, child (30–45 min)",
      62,
      5,
      childFlex,
    ),
    "neutral-bundle-10": bundle(
      "neutral-bundle-10",
      "neutral",
      "Neutraler Ort, 10 Lektionen (Kind, 30–45 Min.)",
      "10-lesson neutral, child (30–45 min)",
      58,
      10,
      childFlex,
    ),
    "home-bundle-5": bundle(
      "home-bundle-5",
      "home",
      "Bei Ihnen, 5 Lektionen (Kind, 30–45 Min.)",
      "5-lesson at home, child (30–45 min)",
      66,
      5,
      childFlex,
    ),
    "home-bundle-10": bundle(
      "home-bundle-10",
      "home",
      "Bei Ihnen, 10 Lektionen (Kind, 30–45 Min.)",
      "10-lesson at home, child (30–45 min)",
      60,
      10,
      childFlex,
    ),
  },
};

export const lessonFormats: LessonFormat[] = ["zoom", "neutral", "home"];

export type LessonKind = "trial" | "bundle";
export type BundleSize = 5 | 10;

export function formatFromProductId(id: ProductId): LessonFormat {
  if (id.startsWith("zoom")) return "zoom";
  if (id.startsWith("neutral")) return "neutral";
  return "home";
}

export function bundleSizeFromProductId(id: ProductId): BundleSize {
  return id.includes("-bundle-10") ? 10 : 5;
}

export function lessonKindFromProduct(product: Product): LessonKind {
  return product.isBundle ? "bundle" : "trial";
}

export function buildProductId(
  format: LessonFormat,
  kind: LessonKind,
  bundleSize: BundleSize = 5,
): ProductId {
  if (kind === "trial") return format;
  return `${format}-bundle-${bundleSize}` as ProductId;
}

export function productsForFormat(
  audience: Audience,
  format: LessonFormat,
): ProductId[] {
  return [format, `${format}-bundle-5`, `${format}-bundle-10`] as ProductId[];
}

export function productListFor(audience: Audience): ProductId[] {
  return lessonFormats.flatMap((f) => productsForFormat(audience, f));
}

export function defaultProductFor(audience: Audience): ProductId {
  return "zoom";
}

export function getProduct(audience: Audience, productId: ProductId): Product {
  return products[audience][productId];
}

export function isChildLessonDuration(
  value: number,
): value is ChildLessonDuration {
  return childLessonDurations.includes(value as ChildLessonDuration);
}

export function productHasFlexibleDuration(product: Product) {
  return product.durationMax != null && product.durationMax > product.durationMin;
}

export function formatProductDuration(
  locale: "de" | "en",
  product: Product,
  chosenMin?: number,
): string {
  if (chosenMin != null) {
    return locale === "de" ? `${chosenMin} Min.` : `${chosenMin} min`;
  }
  if (productHasFlexibleDuration(product)) {
    return locale === "de"
      ? `${product.durationMin}–${product.durationMax} Min.`
      : `${product.durationMin}–${product.durationMax} min`;
  }
  return locale === "de"
    ? `${product.durationMin} Min.`
    : `${product.durationMin} min`;
}

/** Map legacy URL params from earlier site versions */
const legacyProductMap: Record<string, ProductId> = {
  "zoom-bundle": "zoom-bundle-10",
  "neutral-bundle": "neutral-bundle-10",
  "home-bundle": "home-bundle-10",
};

export function resolveProductId(
  audience: Audience,
  param: string | null,
): ProductId {
  const mapped = param ? legacyProductMap[param] ?? param : null;
  const list = productListFor(audience);
  if (mapped && list.includes(mapped as ProductId)) return mapped as ProductId;
  return defaultProductFor(audience);
}

export type PricingTeaserRow = {
  format: LessonFormat;
  trialChf: number;
  bundle5TotalChf: number;
  bundle10TotalChf: number;
};

export function getPricingTeaserRows(audience: Audience): PricingTeaserRow[] {
  return lessonFormats.map((format) => {
    const trial = getProduct(audience, format);
    const bundle5 = getProduct(audience, buildProductId(format, "bundle", 5));
    const bundle10 = getProduct(audience, buildProductId(format, "bundle", 10));
    return {
      format,
      trialChf: trial.lessonValueChf,
      bundle5TotalChf: bundle5.lessonValueChf,
      bundle10TotalChf: bundle10.lessonValueChf,
    };
  });
}

export function getLowestTrialChf(audience: Audience): number {
  return Math.min(...getPricingTeaserRows(audience).map((row) => row.trialChf));
}
