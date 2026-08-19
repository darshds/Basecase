import { CONTACT } from '@/lib/data';

/**
 * DO NOT ADD A LINK TO /admin/briefs HERE (or to any basic-auth route, anywhere in
 * a page a visitor can reach).
 *
 * next/link prefetches on viewport entry in production. The prefetch hits the gate,
 * gets 401 with `WWW-Authenticate: Basic`, and Chrome answers that header by opening
 * a sign-in dialog for the whole origin — so every visitor who merely scrolled to the
 * footer was asked for a password on the home page. It also pointed strangers and
 * crawlers straight at the lead inbox.
 *
 * Reach the inbox by bookmarking /admin/briefs instead.
 */
export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-in">
        <p>Basecase · IT consulting &amp; build studio</p>
        <p>{CONTACT.email} &nbsp;·&nbsp; {CONTACT.phone}</p>
        <p>The condition that breaks the loop.</p>
      </div>
    </footer>
  );
}
