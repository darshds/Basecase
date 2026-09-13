'use client';

import { useEffect, useRef, useState } from 'react';
import { STUDIO_STATS } from '@/lib/data';

// Splits "8+" / "<500ms" / "100%" into prefix, number, suffix so the number
// can count up while the decoration stays put. Values with no digits pass through.
const split = (v) => {
  const m = /^([^\d]*)(\d+)(.*)$/.exec(v);
  return m ? { pre: m[1], n: Number(m[2]), post: m[3] } : null;
};

export default function StudioStats() {
  const ref = useRef(null);
  // Server-render the final values; only wind back to 0 on the client when the
  // strip is still below the fold, so a no-JS or already-scrolled view never shows zeros.
  const [t, setT] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight) return undefined;

    setT(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const step = (now) => {
          const k = Math.min(1, (now - t0) / dur);
          setT(1 - Math.pow(1 - k, 3));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="stats-strip" ref={ref}>
      {STUDIO_STATS.map((stat, idx) => {
        const parts = split(stat.value);
        const shown = parts ? `${parts.pre}${Math.round(parts.n * t)}${parts.post}` : stat.value;
        return (
          <div className="stat-card" key={idx}>
            <div className="stat-val">{shown}</div>
            <div className="stat-lbl">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
