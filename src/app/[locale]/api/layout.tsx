import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'API & Developer Docs — Toster Open API',
    description: 'Toster REST API for custom integrations: orders, menu, couriers, customers, webhooks. OpenAPI spec, SDKs, and developer guides. Build on top of the food delivery platform.',
    keywords: ['food delivery API', 'restaurant CRM API', 'order management API', 'Toster developer docs', 'food delivery webhook'],
    openGraph: {
      title: 'Toster API — Build on the Food Delivery Platform',
      description: 'REST API, webhooks, and SDKs. Integrate orders, menus, couriers, and customers into your own tools.',
      url: `https://toster.co/${locale}/api`,
    },
    alternates: buildAlternates(locale, '/api'),
  };
}

export default function ApiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
