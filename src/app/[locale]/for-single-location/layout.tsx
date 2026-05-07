import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'For Single Locations — Launch Your Delivery in One Day',
    description: 'Perfect for independent restaurants and ghost kitchens launching delivery. Get a branded website, order management, courier tracking, and customer loyalty in one setup. From 3% of turnover.',
    keywords: ['single location food delivery software', 'restaurant delivery system', 'ghost kitchen software', 'food delivery startup platform'],
    openGraph: {
      title: 'Toster for Single Locations — Go Live Today',
      description: 'Branded website, order management, courier tracking, and loyalty. Everything to launch delivery as a solo restaurant.',
      url: `https://toster.co/${locale}/for-single-location`,
    },
    alternates: buildAlternates(locale, '/for-single-location'),
  };
}

export default function ForSingleLocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
