import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features — Orders, Kitchen, Delivery, CRM, AI & More',
  description: 'Everything in one platform: order management with Kanban view, kitchen display system, courier tracking, customer loyalty, AI automation, branded website, and iOS/Android apps. Built for food delivery chains.',
  keywords: ['food delivery CRM features', 'kitchen display system', 'courier management software', 'food delivery order management', 'restaurant chain platform features'],
  openGraph: {
    title: 'Toster Features — Complete Food Delivery Chain Platform',
    description: 'Orders, Kitchen, Delivery, Customers, Marketing, Analytics, Finance, Inventory, Website, Apps — all in one platform.',
    url: 'https://toster.co/features',
  },
  alternates: { canonical: 'https://toster.co/en/features' },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
