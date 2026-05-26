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
  };
}

const childFlex = { durationMin: 30, durationMax: 45 as const };

export const products: Record<Audience, Record<ProductId, Product>> = {
  regular: {
    zoom: single(
      "zoom",
      "zoom",
      "Einzelne Zoom-Probelektion",
      "Single Zoom trial lesson",
      30,
      45,
    ),
    neutral: single(
      "neutral",
      "neutral",
      "Einzelne Probelektion am neutralen Ort",
      "Single trial lesson, neutral ground",
      40,
      45,
    ),
    home: single(
      "home",
      "home",
      "Einzelne Probelektion bei Ihnen zu Hause",
      "Single trial lesson, at your home",
      40,
      45,
    ),
    "zoom-bundle-5": bundle(
      "zoom-bundle-5",
      "zoom",
      "5er-Abo Zoom (45 Min./Lektion)",
      "5-lesson Zoom bundle (45 min each)",
      80,
      5,
    ),
    "zoom-bundle-10": bundle(
      "zoom-bundle-10",
      "zoom",
      "10er-Abo Zoom (45 Min./Lektion)",
      "10-lesson Zoom bundle (45 min each)",
      63,
      10,
    ),
    "neutral-bundle-5": bundle(
      "neutral-bundle-5",
      "neutral",
      "5er-Abo neutraler Ort (45 Min./Lektion)",
      "5-lesson bundle, neutral ground",
      80,
      5,
    ),
    "neutral-bundle-10": bundle(
      "neutral-bundle-10",
      "neutral",
      "10er-Abo neutraler Ort (45 Min./Lektion)",
      "10-lesson bundle, neutral ground",
      75,
      10,
    ),
    "home-bundle-5": bundle(
      "home-bundle-5",
      "home",
      "5er-Abo bei Ihnen zu Hause (45 Min./Lektion)",
      "5-lesson bundle, at your home",
      80,
      5,
    ),
    "home-bundle-10": bundle(
      "home-bundle-10",
      "home",
      "10er-Abo bei Ihnen zu Hause (45 Min./Lektion)",
      "10-lesson bundle, at your home",
      85,
      10,
    ),
  },
  child: {
    zoom: single(
      "zoom",
      "zoom",
      "Einzelne Zoom-Probelektion, Kind",
      "Single Zoom trial lesson, child",
      27,
      30,
    ),
    neutral: single(
      "neutral",
      "neutral",
      "Einzelne Probelektion am neutralen Ort, Kind",
      "Single trial lesson, neutral ground, child",
      37,
      30,
    ),
    home: single(
      "home",
      "home",
      "Einzelne Probelektion bei Ihnen zu Hause, Kind",
      "Single trial lesson, at your home, child",
      37,
      30,
    ),
    "zoom-bundle-5": bundle(
      "zoom-bundle-5",
      "zoom",
      "5er-Abo Zoom, Kind (45 Min./Lektion)",
      "5-lesson Zoom bundle, child",
      80,
      5,
    ),
    "zoom-bundle-10": bundle(
      "zoom-bundle-10",
      "zoom",
      "10er-Abo Zoom, Kind (45 Min./Lektion)",
      "10-lesson Zoom bundle, child",
      52,
      10,
    ),
    "neutral-bundle-5": bundle(
      "neutral-bundle-5",
      "neutral",
      "5er-Abo neutraler Ort, Kind (30–45 Min./Lektion)",
      "5-lesson neutral, child (30–45 min)",
      80,
      5,
      childFlex,
    ),
    "neutral-bundle-10": bundle(
      "neutral-bundle-10",
      "neutral",
      "10er-Abo neutraler Ort, Kind (30–45 Min./Lektion)",
      "10-lesson neutral, child (30–45 min)",
      65,
      10,
      childFlex,
    ),
    "home-bundle-5": bundle(
      "home-bundle-5",
      "home",
      "5er-Abo bei Ihnen zu Hause, Kind (30–45 Min./Lektion)",
      "5-lesson at home, child (30–45 min)",
      80,
      5,
      childFlex,
    ),
    "home-bundle-10": bundle(
      "home-bundle-10",
      "home",
      "10er-Abo bei Ihnen zu Hause, Kind (30–45 Min./Lektion)",
      "10-lesson at home, child (30–45 min)",
      75,
      10,
      childFlex,
    ),
  },
};

export const lessonFormats: LessonFormat[] = ["zoom", "neutral", "home"];

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

const allProductIds: ProductId[] = [
  "zoom",
  "neutral",
  "home",
  "zoom-bundle-5",
  "zoom-bundle-10",
  "neutral-bundle-5",
  "neutral-bundle-10",
  "home-bundle-5",
  "home-bundle-10",
];

export function isProductId(id: string | null): id is ProductId {
  return id != null && allProductIds.includes(id as ProductId);
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
