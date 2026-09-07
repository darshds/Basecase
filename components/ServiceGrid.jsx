import Link from 'next/link';
import { SERVICES } from '@/lib/data';

/**
 * ServiceGrid — six core practices with visual number hierarchy.
 * Each card shows a large background number, service code/duration,
 * headline, description, "breaks the loop" statement, tech tags,
 * and a direct aligned action link.
 */
export default function ServiceGrid({ featuredOnly = false, items, isServicesPage = false }) {
  const displayServices = items || (featuredOnly ? SERVICES.filter((s) => s.featured) : SERVICES);

  return (
    <div className={`svc-grid${featuredOnly ? ' svc-grid-featured' : ''}`} role="list" aria-label="Core capabilities">
      {displayServices.map((s, idx) => (
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
            {s.tags.map((t) => <span key={t}>{t}</span>)}
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
      ))}
    </div>
  );
}

