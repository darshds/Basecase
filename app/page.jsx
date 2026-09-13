import Link from 'next/link';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import ClientMarquee from '@/components/ClientMarquee';
import ScrollStory from '@/components/ScrollStory';
import StudioStats from '@/components/StudioStats';
import { SERVICE_INDEX, CATALOG, STEPS, PROJECTS } from '@/lib/data';

export default function HomePage() {
  const liveCount = PROJECTS.filter((p) => p.status === 'live').length;
  const soonCount = PROJECTS.filter((p) => p.status === 'coming_soon').length;

  return (
    <>
      {/* Scroll story: frames on top, the hero is its final beat */}
      <ScrollStory>
        <div className="status" data-land="0">
          <span className="dot" />
          <span className="tag">
            Taking on new projects · {liveCount} Live Client Builds &amp; {soonCount} Staging Alpha
          </span>
        </div>

        <h1 className="disp hero-h" data-land="3">
          We build the parts of your business that <em>run on code.</em>
        </h1>

        <p className="hero-sub" data-land="1">
          Basecase is an IT consulting and build studio. High-performance websites, e-commerce, cloud, data, AI, and the
          architecture underneath: engineered, shipped, and kept running by one team.
        </p>

        <div className="hero-cta" data-land="2">
          <Link className="btn" href="/contact">
            Tell us what you need
          </Link>
          <Link className="btn btn-ghost" href="/work">
            Explore Client Work ({PROJECTS.length})
          </Link>
        </div>
      </ScrollStory>

      {/* Stats + the six-practice index land right under the resolved hero.
          The story above already walks through four of them, so this is the
          only other place the practices are listed on the homepage. */}
      <section className="wrap hero hero-after" id="capabilities">
        <StudioStats />

        <div className="index">
          {SERVICE_INDEX.map((i) => (
            <Link className="index-i" href="/services" key={i.code}>
              <b>{i.code}</b>
              <span>{i.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Dynamic Client Ticker Marquee */}
      <ClientMarquee />

      {/* Section 01: Selected Client Websites & Productions */}
      <section className="band" id="work">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Section 01 / Selected Client Work</span>
            <h2 className="disp">Client Websites &amp; Live Productions</h2>
          </div>
          <p className="band-note">
            Real systems built for real businesses. From luxury ateliers and global experiential agencies to high-speed e-commerce stores and fitness tech platforms.
          </p>

          <ProjectsShowcase projects={PROJECTS} />

          <div className="showcase-footer-link">
            <Link className="btn btn-ghost" href="/work">
              View Detailed Case Studies &amp; Tech Stacks →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 02: Full Catalog */}
      <section className="band">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Section 02 / Full catalog</span>
            <h2 className="disp">Everything else we can take on</h2>
          </div>
          <p className="band-note">
            Six groups, scoped as fixed projects or monthly retainers. Open the catalog to filter by
            what you&apos;re trying to do.
          </p>
          <div className="group-grid">
            {CATALOG.map((g) => (
              <Link className="group" href="/services" key={g.key}>
                <span className="group-n">{g.items.length} SERVICES</span>
                <span className="group-t">{g.label}</span>
                <span className="group-s">{g.items.slice(0, 2).join(' · ')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 03: Process */}
      <section className="band" id="process">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Section 03 / How an engagement runs</span>
            <h2 className="disp">Four steps, no surprises</h2>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s.n}>
                <div className="step-n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04: Why Basecase */}
      <section className="band">
        <div className="wrap split">
          <div>
            <span className="tag">Section 04 / Why Basecase</span>
            <h2 className="disp split-h">Every loop needs a base case</h2>
          </div>
          <div>
            <p className="lede lede-ink">
              It&apos;s a familiar shape. In programming, a function that calls itself with no exit
              condition runs until it crashes. The thing that stops it is the base case: the condition
              you define yourself so the whole structure can finally resolve.
            </p>
            <p className="band-note">
              Most businesses that call us are stuck in a loop of their own: a site that needs
              rebuilding every eighteen months, a database nobody wants to touch, a cloud bill nobody
              can explain. We find the condition that breaks it.
            </p>
            <div className="tail">
              <Link className="btn btn-ghost" href="/about">Read the whole story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 05: CTA */}
      <section className="band">
        <div className="wrap">
          <div className="cta">
            <div>
              <span className="tag tag-invert">Section 05 / Project intake</span>
              <h2 className="disp cta-h">Tell us what&apos;s looping</h2>
              <p className="cta-p">
                Fill in what you know. Rough answers are fine. We reply within one business day.
              </p>
            </div>
            <Link className="btn btn-invert" href="/contact">Start a project</Link>
          </div>
        </div>
      </section>
    </>
  );
}
