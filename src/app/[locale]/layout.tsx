import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { siteConfig } from '@/config/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/JsonLd';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: 'Toster — Food Delivery Chain Management Platform',
    template: '%s | Toster',
  },
  description: 'All-in-one CRM platform for food delivery chains. Orders, kitchen display, courier tracking, AI automation, and managed marketing — in one package. Trusted by 25+ locations across 4 countries.',
  metadataBase: new URL(siteConfig.url),
  keywords: [
    'food delivery CRM',
    'food delivery management software',
    'restaurant chain management platform',
    'multi-location food delivery software',
    'kitchen display system',
    'courier management system',
    'food delivery order management',
    'delivery chain CRM',
    'ghost kitchen software',
    'food delivery automation',
  ],
  authors: [{ name: 'Toster', url: siteConfig.url }],
  creator: 'Toster / ADS L.L.C-FZ',
  publisher: 'Toster',
  category: 'Software',
  openGraph: {
    type: 'website',
    siteName: 'Toster',
    title: 'Toster — Food Delivery Chain Management Platform',
    description: 'CRM + customer website + iOS/Android apps + managed marketing for food delivery chains. Revenue-based pricing from 3% of turnover.',
    url: siteConfig.url,
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Toster — Food Delivery CRM' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toster — Food Delivery Chain Management Platform',
    description: 'CRM + website + apps + marketing for food delivery chains.',
    images: ['/api/og'],
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en': `${siteConfig.url}/en`,
      'uk': `${siteConfig.url}/uk`,
      'ru': `${siteConfig.url}/ru`,
      'pl': `${siteConfig.url}/pl`,
      'cs': `${siteConfig.url}/cs`,
      'de': `${siteConfig.url}/de`,
      'es': `${siteConfig.url}/es`,
      'x-default': `${siteConfig.url}/en`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  verification: {
    google: process.env['NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION'] ?? '',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Toster',
  legalName: 'ADS L.L.C-FZ',
  url: 'https://toster.co',
  logo: 'https://toster.co/icon.svg',
  description: 'All-in-one CRM platform for food delivery chains. Orders, kitchen, courier, AI, and marketing automation in one platform.',
  email: 'hello@toster.co',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  sameAs: [
    'https://linkedin.com/company/toster-co',
    'https://t.me/no8288',
  ],
  foundingDate: '2024',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Toster',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description: 'Food delivery chain management platform: CRM, kitchen display, courier tracking, customer website, mobile apps, and managed marketing.',
  url: 'https://toster.co',
  offers: {
    '@type': 'Offer',
    price: '3',
    priceCurrency: 'PERCENT',
    description: 'From 3% of monthly turnover. Includes CRM, customer website, iOS & Android apps, and managed marketing.',
  },
  featureList: [
    'Order management with Kanban and table view',
    'Kitchen Display System (KDS)',
    'Real-time courier tracking with route optimisation',
    'Customer loyalty program with 1% cashback',
    'Branded customer website on your domain',
    'iOS and Android white-label apps',
    'Managed email, SMS, push, and Viber marketing campaigns',
    'AI automation with Claude: reactivation, forecasting, voice operator',
    'Multi-country fiscalization: UA, PL, CZ, DE, ES, US',
    'POS terminal',
    'RFM segmentation and LTV forecasting',
    'Integrations: Bolt Food, Glovo, Wolt, Uber Eats, LiqPay, Stripe',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Toster',
  url: 'https://toster.co',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://toster.co/en/features' },
    'query-input': 'required name=search_term_string',
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={softwareSchema} />
        <JsonLd data={websiteSchema} />
        <link rel="me" href="https://linkedin.com/company/toster-co" />
      </head>
      <body className="flex min-h-full flex-col bg-white text-[#0A0A0A] antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
