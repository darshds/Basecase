const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://basecase.example';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/admin' }],
    sitemap: site + '/sitemap.xml',
  };
}
