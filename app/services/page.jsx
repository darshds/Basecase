import Link from 'next/link';
import ServiceGrid from '@/components/ServiceGrid';
import Catalog from '@/components/Catalog';

export const metadata = {
  title: 'Services · Basecase Tech',
  description:
    'Websites, getting found on Google, AI assistants, hosting that survives a rush, and 35+ other things we build. Fixed prices, no lock-in.',
  openGraph: {
    title: 'Services · Basecase Tech',
    description: 'Six things we do most, plus 35+ others. Fixed prices, no lock-in.',
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
            6 main services · 35+ specialties · Fixed prices
          </span>
        </div>

        <h1 id="services-heading" className="disp page-h reveal" style={{ animationDelay: '.1s' }}>
          What we <em>build.</em>
        </h1>

        <p className="lede reveal" style={{ animationDelay: '.18s' }}>
          Six things we do most, plus everything else. Try each one below.
        </p>

        {/* Studio Guarantees Bar */}
        <div className="stats-strip reveal" style={{ animationDelay: '.26s' }} role="list" aria-label="Studio engineering guarantees">
          <div className="stat-card" role="listitem">
            <div className="stat-val">&lt;24h</div>
            <div className="stat-lbl">We reply within a day</div>
          </div>
          <div className="stat-card" role="listitem">
            <div className="stat-val">100%</div>
            <div className="stat-lbl">You own everything we build</div>
          </div>
          <div className="stat-card" role="listitem">
            <div className="stat-val">Fixed</div>
            <div className="stat-lbl">Price agreed before we start</div>
          </div>
          <div className="stat-card" role="listitem">
            <div className="stat-val">Zero</div>
            <div className="stat-lbl">You can leave any time</div>
          </div>
        </div>

        {/* Services Jump Navigation */}
        <nav className="services-jump-nav reveal" style={{ animationDelay: '.32s' }} aria-label="Quick jump to service sections">
          <a className="services-jump-link" href="#capabilities">
            <span>↓ What we do</span>
          </a>
          <a className="services-jump-link" href="#catalog-section">
            <span>↓ Full list</span>
          </a>
          <a className="services-jump-link" href="#engagement-models">
            <span>↓ How we charge</span>
          </a>
          <a className="services-jump-link" href="#intake">
            <span>↓ Get a quote</span>
          </a>
        </nav>
      </section>

      {/* ── Section 01: Core Capabilities ─────────────────────────── */}
      <section className="band" id="capabilities" aria-labelledby="core-capabilities-heading">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">What we do</span>
            <h2 id="core-capabilities-heading" className="disp">Six things we do most</h2>
          </div>
          <p className="band-note">
            Find the one that sounds like you — then have a play with it.
          </p>

          <ServiceGrid isServicesPage={true} />

          {/* Capabilities Consolidation Bar */}
          <div className="capabilities-footer-bar">
            <div className="capabilities-footer-note">
              <strong>Need more than one of these?</strong>
              <span>
                Most clients pick two or three — a new site, hosting, and getting found on Google — and we quote the lot as one price.
              </span>
            </div>
            <div className="capabilities-footer-actions">
              <Link className="btn btn-primary" href="/contact">
                <span>Get one quote for the lot</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
              <a className="btn btn-ghost" href="#catalog-section">
                <span>See everything else</span>
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
            <span className="tag">Everything else</span>
            <h2 id="full-catalog-heading" className="disp">35+ other things</h2>
          </div>
          <p className="band-note">
            Everything else we do. Search it or browse by area.
          </p>

          <Catalog />

          <div className="showcase-footer-link" style={{ marginTop: 40 }}>
            <Link className="btn btn-primary" href="/contact">
              <span>Ask about something else</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
            <Link className="btn btn-ghost" href="/work">
              <span>See our work</span>
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
            <span className="tag">How we charge</span>
            <h2 id="models-heading" className="disp">Three ways to work with us</h2>
          </div>
          <p className="band-note">
            Pick whichever suits. No hourly billing, no surprises.
          </p>

          <div className="engagement-grid" role="list" aria-label="Commercial engagement models">
            {/* Model 1 */}
            <article className="engagement-card" role="listitem">
              <span className="engagement-badge">ONE-OFF PROJECT</span>
              <h3 className="engagement-h">Fixed Price</h3>
              <p className="engagement-p">
                A website, an app, a move to new hosting. One price, one deadline.
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
                  <span>See it every week as we build</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>You own it all at the end</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>30 days of free fixes after launch</span>
                </li>
              </ul>
              <div className="engagement-footer">
                <span className="engagement-dur">Usually 2–8 weeks</span>
                <Link className="btn" href="/contact?model=sprint">
                  <span>Get a price</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </div>
            </article>

            {/* Model 2 */}
            <article className="engagement-card" role="listitem">
              <span className="engagement-badge">ONGOING</span>
              <h3 className="engagement-h">Monthly Retainer</h3>
              <p className="engagement-p">
                We keep building and looking after it, month after month.
              </p>
              <ul className="engagement-features" aria-label="Dedicated Retainer features">
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Set hours reserved for you</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Urgent jobs jump the queue</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Message us directly, any day</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>We watch it so you don&apos;t have to</span>
                </li>
              </ul>
              <div className="engagement-footer">
                <span className="engagement-dur">Monthly · cancel any time</span>
                <Link className="btn" href="/contact?model=retainer">
                  <span>Ask about monthly</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </div>
            </article>

            {/* Model 3 */}
            <article className="engagement-card" role="listitem">
              <span className="engagement-badge">ADVICE ONLY</span>
              <h3 className="engagement-h">Expert Review</h3>
              <p className="engagement-p">
                You're not sure what to do next, and want someone to check.
              </p>
              <ul className="engagement-features" aria-label="Technical Advisory features">
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>We check the whole thing over</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>A written plan you can act on</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>We check suppliers before you sign</span>
                </li>
                <li className="engagement-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Steps your own team can follow</span>
                </li>
              </ul>
              <div className="engagement-footer">
                <span className="engagement-dur">Usually 1–3 weeks</span>
                <Link className="btn" href="/contact?model=advisory">
                  <span>Book a review</span>
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
                <span className="cta-reassurance-item">✓ We sign an NDA</span>
                <span className="cta-reassurance-item">✓ You talk to the engineer</span>
                <span className="cta-reassurance-item">✓ Fixed price, agreed upfront</span>
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
                <span>See our work</span>
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
