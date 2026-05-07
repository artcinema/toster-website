import * as React from 'react';
import Link from 'next/link';
import * as Tabs from '@radix-ui/react-tabs';
import {
  ShoppingCart, ChefHat, Truck, Users, Megaphone,
  BarChart3, DollarSign, Package,
  Kanban, Zap, Globe, Camera, Clock, MapPin,
  Bot, Brain, TrendingUp, Shield, FileText,
  Warehouse, AlertTriangle, Import, Smartphone, Star, Bell, Search, Palette,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CourierMapBackground } from '@/components/ui/courier-map-background';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface TabConfig {
  id: string;
  label: string;
  icon: React.ElementType;
  features: Feature[];
}

const tabs: TabConfig[] = [
  {
    id: 'orders',
    label: 'Orders',
    icon: ShoppingCart,
    features: [
      { icon: Kanban, title: 'Kanban & Table view', description: 'Switch between kanban board and table view. Filter by status, channel, payment method, division.' },
      { icon: Zap, title: 'Smart routing', description: 'Auto-selects the best division for each order based on capacity, distance, and current load.' },
      { icon: Globe, title: 'Multi-channel intake', description: 'Phone, web, Telegram bot, POS, mobile app, and 11 aggregator platforms — all in one queue.' },
      { icon: Camera, title: 'Photo verification', description: 'Packer uploads a photo at packing stage. Claude Vision checks completeness before dispatch.' },
      { icon: Clock, title: 'Pre-orders & subscriptions', description: 'Schedule orders for future delivery. Set up recurring subscriptions — daily, weekly, monthly.' },
      { icon: ShoppingCart, title: 'Returns & refunds', description: 'Cancel and refund with one click. Loyalty bonuses are automatically returned to customer.' },
    ],
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: ChefHat,
    features: [
      { icon: ChefHat, title: 'Kitchen Display System', description: 'Real-time KDS screen for the kitchen. Orders appear instantly, sorted by time and priority.' },
      { icon: MapPin, title: 'Cook Bot with GPS shifts', description: 'Cooks start their shift by sharing GPS location. System assigns them to the nearest division within 500m.' },
      { icon: Zap, title: 'Per-roll assignment', description: 'Sushi sets are split into individual rolls. Each cook gets one roll at a time — timer starts automatically.' },
      { icon: BarChart3, title: 'Cook statistics', description: 'Track rolls completed, average time per roll, and shift duration for each cook.' },
      { icon: Camera, title: 'Packer QC', description: 'Packer confirms packing and uploads photo. Order moves to dispatch only after photo verification.' },
      { icon: Clock, title: 'Real-time status', description: 'Kitchen status visible to managers and dispatchers in real time via WebSocket updates.' },
    ],
  },
  {
    id: 'delivery',
    label: 'Delivery',
    icon: Truck,
    features: [
      { icon: MapPin, title: 'Live courier map', description: 'Real-time map showing all couriers and active orders. Dispatcher sees everything from one screen.' },
      { icon: Zap, title: 'VRP route optimization', description: 'Automated multi-stop route optimization. Batch assignments for maximum courier efficiency.' },
      { icon: Globe, title: 'Delivery zones', description: 'Draw polygon zones on a map. Set per-zone pricing, free delivery thresholds, and surge multipliers.' },
      { icon: TrendingUp, title: 'Surge pricing', description: 'Automatic delivery fee surcharges for peak hours and bad weather conditions.' },
      { icon: Shield, title: 'Geofencing', description: 'Automatic status updates when courier enters or exits delivery zone polygons.' },
      { icon: DollarSign, title: 'Courier earnings', description: 'Track earnings per delivery, per shift, per month. Export for payroll.' },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users,
    features: [
      { icon: Users, title: '360° customer profile', description: 'LTV, RFM score, churn risk, order history, communication log, loyalty balance, AI profile — all in one card.' },
      { icon: TrendingUp, title: 'RFM segmentation', description: 'Automatic segmentation by Recency, Frequency, Monetary value. Updates in real time as orders come in.' },
      { icon: Brain, title: 'LTV forecasting', description: 'AI-predicted lifetime value per customer. Used for marketing budget allocation and churn prevention.' },
      { icon: DollarSign, title: 'Loyalty program', description: '1% cashback on every order. Up to 30% of order total redeemable with bonus points.' },
      { icon: Zap, title: 'Promo codes', description: 'Percentage, fixed amount, free delivery, free product, or bonus points. QR codes, partner tracking, usage limits.' },
      { icon: Globe, title: 'Corporate accounts', description: 'Shared balance for B2B clients. Employee sub-accounts with individual daily and monthly spend limits.' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: Megaphone,
    features: [
      { icon: Megaphone, title: 'Multi-channel campaigns', description: 'Email, SMS, Push, Viber, Telegram, Meta Ads, Google Ads, and AI voice calls — from one interface.' },
      { icon: Clock, title: 'Automations', description: 'Welcome series, birthday offers, reactivation flows, post-order follow-ups — set once, run forever.' },
      { icon: Zap, title: 'A/B testing', description: 'Test subject lines, offers, timing. Auto-picks winner by conversion rate.' },
      { icon: TrendingUp, title: 'Multi-touch attribution', description: 'UTM capture, first-touch and last-touch attribution. Sync with Meta and Google Ads.' },
      { icon: Bot, title: 'AI Marketing Agent', description: 'Autonomous Claude-powered agent. Runs reactivation cascades, recovers abandoned carts, optimizes ROAS.' },
      { icon: Brain, title: 'Demand forecasting', description: 'Predicts order volume by hour. Recommends cook and courier counts per shift, adjusted for weather.' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    features: [
      { icon: BarChart3, title: 'Real-time dashboards', description: 'Revenue, kitchen throughput, courier efficiency, and heatmaps — live, no page refresh needed.' },
      { icon: Users, title: 'Cohort analysis', description: 'Track retention by acquisition cohort. See which channels bring the most loyal customers.' },
      { icon: MapPin, title: 'Heatmaps', description: 'Geographic order density maps by division, time of day, and delivery zone.' },
      { icon: FileText, title: 'BigQuery SQL', description: 'Custom SQL queries against your data in Google BigQuery. Save and schedule reports.' },
      { icon: DollarSign, title: 'P&L by period & location', description: 'Profit and loss statement per division, per month. Revenue minus COGS, labor, rent, and marketing.' },
      { icon: Brain, title: 'AI daily report', description: 'Owner receives a morning AI-generated summary: yesterday\'s performance, anomalies, and recommendations.' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: DollarSign,
    features: [
      { icon: DollarSign, title: 'Transaction tracking', description: 'Income, expenses, transfers, and refunds. Categorized, searchable, exportable.' },
      { icon: TrendingUp, title: 'Budget planning', description: 'Set budgets by category and period. Track plan vs. actual in real time.' },
      { icon: Clock, title: 'Tax calendar', description: 'Deadline tracking per jurisdiction. Never miss a filing date.' },
      { icon: Globe, title: 'Fiscalization (6 countries)', description: 'Checkbox (UA), KSEF (PL), EET (CZ), Fiskaly (DE), VeriFacTu (ES), Stripe Tax (US). Receipts generated automatically.' },
      { icon: TrendingUp, title: 'FX rates (EUR base)', description: 'Live exchange rates. Multi-currency P&L with automatic conversion.' },
      { icon: Shield, title: 'Treasury', description: 'Bank account balances, daily snapshots, cash flow visibility across all divisions.' },
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: Package,
    features: [
      { icon: Warehouse, title: 'Stock by ingredient & location', description: 'Real-time inventory levels per ingredient per division. Movement history with full audit trail.' },
      { icon: Zap, title: 'Recipe-based auto deduction', description: 'Every order automatically deducts ingredients based on recipes. No manual stock updates.' },
      { icon: Camera, title: 'OCR invoice scanning', description: 'Photo a supplier invoice → Claude Vision extracts line items → stock updated automatically.' },
      { icon: AlertTriangle, title: 'Min-stock alerts', description: 'Set minimum stock thresholds. Automatic alerts when stock falls below par.' },
      { icon: FileText, title: 'Inventory audit', description: 'Count sheets, reconciliation reports, variance analysis. Full inventory management workflow.' },
      { icon: Import, title: '1C import', description: 'Import products and inventory data from 1C ERP. Bulk sync with field mapping.' },
    ],
  },
  {
    id: 'website',
    label: 'Website',
    icon: Globe,
    features: [
      { icon: Globe, title: 'Branded ordering website', description: 'A fully branded customer-facing website on your domain. Menu, cart, checkout, and order tracking — ready to launch.' },
      { icon: Palette, title: 'Custom branding', description: 'Your logo, colours, and fonts. The storefront looks like your brand, not a white-label template.' },
      { icon: ShoppingCart, title: 'Full ordering flow', description: 'Category browsing, product pages, modifiers, cart, address input, promo codes, and multiple payment methods.' },
      { icon: Star, title: 'Loyalty & bonuses', description: 'Customers see their bonus balance, redeem points at checkout, and track order history — all on your website.' },
      { icon: Search, title: 'SEO-ready', description: 'Server-side rendered pages, structured data, sitemap, and canonical URLs. Ranks for your city and cuisine.' },
      { icon: Zap, title: 'Real-time order tracking', description: 'Live order status page with courier location on a map. Reduces support calls by up to 60%.' },
    ],
  },
  {
    id: 'apps',
    label: 'Apps',
    icon: Smartphone,
    features: [
      { icon: Smartphone, title: 'iOS & Android apps', description: 'Native mobile apps for your customers, published under your brand on the App Store and Google Play.' },
      { icon: Palette, title: 'White-label branding', description: 'Your name, icon, and splash screen. Customers download your app — not a generic platform.' },
      { icon: Bell, title: 'Push notifications', description: 'Order status updates, promo campaigns, and re-engagement pushes delivered natively to the lock screen.' },
      { icon: Star, title: 'Loyalty in-app', description: 'Bonus balance, order history, referral codes, and birthday rewards — all inside the app.' },
      { icon: ShoppingCart, title: 'Full ordering flow', description: 'Identical ordering experience to the website: menu, modifiers, cart, saved addresses, and one-tap reorder.' },
      { icon: MapPin, title: 'Live delivery tracking', description: 'Customers track their courier on a live map inside the app. ETA updates in real time.' },
    ],
  },
];

export default async function FeaturesPage() {
  const t = await getTranslations('Common');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        {/* Animated courier map — ghost layer */}
        <CourierMapBackground />

        {/* Centre radial fade so text is crisp */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0.30) 55%, transparent 100%)',
          }}
        />

        <Container className="relative z-20">
          <div className="mx-auto max-w-3xl text-center">
            <div>
              <Badge variant="yellow" className="mb-4">Features</Badge>
            </div>
            <h1
              className="mb-4 text-4xl font-semibold tracking-tight text-[#0A0A0A] sm:text-5xl"
              style={{ lineHeight: 1.08 }}
            >
              Everything you need to run food delivery, nothing you don&apos;t
            </h1>
            <p className="text-lg text-[#525252] leading-relaxed">
              Toster consolidates 5+ tools into one platform. Here&apos;s what you get.
            </p>
          </div>
        </Container>
      </section>

      {/* Tabbed Features */}
      <section className="bg-white pb-24 sm:pb-32">
        <Tabs.Root defaultValue="orders">
          {/* Tab List */}
          <div className="sticky top-16 z-30 border-b border-[#E5E5E5] bg-white/95 backdrop-blur-md">
            <Container>
              <Tabs.List className="flex gap-1 overflow-x-auto py-2 scrollbar-none" aria-label="Feature categories">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Tabs.Trigger
                      key={tab.id}
                      value={tab.id}
                      className="flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[#525252] transition-colors hover:bg-[#F5F5F5] hover:text-[#0A0A0A] data-[state=active]:bg-[#FFD600] data-[state=active]:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </Tabs.Trigger>
                  );
                })}
              </Tabs.List>
            </Container>
          </div>

          {/* Tab Panels */}
          <Container>
            {tabs.map((tab) => (
              <Tabs.Content key={tab.id} value={tab.id} className="outline-none">
                <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3">
                  {tab.features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={i}
                        className="feature-card rounded-2xl border border-[#E5E5E5] bg-white p-6 hover:border-[#FFD600]/50 transition-colors"
                      >
                        <div className="feature-icon-wrap mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F5F5]">
                          <Icon className="feature-icon h-5 w-5 text-[#0A0A0A]" />
                        </div>
                        <h3 className="mb-2 font-semibold text-[#0A0A0A]">{feature.title}</h3>
                        <p className="text-sm text-[#525252] leading-relaxed">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </Tabs.Content>
            ))}
          </Container>
        </Tabs.Root>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0A0A0A] py-20">
        <Container>
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl">
              See all 75+ pages in the live demo
            </h2>
            <p className="mb-8 text-white/60">Explore every feature with real demo data.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <Link href="/request-demo">{t('requestDemo')}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
