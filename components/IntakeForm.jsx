'use client';

import { useState } from 'react';
import { PICKABLE, BUDGETS, TIMELINES, SOURCES } from '@/lib/data';
import { validateBrief } from '@/lib/validate';

const EMPTY = { name: '', email: '', phone: '', company: '', site: '', budget: '', timeline: '', message: '', heard: '' };

export default function IntakeForm() {
  const [values, setValues] = useState(EMPTY);
  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({});
  const [label, setLabel] = useState('Send the brief');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  const set = (k) => (e) => setValues({ ...values, [k]: e.target.value });

  const toggle = (name) => {
    setServices(services.includes(name) ? services.filter((s) => s !== name) : [...services, name]);
    setErrors({ ...errors, services: undefined });
  };

  async function submit() {
    const payload = { ...values, services };
    const found = validateBrief(payload);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = document.querySelector('[data-invalid="true"]');
      if (first) {
        window.scrollTo({ top: first.getBoundingClientRect().top + window.scrollY - 140, behavior: 'smooth' });
        first.focus({ preventScroll: true });
      }
      return;
    }

    setBusy(true);
    setLabel('Sending…');
    try {
      const res = await fetch('/api/briefs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('save failed');
      const data = await res.json();
      setDone({ ref: data.ref, name: payload.name, services });
      setLabel('Send the brief');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setLabel("Couldn't save, try again");
      setTimeout(() => setLabel('Send the brief'), 2000);
    } finally {
      setBusy(false);
    }
  }

  function again() {
    setValues(EMPTY);
    setServices([]);
    setErrors({});
    setDone(null);
    window.scrollTo({ top: 0 });
  }

  if (done) {
    return (
      <div className="done">
        <span className="tag">Brief filed</span>
        <h2 className="disp done-h">Got it. We&apos;ll be in touch.</h2>
        <p className="lede">Your brief is saved and queued for review. Quote this reference if you follow up by phone or email.</p>
        <span className="ref">{done.ref}</span>
        <p className="lede">Filed for {done.name}: {done.services.join(', ')}.</p>
        <button className="btn btn-ghost" type="button" onClick={again} style={{ marginTop: 26 }}>
          Submit another brief
        </button>
      </div>
    );
  }

  return (
    <div className="form-block">
      <fieldset>
        <legend>Who&apos;s asking</legend>
        <div className="row2">
          <div className="fld">
            <label htmlFor="i-name">Your name *</label>
            <input
              id="i-name" type="text" autoComplete="name" placeholder="Priya Raman"
              value={values.name} onChange={set('name')}
              data-invalid={!!errors.name} aria-invalid={!!errors.name}
            />
            {errors.name && <span className="err">{errors.name}</span>}
          </div>
          <div className="fld">
            <label htmlFor="i-email">Email *</label>
            <input
              id="i-email" type="email" autoComplete="email" placeholder="priya@company.com"
              value={values.email} onChange={set('email')}
              data-invalid={!!errors.email} aria-invalid={!!errors.email}
            />
            {errors.email && <span className="err">{errors.email}</span>}
          </div>
        </div>
        <div className="row2">
          <div className="fld">
            <label htmlFor="i-phone">Phone</label>
            <input id="i-phone" type="tel" autoComplete="tel" placeholder="Optional" value={values.phone} onChange={set('phone')} />
          </div>
          <div className="fld">
            <label htmlFor="i-company">Company</label>
            <input id="i-company" type="text" autoComplete="organization" placeholder="Optional" value={values.company} onChange={set('company')} />
          </div>
        </div>
        <div className="fld">
          <label htmlFor="i-site">Current website</label>
          <input id="i-site" type="text" placeholder="company.com, or leave blank if there isn't one yet" value={values.site} onChange={set('site')} />
        </div>
      </fieldset>

      <fieldset>
        <legend>What you need</legend>
        <div className="fld">
          <label>Select everything that applies *</label>
          <div className="picks">
            {PICKABLE.map((p) => (
              <button key={p} className="pick" type="button" aria-pressed={services.includes(p)} onClick={() => toggle(p)}>
                {p}
              </button>
            ))}
          </div>
          {errors.services && <span className="err">{errors.services}</span>}
        </div>
        <div className="row2">
          <div className="fld">
            <label htmlFor="i-budget">Budget range</label>
            <select id="i-budget" value={values.budget} onChange={set('budget')}>
              <option value="">Not sure yet</option>
              {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="fld">
            <label htmlFor="i-when">Timeline</label>
            <select id="i-when" value={values.timeline} onChange={set('timeline')}>
              <option value="">Flexible</option>
              {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="fld">
          <label htmlFor="i-msg">Tell us about the project *</label>
          <textarea
            id="i-msg"
            placeholder="What are you building or fixing? What's the goal? Anything already in place we should know about?"
            value={values.message} onChange={set('message')}
            data-invalid={!!errors.message} aria-invalid={!!errors.message}
          />
          {errors.message && <span className="err">{errors.message}</span>}
        </div>
        <div className="fld">
          <label htmlFor="i-heard">How did you find us</label>
          <select id="i-heard" value={values.heard} onChange={set('heard')}>
            <option value="">Prefer not to say</option>
            {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </fieldset>

      <div className="submit-row">
        <button className="btn" type="button" onClick={submit} disabled={busy}>{label}</button>
        <small>We use these details to prepare your proposal. Nothing is shared with third parties.</small>
      </div>
    </div>
  );
}
