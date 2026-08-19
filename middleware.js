import { NextResponse } from 'next/server';

/**
 * PLACEHOLDER AUTH: HTTP basic auth on /admin/*, credentials from env.
 * Upgrade to a real session/SSO login before storing real client data.
 */
export function middleware(request) {
  const header = request.headers.get('authorization') || '';
  const [scheme, encoded] = header.split(' ');

  if (scheme === 'Basic' && encoded) {
    const [user, pass] = atob(encoded).split(':');
    if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Basecase admin"' },
  });
}

export const config = { matcher: ['/admin/:path*'] };
