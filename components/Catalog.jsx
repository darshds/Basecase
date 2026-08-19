'use client';

import { useState } from 'react';
import { CATALOG } from '@/lib/data';

const FILTERS = [{ key: 'all', label: 'Everything' }, ...CATALOG.map((g) => ({ key: g.key, label: g.label }))];

export default function Catalog() {
  const [active, setActive] = useState('all');
  const groups = active === 'all' ? CATALOG : CATALOG.filter((g) => g.key === active);

  return (
    <>
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className="filt"
            type="button"
            aria-pressed={active === f.key}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="cat-list">
        {groups.map((g) => (
          <div className="cat-row" key={g.key}>
            <span className="tag">{g.label}</span>
            <div className="cat-items">
              {g.items.map((i) => <span key={i}>{i}</span>)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
