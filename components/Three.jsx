'use client';

import { useRef } from 'react';
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from 'framer-motion';

/**
 * 3D primitives.
 *
 * Real perspective projection via CSS 3D transforms rather than WebGL: elements
 * live in a perspective scene and rotate on X/Y, so they occlude and foreshorten
 * like actual geometry. This runs entirely on the compositor and adds nothing to
 * the bundle, which matters because the hero clip already carries the page's
 * weight budget.
 *
 * Everything here degrades to a flat, static layout under prefers-reduced-motion
 * rather than animating a reduced version.
 */

export function Scene3D({ children, className, depth = 1200, ...rest }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <div
        className={className}
        style={{ perspective: `${depth}px`, perspectiveOrigin: '50% 40%' }}
        {...rest}
      >
        {children}
      </div>
    </LazyMotion>
  );
}

/**
 * Card that tilts toward the cursor. `max` is the peak rotation in degrees;
 * beyond about 14 the foreshortening reads as distortion rather than depth.
 */
export function Tilt({ children, className, max = 10, lift = 14, ...rest }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springs = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), springs);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), springs);
  const z = useSpring(useMotionValue(0), springs);

  if (reduced) {
    return <div className={className} {...rest}>{children}</div>;
  }

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    z.set(0);
  };

  return (
    <m.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerEnter={() => z.set(lift)}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, z, transformStyle: 'preserve-3d' }}
      {...rest}
    >
      {children}
    </m.div>
  );
}

/** Pushes content forward on the Z axis inside a Tilt, so it stands off the card. */
export function Layer({ children, z = 30, className, ...rest }) {
  return (
    <div className={className} style={{ transform: `translateZ(${z}px)` }} {...rest}>
      {children}
    </div>
  );
}

/**
 * Scroll-driven depth. `speed` above 1 moves faster than the page (foreground),
 * below 1 slower (background), which is what produces the parallax separation.
 */
export function Depth({ children, className, speed = 0.85, rotate = 0, ...rest }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const shift = (1 - speed) * 140;
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [shift, -shift]), {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });
  const rx = useTransform(scrollYProgress, [0, 0.5, 1], [rotate, 0, -rotate]);

  if (reduced) {
    return <div className={className} {...rest}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ y, rotateX: rotate ? rx : 0, transformStyle: 'preserve-3d' }}
      {...rest}
    >
      {children}
    </m.div>
  );
}
