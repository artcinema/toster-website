import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'For Chains — Scale from 3 to 300 Locations',
    description: 'Toster is built for multi-location food delivery chains. Multi-country, multi-currency, multi-language. Runs 25+ locations across Ukraine, Poland, Czech Republic, Germany. No extra managers needed.',
    keywords: ['multi-location food delivery software', 'food delivery chain management', 'restaurant chain CRM', 'food delivery franchise software', 'delivery chain platform'],
    openGraph: {
      title: 'Toster for Food Delivery Chains — Scale Without Complexity',
      description: 'Built for chains with 3–300+ locations. Multi-country native: UA, PL, CZ, DE, ES, UAE. One platform, one contract.',
      url: `https://toster.co/${locale}/for-chains`,
    },
    alternates: buildAlternates(locale, '/for-chains'),
  };
}

export default function ForChainsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
