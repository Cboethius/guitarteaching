"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/context";
import {
  TESTIMONIAL_CARD_STEP_PX,
  type Testimonial,
  type TestimonialSeaCreature,
} from "@/lib/testimonials";
import {
  TestimonialSeaCreatureIcon,
  testimonialSeaCreatureForIndex,
} from "@/components/TestimonialSeaCreatureIcon";

const AUTO_SCROLL_PX_PER_SECOND = 15;
const LOOP_COPIES = 3;
/** Below this count, show each testimonial once (no infinite-loop clones). */
const MARQUEE_MIN_COUNT = 4;

type OpenCard = { item: Testimonial; key: string };

function indexFromScroll(scrollLeft: number, count: number) {
  const step = TESTIMONIAL_CARD_STEP_PX;
  return ((Math.round(scrollLeft / step) % count) + count) % count;
}

function normalizeLoopScroll(el: HTMLDivElement, count: number) {
  const loopWidth = TESTIMONIAL_CARD_STEP_PX * count;
  if (loopWidth <= 0) return;
  if (el.scrollLeft >= loopWidth * 2) {
    el.scrollLeft -= loopWidth;
  } else if (el.scrollLeft < loopWidth * 0.5) {
    el.scrollLeft += loopWidth;
  }
}

function localizedText(item: Testimonial, locale: "de" | "en") {
  return {
    quote: locale === "de" ? item.quoteDe : item.quoteEn,
    context: locale === "de" ? item.contextDe : item.contextEn,
  };
}

function seaCreatureForItem(
  item: Testimonial,
  index: number,
): TestimonialSeaCreature {
  if (item.seaCreature) return item.seaCreature;
  return testimonialSeaCreatureForIndex(index);
}

function StarRating({
  rating,
  label,
  large = false,
}: {
  rating: number;
  label: string;
  large?: boolean;
}) {
  const stars = Math.min(5, Math.max(1, Math.round(rating)));

  return (
    <div
      className={`flex shrink-0 gap-0.5 leading-none ${large ? "text-base" : "text-[11px]"}`}
      role="img"
      aria-label={label.replace("{rating}", String(stars))}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i < stars ? "text-clay" : "text-pastel/90"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCardContent({
  item,
  itemIndex,
  quote,
  context,
  starsLabel,
  size,
}: {
  item: Testimonial;
  itemIndex: number;
  quote: string;
  context: string;
  starsLabel: string;
  size: "slide" | "modal";
}) {
  const large = size === "modal";
  const iconClass = large ? "h-14 w-14" : "h-11 w-11";

  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div
          className={`border-forest/20 relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border bg-cream ${iconClass}`}
        >
          <TestimonialSeaCreatureIcon creature={seaCreatureForItem(item, itemIndex)} />
        </div>
        <StarRating rating={item.rating} label={starsLabel} large={large} />
      </div>

      <blockquote
        className={`text-forest/85 mt-3 min-h-0 flex-1 leading-relaxed ${large ? "overflow-y-auto text-sm" : "text-xs"}`}
      >
        <p className={large ? "" : "line-clamp-7 overflow-hidden"}>{quote}</p>
      </blockquote>

      <figcaption className="mt-3 shrink-0 border-pastel border-t pt-2.5">
        <p className={large ? "text-base font-semibold" : "text-xs font-semibold"}>
          {item.author}
        </p>
        <p
          className={`text-forest/60 mt-0.5 leading-snug ${large ? "text-sm" : "text-[11px]"}`}
        >
          {context}
        </p>
      </figcaption>
    </>
  );
}

function TestimonialSlideCard({
  item,
  itemIndex,
  quote,
  context,
  starsLabel,
  hidden,
  onOpen,
}: {
  item: Testimonial;
  itemIndex: number;
  quote: string;
  context: string;
  starsLabel: string;
  hidden?: boolean;
  onOpen: (el: HTMLElement) => void;
}) {
  return (
    <figure
      role="button"
      tabIndex={0}
      onClick={(e) => onOpen(e.currentTarget)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(e.currentTarget);
        }
      }}
      className={`border-pastel flex h-[12rem] w-[8.8rem] shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl border bg-white p-[0.7rem] shadow-sm select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ${
        hidden ? "invisible" : ""
      }`}
    >
      <TestimonialCardContent
        item={item}
        itemIndex={itemIndex}
        quote={quote}
        context={context}
        starsLabel={starsLabel}
        size="slide"
      />
    </figure>
  );
}

