'use client';

import Link from 'next/link';
import { SERVICES } from '@/lib/data';
import ServiceDemo from './ServiceDemo';
import { useSnapCarousel, CarouselDots } from './SnapCarousel';

/**
 * ServiceGrid — each practice card carries a live, playable demo.
 * Grid on desktop and tablet; a swipe carousel on phones.
 */
export default function ServiceGrid({ featuredOnly = false, items, isServicesPage = false }) {
  const displayServices = items || (featuredOnly ? SERVICES.filter((s) => s.featured) : SERVICES);
  const { ref, active, onScroll, goTo } = useSnapCarousel(displayServices.length);

  return (
    <div className="svc-section-container">
      <div
        className={`svc-cards-grid${featuredOnly ? ' svc-cards-grid-featured' : ''}`}
        role="list"
        aria-label="Core capabilities"
        ref={ref}
        onScroll={onScroll}
      >
        {displayServices.map((s) => (
          <article className="svc-card" key={s.code} id={s.code} role="listitem">
            <div className="svc-card-demo">
              <span className="svc-card-try">Try it</span>
              <ServiceDemo code={s.code} />
            </div>

            <div className="svc-card-inner">
              <span className="svc-card-label">{s.title}</span>
              <h3 className="svc-card-problem">{s.problem}</h3>

              <div className="svc-card-tags" aria-label={`Stack for ${s.title}`}>
                {s.tags.map((t) => (
                  <span key={t} className="svc-card-tag">{t}</span>
                ))}
              </div>

              <div className="svc-card-footer">
                <span className="svc-card-dur">{s.dur}</span>
                {isServicesPage ? (
                  <Link className="svc-card-btn" href={`/contact?service=${encodeURIComponent(s.title)}`}>
                    <span>Get a price</span>
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
            </div>
          </article>
        ))}
      </div>

      <CarouselDots
        className="svc-pagination"
        count={displayServices.length}
        active={active}
        goTo={goTo}
        labels={displayServices.map((s) => s.title)}
      />
    </div>
  );
}
