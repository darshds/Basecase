import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
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
  title: { default: 'Basecase · IT consulting & build studio', template: '%s · Basecase' },
  description:
    'Basecase is an IT consulting and build studio. Websites, cloud, data, AI, and the architecture underneath, designed, built, and kept running by one team instead of five vendors.',
  openGraph: {
    title: 'Basecase · IT consulting & build studio',
    description: 'Every loop needs a base case.',
    url: site,
    siteName: 'Basecase',
    type: 'website',
  },
};

// Only publish the postal address once every field is real. While any of them is
// still a [bracketed] placeholder, emitting the block would put junk into Google's
// structured-data index, so it is left out entirely.
const addressReady = Object.values(CONTACT.address).every((v) => v && !v.startsWith('['));

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Basecase',
  description: 'IT consulting & build studio',
  slogan: 'Every loop needs a base case.',
  url: site,
  email: CONTACT.email,
  telephone: CONTACT.phone,
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={[archivo.variable, sans.variable, mono.variable].join(' ')}>
      <body>
        <div className="grid-fade" aria-hidden="true" />
        <Nav />
        <main>{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
