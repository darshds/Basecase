'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CATALOG } from '@/lib/data';

const FILTERS = [
  { key: 'all', label: 'All Practices' },
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
    const q = search.trim().toLowerCase();

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
      const groupMatches =
        g.label.toLowerCase().includes(q) ||
        (g.desc && g.desc.toLowerCase().includes(q));

      if (groupMatches) {
        return g;
      }

      // Otherwise filter items
      const matchingItems = g.items.filter((item) =>
        item.toLowerCase().includes(q)
      );

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
            placeholder="Search 35+ capabilities (e.g. Next.js, Cloud, Mobile, RAG, ISO, DevOps)..."
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
          Showing <strong>{totalVisibleItems}</strong> of {totalPractices} capabilities
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
            Reset All Filters
          </button>
        )}
      </div>

      {/* ── Groups & Items Grid ────────────────────────────────── */}
      {filteredGroups.length === 0 ? (
        <div className="showcase-empty catalog-empty-state" role="status">
          <div className="catalog-empty-icon" aria-hidden="true">🔍</div>
          <h3>No capabilities found matching &ldquo;{search}&rdquo;</h3>
          <p>
            Looking for something tailored? We architect custom solutions outside standard catalog definitions.
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
              Reset Search &amp; Show All
            </button>
            <Link className="btn" href="/contact">
              Ask Our Engineers Directly
            </Link>
          </div>
        </div>
      ) : (
        <div className="catalog-groups-grid" role="list" aria-label="Service catalog categories">
          {filteredGroups.map((g) => (
            <article
              className="catalog-group-card"
              key={g.key}
              id={g.key}
              role="listitem"
            >
              {/* Card Header */}
              <div className="catalog-card-header">
                <div className="catalog-card-meta">
                  <span className="catalog-group-code">{g.code || 'CAT'}</span>
                  <span className="catalog-group-count">{g.items.length} Practices</span>
                </div>
                <h3 className="catalog-group-title">{g.label}</h3>
                {g.desc && <p className="catalog-group-desc">{g.desc}</p>}
              </div>

              {/* Items List */}
              <div className="catalog-items-grid" aria-label={`Practices in ${g.label}`}>
                {g.items.map((item) => (
                  <div className="catalog-item-pill" key={item}>
                    <span className="catalog-item-check" aria-hidden="true">✓</span>
                    <span className="catalog-item-name">{item}</span>
                  </div>
                ))}
              </div>

              {/* Card Footer Action */}
              <div className="catalog-card-footer">
                <Link
                  className="catalog-inquire-link"
                  href={`/contact?interest=${g.key}`}
                >
                  <span>Scope {g.label} Services</span>
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
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
