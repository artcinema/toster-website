import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — 3% to 9% of Monthly Turnover',
  description: 'Toster pricing scales with your revenue: from 3% (single location) to 9% (enterprise chains). Includes CRM, customer website, iOS & Android apps, and fully managed marketing campaigns. No flat fees, no per-seat charges.',
  keywords: ['food delivery software pricing', 'CRM pricing food delivery', 'restaurant management platform cost', 'food delivery SaaS pricing'],
  openGraph: {
    title: 'Toster Pricing — Revenue-Based, From 3% of Turnover',
    description: 'No flat monthly fee. CRM + website + mobile apps + managed marketing. Pay more only when you earn more.',
    url: 'https://toster.co/pricing',
  },
  alternates: { canonical: 'https://toster.co/en/pricing' },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
