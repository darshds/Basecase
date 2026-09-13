import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICE_PAGES, getServicePage } from '@/lib/service-pages';
import { SERVICES, PROJECTS, CONTACT } from '@/lib/data';
import { serviceSchema, faqSchema, breadcrumbSchema, SITE_URL } from '@/lib/schema';
import { MotionRoot, Reveal, RevealGroup, RevealItem } from '@/components/Reveal';

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const service = getServicePage(params.slug);
  if (!service) return {};

  const url = `${SITE_URL}/services/${service.slug}`;
  return {
    title: service.title,
    description: service.description,
    keywords: [service.keyword],
    alternates: { canonical: url },
    openGraph: {
      title: `${service.title} · Basecase Tech`,
      description: service.description,
      url,
      type: 'website',
    },
    twitter: { title: service.title, description: service.description },
  };
}

export default function ServiceDetailPage({ params }) {
  const service = getServicePage(params.slug);
  if (!service) notFound();

  const core = SERVICES.find((s) => s.code === service.code);
  const proof = service.projectIds
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter(Boolean);
  const related = service.related
    .map((slug) => getServicePage(slug))
    .filter(Boolean);

  const schema = [
    serviceSchema(service),
    faqSchema(service.faqs),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.title, path: `/services/${service.slug}` },
    ]),
  ];

  return (
    <MotionRoot>
      {schema.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}

      {/* ── Header ────────────────────────────────────────────────── */}
      <section className="wrap page-head" aria-labelledby="service-heading">
        <nav aria-label="Breadcrumb" className="tag">
          <Link href="/">Home</Link> / <Link href="/services">Services</Link> / {core?.title || service.title}
        </nav>
        <h1 id="service-heading" className="disp page-h">{service.h1}</h1>
        <p className="lede lede-ink sd-intro">{service.intro}</p>
        <div className="hero-cta sd-head-cta">
          <Link className="btn btn-primary btn-hero" href="/contact">
            <span>Start a project</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
          {core?.dur && <span className="sd-dur">Typical engagement: {core.dur}</span>}
        </div>
      </section>

      {/* ── Who it's for ──────────────────────────────────────────── */}
      <section className="band" aria-labelledby="whofor-heading">
        <div className="wrap split">
          <div>
            <span className="tag" id="whofor-heading">Who this is for</span>
          </div>
          <RevealGroup className="sd-list" as="ul">
            {service.whoFor.map((line) => (
              <RevealItem as="li" key={line} className="sd-list-item">{line}</RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Deliverables ──────────────────────────────────────────── */}
      <section className="band" aria-labelledby="deliverables-heading">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">What you get</span>
            <h2 id="deliverables-heading" className="disp">Deliverables</h2>
          </div>
          <RevealGroup className="sd-grid">
            {service.deliverables.map((d, i) => (
              <RevealItem key={d} className="sd-card">
                <span className="sd-card-n">{String(i + 1).padStart(2, '0')}</span>
                <p>{d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          {core?.tags?.length > 0 && (
            <Reveal className="sd-tags" delay={0.1}>
              {core.tags.map((t) => <span className="sd-tag" key={t}>{t}</span>)}
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────── */}
      <section className="band" aria-labelledby="process-heading">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">How it runs</span>
            <h2 id="process-heading" className="disp">Process</h2>
          </div>
          <RevealGroup className="sd-steps">
            {service.process.map((step, i) => (
              <RevealItem key={step.title} className="sd-step">
                <span className="sd-step-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Proof ─────────────────────────────────────────────────── */}
      {proof.length > 0 && (
        <section className="band" aria-labelledby="proof-heading">
          <div className="wrap">
            <div className="band-head">
              <span className="tag">Shipped work</span>
              <h2 id="proof-heading" className="disp">Builds using this</h2>
            </div>
            <RevealGroup className="sd-grid">
              {proof.map((p) => (
                <RevealItem key={p.id} className="sd-card sd-proof">
                  <span className="sd-card-n">{p.year}</span>
                  <h3>{p.title}</h3>
                  <p className="sd-proof-client">{p.client}</p>
                  <p>{p.tagline}</p>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="sd-proof-link">
                      Visit site
                    </a>
                  )}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ── FAQs ──────────────────────────────────────────────────── */}
      <section className="band" aria-labelledby="faq-heading">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Before you ask</span>
            <h2 id="faq-heading" className="disp">Questions we get</h2>
          </div>
          <RevealGroup className="sd-faqs">
            {service.faqs.map(({ q, a }) => (
              <RevealItem key={q} className="sd-faq">
                <h3>{q}</h3>
                <p>{a}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Related ───────────────────────────────────────────────── */}
      <section className="band" aria-labelledby="related-heading">
        <div className="wrap">
          <div className="band-head">
            <span className="tag">Related</span>
            <h2 id="related-heading" className="disp">Often paired with</h2>
          </div>
          <RevealGroup className="sd-grid">
            {related.map((r) => (
              <RevealItem key={r.slug} className="sd-card">
                <h3>{r.h1}</h3>
                <p>{r.description}</p>
                <Link href={`/services/${r.slug}`} className="sd-proof-link">
                  {r.title}
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="band" aria-labelledby="svc-cta-heading">
        <div className="wrap cta">
          <h2 id="svc-cta-heading" className="disp cta-h">Tell us what you need.</h2>
          <p className="cta-p">
            Rough answers are fine. We reply within one business day, and you speak to the
            engineer who would do the work.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-invert btn-hero" href="/contact">
              <span>Start a project</span>
            </Link>
            <a className="btn btn-ghost btn-hero" href={`mailto:${CONTACT.email}`}>
              <span>{CONTACT.email}</span>
            </a>
          </div>
        </div>
      </section>
    </MotionRoot>
  );
}