function TestimonialModal({
  item,
  itemIndex,
  onClose,
}: {
  item: Testimonial;
  itemIndex: number;
  onClose: () => void;
}) {
  const { locale, t } = useLocale();
  const { quote, context } = localizedText(item, locale);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <figure
      role="dialog"
      aria-modal="true"
      aria-label={item.author}
      tabIndex={0}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClose();
        }
      }}
      className="testimonial-modal-pop border-pastel absolute inset-y-2 left-1/2 z-40 flex w-[17.6rem] max-w-[calc(100%-2rem)] cursor-pointer flex-col overflow-hidden rounded-xl border bg-white p-4 shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 sm:p-[1.2rem]"
    >
      <TestimonialCardContent
        item={item}
        itemIndex={itemIndex}
        quote={quote}
        context={context}
        starsLabel={t.testimonials.starsLabel}
        size="modal"
      />
    </figure>
  );
}

export function TestimonialsSlider() {
  const { locale, t } = useLocale();
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openCard, setOpenCard] = useState<OpenCard | null>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => (res.ok ? res.json() : { testimonials: [] }))
      .then((data: { testimonials?: Testimonial[] }) => {
        setTestimonials(data.testimonials ?? []);
      })
      .catch(() => setTestimonials([]))
      .finally(() => setLoaded(true));
  }, []);

  const count = testimonials.length;
  const isMarquee = count >= MARQUEE_MIN_COUNT;
  const isCarousel = count > 1 && count < MARQUEE_MIN_COUNT;
  const loopItems = isMarquee
    ? Array.from({ length: LOOP_COPIES }, () => testimonials).flat()
    : testimonials;

  const syncActiveIndex = useCallback(
    (scrollLeft: number) => {
      if (count === 0) return;
      setActiveIndex(indexFromScroll(scrollLeft, count));
    },
    [count],
  );

  const centerCard = useCallback(
    (cardEl: HTMLElement) => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track) return;

      if (isMarquee && viewport) {
        const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2;
        track.scrollTo({
          left: cardCenter - viewport.clientWidth / 2,
          behavior: "smooth",
        });
        return;
      }

      cardEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    },
    [isMarquee],
  );

  const closeModal = useCallback(() => setOpenCard(null), []);

  const handleCardOpen = useCallback(
    (key: string, el: HTMLElement, item: Testimonial) => {
      centerCard(el);
      setOpenCard({ item, key });
    },
    [centerCard],
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;

      closeModal();
      const normalized = ((index % count) + count) % count;
      setActiveIndex(normalized);

      if (isMarquee) {
        const offsetInSet = indexFromScroll(el.scrollLeft, count);
        const delta = normalized - offsetInSet;

        el.scrollTo({
          left: el.scrollLeft + delta * TESTIMONIAL_CARD_STEP_PX,
          behavior: "smooth",
        });
        window.setTimeout(() => {
          if (trackRef.current) normalizeLoopScroll(trackRef.current, count);
        }, 350);
        return;
      }

      if (isCarousel) {
        const card = el.children.item(normalized);
        if (card instanceof HTMLElement) {
          card.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        }
      }
    },
    [count, isMarquee, isCarousel, closeModal],
  );

  useEffect(() => {
    if (!openCard) return;

    const onPointerDown = (e: PointerEvent) => {
      const slider = viewportRef.current;
      if (slider && !slider.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openCard, closeModal]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !isMarquee) return;
    el.scrollLeft = TESTIMONIAL_CARD_STEP_PX * count;
    syncActiveIndex(el.scrollLeft);
  }, [count, isMarquee, syncActiveIndex]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !isMarquee) return;

    const onScroll = () => {
      normalizeLoopScroll(el, count);
      syncActiveIndex(el.scrollLeft);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count, isMarquee, syncActiveIndex]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !isCarousel) return;

    const onScroll = () => syncActiveIndex(el.scrollLeft);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count, isCarousel, syncActiveIndex]);

  useEffect(() => {
    if (!isMarquee || openCard) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;
    let lastTime = 0;

    const tick = (time: number) => {
      const el = trackRef.current;
      if (el) {
        if (lastTime > 0) {
          const deltaSeconds = Math.min((time - lastTime) / 1000, 0.1);
          el.scrollLeft += AUTO_SCROLL_PX_PER_SECOND * deltaSeconds;
          normalizeLoopScroll(el, count);
          syncActiveIndex(el.scrollLeft);
        }
        lastTime = time;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [count, isMarquee, syncActiveIndex, openCard]);

  if (!loaded || count === 0) return null;

  const itemIndexFor = (item: Testimonial) =>
    testimonials.findIndex((entry) => entry.id === item.id);

  const renderSlideCard = (item: Testimonial, key: string) => {
    const { quote, context } = localizedText(item, locale);
    const itemIndex = itemIndexFor(item);

    return (
      <TestimonialSlideCard
        key={key}
        item={item}
        itemIndex={itemIndex >= 0 ? itemIndex : 0}
        quote={quote}
        context={context}
        starsLabel={t.testimonials.starsLabel}
        hidden={openCard?.key === key}
        onOpen={(el) => handleCardOpen(key, el, item)}
      />
    );
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      aria-roledescription={isMarquee || isCarousel ? "carousel" : undefined}
      className="scroll-mt-24 overflow-x-hidden overflow-y-visible"
    >
      <div className="bg-forest text-cream border-pastel/25 border-b">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center sm:px-6 sm:py-8">
          <h2
            id="testimonials-heading"
            className="text-3xl font-semibold sm:text-4xl"
          >
            {t.testimonials.title}
          </h2>
          <p className="text-cream/85 mx-auto mt-3 max-w-md text-base leading-relaxed">
            {t.testimonials.subtitle}
          </p>
        </div>
      </div>

      <div className="border-pastel bg-cream border-b py-8 sm:py-10">
        <div
          ref={viewportRef}
          className={`testimonial-marquee-viewport relative min-h-[13.2rem] w-full min-w-0 overflow-x-hidden overflow-y-hidden py-2 ${
            !isMarquee ? "testimonial-marquee-viewport--single" : ""
          }`}
        >
          {isMarquee ? (
            <div
              ref={trackRef}
              className={`testimonial-track flex h-[12rem] w-full max-w-full items-center gap-[0.8rem] overflow-y-hidden ${
                openCard ? "overflow-x-hidden" : "overflow-x-auto"
              }`}
              aria-live="polite"
            >
              {loopItems.map((item, i) =>
                renderSlideCard(item, `${item.id}-${i}`),
              )}
            </div>
          ) : isCarousel ? (
            <div
              ref={trackRef}
              className="testimonial-track flex h-[12rem] w-full max-w-full snap-x snap-mandatory items-center justify-center gap-[0.8rem] overflow-x-auto overflow-y-hidden scroll-smooth px-4 sm:px-0"
              aria-live="polite"
            >
              {testimonials.map((item) => renderSlideCard(item, item.id))}
            </div>
          ) : (
            <div className="flex h-[12rem] w-full items-center justify-center">
              {renderSlideCard(testimonials[0], testimonials[0].id)}
            </div>
          )}

          {openCard && (
            <TestimonialModal
              item={openCard.item}
              itemIndex={Math.max(0, itemIndexFor(openCard.item))}
              onClose={closeModal}
            />
          )}
        </div>

        {(isMarquee || isCarousel) && (
          <div
            className="mx-auto mt-4 flex h-2 max-w-6xl items-center justify-center gap-1.5 px-4 sm:px-6"
            role="tablist"
            aria-label={t.testimonials.listLabel}
          >
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={t.testimonials.goTo.replace("{n}", String(i + 1))}
                onClick={() => scrollToIndex(i)}
                className={`h-2 w-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ${
                  i === activeIndex
                    ? "bg-forest"
                    : "bg-pastel hover:bg-pastel/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
