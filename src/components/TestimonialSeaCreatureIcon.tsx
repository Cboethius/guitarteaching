import type { TestimonialSeaCreature } from "@/lib/testimonials";
import type { ReactElement } from "react";

const CREATURES: TestimonialSeaCreature[] = [
  "crab",
  "fish",
  "octopus",
  "jellyfish",
  "seahorse",
  "starfish",
];

export function testimonialSeaCreatureForIndex(
  index: number,
): TestimonialSeaCreature {
  return CREATURES[
    ((index % CREATURES.length) + CREATURES.length) % CREATURES.length
  ];
}

const FILL = {
  fill: "currentColor",
  stroke: "none",
} as const;

/** Bold filled silhouettes — readable at small sizes and from a distance */
function Crab() {
  return (
    <>
      <ellipse cx="32" cy="36" rx="15" ry="10" {...FILL} />
      <path {...FILL} d="M17 32 L5 24 L7 34 L5 44 L17 38 Z" />
      <path {...FILL} d="M47 32 L59 24 L57 34 L59 44 L47 38 Z" />
      <circle cx="26" cy="34" r="3" fill="#f8f6f1" />
      <circle cx="38" cy="34" r="3" fill="#f8f6f1" />
      <circle cx="26" cy="34" r="1.4" {...FILL} />
      <circle cx="38" cy="34" r="1.4" {...FILL} />
    </>
  );
}

function Fish() {
  return (
    <>
      <ellipse cx="31" cy="32" rx="19" ry="13" {...FILL} />
      <path {...FILL} d="M12 32 L2 22 L2 42 Z" />
      <circle cx="40" cy="30" r="3.5" fill="#f8f6f1" />
      <circle cx="41" cy="30" r="1.6" {...FILL} />
    </>
  );
}

function Octopus() {
  return (
    <>
      <circle cx="32" cy="24" r="15" {...FILL} />
      <circle cx="26" cy="22" r="3" fill="#f8f6f1" />
      <circle cx="38" cy="22" r="3" fill="#f8f6f1" />
      <circle cx="26" cy="22" r="1.4" {...FILL} />
      <circle cx="38" cy="22" r="1.4" {...FILL} />
      <path {...FILL} d="M18 38 L14 54 L20 52 L22 38 Z" />
      <path {...FILL} d="M26 40 L24 56 L30 54 L30 40 Z" />
      <path {...FILL} d="M34 40 L34 56 L40 54 L38 40 Z" />
      <path {...FILL} d="M42 38 L44 52 L50 54 L46 38 Z" />
    </>
  );
}

function Jellyfish() {
  return (
    <>
      <path
        {...FILL}
        d="M14 26 C14 16 22 12 32 12 C42 12 50 16 50 26 C50 32 44 36 32 36 C20 36 14 32 14 26 Z"
      />
      <path {...FILL} d="M20 36 L17 54 L23 54 L24 36 Z" />
      <path {...FILL} d="M27 36 L25 56 L31 56 L33 36 Z" />
      <path {...FILL} d="M34 36 L32 56 L38 56 L40 36 Z" />
      <path {...FILL} d="M41 36 L39 54 L45 54 L48 36 Z" />
    </>
  );
}

function Seahorse() {
  return (
    <>
      <path
        {...FILL}
        d="M42 14 C38 14 36 18 36 22 L36 28 C36 32 32 34 30 36 C28 38 26 42 24 46 C22 50 24 54 28 52 C32 50 34 46 36 44 C38 42 42 40 42 36 C42 32 40 28 38 26 C36 24 40 20 42 16 C44 14 44 14 42 14 Z"
      />
      <path
        {...FILL}
        d="M36 22 C34 18 30 18 28 22 C26 26 28 30 32 30 C34 30 36 28 36 26 Z"
      />
      <circle cx="39" cy="18" r="2.2" fill="#f8f6f1" />
    </>
  );
}

function Starfish() {
  return (
    <>
      <path
        {...FILL}
        d="M32 10 L37 24 L52 24 L40 34 L45 50 L32 40 L19 50 L24 34 L12 24 L27 24 Z"
      />
    </>
  );
}

const CREATURE_COMPONENTS: Record<TestimonialSeaCreature, () => ReactElement> =
  {
    crab: Crab,
    fish: Fish,
    octopus: Octopus,
    jellyfish: Jellyfish,
    seahorse: Seahorse,
    starfish: Starfish,
  };

export function TestimonialSeaCreatureIcon({
  creature,
  className = "h-[88%] w-[88%]",
}: {
  creature: TestimonialSeaCreature;
  className?: string;
}) {
  const Creature = CREATURE_COMPONENTS[creature];

  return (
    <svg
      viewBox="0 0 64 64"
      className={`text-[#1a2e24] ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <Creature />
    </svg>
  );
}
