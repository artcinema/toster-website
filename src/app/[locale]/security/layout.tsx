import type { Metadata } from 'next';

const BASE = 'https://toster.co';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const url = `${BASE}/${locale}/security`;
  return {
    title: 'Security & Data Protection — Food Delivery CRM',
    description:
      'How Toster protects your business: JWT authentication, HMAC-signed webhooks, audit logs on every change, per-organization data isolation, rate limiting, and GDPR-compliant data export and deletion.',
    keywords: [
      'food delivery CRM security',
      'GDPR compliant restaurant software',
      'data isolation multi-tenant',
      'audit logs',
      'secure food delivery platform',
    ],
    openGraph: {
      title: 'Security built for serious business — Toster',
      description:
        'From authentication to audit logs, every layer of Toster is designed to protect your customers’ data and your business. GDPR-compliant by design.',
      url,
    },
    alternates: { canonical: url },
  };
}

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
