import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { locales } from './src/i18n/config';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// The legal pages live under /legal/*, but the footer shipped /privacy-policy
// and /terms for a while, so those URLs are indexed and linked externally.
// Keep them alive as 308s instead of letting them 404.
const legacyLegalPaths = [
  { from: '/privacy-policy', to: '/legal/privacy' },
  { from: '/terms', to: '/legal/terms' },
];

// localePrefix is 'always', so both the bare path (proxy negotiates the locale
// after the redirect) and every locale-prefixed variant need an entry —
// /en/privacy-policy is just as indexable as /privacy-policy.
const legacyLegalRedirects = legacyLegalPaths.flatMap(({ from, to }) => [
  { source: from, destination: to, permanent: true },
  ...locales.map((locale) => ({
    source: `/${locale}${from}`,
    destination: `/${locale}${to}`,
    permanent: true,
  })),
]);

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://logo.clearbit.com https://cdn.brandfetch.io https://www.googletagmanager.com",
      "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://www.google-analytics.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    // Tree-shake icon libraries and other large packages to reduce First Load JS
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 64, 128, 256],
    minimumCacheTTL: 2592000, // 30 days
    remotePatterns: [
      { protocol: 'https', hostname: 'logo.clearbit.com' },
      { protocol: 'https', hostname: 'cdn.brandfetch.io' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'www.toster.co' }],
        destination: 'https://toster.co/',
        permanent: true,
      },
      ...legacyLegalRedirects,
    ];
  },
};

export default withNextIntl(nextConfig);
