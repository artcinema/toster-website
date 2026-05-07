import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { locales, type Locale } from '@/i18n/config';
import { siteConfig } from '@/config/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/JsonLd';
import { ConsentGa } from '@/components/analytics/ConsentGa';
import { CookieBanner } from '@/components/CookieBanner';
import '../globals.css';

const titles: Record<Locale, string> = {
  en: 'Toster — Food Delivery Chain Management Platform',
  uk: 'Toster — CRM для мережі доставки їжі',
  ru: 'Toster — CRM для сети доставки еды',
  pl: 'Toster — CRM dla sieci dostaw jedzenia',
  cs: 'Toster — CRM pro síť doručování jídla',
  de: 'Toster — CRM für Lebensmittel-Lieferketten',
  es: 'Toster — CRM para cadenas de delivery',
};

const descriptions: Record<Locale, string> = {
  en: 'All-in-one CRM for food delivery chains. Orders, kitchen display, courier tracking, AI automation, and managed marketing — from 3% of monthly turnover.',
  uk: 'CRM-платформа для мережі доставки їжі. Замовлення, кухонний дисплей, трекінг кур\'єрів, AI-автоматизація та маркетинг — від 3% обороту.',
  ru: 'CRM-платформа для сети доставки еды. Заказы, кухонный дисплей, трекинг курьеров, AI-автоматизация и маркетинг — от 3% оборота.',
  pl: 'CRM dla sieci dostaw jedzenia. Zamówienia, wyświetlacz kuchenny, śledzenie kurierów, automatyzacja AI i marketing — od 3% miesięcznego obrotu.',
  cs: 'CRM pro sítě rozvozu jídla. Objednávky, kuchyňský displej, sledování kurýrů, AI automatizace a marketing — od 3 % měsíčního obratu.',
  de: 'CRM für Lieferdienst-Ketten. Bestellungen, Küchendisplay, Kuriertracking, KI-Automatisierung und Marketing — ab 3 % des monatlichen Umsatzes.',
  es: 'CRM para cadenas de delivery. Pedidos, pantalla de cocina, seguimiento de repartidores, automatización con IA y marketing gestionado — desde el 3% del ingreso.',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'optional',
});


export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (locales.includes(locale as Locale) ? locale : 'en') as Locale;
  const url = `${siteConfig.url}/${loc}`;

  return {
    title: {
      default: titles[loc],
      template: '%s | Toster',
    },
    description: descriptions[loc],
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
      title: titles[loc],
      description: descriptions[loc],
      url,
      images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Toster — Food Delivery CRM' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[loc],
      description: descriptions[loc],
      images: ['/api/og'],
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.url}/en`,
        uk: `${siteConfig.url}/uk`,
        ru: `${siteConfig.url}/ru`,
        pl: `${siteConfig.url}/pl`,
        cs: `${siteConfig.url}/cs`,
        de: `${siteConfig.url}/de`,
        es: `${siteConfig.url}/es`,
        'x-default': `${siteConfig.url}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    verification: {
      google: process.env['NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION'] ?? '',
      other: {
        'msvalidate.01': process.env['NEXT_PUBLIC_BING_SITE_VERIFICATION'] ?? '',
      },
    },
  };
}

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
      className={`${geistSans.variable} h-full`}
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
          <CookieBanner />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
        {process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'] && (
          <ConsentGa gaId={process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID']} />
        )}
      </body>
    </html>
  );
}
