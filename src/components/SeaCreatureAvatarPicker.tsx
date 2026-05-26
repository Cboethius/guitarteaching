"use client";

import { TestimonialSeaCreatureIcon } from "@/components/TestimonialSeaCreatureIcon";
import {
  TESTIMONIAL_SEA_CREATURES,
  type TestimonialSeaCreature,
} from "@/lib/testimonials";

type SeaCreatureAvatarPickerProps = {
  value: TestimonialSeaCreature;
  onChange: (creature: TestimonialSeaCreature) => void;
  labels: Record<TestimonialSeaCreature, string>;
  legend: string;
  hint?: string;
};

export function SeaCreatureAvatarPicker({
  value,
  onChange,
  labels,
  legend,
  hint,
}: SeaCreatureAvatarPickerProps) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      {hint && (
        <p className="text-forest/60 mt-1 text-xs leading-relaxed">{hint}</p>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {TESTIMONIAL_SEA_CREATURES.map((creature) => {
          const selected = value === creature;
          return (
            <button
              key={creature}
              type="button"
              onClick={() => onChange(creature)}
              aria-pressed={selected}
              aria-label={labels[creature]}
              className={`border-pastel flex h-12 w-12 items-center justify-center rounded-full border bg-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ${
                selected
                  ? "border-forest bg-pastel-light/50 ring-2 ring-forest/20"
                  : "hover:border-forest/40"
              }`}
            >
              <TestimonialSeaCreatureIcon
                creature={creature}
                className="h-8 w-8"
              />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
