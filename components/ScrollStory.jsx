'use client';

import { useEffect, useRef } from 'react';

// Homepage opener. A tall section with a sticky stage; scroll progress (0–1)
// drives a canvas that crossfades through the 12 frames in /public/story,
// fades beat copy in and out, pushes into the monitor, then resolves into the
// real hero (passed as children) so the screen "becomes" the homepage.
//
// Motion notes: progress is eased toward the scroll position every animation
// frame (inertia), every shot drifts slowly in scale so nothing sits static,
// and dissolves are smoothstepped. Frames are laid out in a virtual 1280×720
// space so the 1280 and 1920 sets share one set of coordinates.

const FRAME_W = 1280;
const FRAME_H = 720;
const FRAME_COUNT = 12;
const frameSrc = (i, hi) => `/story/f${String(i + 1).padStart(2, '0')}${hi ? '@2x' : ''}.webp`;

// Inner screen of the monitor in frame pixels, measured off the source PNGs.
// Frame 12's screen is the anchor for the push-in and where the tiles draw.
const SCREEN_12 = { x: 292, y: 130, w: 656, h: 415 };
const SCREEN_05 = { x: 185, y: 95, w: 905, h: 510 };

// [scroll progress, frame index]. Between entries the two frames crossfade,
// so a long gap reads as the screen "drawing itself in".
const TIMELINE = [
  [0.0, 0], [0.03, 0], [0.07, 1], [0.11, 2],   // landing, swirl builds
  [0.16, 3], [0.28, 4],                        // web: wireframe fills in
  [0.33, 5], [0.46, 6],                        // bots: thread types out
  [0.51, 7], [0.585, 8], [0.66, 9],            // cloud: cables untangle into a pipeline
  [0.71, 10], [0.81, 11],                      // system design: boxes and arrows draw
  [1.0, 11],
];

// Camera setups. Each drifts ~5% in scale across its span so the picture is
// never still; alternating direction keeps consecutive shots from pumping.
const SHOTS = [
  { frames: [0, 1, 2], span: [0.0, 0.16], dir: 1 },
  { frames: [3, 4], span: [0.11, 0.33], dir: -1 },
  { frames: [5, 6], span: [0.28, 0.51], dir: 1 },
  { frames: [7, 8, 9], span: [0.46, 0.71], dir: -1 },
  { frames: [10, 11], span: [0.66, 0.83], dir: 1 },
];
const DRIFT = 0.05;

const BEATS = [
  {
    key: 'problem',
    tone: 'ink',
    from: 0.02,
    to: 0.135,
    lead: 'Five vendors. Nobody owns the whole thing.',
    body: 'A site from one agency, a chatbot from another, cloud from a third. When something breaks, everyone points at everyone else.',
  },
  {
    key: 'web',
    tone: 'signal',
    from: 0.145,
    to: 0.315,
    code: 'SVC-01 · 4–10 weeks',
    title: 'Web development',
    body: "Sites and internal tools that load fast and don't fall apart in six months.",
    loop: 'Stop rebuilding the site every eighteen months.',
    chips: ['Next.js', 'React', 'Laravel', 'WordPress', 'Headless CMS'],
  },
  {
    key: 'bots',
    tone: 'signal',
    from: 0.325,
    to: 0.495,
    code: 'SVC-03 · 3–6 weeks',
    title: 'Chatbots & AI assistants',
    body: 'Bots that answer from your documents, not from guesswork. Human handover when it matters.',
    loop: 'Stop answering the same question forty times a week.',
    chips: ['RAG', 'Claude / GPT', 'Vector search', 'WhatsApp', 'Web widget'],
  },
  {
    key: 'cloud',
    tone: 'signal',
    from: 0.505,
    to: 0.695,
    code: 'SVC-04 · 2–8 weeks',
    title: 'Cloud',
    body: 'Off the aging servers, onto architecture that scales — with a bill you can explain.',
    loop: 'Stop paying a cloud bill nobody understands.',
    chips: ['AWS', 'Azure', 'GCP', 'Docker', 'Terraform', 'CI/CD'],
  },
  {
    key: 'design',
    tone: 'signal',
    from: 0.705,
    to: 0.835,
    code: 'SVC-05 · 1–3 weeks',
    title: 'System design',
    body: 'Diagrams, written decisions with the reasoning kept in, and a plan your team can execute.',
    loop: 'Stop patching symptoms instead of the structure.',
    chips: ['Architecture review', 'Scaling plan', 'Integration mapping', 'Decision records'],
  },
];

