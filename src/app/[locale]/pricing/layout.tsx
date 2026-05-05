import type { Metadata } from 'next';

const BASE = 'https://toster.co';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const url = `${BASE}/${locale}/pricing`;
  return {
    title: 'Pricing — Start at €250/mo or 3–9% of Turnover',
    description: 'Toster pricing scales with your revenue: fixed €250/month Start plan, or 3–9% of turnover for Starter/Growth/Enterprise. Includes CRM, website, iOS & Android apps, and managed marketing.',
    keywords: ['food delivery software pricing', 'CRM pricing food delivery', 'restaurant management platform cost', 'food delivery SaaS pricing'],
    openGraph: {
      title: 'Toster Pricing — From €250/mo or Revenue-Based',
      description: 'Fixed €250/month entry plan + revenue-based tiers. CRM + website + mobile apps + managed marketing.',
      url,
    },
    alternates: { canonical: url },
  };
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
