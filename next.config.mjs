/** @type {import('next').NextConfig} */
const config = {
  agentRules: false,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 810, 1080, 1440, 1920],
    minimumCacheTTL: 86400,
  },
  async redirects() {
    return [
      { source: '/studio/:path*', destination: '/#process', permanent: false },
      { source: '/projects/:path*', destination: '/#projects', permanent: false },
      { source: '/contact', destination: '/#contact', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/media/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};
export default config;
