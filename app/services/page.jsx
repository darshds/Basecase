import Link from 'next/link';
import ServiceGrid from '@/components/ServiceGrid';
import Catalog from '@/components/Catalog';

export const metadata = {
  title: 'Services & Practice Catalog · Basecase Tech',
  description:
    'Six core practices plus 35+ specialized engineering disciplines: web development, cloud architecture, chatbots & AI, system design, databases, DevOps, and fractional CTO consulting.',
  openGraph: {
    title: 'Services & Practice Catalog · Basecase Tech',
    description: 'Six core practices plus 35+ specialized capabilities. Fixed-price sprints or dedicated engineering retainers.',
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────────────────── */}
      <section className="wrap page-head" aria-labelledby="services-heading">
        <div className="status reveal" style={{ animationDelay: '.04s' }}>
          <span className="dot" aria-hidden="true" />
          <span className="tag">
            6 Core Practices · 35+ Catalog Disciplines · Fixed Sprints &amp; Retainers
          </span>
        </div>

        <h1 id="services-heading" className="disp page-h reveal" style={{ animationDelay: '.1s' }}>
          Full Service Catalog &amp; <em>Engineering Practices.</em>
        </h1>

        <p className="lede reveal" style={{ animationDelay: '.18s' }}>
          Everything your business needs built on code: from high-converting Next.js web applications
          and custom AI assistants to cloud migrations and scalable system architectures. Engineered
          and shipped by one elite team with zero vendor bloat.
        </p>

        {/* Studio Guarantees Bar */}
        <div className="stats-strip reveal" style={{ animationDelay: '.26s' }} role="list" aria-label="Studio engineering guarantees">
          <div className="stat-card" role="listitem">
            <div className="stat-val">&lt;24h</div>
            <div className="stat-lbl">Direct Engineer Reply</div>
          </div>
          <div className="stat-card" role="listitem">
            <div className="stat-val">100%</div>
            <div className="stat-lbl">Full Code Ownership</div>
          </div>
          <div className="stat-card" role="listitem">
            <div className="stat-val">Fixed</div>
            <div className="stat-lbl">Milestone Price Guarantees</div>
          </div>
          <div className="stat-card" role="listitem">
            <div className="stat-val">Zero</div>
            <div className="stat-lbl">Vendor Lock-In</div>
          </div>
        </div>

        {/* Services Jump Navigation */}
        <nav className="services-jump-nav reveal" style={{ animationDelay: '.32s' }} aria-label="Quick jump to service sections">
          <a className="services-jump-link" href="#capabilities">
            <span>↓ 01. Core Capabilities (6)</span>
          </a>
          <a className="services-jump-link" href="#catalog-section">
            <span>↓ 02. Practice Catalog &amp; Search (35+)</span>
          </a>
          <a className="services-jump-link" href="#engagement-models">
            <span>↓ 03. Engagement Models</span>
          </a>
          <a className="services-jump-link" href="#intake">
            <span>↓ 04. Project Intake</span>
          </a>
        </nav>
      </section>

      {/* ── Section 01: Core Capabilities ─────────────────────────── */}
      <section className="band" id="capabilities" aria-labelledby="core-capabilities-heading">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Section 01 // Core Capabilities</span>
            <h2 id="core-capabilities-heading" className="disp">Six Flagship Practices We Ship Daily</h2>
          </div>
          <p className="band-note">
            Covering the majority of client commissions. Each discipline can be scoped as an independent
            sprint or integrated into a comprehensive end-to-end digital product build.
          </p>

          <ServiceGrid isServicesPage={true} />

          {/* Capabilities Consolidation Bar */}
          <div className="capabilities-footer-bar">
            <div className="capabilities-footer-note">
              <strong>Need a multi-discipline build or combined architecture?</strong>
              <span>
                Most clients commission consolidated sprints — combining Web Development, Cloud Deployment,
                and Technical SEO under a single fixed-price engagement.
              </span>
            </div>
            <div className="capabilities-footer-actions">
              <Link className="btn btn-primary" href="/contact">
                <span>Scope a Consolidated Sprint</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
              <a className="btn btn-ghost" href="#catalog-section">
                <span>Explore 35+ Other Practices</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 02: Full Catalog ──────────────────────────────── */}
      <section className="band" id="catalog-section" aria-labelledby="full-catalog-heading">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Section 02 // Full Engineering Taxonomy</span>
            <h2 id="full-catalog-heading" className="disp">Interactive Practice Catalog &amp; Specialties</h2>
          </div>
          <p className="band-note">
            Search or filter across 35+ specialized capabilities spanning Build, Run &amp; Support, Data &amp; AI,
            Security, Growth, and Advisory. Every practice is deliverable under our standard engineering SLAs.
          </p>

          <Catalog />

          <div className="showcase-footer-link" style={{ marginTop: 40 }}>
            <Link className="btn btn-primary" href="/contact">
              <span>Commission Custom Engineering</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
            <Link className="btn btn-ghost" href="/work">
              <span>View Shipped Client Builds</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 03: Engagement Models ─────────────────────────── */}
      <section className="band" id="engagement-models" aria-labelledby="models-heading">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Section 03 // Commercial Models</span>
            <h2 id="models-heading" className="disp">Transparent Engagement Structures</h2>
          </div>
          <p className="band-note">
            No ambiguous billable hours or vendor sprawl. Three predictable commercial structures designed
            for agility, accountability, and pristine code quality.
          </p>

          <div className="engagement-grid" role="list" aria-label="Commercial engagement models">
            {/* Model 1 */}
            <article className="engagement-card" role="listitem">
              <span className="engagement-badge">MODEL-01 // PROJECT SPRINTS</span>
              <h3 className="engagement-h">Fixed-Price Sprints</h3>
              <p className="engagement-p">
                Ideal for new marketing websites, web applications, e-commerce stores, cloud migrations,
                and standalone feature launches.
              </p>
              <ul className="engagement-features" aria-label="Fixed-Price Sprint features">
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Guaranteed fixed price with explicit deliverables &amp; milestones</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Weekly staging previews &amp; direct engineering demos</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Complete source code handover with zero vendor lock-in</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>30-day post-launch warranty &amp; regression bug fixes</span>
                </li>
              </ul>
              <div className="engagement-footer">
                <span className="engagement-dur">Typical Timeline: 2 to 8 Weeks</span>
                <Link className="btn" href="/contact?model=sprint">
                  <span>Scope a Sprint</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </div>
            </article>

            {/* Model 2 */}
            <article className="engagement-card" role="listitem">
              <span className="engagement-badge">MODEL-02 // CONTINUOUS BUILD</span>
              <h3 className="engagement-h">Dedicated Retainer</h3>
              <p className="engagement-p">
                Ideal for scaling companies requiring continuous feature velocity, ongoing DevOps infrastructure,
                performance optimization, and 24/7 reliability.
              </p>
              <ul className="engagement-features" aria-label="Dedicated Retainer features">
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Guaranteed monthly senior engineering capacity &amp; sprints</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Priority SLA turnaround times for urgent production tickets</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Direct Slack / Teams communication channel with tech leads</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Proactive security patching, backups &amp; uptime monitoring</span>
                </li>
              </ul>
              <div className="engagement-footer">
                <span className="engagement-dur">Model: Monthly Recurring · Cancel Anytime</span>
                <Link className="btn" href="/contact?model=retainer">
                  <span>Inquire About Retainers</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </div>
            </article>

            {/* Model 3 */}
            <article className="engagement-card" role="listitem">
              <span className="engagement-badge">MODEL-03 // CONSULTATIVE</span>
              <h3 className="engagement-h">Technical Advisory</h3>
              <p className="engagement-p">
                Ideal for businesses untangling legacy code, evaluating vendors, preparing for technical due
                diligence, or needing fractional CTO oversight.
              </p>
              <ul className="engagement-features" aria-label="Technical Advisory features">
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Comprehensive codebase audit, security review &amp; cloud cost analysis</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>System design blueprints &amp; written technical decision records</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Vendor selection &amp; external technical due diligence reports</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Actionable execution roadmap your internal developers can run</span>
                </li>
              </ul>
              <div className="engagement-footer">
                <span className="engagement-dur">Typical Timeline: 1 to 3 Weeks</span>
                <Link className="btn" href="/contact?model=advisory">
                  <span>Book Advisory Session</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── Section 04: Project Intake CTA ────────────────────────── */}
      <section className="band" id="intake" aria-labelledby="services-cta-heading">
        <div className="wrap">
          <div className="cta">
            <div className="cta-left">
              <span className="tag tag-invert">Section 04 // Project Intake</span>
              <h2 id="services-cta-heading" className="disp cta-h">Ready to get started?</h2>
              <p className="cta-p">
                Tell us what you&apos;re building or fixing. Rough answers are fine. Direct technical reply from our senior engineering team within one business day.
              </p>
              <div className="cta-reassurances">
                <span className="cta-reassurance-item">✓ Strict NDA Protection</span>
                <span className="cta-reassurance-item">✓ Senior Engineers Only</span>
                <span className="cta-reassurance-item">✓ Fixed-Price Milestones</span>
              </div>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-invert" href="/contact">
                <span>Start a Project</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
              <Link className="btn btn-ghost cta-secondary-btn" href="/work">
                <span>Explore Client Work (8 Builds)</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