// The four cleared screen states, tiled 2×2 onto the monitor during the turn.
const TILES = [
  { frame: 4, crop: SCREEN_05 },
  { frame: 6, crop: null },
  { frame: 9, crop: null },
  { frame: 11, crop: SCREEN_12 },
];

const HINT_OUT = [0.015, 0.045];
const COPY_ON = [0.015, 0.845];
const PUSH = [0.83, 0.94];
const TILES_IN = [0.855, 0.905];
const WASH_IN = [0.885, 0.93];
const TURN = [0.865, 0.95];
const CANVAS_OUT = [0.94, 0.985];
const RESOLVE = [0.94, 1];

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ramp = (p, [a, b]) => clamp01((p - a) / (b - a));
const smooth = (t) => t * t * (3 - 2 * t);
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
// 1 inside [a, b], easing over `f` at either end, 0 outside.
const windowed = (p, a, b, f = 0.03) => (p < a || p > b ? 0 : smooth(Math.min(1, (p - a) / f, (b - p) / f)));

function frameAt(p) {
  for (let k = 0; k < TIMELINE.length - 1; k++) {
    const [pa, fa] = TIMELINE[k];
    const [pb, fb] = TIMELINE[k + 1];
    if (p <= pb) {
      const t = pb === pa ? 0 : (p - pa) / (pb - pa);
      return [fa, fb, fa === fb ? 0 : smooth(t)];
    }
  }
  return [FRAME_COUNT - 1, FRAME_COUNT - 1, 0];
}

function driftFor(frame, p) {
  const shot = SHOTS.find((s) => s.frames.includes(frame));
  if (!shot) return 1;
  const t = smooth(ramp(p, shot.span));
  return shot.dir > 0 ? 1 + DRIFT * t : 1 + DRIFT * (1 - t);
}

// Nearest decoded frame to `i`, so a slow connection shows a neighbour rather than nothing.
function pick(imgs, i) {
  for (let d = 0; d < FRAME_COUNT; d++) {
    if (imgs[i - d]) return imgs[i - d];
    if (imgs[i + d]) return imgs[i + d];
  }
  return null;
}

function draw(ctx, imgs, W, H, dpr, p) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.fillStyle = '#ECEEEC';
  ctx.fillRect(0, 0, W, H);

  // Cover-fit the virtual 1280×720 frame into the canvas box; `box(z)` is that
  // rect scaled about its centre by the drift factor z.
  const s = Math.max(W / FRAME_W, H / FRAME_H);
  const dw = FRAME_W * s;
  const dh = FRAME_H * s;
  const ox = (W - dw) / 2;
  const oy = (H - dh) / 2;
  const box = (z) => ({ x: ox - (dw * (z - 1)) / 2, y: oy - (dh * (z - 1)) / 2, w: dw * z, h: dh * z });
  const toCanvas = (r, b) => ({
    x: b.x + (r.x / FRAME_W) * b.w,
    y: b.y + (r.y / FRAME_H) * b.h,
    w: (r.w / FRAME_W) * b.w,
    h: (r.h / FRAME_H) * b.h,
  });

  // Push-in: zoom about the screen centre until the screen covers the box,
  // drifting that centre to the middle of the box as we go.
  const lastBox = box(driftFor(FRAME_COUNT - 1, p));
  const screen = toCanvas(SCREEN_12, lastBox);
  const ax = screen.x + screen.w / 2;
  const ay = screen.y + screen.h / 2;
  const zEnd = Math.min(2.4, Math.max(W / screen.w, H / screen.h));
  const k = easeInOut(ramp(p, PUSH));
  const z = 1 + (zEnd - 1) * k;
  ctx.translate(ax + (W / 2 - ax) * k, ay + (H / 2 - ay) * k);
  ctx.scale(z, z);
  ctx.translate(-ax, -ay);

  const [a, b, mix] = frameAt(p);
  const ia = pick(imgs, a);
  const ib = pick(imgs, b);
  if (ia) {
    const r = box(driftFor(a, p));
    ctx.globalAlpha = 1;
    ctx.drawImage(ia, r.x, r.y, r.w, r.h);
  }
  if (ib && ib !== ia && mix > 0) {
    const r = box(driftFor(b, p));
    ctx.globalAlpha = mix;
    ctx.drawImage(ib, r.x, r.y, r.w, r.h);
  }

  const tilesA = ramp(p, TILES_IN);
  if (tilesA > 0) {
    const R = screen;
    const gap = 3 * s;
    const tw = (R.w - gap) / 2;
    const th = (R.h - gap) / 2;
    ctx.globalAlpha = smooth(tilesA);
    ctx.fillStyle = '#F4F6F4';
    ctx.fillRect(R.x, R.y, R.w, R.h);
    ctx.strokeStyle = 'rgba(197, 204, 198, 0.9)';
    ctx.lineWidth = 1 / z;
    TILES.forEach((t, i) => {
      const img = pick(imgs, t.frame);
      if (!img) return;
      const dx = R.x + (i % 2) * (tw + gap);
      const dy = R.y + Math.floor(i / 2) * (th + gap);
      // Source crops are in 1280-space; scale to the loaded image's pixels.
      const px = img.naturalWidth / FRAME_W;
      const src = t.crop || { x: 0, y: 0, w: FRAME_W, h: FRAME_H };
      let sw = src.w;
      let sh = src.h;
      if (src.w / src.h > tw / th) sw = src.h * (tw / th);
      else sh = src.w / (tw / th);
      const sx = src.x + (src.w - sw) / 2;
      const sy = src.y + (src.h - sh) / 2;
      ctx.drawImage(img, sx * px, sy * px, sw * px, sh * px, dx, dy, tw, th);
      ctx.strokeRect(dx, dy, tw, th);
    });
    // Paper wash so the turn headline reads over the tiles.
    const wash = smooth(ramp(p, WASH_IN)) * 0.62;
    if (wash > 0) {
      ctx.globalAlpha = wash;
      ctx.fillStyle = '#ECEEEC';
      ctx.fillRect(R.x, R.y, R.w, R.h);
    }
  }
  ctx.globalAlpha = 1;
}

