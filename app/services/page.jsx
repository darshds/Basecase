import Link from 'next/link';
import ServiceGrid from '@/components/ServiceGrid';
import Catalog from '@/components/Catalog';

export const metadata = {
  title: 'Services',
  description:
    'Six core practices plus the full catalog: build, run & support, data & AI, security, growth, and advisory work, scoped as fixed projects or monthly retainers.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="wrap page-head">
        <span className="tag">Services / Full catalog</span>
        <h1 className="disp page-h">Everything we can take on</h1>
        <p className="lede">
          Six core practices, plus the wider catalog underneath. Anything here can be scoped as a
          fixed project or a monthly retainer.
        </p>
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
            Filter by what you&apos;re trying to do. Anything here can be scoped as a fixed project or
            a monthly retainer.
          </p>
          <Catalog />
          <div className="tail">
            <Link className="btn" href="/contact">Start a project</Link>
            <span className="tag">Not listed? Ask. We scope custom work.</span>
          </div>
        </div>
      </section>
    </>
  );
}
