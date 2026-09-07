'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/data';

/**
 * ServiceGrid , core practices with visual number hierarchy.
 * - Desktop/Laptop: Grid layout
 * - Mobile/Phone view: Horizontal swipe carousel with snap points & pagination dots
 */
export default function ServiceGrid({ featuredOnly = false, items, isServicesPage = false }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const displayServices = items || (featuredOnly ? SERVICES.filter((s) => s.featured) : SERVICES);

  const handleScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 14 : 1;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveSlide(Math.min(idx, displayServices.length - 1));
  }, [displayServices.length]);

  function scrollToSlide(idx) {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 14 : 0;
    el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    setActiveSlide(idx);
  }

  function renderCard(s, idx) {
    return (
      <article className="svc" key={s.code} id={s.code} role="listitem">
        {/* Large background number for visual hierarchy */}
        <div className="svc-num" aria-hidden="true">
          {String(idx + 1).padStart(2, '0')}
        </div>

        {/* Service code + duration */}
        <div className="svc-id">
          <span>{s.code}</span>
          <i>{s.dur}</i>
        </div>

        {/* Service name */}
        <h3>{s.title}</h3>

        {/* Description */}
        <p>{s.desc}</p>

        {/* Loop breaker statement */}
        <p className="svc-loop">{s.loop}</p>

        {/* Technology / tools */}
        <div className="stack" aria-label={`Technologies for ${s.title}`}>
          {s.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        {/* Aligned Card Action */}
        <div className="svc-card-action">
          {isServicesPage ? (
            <Link className="svc-btn" href={`/contact?service=${encodeURIComponent(s.title)}`}>
              <span>Scope {s.title}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          ) : (
            <Link className="svc-btn" href={`/services#${s.code}`}>
              <span>Explore {s.title}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </article>
    );
  }

  return (
    <div className="svc-section-container">
      {/* Desktop Grid Layout */}
      <div
        className={`svc-grid svc-grid-desktop${featuredOnly ? ' svc-grid-featured' : ''}`}
        role="list"
        aria-label="Core capabilities grid"
      >
        {displayServices.map((s, idx) => renderCard(s, idx))}
      </div>

      {/* Mobile Swipe Carousel */}
      <div className="svc-carousel-wrap" aria-label="Services carousel">
        <div
          className="svc-carousel"
          ref={carouselRef}
          onScroll={handleScroll}
          aria-label={`${displayServices.length} practices, swipe to browse`}
          tabIndex={0}
        >
          {displayServices.map((s, idx) => renderCard(s, idx))}
        </div>

        {/* Carousel Pagination Indicator */}
        {displayServices.length > 1 && (
          <div className="carousel-pagination svc-pagination" role="tablist" aria-label="Services carousel navigation">
            {displayServices.map((s, idx) => (
              <button
                key={s.code}
                type="button"
                role="tab"
                aria-selected={activeSlide === idx}
                aria-label={`Go to service ${idx + 1}: ${s.title}`}
                className={`carousel-dot${activeSlide === idx ? ' is-active' : ''}`}
                onClick={() => scrollToSlide(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

