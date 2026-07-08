"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

function indexFromScroll(scrollLeft: number, count: number, step = TESTIMONIAL_CARD_STEP_PX) {
  return ((Math.round(scrollLeft / step) % count) + count) % count;
}

function measureCardStep(track: HTMLDivElement) {
  const second = track.children.item(1);
  const first = track.children.item(0);
  if (first instanceof HTMLElement && second instanceof HTMLElement) {
    const measured = second.offsetLeft - first.offsetLeft;
    if (measured > 0) return measured;
  }
  return TESTIMONIAL_CARD_STEP_PX;
}

function normalizeLoopScroll(
  scrollEl: HTMLDivElement,
  track: HTMLDivElement,
  count: number,
) {
  const step = measureCardStep(track);
  const loopWidth = step * count;
  if (loopWidth <= 0) return step;

  if (scrollEl.scrollLeft >= loopWidth * 2) {
    scrollEl.scrollLeft -= loopWidth;
  } else if (scrollEl.scrollLeft < loopWidth * 0.5) {
    scrollEl.scrollLeft += loopWidth;
  }

  const maxScroll = Math.max(0, scrollEl.scrollWidth - scrollEl.clientWidth);
  if (scrollEl.scrollLeft > maxScroll) {
    scrollEl.scrollLeft = maxScroll;
  }
  if (scrollEl.scrollLeft < 0) {
    scrollEl.scrollLeft = 0;
  }

  return step;
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
  exampleLabel,
  size,
}: {
  item: Testimonial;
  itemIndex: number;
  quote: string;
  context: string;
  starsLabel: string;
  exampleLabel?: string;
  size: "slide" | "modal";
}) {
  const large = size === "modal";
  const iconClass = large ? "h-14 w-14" : "h-11 w-11";

  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-2">
          <div
            className={`border-forest/20 relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border bg-cream ${iconClass}`}
          >
            <TestimonialSeaCreatureIcon creature={seaCreatureForItem(item, itemIndex)} />
          </div>
          {item.isExample && exampleLabel ? (
            <span className="bg-pastel-light/80 text-forest/70 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
              {exampleLabel}
            </span>
          ) : null}
        </div>
        <StarRating rating={item.rating} label={starsLabel} large={large} />
      </div>

      <blockquote
        className={`text-forest/85 mt-3 min-h-0 flex-1 leading-relaxed ${large ? "overflow-y-auto text-sm sm:text-base" : "overflow-hidden text-xs"}`}
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
  exampleLabel,
  hidden,
  snap,
  onOpen,
}: {
  item: Testimonial;
  itemIndex: number;
  quote: string;
  context: string;
  starsLabel: string;
  exampleLabel?: string;
  hidden?: boolean;
  snap?: boolean;
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
      className={`border-pastel flex h-[12.5rem] w-[9rem] shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl border bg-white p-[0.7rem] transition-shadow duration-200 hover:shadow-sm select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ${
        snap ? "snap-center" : ""
      } ${hidden ? "invisible" : ""}`}
    >
      <TestimonialCardContent
        item={item}
        itemIndex={itemIndex}
        quote={quote}
        context={context}
        starsLabel={starsLabel}
        exampleLabel={exampleLabel}
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

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <button
        type="button"
        aria-label="Close"
        className="fixed inset-0 z-40 bg-forest/25"
        onClick={onClose}
      />
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
        className="testimonial-modal-pop-center border-pastel fixed top-1/2 left-1/2 z-50 flex max-h-[min(32rem,85vh)] w-[min(calc(100vw-2rem),22rem)] cursor-pointer flex-col overflow-hidden rounded-xl border bg-white p-5 shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 sm:p-6"
      >
        <TestimonialCardContent
          item={item}
          itemIndex={itemIndex}
          quote={quote}
          context={context}
          starsLabel={t.testimonials.starsLabel}
          exampleLabel={t.testimonials.exampleLabel}
          size="modal"
        />
      </figure>
    </>,
    document.body,
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
  const userScrollingRef = useRef(false);
  const [touchPrimary, setTouchPrimary] = useState(false);

  const getScrollEl = useCallback(
    () => viewportRef.current,
    [],
  );

  const getTrackEl = useCallback(() => trackRef.current, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setTouchPrimary(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
    (scrollLeft: number, step?: number) => {
      if (count === 0) return;
      setActiveIndex(indexFromScroll(scrollLeft, count, step));
    },
    [count],
  );

  const handleMarqueeScroll = useCallback(() => {
    const scrollEl = getScrollEl();
    const track = getTrackEl();
    if (!scrollEl || !track) return;

    const step = measureCardStep(track);
    syncActiveIndex(scrollEl.scrollLeft, step);
  }, [getScrollEl, getTrackEl, syncActiveIndex]);

  const handleMarqueeScrollEnd = useCallback(() => {
    const scrollEl = getScrollEl();
    const track = getTrackEl();
    if (!scrollEl || !track) return;

    const step = normalizeLoopScroll(scrollEl, track, count);
    syncActiveIndex(scrollEl.scrollLeft, step);

    const visibleCards = Array.from(track.children).filter((child) => {
      if (!(child instanceof HTMLElement)) return false;
      const left = child.offsetLeft - scrollEl.scrollLeft;
      const right = left + child.offsetWidth;
      return right > 0 && left < scrollEl.clientWidth;
    }).length;

    if (visibleCards === 0 && track.children.length > 0) {
      scrollEl.scrollLeft = step * count;
    }

    userScrollingRef.current = false;
  }, [count, getScrollEl, getTrackEl, syncActiveIndex]);

  const centerCard = useCallback(
    (cardEl: HTMLElement) => {
      const scrollEl = getScrollEl();
      const track = getTrackEl();
      if (!scrollEl || !track) return;

      if (isMarquee) {
        const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2;
        scrollEl.scrollTo({
          left: cardCenter - scrollEl.clientWidth / 2,
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
    [isMarquee, getScrollEl, getTrackEl],
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
      const scrollEl = getScrollEl();
      const track = getTrackEl();
      if (!scrollEl || !track) return;

      closeModal();
      const normalized = ((index % count) + count) % count;
      setActiveIndex(normalized);

      if (isMarquee) {
        const step = measureCardStep(track);
        const offsetInSet = indexFromScroll(scrollEl.scrollLeft, count, step);
        const delta = normalized - offsetInSet;

        scrollEl.scrollTo({
          left: scrollEl.scrollLeft + delta * step,
          behavior: "smooth",
        });
        window.setTimeout(() => {
          const el = getScrollEl();
          const inner = getTrackEl();
          if (el && inner) normalizeLoopScroll(el, inner, count);
        }, 350);
        return;
      }

      if (isCarousel) {
        const card = track.children.item(normalized);
        if (card instanceof HTMLElement) {
          card.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        }
      }
    },
    [count, isMarquee, isCarousel, closeModal, getScrollEl, getTrackEl],
  );

  useEffect(() => {
    const scrollEl = getScrollEl();
    const track = getTrackEl();
    if (!scrollEl || !track || !isMarquee) return;

    const step = measureCardStep(track);
    scrollEl.scrollLeft = step * count;
    syncActiveIndex(scrollEl.scrollLeft, step);
  }, [count, isMarquee, syncActiveIndex, getScrollEl, getTrackEl, loaded]);

  useEffect(() => {
    const scrollEl = getScrollEl();
    if (!scrollEl || !isMarquee) return;

    let scrollEndTimer: number | null = null;
    const onScrollWithFallback = () => {
      handleMarqueeScroll();
      userScrollingRef.current = true;
      if (scrollEndTimer !== null) window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(handleMarqueeScrollEnd, 120);
    };

    scrollEl.addEventListener("scroll", onScrollWithFallback, { passive: true });
    scrollEl.addEventListener("scrollend", handleMarqueeScrollEnd, { passive: true });

    return () => {
      scrollEl.removeEventListener("scroll", onScrollWithFallback);
      scrollEl.removeEventListener("scrollend", handleMarqueeScrollEnd);
      if (scrollEndTimer !== null) window.clearTimeout(scrollEndTimer);
    };
  }, [isMarquee, handleMarqueeScroll, handleMarqueeScrollEnd, getScrollEl]);

  useEffect(() => {
    const scrollEl = getScrollEl();
    if (!scrollEl || !isMarquee) return;

    const pauseAutoScroll = () => {
      userScrollingRef.current = true;
    };

    scrollEl.addEventListener("touchstart", pauseAutoScroll, { passive: true });
    scrollEl.addEventListener("pointerdown", pauseAutoScroll, { passive: true });
    return () => {
      scrollEl.removeEventListener("touchstart", pauseAutoScroll);
      scrollEl.removeEventListener("pointerdown", pauseAutoScroll);
    };
  }, [isMarquee, getScrollEl]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !isCarousel) return;

    const onScroll = () => syncActiveIndex(el.scrollLeft);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count, isCarousel, syncActiveIndex]);

  useEffect(() => {
    if (!isMarquee || openCard || touchPrimary) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;
    let lastTime = 0;

    const tick = (time: number) => {
      const scrollEl = getScrollEl();
      const track = getTrackEl();
      if (scrollEl && track && !userScrollingRef.current) {
        if (lastTime > 0) {
          const deltaSeconds = Math.min((time - lastTime) / 1000, 0.1);
          scrollEl.scrollLeft += AUTO_SCROLL_PX_PER_SECOND * deltaSeconds;
          const step = normalizeLoopScroll(scrollEl, track, count);
          syncActiveIndex(scrollEl.scrollLeft, step);
        }
        lastTime = time;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [count, isMarquee, syncActiveIndex, openCard, getScrollEl, getTrackEl, touchPrimary]);

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
        exampleLabel={t.testimonials.exampleLabel}
        snap={isMarquee && touchPrimary}
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
        <div className="mx-auto max-w-6xl px-4 py-2.5 text-center sm:px-6 sm:py-3">
          <h2
            id="testimonials-heading"
            className="text-lg font-semibold tracking-tight sm:text-xl"
          >
            {t.testimonials.title}
          </h2>
        </div>
      </div>

      <div className="border-pastel bg-cream border-b py-8 sm:py-10">
        <div
          ref={viewportRef}
          className={`testimonial-marquee-viewport relative mx-auto min-h-[13.2rem] w-full min-w-0 max-w-[calc(4*(8.8rem+0.8rem)-0.8rem)] overflow-y-hidden py-2 ${
            isMarquee
              ? `testimonial-track overflow-x-auto ${touchPrimary ? "snap-x snap-mandatory" : ""}`
              : "overflow-x-hidden"
          } ${!isMarquee ? "testimonial-marquee-viewport--single" : ""} ${
            openCard ? "overflow-x-hidden" : ""
          }`}
        >
          {isMarquee ? (
            <div
              ref={trackRef}
              className="testimonial-track flex h-[12rem] w-max min-w-full items-center gap-[0.8rem]"
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
