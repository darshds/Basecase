'use client';

import { useMemo, useState } from 'react';

const COLS = ['ref', 'at', 'name', 'email', 'phone', 'company', 'site', 'services', 'budget', 'timeline', 'heard', 'message'];

export default function BriefsTable({ briefs }) {
  const [rows, setRows] = useState(briefs);
  const [q, setQ] = useState('');
  const [armed, setArmed] = useState(false);
  const [failed, setFailed] = useState(false);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((r) =>
      [r.name, r.email, r.company, r.message, (r.services || []).join(' ')]
        .join(' ').toLowerCase().includes(needle)
    );
  }, [rows, q]);

  function csv() {
    const cell = (v) => '"' + String(Array.isArray(v) ? v.join('; ') : v ?? '').split('"').join('""') + '"';
    const body = [COLS.join(',')].concat(shown.map((r) => COLS.map((c) => cell(r[c])).join(',')));
    const url = URL.createObjectURL(new Blob([body.join('\n')], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'basecase-briefs.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function clearAll() {
    setFailed(false);
    if (!armed) {
      setArmed(true);
      setTimeout(() => setArmed(false), 4000);
      return;
    }
    setArmed(false);
    // Same-origin so the browser attaches the basic-auth credentials it already holds
    // for /admin. If this ever 401s, the session expired — reload and sign in again.
    const res = await fetch('/admin/briefs/clear', { method: 'DELETE', credentials: 'same-origin' });
    if (!res.ok) {
      setFailed(true);
      return;
    }
    setRows([]);
  }

  return (
    <>
      <div className="rec-tools">
        <input type="search" placeholder="Search name, email, company, service…" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn btn-ghost" type="button" onClick={csv}>Download CSV</button>
        <button className="btn btn-danger" type="button" onClick={clearAll}>{armed ? 'Click again to confirm' : 'Clear all'}</button>
      </div>

      {failed && <p className="err">Could not clear the inbox. Reload the page, sign in again, and retry.</p>}

      <p className="tag">{shown.length === 1 ? '1 brief' : shown.length + ' briefs'}</p>

      {shown.length === 0 ? (
        <div className="empty-state">No briefs yet. The first submitted brief lands here.</div>
      ) : (
        shown.map((r) => (
          <div className="rec" key={r.ref}>
            <div className="rec-h">
              <b>{r.ref}</b>
              <span>{new Date(r.at).toLocaleString()}</span>
            </div>
            <div className="rec-n">{r.name}{r.company ? ' · ' + r.company : ''}</div>
            <div className="rec-meta">{r.email}{r.phone ? ' · ' + r.phone : ''}{r.site ? ' · ' + r.site : ''}</div>
            <div className="rec-meta">
              <strong>{(r.services || []).join(', ')}</strong> · {r.budget} · {r.timeline} · via {r.heard}
            </div>
            <div className="rec-msg">{r.message}</div>
          </div>
        ))
      )}
    </>
  );
}
