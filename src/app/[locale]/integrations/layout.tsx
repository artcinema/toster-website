import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integrations — Bolt Food, Glovo, Wolt, Stripe & 40+ More',
  description: 'Toster integrates with all major food delivery aggregators (Bolt Food, Glovo, Wolt, Uber Eats), payment providers (LiqPay, Stripe), fiscal systems (Checkbox, KSeF, EET, Fiskaly), marketing tools, and more.',
  keywords: ['food delivery integrations', 'Bolt Food integration', 'Glovo integration', 'Wolt integration', 'food delivery aggregator API', 'food delivery CRM integrations'],
  openGraph: {
    title: 'Toster Integrations — 40+ Connections Built In',
    description: 'Bolt Food, Glovo, Wolt, Uber Eats, LiqPay, Stripe, Telegram, Viber, Google Ads, and more.',
    url: 'https://toster.co/integrations',
  },
  alternates: { canonical: 'https://toster.co/en/integrations' },
};

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
