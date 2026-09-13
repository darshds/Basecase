'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

/**
 * three.js is ~600 KB, so it must never touch the initial bundle.
 *
 * Two guards: `ssr: false` splits it into its own chunk, and the chunk is only
 * requested once the canvas nears the viewport. A visitor who never scrolls this
 * far downloads no WebGL at all.
 */
const Lattice3D = dynamic(() => import('@/components/Lattice3D'), {
  ssr: false,
  loading: () => <div className="lattice-skeleton" aria-hidden="true" />,
});

export default function Lattice3DLazy() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // Bail out where WebGL is unavailable rather than shipping a dead canvas.
    const canWebGL = (() => {
      try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl2') || c.getContext('webgl'));
      } catch {
        return false;
      }
    })();
    if (!canWebGL) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      // Start fetching a little before it scrolls in, so the chunk has landed
      // by the time the section is actually on screen.
      { rootMargin: '300px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="lattice-stage">
      {show ? <Lattice3D /> : <div className="lattice-skeleton" aria-hidden="true" />}
    </div>
  );
}
