/**
 * Testimonials shown on the homepage carousel.
 *
 * To add a new one: copy an object below, give it a unique `id`, and fill in
 * quote, author, rating (1–5), and context for DE and EN.
 *
 * Each card shows a sea-creature icon (see `seaCreature`).
 */
export type TestimonialSeaCreature =
  | "crab"
  | "fish"
  | "octopus"
  | "jellyfish"
  | "seahorse"
  | "starfish";

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

export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quoteDe:
      "Christian erklärt Dinge so, dass ich sie endlich verstehe. Nach ein paar Lektionen konnte ich den ersten Song von Anfang bis Ende spielen.",
    quoteEn:
      "Christian explains things in a way I finally understand. After a few lessons I could play my first song from start to finish.",
    author: "Laura M.",
    contextDe: "Erwachsene Anfängerin, Zürich",
    contextEn: "Adult beginner, Zurich",
    rating: 5,
    seaCreature: "crab",
  },
  {
    id: "placeholder-2",
    quoteDe:
      "Geduldig, strukturiert und nie herablassend. Mein Sohn freut sich jede Woche auf die Lektion.",
    quoteEn:
      "Patient, structured, and never condescending. My son looks forward to every lesson.",
    author: "Thomas K.",
    contextDe: "Vater eines Schülers (11)",
    contextEn: "Parent of a student (11)",
    rating: 5,
    seaCreature: "fish",
  },
  {
    id: "placeholder-3",
    quoteDe:
      "Zoom-Unterricht hat mich überrascht — gut vorbereitet, klare Übungen für zwischendurch, und ich höre Fortschritt.",
    quoteEn:
      "Online lessons surprised me — well prepared, clear exercises between sessions, and I can hear the progress.",
    author: "Elena R.",
    contextDe: "E-Gitarre, Probelektion dann 5er-Abo",
    contextEn: "Electric guitar, trial then 5-lesson bundle",
    rating: 5,
    seaCreature: "octopus",
  },
  {
    id: "placeholder-4",
    quoteDe:
      "Ich hatte jahrelang eine Gitarre zu Hause und nie angefangen. Nach der Probelektion wusste ich: das passt.",
    quoteEn:
      "I'd had a guitar at home for years and never started. After the trial lesson I knew this was the right fit.",
    author: "Marco B.",
    contextDe: "Akustikgitarre, Anfänger",
    contextEn: "Acoustic guitar, beginner",
    rating: 5,
    seaCreature: "jellyfish",
  },
  {
    id: "placeholder-5",
    quoteDe:
      "Unkomplizierte Terminabsprache, klare Übungen und null Druck. Genau mein Tempo.",
    quoteEn:
      "Easy scheduling, clear exercises, and zero pressure. Exactly my pace.",
    author: "Sophie L.",
    contextDe: "Teen, neutraler Ort Zürich",
    contextEn: "Teen, neutral ground Zurich",
    rating: 4,
    seaCreature: "seahorse",
  },
  {
    id: "placeholder-6",
    quoteDe:
      "Meine Tochter (9) liebt die kurzen Lektionen. Christian macht es spielerisch, ohne zu albern zu sein.",
    quoteEn:
      "My daughter (9) loves the shorter lessons. Christian keeps it playful without being silly.",
    author: "Anna W.",
    contextDe: "Mutter, Kind unter 14",
    contextEn: "Mother, child under 14",
    rating: 5,
    seaCreature: "starfish",
  },
];

/** Card width (w-44) + gap (gap-4) — keep in sync with TestimonialsSlider */
export const TESTIMONIAL_CARD_STEP_PX = 176 + 16;
