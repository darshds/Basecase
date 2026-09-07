'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Desktop nav — anchor links for smooth scroll
const DESKTOP_LINKS = [
  { href: '/work', label: 'Client Work' },
  { href: '/#capabilities', label: 'Capabilities' },
  { href: '/services', label: 'Full Catalog' },
  { href: '/#process', label: 'Process' },
  { href: '/about', label: 'About' },
];

// Mobile drawer — direct pages only, no /#anchor jumps
const MOBILE_LINKS = [
  { href: '/work', label: 'Client Work' },
  { href: '/services', label: 'Capabilities & Services' },
  { href: '/about', label: 'Our Story & Process' },
  { href: '/contact', label: 'Start a Project' },
];

/* ── Theme Toggle ──────────────────────────────────────────────── */
function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = document.documentElement.getAttribute('data-theme');
    setTheme(stored || 'light');
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('bc-theme', next); } catch (_) { }
    setTheme(next);
  }

  if (!mounted) {
    return <div style={{ width: 36, height: 36 }} aria-hidden="true" />;
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? (
        /* Sun icon */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        /* Moon icon */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

/* ── Navigation ────────────────────────────────────────────────── */
export default function Nav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        <div className="wrap nav-in">
          {/* Wordmark */}
          <Link className="mark" href="/" onClick={() => setOpen(false)} aria-label="Basecase Tech , home">
            <span className="mark-sq" aria-hidden="true">(<i />)</span>
            <span className="mark-txt">Basecase Tech</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-links" role="list">
            {DESKTOP_LINKS.map((l) => (
              <Link key={l.label} href={l.href} role="listitem">{l.label}</Link>
            ))}
          </div>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Desktop CTA */}
          <Link className="btn nav-cta" href="/contact">Get a Quote</Link>

          {/* Mobile hamburger */}
          <button
            className={open ? 'nav-burger is-open' : 'nav-burger'}
            type="button"
            aria-expanded={open}
            aria-controls="nav-drawer"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen(!open)}
          >
            <i aria-hidden="true"><span /><span /><span /></i>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {/* Blurred Backdrop Overlay */}
      <div
        className={`nav-backdrop ${open ? 'is-visible' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Full-Height 80% Off-Canvas Drawer from Right */}
      <aside
        className={`nav-drawer ${open ? 'is-open' : ''}`}
        id="nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="nav-drawer-header">
          <span className="nav-drawer-title">// MENU</span>
          <button
            className="nav-drawer-close-btn"
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="nav-drawer-links">
          {MOBILE_LINKS.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="nav-drawer-link">
              <span className="nav-drawer-label">{l.label}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        <div className="nav-drawer-footer">
          <Link className="btn btn-invert nav-drawer-cta" href="/contact" onClick={() => setOpen(false)}>
            <span>Start a Project</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
          <div className="nav-drawer-meta">
            <span>basecase02@gmail.com</span>
            <span>Melbourne, Australia</span>
          </div>
        </div>
      </aside>
    </>
  );
}
