'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/* ── SVC-01 · how fast your site loads ────────────────────── */
function WebsiteDemo() {
  const [cheap, setCheap] = useState(false);
  const [phase, setPhase] = useState('done');
  const [shown, setShown] = useState(0.4);
  const raf = useRef(0);
  const reduced = usePrefersReducedMotion();

  const target = cheap ? 4.8 : 0.4;
  const realMs = reduced ? 0 : cheap ? 2400 : 550;

  const run = useCallback(() => {
    cancelAnimationFrame(raf.current);
    setPhase('loading');
    setShown(0);
    const start = performance.now();
    const tick = (now) => {
      const p = realMs === 0 ? 1 : Math.min((now - start) / realMs, 1);
      setShown(target * p);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setPhase('done');
    };
    raf.current = requestAnimationFrame(tick);
  }, [target, realMs]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const done = phase === 'done';

  return (
    <div className="demo">
      <div className="demo-browser">
        <div className="demo-browser-bar">
          <span className="demo-dot" /><span className="demo-dot" /><span className="demo-dot" />
          <span className="demo-url">yourbusiness.com</span>
        </div>
        <div className="demo-browser-body">
          <div className={`demo-skel demo-skel-hero${done ? ' is-in' : ''}`} />
          <div className={`demo-skel demo-skel-line${done ? ' is-in' : ''}`} style={{ transitionDelay: done ? '60ms' : '0ms' }} />
          <div className={`demo-skel demo-skel-line demo-skel-short${done ? ' is-in' : ''}`} style={{ transitionDelay: done ? '120ms' : '0ms' }} />
          <div className="demo-skel-row">
            <div className={`demo-skel demo-skel-box${done ? ' is-in' : ''}`} style={{ transitionDelay: done ? '180ms' : '0ms' }} />
            <div className={`demo-skel demo-skel-box${done ? ' is-in' : ''}`} style={{ transitionDelay: done ? '230ms' : '0ms' }} />
          </div>
        </div>
      </div>

      <p className={`demo-verdict${cheap ? ' is-bad' : ' is-good'}`}>
        {cheap ? 'Over half your visitors give up and leave' : 'Almost nobody leaves before it loads'}
      </p>

      <div className="demo-controls">
        <button type="button" className="demo-btn" onClick={run}>
          {phase === 'loading' ? 'Loading…' : 'Open it'}
        </button>
        <label className="demo-switch">
          <input type="checkbox" checked={cheap} onChange={(e) => setCheap(e.target.checked)} />
          <span>Cheap build</span>
        </label>
        <span className={`demo-readout${cheap ? ' is-bad' : ' is-good'}`}>{shown.toFixed(1)}s</span>
      </div>
    </div>
  );
}

/* ── SVC-02 · where you show up on Google ─────────────────── */
const RIVALS = ['brightsmile-dental.com', 'healthdirect.gov.au', 'yellowpages.com.au'];

function SeoDemo() {
  const [rank, setRank] = useState(47);
  const [running, setRunning] = useState(false);
  const timer = useRef(null);
  const reduced = usePrefersReducedMotion();

  const optimise = useCallback(() => {
    clearInterval(timer.current);
    if (reduced) { setRank(1); return; }
    setRunning(true);
    setRank(47);
    timer.current = setInterval(() => {
      setRank((r) => {
        const next = r - Math.max(1, Math.round(r * 0.18));
        if (next <= 1) {
          clearInterval(timer.current);
          setRunning(false);
          return 1;
        }
        return next;
      });
    }, 140);
  }, [reduced]);

  useEffect(() => () => clearInterval(timer.current), []);

  const top = rank === 1;

  return (
    <div className="demo">
      <div className="demo-serp">
        <div className="demo-serp-q">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <span>dentist near me</span>
        </div>
        <ol className="demo-serp-list">
          {!top && RIVALS.slice(0, 2).map((d) => (
            <li key={d} className="demo-serp-row"><span className="demo-serp-fav" />{d}</li>
          ))}
          <li className="demo-serp-row is-you">
            <span className="demo-serp-fav is-you" />
            your-practice.com
            <span className="demo-serp-rank">#{rank}</span>
          </li>
          {!top && RIVALS.slice(2).map((d) => (
            <li key={d} className="demo-serp-row"><span className="demo-serp-fav" />{d}</li>
          ))}
        </ol>
      </div>

      <p className={`demo-verdict${top ? ' is-good' : ' is-bad'}`}>
        {top ? 'First thing people see' : 'Nobody scrolls this far'}
      </p>

      <div className="demo-controls">
        <button type="button" className="demo-btn" onClick={optimise} disabled={running}>
          {running ? 'Working…' : top ? 'Start over' : 'Fix my site'}
        </button>
        <span className={`demo-readout${top ? ' is-good' : ''}`}>
          {top ? 'Top result' : `Page ${Math.ceil(rank / 10)}`}
        </span>
      </div>
    </div>
  );
}

/* ── SVC-03 · answers customers without you ───────────────── */
const BOT_REPLIES = [
  [/pric|cost|quote|much|fee|charge/i, 'A standard fit-out runs $2,400–$3,800 depending on materials. Want the full price list?'],
  [/hour|open|clos|time/i, "We're open Mon–Fri 8am–6pm and Sat 9am–1pm. Closed Sundays."],
  [/ship|deliver|post|send/i, 'Delivery is 3–5 business days Australia-wide, or next day for metro express.'],
  [/refund|return|warrant|guarantee/i, '30-day returns on unused items, and every install has a 2-year warranty.'],
  [/human|person|agent|call|talk|speak/i, "Of course — passing you to Sarah now. She'll be with you in under a minute."],
  [/book|appoint|schedul|availab/i, 'I can book that in. What day suits you this week?'],
  [/park|address|where|location|find/i, "We're at 42 Cowper St, with free parking around the back."],
];

const BOT_CHIPS = ['How much?', 'Are you open Sunday?', 'Talk to a human'];

function ChatDemo() {
  const [log, setLog] = useState([
    { from: 'bot', text: 'Hi! Ask me anything — I answer from your own price list and policies.' },
  ]);
  const [value, setValue] = useState('');
  const [typing, setTyping] = useState(false);
  const [handled, setHandled] = useState(0);
  const scroller = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log, typing]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const send = useCallback((raw) => {
    const text = raw.trim();
    if (!text || typing) return;
    setValue('');
    setLog((l) => [...l, { from: 'you', text }]);
    setTyping(true);
    const hit = BOT_REPLIES.find(([re]) => re.test(text));
    timer.current = setTimeout(() => {
      setTyping(false);
      setHandled((n) => n + 1);
      setLog((l) => [...l, {
        from: 'bot',
        text: hit ? hit[1] : "That one's not in my notes yet — I've sent it to the team and they'll reply today.",
      }]);
    }, 700);
  }, [typing]);

  return (
    <div className="demo">
      <div className="demo-chat-log" ref={scroller}>
        {log.map((m, i) => (
          <div key={i} className={`demo-bubble is-${m.from}`}>{m.text}</div>
        ))}
        {typing && (
          <div className="demo-bubble is-bot is-typing" aria-label="Assistant is typing">
            <i /><i /><i />
          </div>
        )}
      </div>

      <div className="demo-chips">
        {BOT_CHIPS.map((c) => (
          <button key={c} type="button" className="demo-chip" onClick={() => send(c)}>{c}</button>
        ))}
      </div>

      <form className="demo-chat-form" onSubmit={(e) => { e.preventDefault(); send(value); }}>
        <input
          className="demo-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask it something…"
          aria-label="Ask the demo assistant a question"
        />
        <button type="submit" className="demo-send" aria-label="Send message">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>

      <span className="demo-tally">
        {handled === 0 ? 'Every answer comes from your documents' : `${handled} question${handled > 1 ? 's' : ''} you didn't have to answer`}
      </span>
    </div>
  );
}

