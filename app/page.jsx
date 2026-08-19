import Link from 'next/link';
import ServiceGrid from '@/components/ServiceGrid';
import { SERVICE_INDEX, CATALOG, STEPS } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      <section className="wrap hero">
        <div className="status reveal" style={{ animationDelay: '.05s' }}>
          <span className="dot" />
          <span className="tag">Taking on new projects. Replies within one business day</span>
        </div>

        <h1 className="disp hero-h reveal" style={{ animationDelay: '.12s' }}>
          We build the parts of your business that <em>run on code.</em>
        </h1>

        <p className="hero-sub reveal" style={{ animationDelay: '.22s' }}>
          Basecase is an IT consulting and build studio. Websites, cloud, data, AI, and the
          architecture underneath: designed, built, and kept running by one team instead of five vendors.
        </p>

        <p className="tag reveal" style={{ animationDelay: '.26s', marginBottom: 32 }}>Every loop needs a base case.</p>

        <div className="hero-cta reveal" style={{ animationDelay: '.3s' }}>
          <Link className="btn" href="/contact">Tell us what you need</Link>
          <Link className="btn btn-ghost" href="/services">See everything we do</Link>
        </div>

        <div className="index reveal" style={{ animationDelay: '.4s' }}>
          {SERVICE_INDEX.map((i) => (
            <div className="index-i" key={i.code}>
              <b>{i.code}</b>
              <span>{i.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="band" id="capabilities">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Section 01 / Core capabilities</span>
            <h2 className="disp">What we&apos;re hired for most</h2>
          </div>
          <p className="band-note">
            Six practices that cover the work most businesses come to us with. Each one can be a
            standalone project or part of a larger build.
          </p>
          <ServiceGrid />
        </div>
      </section>

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
            <Link className="btn btn-ghost" href="/about">Read the whole story</Link>
          </div>
        </div>
      </section>

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
