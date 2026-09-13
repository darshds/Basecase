import { CONTACT } from '@/lib/data';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://basecase.example';

/**
 * JSON-LD builders.
 *
 * Schema is one of the highest-ROI technical SEO tasks and most sites get it
 * wrong by describing pages they do not have. Everything here is generated from
 * real page content, so the structured data and the rendered page always agree.
 */

/** Service offering. `provider` points back to the site-wide ProfessionalService. */
export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.h1,
    description: service.description,
    serviceType: service.keyword,
    url: `${SITE_URL}/services/${service.slug}`,
    areaServed: { '@type': 'Country', name: 'Australia' },
    provider: {
      '@type': 'ProfessionalService',
      name: CONTACT.companyName,
      url: SITE_URL,
      email: CONTACT.email,
      telephone: CONTACT.phone,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.h1} deliverables`,
      itemListElement: service.deliverables.map((d) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: d },
      })),
    },
  };
}

/**
 * FAQPage. Google only rewards this when the answers are genuinely on the page,
 * so callers must render the same text they pass here.
 */
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

/** Breadcrumb trail. `items` is [{ name, path }] ordered root-first. */
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** Case-study reference for a shipped build. */
export function creativeWorkSchema(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.tagline,
    description: project.desc,
    url: project.url,
    dateCreated: project.year,
    creator: { '@type': 'Organization', name: CONTACT.companyName, url: SITE_URL },
    about: project.category,
  };
}
