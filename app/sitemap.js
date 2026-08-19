const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://basecase.example';

export default function sitemap() {
  const now = new Date();
  return ['', '/services', '/about', '/contact'].map((path) => ({
    url: site + path,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