/* ── SVC-04 · busiest day of the year ─────────────────────── */
function CloudDemo() {
  const [level, setLevel] = useState(38);

  const shoppers = Math.round(60 * Math.pow(10, (level / 100) * 4));
  const capacity = Math.max(1, Math.ceil(shoppers / 3500));
  const cost = Math.round(capacity * 3 + 9);

  const fmt = (n) =>
    n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `${n}`;

  return (
    <div className="demo">
      <div className="demo-servers" aria-hidden="true">
        {Array.from({ length: Math.min(capacity, 10) }).map((_, i) => (
          <span key={i} className="demo-server" style={{ animationDelay: `${i * 40}ms` }} />
        ))}
        {capacity > 10 && <span className="demo-server-more">+{capacity - 10}</span>}
      </div>

      <div className="demo-stats">
        <div className="demo-stat">
          <b>{fmt(shoppers)}</b>
          <span>people on your site</span>
        </div>
        <div className="demo-stat">
          <b className="is-good">Fast</b>
          <span>still loading quickly</span>
        </div>
        <div className="demo-stat">
          <b>${cost}</b>
          <span>today&apos;s hosting</span>
        </div>
      </div>

      <div className="demo-controls">
        <input
          type="range"
          className="demo-range"
          min="0"
          max="100"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          aria-label="How busy your site is"
        />
        <span className="demo-readout">
          {level < 30 ? 'Quiet day' : level < 70 ? 'Getting busy' : 'Biggest sale ever'}
        </span>
      </div>
    </div>
  );
}

