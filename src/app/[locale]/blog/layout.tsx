import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Food Delivery Operations & Growth',
  description: 'Insights on food delivery CRM, kitchen management, courier routing, AI automation, and scaling multi-location delivery chains. Practical guides from operators who run 25+ locations.',
  keywords: [
    'food delivery blog',
    'food delivery operations',
    'delivery chain management',
    'restaurant CRM guides',
    'kitchen display system tips',
    'courier management',
    'food delivery AI',
    'ghost kitchen operations',
    'multi-location restaurant management',
    'delivery marketing automation',
  ],
  openGraph: {
    title: 'Toster Blog — Food Delivery Operations & Growth',
    description: 'Practical insights from operators running 25+ food delivery locations across 4 countries.',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
