'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const RecursionScroll = dynamic(() => import('@/components/RecursionScroll'), {
  ssr: false,
  loading: () => null,
});

/**
 * The scroll set-piece.
 *
 * A tall section with a sticky viewport-height canvas, so vertical scroll is
 * remapped into travel through the structure. Scroll position goes into a ref
 * the WebGL loop reads directly; only the stage index lives in state, and that
 * changes four times over the whole section rather than on every scroll event.
 */

const STAGES = [
  {
    kicker: 'Call 01',
    line: 'A function that calls itself',
    sub: 'Every eighteen months, the site gets rebuilt. Again.',
  },
  {
    kicker: 'Call 02',
    line: 'calls itself again',
    sub: 'The database nobody wants to touch. The bill nobody can explain.',
  },
  {
    kicker: 'Call 03',
    line: 'and runs until it crashes',
    sub: 'Every layer added to work around the last one.',
  },
  {
    kicker: 'Base case',
    line: 'unless you define the exit',
    sub: 'We find the condition that resolves the whole structure.',
  },
];

export default function RecursionSection() {
  const sectionRef = useRef(null);
  const progress = useRef(0);
  const [stage, setStage] = useState(0);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Mount WebGL only once the section is close, so the chunk is never fetched
  // by someone who does not reach it.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
        progress.current = p;

        // Only re-render when the stage actually changes.
        const next = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));
        setStage((prev) => (prev === next ? prev : next));
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const current = STAGES[stage];
  const isLast = stage === STAGES.length - 1;

  return (
    <section
      ref={sectionRef}
      className={`recursion${reduced ? ' is-static' : ''}`}
      aria-labelledby="recursion-heading"
    >
      <div className="recursion-sticky">
        <div className="recursion-canvas" aria-hidden="true">
          {active && !reduced && <RecursionScroll progress={progress} />}
        </div>

        <div className="wrap recursion-copy">
          <span className="tag recursion-kicker">{current.kicker}</span>
          <h2 id="recursion-heading" className="disp recursion-h">
            {current.line}
          </h2>
          <p className="recursion-sub">{current.sub}</p>

          <div className={`recursion-cta${isLast ? ' is-shown' : ''}`}>
            <Link className="btn btn-primary btn-hero" href="/contact">
              <span>Tell us what&apos;s looping</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
            <Link className="btn btn-ghost btn-hero" href="/about">
              <span>Read the whole story</span>
            </Link>
          </div>

          <div className="recursion-rail" aria-hidden="true">
            {STAGES.map((s, i) => (
              <span key={s.kicker} className={`recursion-tick${i <= stage ? ' is-on' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
