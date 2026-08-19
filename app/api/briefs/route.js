import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateBrief, makeRef, clean } from '@/lib/validate';
import { rateLimit } from '@/lib/rate-limit';
import { notifyNewBrief } from '@/lib/notify';

export const dynamic = 'force-dynamic';

function ip(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
}

export async function POST(request) {
  const gate = rateLimit('briefs:' + ip(request));
  if (!gate.ok) {
    return NextResponse.json(
      { error: 'Too many briefs from this address. Try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(gate.retryAfter) } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Send a JSON body.' }, { status: 400 });
  }

  const errors = validateBrief(body);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const services = body.services.slice(0, 20).map((s) => clean(s, 80));

  const brief = await prisma.brief.create({
    data: {
      ref: makeRef(),
      name: clean(body.name, 120),
      email: clean(body.email, 160),
      phone: clean(body.phone, 40),
      company: clean(body.company, 160),
      site: clean(body.site, 200),
      services: JSON.stringify(services),
      budget: clean(body.budget, 60) || 'Not specified',
      timeline: clean(body.timeline, 60) || 'Flexible',
      heard: clean(body.heard, 60) || 'Not specified',
      message: clean(body.message, 4000),
    },
  });

  // Awaited deliberately: on Vercel the function can be frozen the moment the
  // response is returned, so a fire-and-forget send would be cut off mid-flight.
  // notifyNewBrief never throws, so the 201 stands even if the mail fails.
  await notifyNewBrief(brief, services);

  return NextResponse.json({ ref: brief.ref, at: brief.at }, { status: 201 });
}

export async function GET() {
  const rows = await prisma.brief.findMany({ orderBy: { at: 'desc' } });
  return NextResponse.json(rows.map((r) => ({ ...r, services: JSON.parse(r.services) })));
}

/** Two-click "Clear all" in the admin view. */
export async function DELETE() {
  await prisma.brief.deleteMany({});
  return NextResponse.json({ ok: true });
}
