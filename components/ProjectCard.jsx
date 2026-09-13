'use client';

export default function ProjectCard({ project, priority = false }) {
  const isLive = project.status === 'live';
  const cleanUrl = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <article className="project-card" id={`project-${project.id}`}>
      {/* Browser Window Frame Header */}
      <div className="pcard-browser-bar">
        <div className="pcard-dots" aria-hidden="true">
          <span className="dot-red" />
          <span className="dot-yellow" />
          <span className="dot-green" />
        </div>
        <div className="pcard-address">
          <span className="pcard-lock" aria-hidden="true">🔒</span>
          <span className="pcard-url-text">{cleanUrl}</span>
        </div>
        <div className="pcard-status-badge">
          {isLive ? (
            <span className="live-pill">
              <span className="live-dot" /> LIVE
            </span>
          ) : (
            <span className="soon-pill">
              <span className="soon-dot" /> COMING SOON
            </span>
          )}
        </div>
      </div>

      {/* Visual Canvas / Interactive Header */}
      <div 
        className="pcard-canvas"
        style={{ '--project-accent': project.accentColor }}
      >
        <div className="pcard-canvas-bg" />
        <div className="pcard-canvas-grid" aria-hidden="true" />
        
        <div className="pcard-canvas-content">
          <div className="pcard-meta-top">
            <span className="pcard-cat-tag">{project.category}</span>
            <span className="pcard-year">{project.year}</span>
          </div>

          <div className="pcard-hero-brand">
            <span className="pcard-brand-symbol">{project.title.charAt(0)}</span>
            <div className="pcard-brand-text">
              <h3 className="pcard-title">{project.title}</h3>
              <p className="pcard-client">{project.client}</p>
            </div>
          </div>
        </div>

        {/* Floating External Link Glyph */}
        <a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="pcard-quick-launch"
          title={`Open ${project.title} (${cleanUrl}) in new tab`}
          aria-label={`Open ${project.title} (${project.url})`}
        >
          <span>{cleanUrl}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </div>

      {/* Body Details */}
      <div className="pcard-body">
        <h4 className="pcard-tagline">{project.tagline}</h4>
        <p className="pcard-desc">{project.desc}</p>

        {/* Metrics or Highlights */}
        {project.metrics && (
          <div className="pcard-metrics">
            <span className="pcard-metrics-label">Deliverables:</span>
            <span className="pcard-metrics-val">{project.metrics}</span>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="pcard-stack" aria-label="Technologies used">
          {project.stack.map((tech) => (
            <span key={tech} className="pcard-pill">{tech}</span>
          ))}
        </div>

        {/* Footer Outbound Action */}
        <div className="pcard-footer">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn pcard-cta ${isLive ? '' : 'btn-ghost'}`}
          >
            <span>{isLive ? `Launch ${project.title}` : `Explore Alpha`}</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <span className="pcard-client-verified">
            {isLive ? '✓ Verified Client Production' : '⚡ In Active Staging'}
          </span>
        </div>
      </div>
    </article>
  );
}
