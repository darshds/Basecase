'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';

/**
 * Scroll-triggered reveals.
 *
 * Uses framer-motion's `m` component under `LazyMotion` rather than the full
 * `motion` export, which keeps the whole animation feature set out of the
 * initial bundle. `strict` makes an accidental `motion` import a build-time
 * error instead of a silent bundle regression.
 *
 * `whileInView` with `once` means each element animates a single time and is
 * then unobserved, so long pages do not accumulate scroll work. Every component
 * honours prefers-reduced-motion by rendering the final state directly.
 */
export function MotionRoot({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 18, as = 'div', className, ...rest }) {
  const reduced = useReducedMotion();
  const Tag = m[as] || m.div;

  if (reduced) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Staggers its children. Children must be <RevealItem> to inherit the variant. */
export function RevealGroup({ children, className, stagger = 0.07, as = 'div', ...rest }) {
  const reduced = useReducedMotion();
  const Tag = m[as] || m.div;

  if (reduced) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = 'div', ...rest }) {
  const reduced = useReducedMotion();
  const Tag = m[as] || m.div;

  if (reduced) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 14 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
