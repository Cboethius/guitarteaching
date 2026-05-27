/**
 * Testimonial types for the homepage carousel.
 * Published entries are loaded from data/testimonials-submissions.json via the API.
 */
export type TestimonialSeaCreature =
  | "crab"
  | "fish"
  | "octopus"
  | "jellyfish"
  | "seahorse"
  | "starfish";

export const TESTIMONIAL_SEA_CREATURES: TestimonialSeaCreature[] = [
  "crab",
  "fish",
  "octopus",
  "jellyfish",
  "seahorse",
  "starfish",
];

export function isTestimonialSeaCreature(
  value: string,
): value is TestimonialSeaCreature {
  return TESTIMONIAL_SEA_CREATURES.includes(value as TestimonialSeaCreature);
}

export type Testimonial = {
  id: string;
  quoteDe: string;
  quoteEn: string;
  author: string;
  contextDe: string;
  contextEn: string;
  /** 1–5 stars */
  rating: number;
  seaCreature?: TestimonialSeaCreature;
};

/** Card width (8.8rem) + gap (0.8rem) — keep in sync with TestimonialsSlider */
export const TESTIMONIAL_CARD_STEP_PX = 141 + 13;
