import Link from 'next/link';
import ServiceGrid from '@/components/ServiceGrid';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import ClientMarquee from '@/components/ClientMarquee';
import { SERVICE_INDEX, STEPS, PROJECTS, STUDIO_STATS } from '@/lib/data';

export const metadata = {
  title: 'Basecase · IT Consulting & Build Studio',
  description:
    'We build the parts of your business that run on code. High-performance websites, e-commerce, cloud, AI, and the architecture underneath — engineered, shipped, and kept running by one elite team.',
  openGraph: {
    title: 'Basecase · IT Consulting & Build Studio',
    description: 'Every loop needs a base case. We build the parts of your business that run on code.',
  },
};

export default function HomePage() {
  const liveCount = PROJECTS.filter((p) => p.status === 'live').length;
  const soonCount = PROJECTS.filter((p) => p.status === 'coming_soon').length;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="wrap hero" aria-labelledby="hero-heading">
        {/* Subtle background grid */}
        <div className="hero-grid-bg" aria-hidden="true" />

        {/* Status indicator */}
        <div className="status reveal" style={{ animationDelay: '.04s' }}>
          <span className="dot" aria-hidden="true" />
          <span className="tag">
            Taking on new projects · {liveCount} Live Client Builds · {soonCount} Staging Alpha
          </span>
        </div>

        {/* Hero headline */}
        <h1 id="hero-heading" className="disp hero-h reveal" style={{ animationDelay: '.1s' }}>
          We build the parts of your business that <em>run on code.</em>
        </h1>

        {/* Subheading */}
        <p className="hero-sub reveal" style={{ animationDelay: '.18s' }}>
          Basecase is an independent IT consulting and build studio. High-performance websites, e-commerce, cloud, data, AI, and
          the architecture underneath: engineered, shipped, and kept running by one elite team instead of five fragmented vendors.
        </p>

        {/* Tagline / Execution kicker */}
        <div className="hero-tagline reveal" style={{ animationDelay: '.23s' }}>
          <span className="hero-tagline-glyph">&gt;</span>
          <span>Every loop needs a base case. // Zero bloat. Pure performance.</span>
        </div>

        {/* CTAs with unified alignment & heights */}
        <div className="hero-cta reveal" style={{ animationDelay: '.28s' }}>
          <Link className="btn btn-primary btn-hero" href="/contact">
            <span>Tell us what you need</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
          <Link className="btn btn-ghost btn-hero" href="/work">
            <span>Explore Client Work</span>
            <span className="btn-badge">{PROJECTS.length} Builds</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link className="btn btn-ghost btn-hero" href="/services">
            <span>Full Service Catalog</span>
            <span className="btn-badge">35+ Practices</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>

        {/* Hero trust micro-strip */}
        <div className="hero-trust-bar reveal" style={{ animationDelay: '.32s' }} aria-label="Studio commitments">
          <span className="hero-trust-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Direct response in &lt;24h
          </span>
          <span className="hero-trust-sep">·</span>
          <span className="hero-trust-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Senior engineers only, zero sales reps
          </span>
          <span className="hero-trust-sep">·</span>
          <span className="hero-trust-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            Melbourne &amp; Worldwide Remote
          </span>
        </div>

        {/* Studio stats */}
        <div className="stats-strip reveal" style={{ animationDelay: '.36s' }} role="list" aria-label="Studio statistics">
          {STUDIO_STATS.map((stat, idx) => (
            <div className="stat-card" key={idx} role="listitem">
              <div className="stat-val" aria-label={`${stat.value} — ${stat.label}`}>{stat.value}</div>
              <div className="stat-lbl">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Client Ticker ─────────────────────────────────────────── */}
      <ClientMarquee />

      {/* ── Practice Directory Index ───────────────────────────────── */}
      <div className="wrap directory-strip-wrap">
        <div className="index-container">
          <div className="index-label-bar">
            <span>// 00. PRACTICE DIRECTORY <span className="index-label-desc">— JUMP DIRECTLY TO A SPECIALTY</span></span>
            <span>6 CORE DISCIPLINES</span>
          </div>
          <nav className="index" aria-label="Core service practices">
            {SERVICE_INDEX.map((i) => (
              <Link className="index-i" key={i.code} href={`/services#${i.code}`}>
                <div className="index-i-header">
                  <b>{i.code}</b>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                <span>{i.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Section 01: Featured Client Work ──────────────────────── */}
      <section className="band" id="work" aria-labelledby="work-heading">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Section 01 // Featured Client Work</span>
            <h2 id="work-heading" className="disp">Featured Client Builds &amp; Productions</h2>
          </div>
          <p className="band-note">
            A curated selection of live systems built for real businesses. From luxury ateliers and global talent management to experiential event agencies and performance media firms.
          </p>

          <ProjectsShowcase projects={PROJECTS} featuredOnly={true} limit={4} />

          <div className="showcase-footer-link">
            <Link className="btn btn-primary" href="/work">
              <span>Explore All {PROJECTS.length} Client Builds &amp; Case Studies</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link className="btn btn-ghost" href="/contact">
              <span>Commission a Website</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 02: Featured Practices ─────────────────────────── */}
      <section className="band" id="capabilities" aria-labelledby="capabilities-heading">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Section 02 // Featured Practices</span>
            <h2 id="capabilities-heading" className="disp">Featured Engineering Capabilities</h2>
          </div>
          <p className="band-note">
            Four core disciplines we are commissioned for most frequently — high-performance web applications, AI assistants, cloud architecture, and system design. Scoped as fixed-price sprints or dedicated engineering retainers.
          </p>
          <ServiceGrid featuredOnly={true} />

          {/* Capabilities footer conversion bar */}
          <div className="capabilities-footer-bar">
            <div className="capabilities-footer-note">
              <strong>Looking for our full scope of engineering practices?</strong>
              <span>Explore our interactive catalog covering 35+ practices across Web, Cloud, Databases, AI, Security, and Advisory.</span>
            </div>
            <div className="capabilities-footer-actions">
              <Link className="btn btn-primary" href="/services">
                <span>View Full 35+ Practice Catalog</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link className="btn btn-ghost" href="/contact">
                <span>Book Scoping Call</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 03: Process ───────────────────────────────────── */}
      <section className="band" id="process" aria-labelledby="process-heading">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Section 03 // How an Engagement Runs</span>
            <h2 id="process-heading" className="disp">Four steps, no surprises</h2>
          </div>
          <p className="band-note">
            Predictable engineering milestones from first call to final code deployment. No hidden handoffs, no endless meetings.
          </p>

          <div className="steps" role="list" aria-label="Engagement process steps">
            {STEPS.map((s, idx) => {
              const milestones = ['Day 1', 'Day 2–3', 'Weekly Sprints', 'Launch & Care'];
              return (
                <div className="step" key={s.n} role="listitem">
                  <div className="step-header">
                    <div className="step-n" aria-hidden="true">0{s.n}</div>
                    <span className="step-timing-badge">{milestones[idx]}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              );
            })}
          </div>

          {/* Process guarantee bar */}
          <div className="process-guarantee-bar">
            <div className="guarantee-item">
              <span className="guarantee-icon">⚡</span>
              <div>
                <strong>Rapid Onboarding</strong>
                <span>First staging deployment preview within 7 days</span>
              </div>
            </div>
            <div className="guarantee-item">
              <span className="guarantee-icon">🛡️</span>
              <div>
                <strong>Zero Vendor Lock-In</strong>
                <span>Full code ownership, clean Git repos &amp; documentation</span>
              </div>
            </div>
            <div className="guarantee-item">
              <span className="guarantee-icon">🎯</span>
              <div>
                <strong>Fixed-Price Sprints</strong>
                <span>Scoped deliverables with guaranteed milestones</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 04: Brand Story ───────────────────────────────── */}
      <section className="band" aria-labelledby="story-heading">
        <div className="wrap split">
          <div>
            <span className="tag">Section 04 // Why Basecase</span>
            <h2 id="story-heading" className="disp split-h">Every loop needs a base case</h2>
          </div>
          <div>
            <p className="lede lede-ink">
              It&apos;s a familiar shape. In programming, a function that calls itself with no exit
              condition runs until it crashes. The thing that stops it is the base case: the condition
              you define yourself so the whole structure can finally resolve.
            </p>
            <p className="band-note" style={{ marginBottom: 0 }}>
              Most businesses that call us are stuck in a loop of their own: a site that needs
              rebuilding every eighteen months, a database nobody wants to touch, a cloud bill nobody
              can explain. We find the condition that breaks it.
            </p>
            <div className="tail">
              <Link className="btn" href="/contact">
                <span>Tell us what&apos;s looping</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
              <Link className="btn btn-ghost" href="/about">
                <span>Read the whole story</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 05: CTA ───────────────────────────────────────── */}
      <section className="band" aria-labelledby="cta-heading">
        <div className="wrap">
          <div className="cta">
            <div className="cta-left">
              <span className="tag tag-invert">Section 05 // Project Intake</span>
              <h2 id="cta-heading" className="disp cta-h">Tell us what&apos;s looping</h2>
              <p className="cta-p">
                Fill in what you know. Rough answers are fine. Direct reply from our senior engineering team within one business day.
              </p>
              <div className="cta-reassurances">
                <span className="cta-reassurance-item">✓ Strict NDA on Request</span>
                <span className="cta-reassurance-item">✓ Direct Engineer Contact</span>
                <span className="cta-reassurance-item">✓ Fixed-Price Proposals</span>
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
                <span>Review Past Builds ({liveCount})</span>
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
