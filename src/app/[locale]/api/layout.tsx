import type { Metadata } from 'next';

const BASE = 'https://toster.co';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const url = `${BASE}/${locale}/api`;
  return {
    title: 'Toster API — REST API for Food Delivery Data',
    description:
      'Toster’s public REST API: read orders, customers, and analytics, or push data back into Toster from any external system. Standard JSON over HTTPS, versioned (v1) and rate-limited.',
    keywords: [
      'food delivery API',
      'restaurant REST API',
      'Toster API',
      'order management API',
      'food delivery integration API',
    ],
    openGraph: {
      title: 'Toster API — read and push orders, customers, analytics',
      description:
        'A versioned REST API over JSON/HTTPS for custom integrations with your food delivery operation.',
      url,
    },
    alternates: { canonical: url },
  };
}

export default function ApiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
