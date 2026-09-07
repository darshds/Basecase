'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/data';

/**
 * ServiceGrid — core practices, clean card design.
 * Desktop: grid layout. Mobile: horizontal swipe carousel.
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
      <article className="svc-card" key={s.code} id={s.code} role="listitem">
        {/* Top meta row: code pill + duration */}
        <div className="svc-card-meta">
          <span className="svc-card-code">{s.code}</span>
          <span className="svc-card-dur">{s.dur}</span>
        </div>

        {/* Service name */}
        <h3 className="svc-card-title">{s.title}</h3>

        {/* Description */}
        <p className="svc-card-desc">{s.desc}</p>

        {/* Loop breaker insight */}
        <div className="svc-card-insight">
          <span className="svc-card-insight-icon" aria-hidden="true">↻</span>
          <span>{s.loop.replace('Breaks the loop: ', '')}</span>
        </div>

        {/* Technology tags */}
        <div className="svc-card-tags" aria-label={`Technologies for ${s.title}`}>
          {s.tags.map((t) => (
            <span key={t} className="svc-card-tag">{t}</span>
          ))}
        </div>

        {/* Card CTA */}
        <div className="svc-card-action">
          {isServicesPage ? (
            <Link className="svc-card-btn" href={`/contact?service=${encodeURIComponent(s.title)}`}>
              <span>Scope this practice</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          ) : (
            <Link className="svc-card-btn" href={`/services#${s.code}`}>
              <span>Learn more</span>
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
      {/* Desktop Grid */}
      <div
        className={`svc-cards-grid${featuredOnly ? ' svc-cards-grid-featured' : ''}`}
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
