import { prisma } from '@/lib/prisma';
import BriefsTable from '@/components/BriefsTable';

export const metadata = { title: 'Brief inbox', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminBriefsPage() {
  const rows = await prisma.brief.findMany({ orderBy: { at: 'desc' } });
  const briefs = rows.map((r) => ({
    ...r,
    at: r.at.toISOString(),
    services: JSON.parse(r.services),
  }));

  return (
    <>
      <section className="wrap page-head">
        <span className="tag">Internal / admin · briefs</span>
        <h1 className="disp page-h">Brief inbox</h1>
      </section>
      <section className="band">
        <div className="wrap">
          <BriefsTable briefs={briefs} />
        </div>
      </section>
    </>
  );
}
