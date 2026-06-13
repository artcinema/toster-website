import type { Metadata } from 'next';

const BASE = 'https://toster.co';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const url = `${BASE}/${locale}/request-demo`;
  return {
    title: 'Request a Demo — Food Delivery CRM',
    description:
      'Book a personalized Toster demo and see how food delivery chains run orders, kitchen, couriers, loyalty, and AI automation in one platform. We reply within 24 hours.',
    keywords: [
      'Toster demo',
      'food delivery CRM demo',
      'request a demo',
      'restaurant delivery software demo',
    ],
    openGraph: {
      title: 'Request a Toster demo',
      description:
        'See the full food delivery platform in action — orders, kitchen, couriers, loyalty, and AI. We reach out within 24 hours.',
      url,
    },
    alternates: { canonical: url },
  };
}

export default function RequestDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
