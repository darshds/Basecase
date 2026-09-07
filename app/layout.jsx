import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LeadModal from '@/components/LeadModal';
import { CONTACT } from '@/lib/data';
import './globals.css';

// Archivo carries the display type and must stay variable: globals.css sets
// font-stretch (112% headings, 118% wordmark, 108% card titles, 70% step numerals),
// which only resolves if the `wdth` axis is present. Adding a `weight` here pins
// static instances and silently drops that axis, flattening every heading.
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--display', display: 'swap' });
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--sans', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--mono', display: 'swap' });

const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://basecase.example';

export const metadata = {
  metadataBase: new URL(site),
  title: {
    default: 'Basecase Tech · IT Consulting & Build Studio',
    template: '%s · Basecase Tech',
  },
  description:
    'Basecase Tech is an Australian IT consulting and build studio. High-performance websites, e-commerce, cloud, AI, and the architecture underneath , engineered, shipped, and kept running by one elite team.',
  keywords: [
    'Basecase Tech',
    'IT consulting Australia',
    'web development Australia',
    'Next.js development',
    'e-commerce development',
    'cloud infrastructure',
    'AI chatbots',
    'system design',
    'database setup',
    'digital studio',
    'software engineering',
  ],
  authors: [{ name: 'Basecase Tech' }],
  creator: 'Basecase Tech',
  publisher: 'Basecase Tech',
  openGraph: {
    title: 'Basecase Tech · IT Consulting & Build Studio',
    description: 'High-performance websites, e-commerce, cloud, AI, and the architecture underneath , engineered, shipped, and kept running by one elite team.',
    url: site,
    siteName: 'Basecase Tech',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Basecase Tech · IT Consulting & Build Studio',
    description: 'Every loop needs a base case. We build the parts of your business that run on code.',
    creator: '@basecase',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

// Only publish the postal address once every field is real. While any of them is
// still a [bracketed] placeholder, emitting the block would put junk into Google's
// structured-data index, so it is left out entirely.
const addressReady = Object.values(CONTACT.address).every((v) => v && !v.startsWith('['));

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Basecase Tech',
  legalName: 'Basecase Tech',
  description: 'IT consulting & build studio , websites, cloud, data, AI, and the architecture underneath.',
  slogan: 'Every loop needs a base case.',
  url: site,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  areaServed: 'AU',
  ...(CONTACT.abn && { taxID: CONTACT.abn }),
  knowsAbout: [
    'Web Development',
    'E-Commerce Development',
    'Cloud Architecture',
    'AI & Chatbots',
    'System Design',
    'Database Architecture',
    'Search Engine Optimisation',
    'DevOps',
    'Software Engineering',
  ],
  ...(addressReady && {
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.region,
      postalCode: CONTACT.address.postal,
      addressCountry: CONTACT.address.country,
    },
  }),
};

// Inline script to set theme before render , prevents flash of wrong theme.
// This runs synchronously before the browser paints.
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('bc-theme');
    if (stored === 'dark' || stored === 'light') {
      document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={[archivo.variable, sans.variable, mono.variable].join(' ')}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="grid-fade" aria-hidden="true" />
        <Nav />
        <main>{children}</main>
        <Footer />
        {/* <LeadModal /> */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
