import Link from 'next/link';
import { CONTACT } from '@/lib/data';

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-in">
        <p>Basecase · IT consulting &amp; build studio</p>
        <p>{CONTACT.email} &nbsp;·&nbsp; {CONTACT.phone}</p>
        <p>The condition that breaks the loop.</p>
        <Link className="linkish" href="/admin/briefs">Admin · briefs</Link>
      </div>
    </footer>
  );
}
