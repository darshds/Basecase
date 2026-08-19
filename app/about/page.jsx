import Link from 'next/link';
import { BUYS } from '@/lib/data';

export const metadata = {
  title: 'About',
  description: 'Every loop needs a base case. Why Basecase exists, and the method behind the name.',
};

export default function AboutPage() {
  return (
    <>
      <section className="wrap page-head">
        <span className="tag">About / Why Basecase</span>
        <h1 className="disp page-h">Every loop needs a base case.</h1>
      </section>

      <section className="band">
        <div className="wrap split">
          <span className="tag">Origin</span>
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

      <section className="band">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">What that buys you</span>
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
          </div>
        </div>
      </section>
    </>
  );
}
