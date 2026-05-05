import type { Metadata } from 'next';

const BASE = 'https://toster.co';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const url = `${BASE}/${locale}/ai`;
  return {
    title: 'AI Features — Voice Operator, Marketing Agent, Forecasting',
    description: 'Claude-powered AI built into every layer of Toster: AI voice operator for phone orders, autonomous marketing agent, demand forecasting, reactivation flows, and Claude Vision for packing verification.',
    keywords: ['AI food delivery software', 'food delivery automation', 'AI restaurant management', 'food delivery voice operator AI', 'AI marketing food delivery'],
    openGraph: {
      title: 'Toster AI — Claude-Powered Food Delivery Automation',
      description: 'Voice operator, marketing agent, demand forecasting, and more — AI built in, not bolted on.',
      url,
    },
    alternates: { canonical: url },
  };
}

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
