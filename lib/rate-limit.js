const hits = new Map();

/**
 * In-memory limiter — BEST EFFORT ONLY on Vercel.
 *
 * This Map lives in one serverless instance's memory. Vercel runs many instances and
 * discards them when cold, so a determined submitter simply lands on a fresh instance
 * with an empty counter. It still absorbs naive double-submits and a single hot loop,
 * which is why it is kept, but do not treat it as spam protection.
 *
 * For a real limit, back it with Vercel KV / Upstash Redis so the count is shared.
 */
export function rateLimit(key, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (list.length >= limit) {
    hits.set(key, list);
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - list[0])) / 1000) };
  }
  list.push(now);
  hits.set(key, list);
  return { ok: true };
}
