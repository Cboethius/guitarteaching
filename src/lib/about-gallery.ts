export type AboutGalleryItem = {
  src: string;
  altDe: string;
  altEn: string;
  kind?: "image" | "video";
  poster?: string;
  aspect?: "3/4" | "3/2" | "16/9" | "9/16";
  wide?: boolean;
  objectPosition?: "bottom" | "center";
};

/** @deprecated use AboutGalleryItem */
export type AboutGalleryPhoto = AboutGalleryItem;

export const ABOUT_GALLERY: AboutGalleryItem[] = [
  {
    kind: "video",
    src: "/about/gallery/live-performance.mp4",
    poster: "/about/gallery/live-performance-poster.jpg",
    altDe: "Live-Auftritt mit Gitarre",
    altEn: "Live performance with guitar",
  },
  {
    src: "/about/gallery/bell.jpg",
    altDe: "Christian an einem Glockenturm",
    altEn: "Christian at a bell tower",
  },
  {
    src: "/about/gallery/fishing.jpg",
    altDe: "Christian beim Angeln auf dem Boot",
    altEn: "Christian fishing on a boat",
    objectPosition: "bottom",
  },
  {
    src: "/about/gallery/sunset.jpg",
    altDe: "Sonnenuntergang über dem Meer",
    altEn: "Sunset over the ocean",
  },
  {
    src: "/about/gallery/lake.jpg",
    altDe: "Hochgebirgssee in den Anden",
    altEn: "High-altitude lake in the Andes",
  },
  {
    src: "/about/gallery/hiking.jpg",
    altDe: "Wandern in den Bergen",
    altEn: "Hiking in the mountains",
  },
  {
    src: "/about/gallery/cliff.jpg",
    altDe: "Küstenklippe mit Blick aufs Meer",
    altEn: "Coastal cliff overlooking the sea",
  },
  {
    src: "/about/gallery/volcano-day.jpg",
    altDe: "Vulkanausbruch mit Aschewolke",
    altEn: "Volcanic eruption with ash plume",
  },
  {
    src: "/about/gallery/volcano-night.jpg",
    altDe: "Vulkan bei Nacht in Ausbruch",
    altEn: "Volcano erupting at night",
  },
  {
    kind: "video",
    src: "/about/gallery/freediving-rope.mp4",
    poster: "/about/gallery/freediving-rope.jpg",
    altDe: "Freitauchen unter Wasser",
    altEn: "Freediving underwater",
  },
  {
    kind: "video",
    src: "/about/gallery/snorkeling.mp4",
    poster: "/about/gallery/snorkeling.jpg",
    altDe: "Schnorcheln zwischen Felsen",
    altEn: "Snorkeling among rocks",
    objectPosition: "bottom",
  },
  {
    kind: "video",
    src: "/about/gallery/diving-surface.mp4",
    poster: "/about/gallery/diving-surface.jpg",
    altDe: "Unter Wasser beim Tauchen",
    altEn: "Underwater view while diving",
  },
  {
    src: "/about/gallery/whale.jpg",
    altDe: "Pottwal vor Dominica",
    altEn: "Sperm whale underwater off Dominica",
    aspect: "16/9",
    wide: true,
    objectPosition: "bottom",
  },
];
