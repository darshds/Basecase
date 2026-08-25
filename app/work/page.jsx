import Link from 'next/link';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import { PROJECTS, STUDIO_STATS } from '@/lib/data';

export const metadata = {
  title: 'Client Work & Production Builds',
  description:
    'Explore production websites, e-commerce platforms, SaaS portals, and experiential apps built for clients by Basecase IT studio.',
  openGraph: {
    title: 'Client Work · Basecase IT Studio',
    description: 'Production websites and applications built for real clients.',
  },
};

export default function WorkPage() {
  const liveCount = PROJECTS.filter((p) => p.status === 'live').length;
  const soonCount = PROJECTS.filter((p) => p.status === 'coming_soon').length;

  return (
    <>
      {/* Page Header */}
      <section className="wrap page-head">
        <div className="status reveal" style={{ animationDelay: '.05s' }}>
          <span className="dot" />
          <span className="tag">
            {liveCount} Live Production Deployments · {soonCount} Staging Builds
          </span>
        </div>

        <h1 className="disp page-h reveal" style={{ animationDelay: '.12s' }}>
          Selected Client Work &amp; <em>Production Builds.</em>
        </h1>

        <p className="lede reveal" style={{ animationDelay: '.2s' }}>
          Every system here is built to run reliably in the real world: fast load times, zero plugin bloat,
          custom architectures, and frictionless mobile experiences for high-growth brands.
        </p>

        {/* Stats Row */}
        <div className="stats-strip reveal" style={{ animationDelay: '.28s' }}>
          {STUDIO_STATS.map((stat, idx) => (
            <div className="stat-card" key={idx}>
              <div className="stat-val">{stat.value}</div>
              <div className="stat-lbl">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Interactive Showcase */}
      <section className="band" id="all-work">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Section 01 / Production Portfolio</span>
            <h2 className="disp">Live Client Deployments &amp; Previews</h2>
          </div>
          <p className="band-note">
            Filter by industry, browse live client websites, inspect technology stacks, or preview upcoming releases currently in active staging.
          </p>

          <ProjectsShowcase projects={PROJECTS} />
        </div>
      </section>

      {/* Deliverable Quality Guarantee */}
      <section className="band">
        <div className="wrap split">
          <div>
            <span className="tag">Section 02 / The Standard</span>
            <h2 className="disp split-h">How we build differently</h2>
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
              <Link className="btn" href="/contact">
                Start your build
              </Link>
              <Link className="btn btn-ghost" href="/services">
                Explore capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="band">
        <div className="wrap">
          <div className="cta">
            <div>
              <span className="tag tag-invert">Ready to ship?</span>
              <h2 className="disp cta-h">Have a project in mind?</h2>
              <p className="cta-p">
                Tell us about your timeline, technical needs, or current bottlenecks. We reply within one business day with a clear roadmap.
              </p>
            </div>
            <Link className="btn btn-invert" href="/contact">
              Get a Proposal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