// Fade + slide a copy block: rises in from below, exits upward.
function place(el, v, mid, p) {
  if (!el) return;
  const dir = p < mid ? 1 : -1;
  el.style.opacity = v;
  el.style.visibility = v > 0 ? 'visible' : 'hidden';
  el.style.transform = `translate3d(0, ${((1 - v) * 22 * dir).toFixed(2)}px, 0)`;
}

export default function ScrollStory({ children }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const posterRef = useRef(null);
  const hintRef = useRef(null);
  const turnRef = useRef(null);
  const heroRef = useRef(null);
  const railRef = useRef(null);
  const railNumRef = useRef(null);
  const beatRefs = useRef([]);
  const segRefs = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const root = rootRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    const imgs = new Array(FRAME_COUNT).fill(null);
    const lands = Array.from(heroRef.current.querySelectorAll('[data-land]'));
    const dprCap = Math.min(2, window.devicePixelRatio || 1);
    // 1920 set once the canvas would be drawn wider than the 1280 set.
    const hi = window.innerWidth * dprCap > 1500;
    // Touch scrolling already has momentum; chase the target harder there.
    const chase = window.matchMedia('(pointer: coarse)').matches ? 0.22 : 0.12;

    let alive = true;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let stuckAt = 0;
    let target = 0;
    let cur = -1;
    let dirty = true;
    let raf = 0;
    let drawn = false;

    const progress = () => {
      const rect = root.getBoundingClientRect();
      const range = root.offsetHeight - stage.offsetHeight;
      return range > 0 ? clamp01((stuckAt - rect.top) / range) : 0;
    };

    const render = (p) => {
      const hint = hintRef.current;
      const rail = railRef.current;
      const hero = heroRef.current;
      if (!hint || !rail || !hero) return;
      if (W && H) {
        draw(ctx, imgs, W, H, dpr, p);
        if (!drawn && imgs[0]) {
          drawn = true;
          posterRef.current.style.visibility = 'hidden';
        }
      }
      canvas.style.opacity = 1 - ramp(p, CANVAS_OUT);
      place(hint, 1 - smooth(ramp(p, HINT_OUT)), (HINT_OUT[0] + HINT_OUT[1]) / 2, p);

      rail.style.opacity = windowed(p, COPY_ON[0], COPY_ON[1], 0.04);

      let active = 0;
      BEATS.forEach((b, i) => {
        place(beatRefs.current[i], windowed(p, b.from, b.to), (b.from + b.to) / 2, p);
        const fill = ramp(p, [b.from, b.to]);
        if (fill > 0) active = i;
        const seg = segRefs.current[i];
        if (seg) seg.style.transform = `scaleX(${fill.toFixed(3)})`;
      });
      railNumRef.current.textContent = String(active + 1).padStart(2, '0');

      place(turnRef.current, windowed(p, TURN[0], TURN[1], 0.025), (TURN[0] + TURN[1]) / 2, p);

      // Resolve: chrome first, headline lands last (data-land order).
      const r = ramp(p, RESOLVE);
      lands.forEach((el) => {
        const i = Number(el.dataset.land) || 0;
        const v = easeOut(clamp01((r - i * 0.1) / 0.55));
        el.style.opacity = v;
        el.style.transform = `translate3d(0, ${((1 - v) * 18).toFixed(2)}px, 0)`;
      });
      hero.style.pointerEvents = r > 0.6 ? 'auto' : 'none';
    };

    // Runs every animation frame while the eased progress is still catching up
    // to the scroll position, then goes idle.
    const loop = () => {
      raf = 0;
      if (!alive) return;
      target = progress();
      if (cur < 0) cur = target;
      const d = target - cur;
      if (Math.abs(d) < 0.0004) cur = target;
      else cur += d * chase;
      render(cur);
      dirty = false;
      if (cur !== target) raf = requestAnimationFrame(loop);
    };

    const schedule = () => {
      if (alive && !raf) raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      dpr = dprCap;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      stuckAt = parseFloat(getComputedStyle(stage).top) || 0;
      dirty = true;
      schedule();
    };

    // Frame 1 first so the landing is sharp immediately; the rest stream in.
    const load = (i) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        imgs[i] = img;
        dirty = true;
        schedule();
      };
      img.src = frameSrc(i, hi);
    };
    load(0);
    for (let i = 1; i < FRAME_COUNT; i++) load(i);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    resize();

    return () => {
      alive = false;
      ro.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="story" ref={rootRef}>
      <noscript>
        <style>{`.story{height:auto}.story-stage{position:relative;height:auto;overflow:visible}.story-media,.story-beats,.story-rail{display:none}.story-hero{position:relative;padding:clamp(44px,6vw,84px) 0 clamp(36px,4.5vw,56px);pointer-events:auto}.story-hero [data-land]{opacity:1!important}`}</style>
      </noscript>
      <div className="story-stage" ref={stageRef}>
        <div className="story-media">
          <img
            className="story-poster"
            src={frameSrc(0, false)}
            srcSet={`${frameSrc(0, false)} 1280w, ${frameSrc(0, true)} 1920w`}
            sizes="100vw"
            alt=""
            width={FRAME_W}
            height={FRAME_H}
            loading="eager"
            decoding="async"
            ref={posterRef}
          />
          <canvas className="story-canvas" ref={canvasRef} aria-hidden="true" />
          <div className="story-turn-wrap">
            <p className="disp story-turn" ref={turnRef}>One team. Every part that runs on code.</p>
          </div>
        </div>

        <div className="story-beats">
          <div className="story-beat story-beat-landing" data-tone="paper" ref={hintRef}>
            <p className="disp story-lead">Hey — are you a business owner struggling with tech?</p>
            <p className="story-hint-s"><span aria-hidden="true">↓</span> scroll</p>
          </div>
          {BEATS.map((b, i) => (
            <div className="story-beat" data-tone={b.tone} key={b.key} ref={(el) => { beatRefs.current[i] = el; }}>
              {b.code && <span className="tag story-code">{b.code}</span>}
              {b.title ? (
                <p className="disp story-title">{b.title}</p>
              ) : (
                <p className="disp story-lead">{b.lead}</p>
              )}
              <p className="story-body">{b.body}</p>
              {b.loop && (
                <p className="story-loop">
                  <span aria-hidden="true">↻</span>
                  {b.loop}
                </p>
              )}
              {b.chips && (
                <ul className="story-chips">
                  {b.chips.map((c) => <li key={c}>{c}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="story-rail" ref={railRef} aria-hidden="true">
          <span className="story-rail-n">
            <b ref={railNumRef}>01</b> / {String(BEATS.length).padStart(2, '0')}
          </span>
          <span className="story-rail-track">
            {BEATS.map((b, i) => (
              <i key={b.key}><b ref={(el) => { segRefs.current[i] = el; }} /></i>
            ))}
          </span>
        </div>

        <div className="story-hero" ref={heroRef}>
          <div className="story-hero-in">{children}</div>
        </div>
      </div>
    </section>
  );
}
