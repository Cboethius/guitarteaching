import type { TestimonialSeaCreature } from "@/lib/testimonials";
import { TESTIMONIAL_SEA_CREATURES } from "@/lib/testimonials";

export function testimonialSeaCreatureForIndex(
  index: number,
): TestimonialSeaCreature {
  return TESTIMONIAL_SEA_CREATURES[
    ((index % TESTIMONIAL_SEA_CREATURES.length) +
      TESTIMONIAL_SEA_CREATURES.length) %
      TESTIMONIAL_SEA_CREATURES.length
  ];
}

const AVATAR_SRC: Record<TestimonialSeaCreature, string> = {
  crab: "/testimonial-avatars/crab.svg",
  fish: "/testimonial-avatars/fish.svg",
  octopus: "/testimonial-avatars/octopus.svg",
  jellyfish: "/testimonial-avatars/jellyfish.svg",
  seahorse: "/testimonial-avatars/seahorse.svg",
  starfish: "/testimonial-avatars/starfish.svg",
};

export function TestimonialSeaCreatureIcon({
  creature,
  className = "h-[88%] w-[88%]",
}: {
  creature: TestimonialSeaCreature;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={AVATAR_SRC[creature]}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className}
    />
  );
}
