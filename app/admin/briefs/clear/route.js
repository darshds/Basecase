import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * Destructive "Clear all" for the admin inbox.
 *
 * It lives under /admin rather than /api for two reasons, and both matter:
 *
 *  1. middleware.js gates `/admin/:path*`, so this inherits basic auth for free.
 *     As `/api/briefs` it was reachable by anyone with the URL.
 *  2. Browsers scope cached basic-auth credentials to the authenticated directory
 *     and below. Sitting under /admin/ means the fetch from BriefsTable carries the
 *     credentials automatically; a sibling path like /api/briefs would not, and the
 *     button would 401 for a legitimately signed-in admin.
 */
export async function DELETE() {
  const { count } = await prisma.brief.deleteMany({});
  return NextResponse.json({ ok: true, deleted: count });
}
