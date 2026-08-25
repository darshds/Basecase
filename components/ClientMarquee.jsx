'use client';

import { PROJECTS } from '@/lib/data';

export default function ClientMarquee() {
  // Duplicate for seamless infinite loop
  const marqueeItems = [...PROJECTS, ...PROJECTS];

  return (
    <div className="marquee-wrapper" aria-label="Client projects showcase marquee">
      <div className="marquee-label">
        <span className="marquee-tag">PROVEN BUILDS</span>
      </div>
      <div className="marquee-track">
        <div className="marquee-content">
          {marqueeItems.map((p, idx) => (
            <a
              key={`${p.id}-${idx}`}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="marquee-item"
              title={`Visit ${p.title} (${p.url})`}
            >
              <span className={`marquee-status-dot ${p.status === 'live' ? 'is-live' : 'is-soon'}`} />
              <span className="marquee-title">{p.title}</span>
              <span className="marquee-sep">/</span>
              <span className="marquee-category">{p.category}</span>
              <span className="marquee-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