/* ── SVC-05 · what it needs to do ─────────────────────────── */
const NEEDS = [
  { id: 'pay', label: 'Take payments', wk: 1 },
  { id: 'login', label: 'Customer logins', wk: 0.5 },
  { id: 'email', label: 'Send emails', wk: 0.5 },
  { id: 'rush', label: 'Survive big rushes', wk: 1 },
  { id: 'mobile', label: 'Work on phones', wk: 0.5 },
];

function ArchitectureDemo() {
  const [picked, setPicked] = useState(['pay', 'rush']);

  const toggle = (id) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const chosen = NEEDS.filter((n) => picked.includes(n.id));
  const weeks = Math.max(1, Math.round(chosen.reduce((a, n) => a + n.wk, 0.5)));

  return (
    <div className="demo">
      <div className="demo-plan">
        {chosen.length === 0 ? (
          <span className="demo-plan-empty">Tick what your business needs</span>
        ) : (
          <ul className="demo-plan-list">
            {chosen.map((n) => (
              <li key={n.id}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {n.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="demo-chips">
        {NEEDS.map((n) => (
          <button
            key={n.id}
            type="button"
            className={`demo-chip${picked.includes(n.id) ? ' is-on' : ''}`}
            onClick={() => toggle(n.id)}
            aria-pressed={picked.includes(n.id)}
          >
            {n.label}
          </button>
        ))}
      </div>

      <div className="demo-controls">
        <span className="demo-readout is-good">
          {chosen.length === 0 ? 'Nothing picked yet' : `Plan ready in ${weeks} week${weeks > 1 ? 's' : ''}`}
        </span>
      </div>
    </div>
  );
}

/* ── SVC-06 · looking up a customer ───────────────────────── */
function DatabaseDemo() {
  const [tuned, setTuned] = useState(false);
  const [phase, setPhase] = useState('idle');
  const [pct, setPct] = useState(0);
  const raf = useRef(0);
  const reduced = usePrefersReducedMotion();

  const realMs = reduced ? 0 : tuned ? 160 : 1900;

  const run = useCallback(() => {
    cancelAnimationFrame(raf.current);
    setPhase('running');
    setPct(0);
    const start = performance.now();
    const tick = (now) => {
      const p = realMs === 0 ? 1 : Math.min((now - start) / realMs, 1);
      setPct(p);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setPhase('done');
    };
    raf.current = requestAnimationFrame(tick);
  }, [realMs]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <div className="demo">
      <div className="demo-lookup">
        <div className="demo-lookup-q">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <span>Maria Santos — order history</span>
        </div>
        <div className="demo-lookup-body">
          {phase === 'done' ? (
            <ul className="demo-lookup-rows">
              <li><b>#4821</b> Ceiling fan install <span>$340</span></li>
              <li><b>#4106</b> Switchboard upgrade <span>$1,280</span></li>
              <li><b>#3907</b> Safety inspection <span>$190</span></li>
            </ul>
          ) : (
            <span className="demo-lookup-wait">
              {phase === 'running' ? 'Searching…' : 'Press search to look her up'}
            </span>
          )}
        </div>
      </div>

      <div className="demo-progress" role="presentation">
        <span className={`demo-progress-fill${tuned ? ' is-fast' : ''}`} style={{ transform: `scaleX(${pct})` }} />
      </div>

      <div className="demo-controls">
        <button type="button" className="demo-btn" onClick={run} disabled={phase === 'running'}>
          {phase === 'running' ? 'Searching…' : 'Search'}
        </button>
        <label className="demo-switch">
          <input type="checkbox" checked={tuned} onChange={(e) => setTuned(e.target.checked)} />
          <span>After our tune-up</span>
        </label>
        <span className={`demo-readout${tuned ? ' is-good' : ' is-bad'}`}>
          {phase === 'idle' ? '—' : tuned ? 'Instant' : `${(2.4 * pct).toFixed(1)}s wait`}
        </span>
      </div>
    </div>
  );
}

const DEMOS = {
  'SVC-01': WebsiteDemo,
  'SVC-02': SeoDemo,
  'SVC-03': ChatDemo,
  'SVC-04': CloudDemo,
  'SVC-05': ArchitectureDemo,
  'SVC-06': DatabaseDemo,
};

export default function ServiceDemo({ code }) {
  const Demo = DEMOS[code];
  return Demo ? <Demo /> : null;
}
