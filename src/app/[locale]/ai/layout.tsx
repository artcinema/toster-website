import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Features — Voice Operator, Marketing Agent, Forecasting',
  description: 'Claude-powered AI built into every layer of Toster: AI voice operator for phone orders, autonomous marketing agent, demand forecasting, reactivation flows, and Claude Vision for packing verification.',
  keywords: ['AI food delivery software', 'food delivery automation', 'AI restaurant management', 'food delivery voice operator AI', 'AI marketing food delivery'],
  openGraph: {
    title: 'Toster AI — Claude-Powered Food Delivery Automation',
    description: 'Voice operator, marketing agent, demand forecasting, and more — AI built in, not bolted on.',
    url: 'https://toster.co/ai',
  },
  alternates: { canonical: 'https://toster.co/en/ai' },
};

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
