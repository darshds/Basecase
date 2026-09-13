import { SERVICE_PAGES } from '@/lib/service-pages';

const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://basecase.example';

/**
 * Service detail pages carry the commercial keywords, so they rank just below
 * the homepage. /admin is excluded here and in robots.js.
 */
export default function sitemap() {
  const now = new Date();

  const core = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/work', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
  ];

  const services = SERVICE_PAGES.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.9,
    changeFrequency: 'monthly',
  }));

  return [...core, ...services].map(({ path, priority, changeFrequency }) => ({
    url: site + path,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
