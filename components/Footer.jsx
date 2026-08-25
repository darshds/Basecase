import Link from 'next/link';
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
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="mark" href="/">
              <span className="mark-sq" aria-hidden="true">(<i />)</span>
              <span className="mark-txt">Basecase</span>
            </Link>
            <p className="footer-tagline">
              IT consulting &amp; build studio. Websites, cloud, data, AI, and the architecture underneath.
            </p>
            <div className="footer-status">
              <span className="live-pulse-dot" />
              <span>Taking on new client builds · Replies in 1 business day</span>
            </div>
          </div>

          <div className="footer-nav-cols">
            <div className="footer-col">
              <span className="footer-col-title">Navigation</span>
              <ul className="footer-links">
                <li><Link href="/work">Client Work (8)</Link></li>
                <li><Link href="/services">Services Catalog</Link></li>
                <li><Link href="/about">About Studio</Link></li>
                <li><Link href="/contact">Start a Project</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="footer-col-title">Core Practices</span>
              <ul className="footer-links">
                <li><Link href="/services#SVC-01">Web Development</Link></li>
                <li><Link href="/services#SVC-02">Search Visibility</Link></li>
                <li><Link href="/services#SVC-03">Chatbots &amp; AI</Link></li>
                <li><Link href="/services#SVC-04">Cloud Architecture</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="footer-col-title">Get in Touch</span>
              <ul className="footer-links">
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="footer-contact-link">
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`} className="footer-contact-link">
                    {CONTACT.phone}
                  </a>
                </li>
                <li className="footer-muted-note">Direct engineer communication · No sales reps</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Basecase Studio. All rights reserved.</p>
          <p className="footer-quote">The condition that breaks the loop.</p>
        </div>
      </div>
    </footer>
  );
}

