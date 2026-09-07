import Link from 'next/link';
import { BUYS } from '@/lib/data';

export const metadata = {
  title: 'About — Every Loop Needs a Base Case',
  description:
    'Engineers with postgraduate degrees and international experience, building serious digital systems for Australian businesses. The story behind Basecase and why we exist.',
  openGraph: {
    title: 'About Basecase — Every Loop Needs a Base Case',
    description: 'The story behind Basecase: engineers who wrote their own base case.',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────────────────── */}
      <section className="wrap page-head" aria-labelledby="about-heading">
        <span className="tag">About / Why Basecase</span>
        <h1 id="about-heading" className="disp page-h">Every loop needs a base case.</h1>
      </section>

      {/* ── Origin Story ──────────────────────────────────────────── */}
      <section className="band" aria-labelledby="origin-heading">
        <div className="wrap split">
          <div>
            <span className="tag" id="origin-heading">Origin</span>
          </div>
          <div className="prose">
            <p className="lede lede-ink">
              We are engineers with master&apos;s degrees from an Australian university and
              professional experience earned overseas — and one problem: no local experience,
              and no way to get local experience without a job that required local experience.
            </p>
            <p>
              It&apos;s a familiar shape. In programming, a function that calls itself with no exit
              condition runs until it crashes. The thing that stops it is the base case: the condition
              you define yourself so the whole structure can finally resolve.
            </p>
            <p>
              We stopped waiting for a base case and wrote one. We built systems instead of
              applications. Shipped real things for real businesses. Let the work be the credential,
              because nothing else was going to be.
            </p>
            <p>
              That&apos;s the name, and it&apos;s also the method. Most businesses that call us are
              stuck in a loop of their own: a site that needs rebuilding every eighteen months, a
              database nobody wants to touch, a cloud bill nobody can explain. We find the condition
              that breaks it.
            </p>
          </div>
        </div>
      </section>

      {/* ── What That Buys You ────────────────────────────────────── */}
      <section className="band" aria-labelledby="buys-heading">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">What that buys you</span>
            <h2 id="buys-heading" className="disp">Working with Basecase</h2>
          </div>
          <div className="buys">
            {BUYS.map((b) => (
              <div className="buy" key={b.n}>
                <div className="buy-n">{b.n}</div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
          <div className="tail">
            <Link className="btn" href="/contact">Find your base case</Link>
            <Link className="btn btn-ghost" href="/work">See our work</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="band" aria-labelledby="about-cta-heading">
        <div className="wrap">
          <div className="cta">
            <div>
              <span className="tag tag-invert">Start Here</span>
              <h2 id="about-cta-heading" className="disp cta-h">Tell us what&apos;s looping</h2>
              <p className="cta-p">
                Thirty minutes on a call is enough for us to understand your situation and tell you what we&apos;d do about it.
              </p>
            </div>
            <Link className="btn btn-invert" href="/contact">Start a Project</Link>
          </div>
        </div>
      </section>
    </>
  );
}
