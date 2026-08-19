import { Resend } from 'resend';
import { CONTACT } from '@/lib/data';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Until a domain is verified in Resend, `onboarding@resend.dev` is the only usable
// sender and it will ONLY deliver to the address the Resend account was opened with.
const from = process.env.BRIEF_FROM || 'Basecase <onboarding@resend.dev>';
const to = process.env.BRIEF_TO || CONTACT.email;

function lines(brief, services) {
  return [
    `Ref       ${brief.ref}`,
    `Name      ${brief.name}`,
    `Email     ${brief.email}`,
    brief.phone && `Phone     ${brief.phone}`,
    brief.company && `Company   ${brief.company}`,
    brief.site && `Site      ${brief.site}`,
    '',
    `Services  ${services.join(', ')}`,
    `Budget    ${brief.budget}`,
    `Timeline  ${brief.timeline}`,
    `Found us  ${brief.heard}`,
    '',
    brief.message,
  ].filter(Boolean).join('\n');
}

function html(brief, services) {
  const row = (k, v) =>
    v
      ? `<tr><td style="padding:4px 16px 4px 0;color:#4A534E;font:11px/1.6 ui-monospace,monospace;text-transform:uppercase;letter-spacing:.1em;vertical-align:top">${k}</td><td style="padding:4px 0;color:#101614;font:14px/1.6 system-ui,sans-serif">${v}</td></tr>`
      : '';

  return `<div style="background:#ECEEEC;padding:24px;font:14px/1.55 system-ui,sans-serif;color:#101614">
  <div style="max-width:640px;margin:0 auto;border:1px solid #101614;background:#ECEEEC;padding:28px">
    <p style="margin:0 0 6px;font:11px/1.6 ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#4A534E">New project brief</p>
    <p style="margin:0 0 22px;font:600 26px/1 ui-monospace,monospace;letter-spacing:.04em;color:#2B3FE8">${brief.ref}</p>
    <table style="border-collapse:collapse;width:100%">${[
      row('Name', brief.name),
      row('Email', `<a href="mailto:${brief.email}" style="color:#2B3FE8">${brief.email}</a>`),
      row('Phone', brief.phone),
      row('Company', brief.company),
      row('Site', brief.site),
      row('Services', services.join(', ')),
      row('Budget', brief.budget),
      row('Timeline', brief.timeline),
      row('Found us', brief.heard),
    ].join('')}</table>
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #C6CDC7;white-space:pre-wrap;color:#4A534E">${brief.message}</div>
  </div>
</div>`;
}

/**
 * Best-effort notification. The brief is already committed to Postgres by the time
 * this runs, so a mail failure must never surface to the visitor or lose the lead —
 * it is logged and swallowed. /admin/briefs remains the source of truth.
 */
export async function notifyNewBrief(brief, services) {
  if (!resend) return { sent: false, reason: 'RESEND_API_KEY not set' };

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: brief.email,
      subject: `${brief.ref} · ${brief.name}${brief.company ? ' · ' + brief.company : ''}`,
      text: lines(brief, services),
      html: html(brief, services),
    });
    if (error) {
      console.error('[notify] Resend rejected brief %s: %s', brief.ref, error.message);
      return { sent: false, reason: error.message };
    }
    // Logged so a missing notification can be traced to a specific Resend message
    // in the dashboard, rather than guessing whether the send ever happened.
    console.log('[notify] brief %s emailed to %s (resend id %s)', brief.ref, to, data?.id);
    return { sent: true, id: data?.id };
  } catch (err) {
    console.error('[notify] Could not email brief %s: %s', brief.ref, err.message);
    return { sent: false, reason: err.message };
  }
}
