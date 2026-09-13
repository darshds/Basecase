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
          Services &amp; <em>Capabilities.</em>
        </h1>

        <p className="lede reveal" style={{ animationDelay: '.18s' }}>
          Everything we build. No fluff, no lock-in, no bloat. Just results.
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
            <span className="tag">Core Capabilities</span>
            <h2 id="core-capabilities-heading" className="disp">Six Core Practices</h2>
          </div>
          <p className="band-note">
            Most projects combine several. Pick what you need.
          </p>

          <ServiceGrid isServicesPage={true} />

          {/* Capabilities Consolidation Bar */}
          <div className="capabilities-footer-bar">
            <div className="capabilities-footer-note">
              <strong>Need a multi-discipline build or combined architecture?</strong>
              <span>
                Most clients commission consolidated sprints , combining Web Development, Cloud Deployment,
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
            <span className="tag">Full Catalog</span>
            <h2 id="full-catalog-heading" className="disp">35+ Capabilities</h2>
          </div>
          <p className="band-note">
            Search or filter. Everything is delivered on our timeline, with our SLAs.
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
            <span className="tag">How We Work</span>
            <h2 id="models-heading" className="disp">Three Ways to Engage</h2>
          </div>
          <p className="band-note">
            Fixed prices. No hourly. No surprises.
          </p>

          <div className="engagement-grid" role="list" aria-label="Commercial engagement models">
            {/* Model 1 */}
            <article className="engagement-card" role="listitem">
              <span className="engagement-badge">PROJECT SPRINTS</span>
              <h3 className="engagement-h">Fixed Price</h3>
              <p className="engagement-p">
                Websites, apps, migrations. One price. Clear deadline.
              </p>
              <ul className="engagement-features" aria-label="Fixed-Price Sprint features">
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Fixed price, clear milestones</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Weekly demos, direct access</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Full code ownership, no lock-in</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>30-day warranty included</span>
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
              <span className="engagement-badge">CONTINUOUS BUILD</span>
              <h3 className="engagement-h">Monthly Retainer</h3>
              <p className="engagement-p">
                Ongoing features, DevOps, support. Dedicated capacity every month.
              </p>
              <ul className="engagement-features" aria-label="Dedicated Retainer features">
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Guaranteed monthly capacity</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Priority SLA support</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Direct Slack channel with leads</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Proactive monitoring &amp; patching</span>
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
              <span className="engagement-badge">ADVISORY</span>
              <h3 className="engagement-h">Expert Review</h3>
              <p className="engagement-p">
                Audits, due diligence, strategy. 1–3 weeks.
              </p>
              <ul className="engagement-features" aria-label="Technical Advisory features">
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Full audit &amp; security review</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>System design &amp; blueprints</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Vendor evaluation, due diligence</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Actionable roadmap</span>
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
              <span className="tag tag-invert">Let's Talk</span>
              <h2 id="services-cta-heading" className="disp cta-h">Ready to build?</h2>
              <p className="cta-p">
                Tell us what you need. Reply within 24 hours, engineer-to-engineer.
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
