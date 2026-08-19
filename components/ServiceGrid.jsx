import { SERVICES } from '@/lib/data';

export default function ServiceGrid() {
  return (
    <div className="svc-grid">
      {SERVICES.map((s) => (
        <article className="svc" key={s.code}>
          <div className="svc-id">
            <span>{s.code}</span>
            <i>{s.dur}</i>
          </div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
          <p className="svc-loop">{s.loop}</p>
          <div className="stack">
            {s.tags.map((t) => <span key={t}>{t}</span>)}
          </div>
        </article>
      ))}
    </div>
  );
}
