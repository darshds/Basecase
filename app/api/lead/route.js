import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONTACT } from '@/lib/data';
import { rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const from = process.env.BRIEF_FROM || 'Basecase <onboarding@resend.dev>';
const to = process.env.BRIEF_TO || CONTACT.email;

function ip(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
}

export async function POST(request) {
  // Rate-limit: max 3 lead pops per IP per 10 min
  const gate = rateLimit('lead:' + ip(request), { max: 3, windowMs: 600_000 });
  if (gate && !gate.ok) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const email = String(body.email || '').trim().slice(0, 200);
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 422 });
  }

  const name = String(body.name || '').trim().slice(0, 120);
  const interest = String(body.interest || '').trim().slice(0, 120);

  // Send via Resend (same as briefs)
  if (resend) {
    try {
      await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `New lead enquiry · ${name || email}`,
        text: [
          'NEW WEBSITE LEAD',
          '',
          name && `Name:     ${name}`,
          `Email:    ${email}`,
          interest && `Interest: ${interest}`,
        ].filter(Boolean).join('\n'),
        html: `<div style="background:#ECEEEC;padding:24px;font:14px/1.55 system-ui,sans-serif;color:#101614">
  <div style="max-width:560px;margin:0 auto;border:1px solid #101614;background:#ECEEEC;padding:28px">
    <p style="margin:0 0 6px;font:11px/1.6 ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#4A534E">New website lead</p>
    <p style="margin:0 0 22px;font:600 22px/1 system-ui,sans-serif;color:#1D33E0">Popup enquiry</p>
    <table style="border-collapse:collapse;width:100%">
      ${name ? `<tr><td style="padding:4px 16px 4px 0;color:#4A534E;font:11px/1.6 ui-monospace,monospace;text-transform:uppercase">Name</td><td style="color:#101614;font:14px/1.6 system-ui">${name}</td></tr>` : ''}
      <tr><td style="padding:4px 16px 4px 0;color:#4A534E;font:11px/1.6 ui-monospace,monospace;text-transform:uppercase">Email</td><td><a href="mailto:${email}" style="color:#1D33E0">${email}</a></td></tr>
      ${interest ? `<tr><td style="padding:4px 16px 4px 0;color:#4A534E;font:11px/1.6 ui-monospace,monospace;text-transform:uppercase">Interest</td><td style="color:#101614;font:14px/1.6 system-ui">${interest}</td></tr>` : ''}
    </table>
  </div>
</div>`,
      });
    } catch (err) {
      console.error('[lead] Email failed:', err.message);
      // Still return 201 so the modal shows success
    }
  } else {
    console.log('[lead] RESEND_API_KEY not set — lead not emailed:', { name, email, interest });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
