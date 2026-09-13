'use client';

import { useState, useEffect } from 'react';

export default function LeadModal() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  useEffect(() => {
    // Don't show if already dismissed in this session
    if (sessionStorage.getItem('bc-modal-dismissed')) return;
    const t = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    sessionStorage.setItem('bc-modal-dismissed', '1');
    setVisible(false);
    setDismissed(true);
  }

  async function submit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, interest }),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
      sessionStorage.setItem('bc-modal-dismissed', '1');
      setTimeout(() => { setVisible(false); }, 2600);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
    }
  }

  if (dismissed && !visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`lead-modal-backdrop${visible ? ' is-visible' : ''}`}
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className={`lead-modal${visible ? ' is-visible' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Quick project enquiry"
      >
        {/* Close */}
        <button className="lead-modal-close" type="button" onClick={dismiss} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {status === 'done' ? (
          <div className="lead-modal-done">
            <div className="lead-modal-done-icon">✓</div>
            <p className="lead-modal-done-msg">Got it — we&apos;ll be in touch within 24h.</p>
          </div>
        ) : (
          <>
            <div className="lead-modal-eyebrow">
              <span className="live-pulse-dot" style={{ marginRight: 6 }} />
              Taking on new projects
            </div>
            <h3 className="lead-modal-title">Got a project in mind?</h3>
            <p className="lead-modal-sub">
              Drop your email and we&apos;ll reach out within 24 hours. No sales reps, straight to engineers.
            </p>

            <form className="lead-modal-form" onSubmit={submit} noValidate>
              <input
                className="lead-modal-input"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              <input
                className="lead-modal-input"
                type="email"
                placeholder="Work email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <select
                className="lead-modal-input lead-modal-select"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              >
                <option value="">What do you need? (optional)</option>
                <option value="Website / Web App">Website / Web App</option>
                <option value="AI / Chatbot">AI / Chatbot</option>
                <option value="Cloud / Infrastructure">Cloud / Infrastructure</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="System Design">System Design</option>
                <option value="Something else">Something else</option>
              </select>

              <button
                className="lead-modal-btn"
                type="submit"
                disabled={status === 'sending' || !email}
              >
                {status === 'sending' ? 'Sending…' : status === 'error' ? 'Try again' : 'Send — we\'ll reach out'}
                {status === 'idle' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                )}
              </button>
            </form>

            <p className="lead-modal-fine">No spam. NDA on request. Unsubscribe any time.</p>
          </>
        )}
      </div>
    </>
  );
}
