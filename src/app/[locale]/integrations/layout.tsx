import type { Metadata } from 'next';

const BASE = 'https://toster.co';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const url = `${BASE}/${locale}/integrations`;
  return {
    title: 'Integrations — Bolt Food, Glovo, Wolt, Stripe & 40+ More',
    description: 'Toster integrates with all major food delivery aggregators (Bolt Food, Glovo, Wolt, Uber Eats), payment providers (LiqPay, Stripe), fiscal systems (Checkbox, KSeF, EET, Fiskaly), marketing tools, and more.',
    keywords: ['food delivery integrations', 'Bolt Food integration', 'Glovo integration', 'Wolt integration', 'food delivery aggregator API', 'food delivery CRM integrations'],
    openGraph: {
      title: 'Toster Integrations — 40+ Connections Built In',
      description: 'Bolt Food, Glovo, Wolt, Uber Eats, LiqPay, Stripe, Telegram, Viber, Google Ads, and more.',
      url,
    },
    alternates: { canonical: url },
  };
}

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
