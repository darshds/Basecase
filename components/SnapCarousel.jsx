'use client';

import { useState, useRef, useCallback } from 'react';

function stepOf(el) {
  const first = el.firstElementChild;
  if (!first) return 1;
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
  return first.getBoundingClientRect().width + gap;
}

/** Tracks the active slide of a scroll-snap row that only becomes a carousel on small screens. */
export function useSnapCarousel(count) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / stepOf(el));
    setActive(Math.min(count - 1, Math.max(0, idx)));
  }, [count]);

  const goTo = useCallback((i) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: i * stepOf(el), behavior: 'smooth' });
  }, []);

  return { ref, active, onScroll, goTo };
}

export function CarouselDots({ count, active, goTo, className = '', labels = [] }) {
  if (count < 2) return null;
  return (
    <div className={`carousel-pagination ${className}`} role="tablist" aria-label="Slides">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={active === i}
          aria-label={labels[i] ? `Go to ${labels[i]}` : `Go to slide ${i + 1}`}
          className={`carousel-dot${active === i ? ' is-active' : ''}`}
          onClick={() => goTo(i)}
        />
      ))}
    </div>
  );
}
