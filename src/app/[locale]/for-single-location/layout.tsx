import type { Metadata } from 'next';

const BASE = 'https://toster.co';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const url = `${BASE}/${locale}/for-single-location`;
  return {
    title: 'Food Delivery Software for a Single Location — Toster',
    description:
      'Run one restaurant or dark kitchen like a chain: order management, kitchen display, courier tracking, customer loyalty, and a branded ordering site on the entry plan. Upgrade as you grow.',
    keywords: [
      'single location food delivery software',
      'restaurant delivery software for one location',
      'food delivery CRM for small business',
      'single restaurant ordering system',
    ],
    openGraph: {
      title: 'Starting small? Toster grows with you.',
      description:
        'Run your single location like a chain today, and add more whenever you’re ready — no migration, same platform.',
      url,
    },
    alternates: { canonical: url },
  };
}

export default function ForSingleLocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
