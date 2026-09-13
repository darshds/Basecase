'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CATALOG } from '@/lib/data';
import { useSnapCarousel, CarouselDots } from './SnapCarousel';

const FILTERS = [
  { key: 'all', label: 'Everything' },
  ...CATALOG.map((g) => ({ key: g.key, label: g.label, count: g.items.length })),
];

export default function Catalog() {
  const [active, setActive] = useState('all');
  const [search, setSearch] = useState('');

  const totalPractices = useMemo(
    () => CATALOG.reduce((acc, g) => acc + g.items.length, 0),
    []
  );

  // Filter groups and items based on category and search query
  const filteredGroups = useMemo(() => {
    const q = search.trim();
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = q ? new RegExp('(^|[^\\p{L}\\p{N}])' + escaped, 'iu') : null;
    const hit = (text) => re.test(text);

    return CATALOG.map((g) => {
      // Category filter check
      if (active !== 'all' && g.key !== active) {
        return null;
      }

      // If no search query, return full group
      if (!q) {
        return g;
      }

      // Check if group label or desc matches
      const groupMatches = hit(g.label) || (g.desc && hit(g.desc));

      if (groupMatches) {
        return g;
      }

      // Otherwise filter items
      const matchingItems = g.items.filter(hit);

      if (matchingItems.length > 0) {
        return {
          ...g,
          items: matchingItems,
        };
      }

      return null;
    }).filter(Boolean);
  }, [active, search]);

  const totalVisibleItems = useMemo(
    () => filteredGroups.reduce((acc, g) => acc + g.items.length, 0),
    [filteredGroups]
  );

  const { ref: rowRef, active: slide, onScroll, goTo } = useSnapCarousel(filteredGroups.length);

  return (
    <div className="catalog-explorer" id="catalog-explorer">
      {/* ── Search & Filter Controls ───────────────────────────── */}
      <div className="catalog-controls">
        {/* Search Input */}
        <div className="catalog-search-wrap">
          <svg
            className="catalog-search-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="search"
            className="catalog-search-input"
            placeholder="Search — try “app”, “hosting”, “reports”…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search practices catalog"
          />
          {search && (
            <button
              type="button"
              className="catalog-search-clear"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="filters catalog-filter-pills" role="tablist" aria-label="Filter catalog by category">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filt catalog-filter-btn${active === f.key ? ' is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={active === f.key}
              onClick={() => setActive(f.key)}
            >
              <span>{f.label}</span>
              <span className="filter-count">
                {f.key === 'all' ? totalPractices : f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Status Bar */}
      <div className="catalog-status-bar">
        <span className="catalog-status-text">
          Showing <strong>{totalVisibleItems}</strong> of {totalPractices}
          {search && ` matching "${search}"`}
        </span>
        {search && (
          <button
            type="button"
            className="catalog-reset-link"
            onClick={() => {
              setSearch('');
              setActive('all');
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* ── Groups & Items Grid ────────────────────────────────── */}
      {filteredGroups.length === 0 ? (
        <div className="showcase-empty catalog-empty-state" role="status">
          <h3>Nothing called &ldquo;{search}&rdquo; &mdash; but we probably still do it.</h3>
          <p>
            Tell us what you&apos;re after in plain words and we&apos;ll say yes or no within a day.
          </p>
          <div className="catalog-empty-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setSearch('');
                setActive('all');
              }}
            >
              Show everything
            </button>
            <Link className="btn" href="/contact">
              Just ask us
            </Link>
          </div>
        </div>
      ) : (
        <div
          className="catalog-groups-grid"
          role="list"
          aria-label="Service catalog categories"
          ref={rowRef}
          onScroll={onScroll}
        >
          {filteredGroups.map((g) => (
            <article
              className="catalog-group-card"
              key={g.key}
              id={g.key}
              role="listitem"
            >
              {/* Card Header */}
              <div className="catalog-card-header">
                <div className="catalog-header-top">
                  <h3 className="catalog-group-title">{g.label}</h3>
                  <span className="catalog-group-count">{g.items.length}</span>
                </div>
                {g.desc && <p className="catalog-group-desc">{g.desc}</p>}
              </div>

              {/* Items List - condensed */}
              <div className="catalog-items-grid" aria-label={`Practices in ${g.label}`}>
                {g.items.map((item) => (
                  <div className="catalog-item-pill" key={item}>
                    <span className="catalog-item-check" aria-hidden="true">✓</span>
                    <span className="catalog-item-name">{item}</span>
                  </div>
                ))}
              </div>

              {/* Card Footer Action */}
              <Link
                className="catalog-inquire-link"
                href={`/contact?interest=${g.key}`}
              >
                <span>Explore</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      )}

      {filteredGroups.length > 0 && (
        <CarouselDots
          className="catalog-pagination"
          count={filteredGroups.length}
          active={slide}
          goTo={goTo}
          labels={filteredGroups.map((g) => g.label)}
        />
      )}
    </div>
  );
}
