'use client';

import Link from 'next/link';
import { useState } from 'react';

const LINKS = [
  { href: '/#capabilities', label: 'Capabilities' },
  { href: '/services', label: 'Full catalog' },
  { href: '/#process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Start a project' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="wrap nav-in">
        <Link className="mark" href="/" onClick={() => setOpen(false)}>
          <span className="mark-sq" aria-hidden="true">(<i />)</span>
          <span className="mark-txt">Basecase</span>
        </Link>

        <div className="nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </div>

        <Link className="btn nav-cta" href="/contact">Get a quote</Link>

        <button
          className={open ? 'nav-burger is-open' : 'nav-burger'}
          type="button"
          aria-expanded={open}
          aria-controls="nav-drawer"
          onClick={() => setOpen(!open)}
        >
          <i aria-hidden="true"><span /><span /><span /></i>
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <div className="nav-drawer" id="nav-drawer">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}
