/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        // Hero media is large and effectively static. Next only fingerprints
        // files it builds, so public/ assets need this set explicitly.
        // NOTE: because the filename is stable, bump it (or add a query
        // string) if the clip is ever re-encoded, or clients keep the old one.
        source: '/video/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
