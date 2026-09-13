import Link from 'next/link';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import { PROJECTS, STUDIO_STATS } from '@/lib/data';

export const metadata = {
  title: 'Client Work & Production Builds',
  description:
    'Production websites, e-commerce platforms, SaaS portals, and experiential apps built for real clients by Basecase. Browse live deployments and staging builds.',
  openGraph: {
    title: 'Client Work & Production Builds · Basecase',
    description: 'Production websites and applications built for real clients , from luxury ateliers to global event agencies.',
  },
};

export default function WorkPage() {
  const liveCount = PROJECTS.filter((p) => p.status === 'live').length;
  const soonCount = PROJECTS.filter((p) => p.status === 'coming_soon').length;

  return (
    <>
      {/* ── Page Header ───────────────────────────────────────────── */}
      <section className="wrap page-head" aria-labelledby="work-page-heading">
        <div className="status reveal" style={{ animationDelay: '.04s' }}>
          <span className="dot" aria-hidden="true" />
          <span className="tag">
            {liveCount} Live Production Deployments · {soonCount} Staging Builds
          </span>
        </div>

        <h1 id="work-page-heading" className="disp page-h reveal" style={{ animationDelay: '.1s' }}>
          Selected Client Work &amp; <em>Production Builds.</em>
        </h1>

        <p className="lede reveal" style={{ animationDelay: '.18s' }}>
          Every system here is built to run reliably in the real world: fast load times, zero plugin bloat,
          custom architectures, and frictionless mobile experiences for high-growth brands.
        </p>

        {/* Stats */}
        <div className="stats-strip reveal" style={{ animationDelay: '.26s' }} role="list" aria-label="Studio performance statistics">
          {STUDIO_STATS.map((stat, idx) => (
            <div className="stat-card" key={idx} role="listitem">
              <div className="stat-val">{stat.value}</div>
              <div className="stat-lbl">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Production Portfolio ──────────────────────────────────── */}
      <section className="band" id="all-work" aria-labelledby="portfolio-heading">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Section 01 / Production Portfolio</span>
            <h2 id="portfolio-heading" className="disp">Live Client Deployments &amp; Previews</h2>
          </div>
          <p className="band-note">
            Filter by industry, browse live client websites, inspect technology stacks, or preview
            upcoming releases currently in active staging.
          </p>
          <ProjectsShowcase projects={PROJECTS} />
        </div>
      </section>

      {/* ── How We Build Differently ──────────────────────────────── */}
      <section className="band" aria-labelledby="standard-heading">
        <div className="wrap split">
          <div>
            <span className="tag">Section 02 / The Standard</span>
            <h2 id="standard-heading" className="disp split-h">How we build differently</h2>
          </div>
          <div className="prose">
            <p className="lede lede-ink">
              Most agency sites look great on launch day and start deteriorating within six months because they are glued together with fragile WordPress plugins or unmaintained themes.
            </p>
            <p>
              We engineer with modern component architectures (Next.js, React, Node, Cloudflare, AWS), clean semantic markup, automated deployment pipelines, and high-performance databases.
            </p>
            <p>
              The result: lightning-fast page speeds (&lt;500ms TTFB), stellar Google Lighthouse &amp; SEO scores, effortless content management, and codebases your engineering team will love.
            </p>
            <div className="tail">
              <Link className="btn" href="/contact">Start your build</Link>
              <Link className="btn btn-ghost" href="/services">Explore capabilities</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <section className="band" aria-labelledby="work-cta-heading">
        <div className="wrap">
          <div className="cta">
            <div>
              <span className="tag tag-invert">Ready to Ship?</span>
              <h2 id="work-cta-heading" className="disp cta-h">Have a project in mind?</h2>
              <p className="cta-p">
                Tell us about your timeline, technical needs, or current bottlenecks. We reply within one business day with a clear roadmap.
              </p>
            </div>
            <Link className="btn btn-invert" href="/contact">Get a Proposal</Link>
          </div>
        </div>
      </section>
    </>
  );
}
