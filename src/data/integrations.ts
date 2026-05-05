export interface IntegrationFeature {
  title: string;
  body: string;
}

export interface IntegrationFaq {
  q: string;
  a: string;
}

export interface Integration {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  abbr: string;
  category: string;
  externalUrl: string;
  features: IntegrationFeature[];
  howItWorks: string;
  useCases: string[];
  faq: IntegrationFaq[];
  relatedSlugs: string[];
}

export const integrations: Integration[] = [
  {
    slug: 'liqpay',
    name: 'LiqPay',
    tagline: 'Accept payments in Ukraine via cards, Apple Pay, and Google Pay',
    description: 'LiqPay is the leading Ukrainian payment gateway by PrivatBank. Toster integrates LiqPay natively for all order channels — website, mobile app, and Telegram bot — with automatic reconciliation and refund support.',
    color: '#0070BA',
    abbr: 'LP',
    category: 'Payments',
    externalUrl: 'https://liqpay.ua',
    features: [
      {
        title: 'Full payment coverage for Ukrainian market',
        body: 'Accept Visa, Mastercard, Apple Pay, Google Pay, and PrivatBank bank transfers. Works with all major Ukrainian banks, including Monobank, OTP, PUMB, and Alfa-Bank.',
      },
      {
        title: 'Automatic order creation on payment',
        body: 'When a customer pays via the Toster-powered website or app, the order is created in the CRM automatically — no manual entry, no dropped orders during peak hours.',
      },
      {
        title: 'Loyalty bonus redemption via payment flow',
        body: "Customers can apply their cashback balance at checkout. Toster calculates the eligible bonus amount (up to 30% of subtotal) and splits the transaction between LiqPay and the loyalty balance.",
      },
      {
        title: 'One-click refunds from CRM',
        body: 'Process full or partial refunds directly from the order card in Toster. Refund status syncs back from LiqPay automatically — no separate login to the LiqPay dashboard required.',
      },
      {
        title: 'Fiscal receipt integration (ПРРО)',
        body: "LiqPay transactions automatically trigger a fiscal receipt via Ukraine's ПРРО system. Compliant with the Law of Ukraine No. 1053-IX on RRO.",
      },
    ],
    howItWorks: 'After connecting your LiqPay merchant account in Toster settings, all payment links generated for orders route through LiqPay. Customers pay via any supported method; the payment status webhook updates the order in Toster within seconds. Reconciliation reports are available daily in the Toster Finance section.',
    useCases: [
      'Customer orders via your Toster-powered website and pays with Apple Pay via LiqPay',
      'Phone operator creates an order and sends a payment link via Telegram or SMS — customer pays before the courier arrives',
      'B2B corporate client pays by bank transfer — LiqPay invoice is auto-generated from the order',
      'Customer requests a partial refund due to missing item — manager processes it in one click from the order card',
    ],
    faq: [
      {
        q: 'Do I need a separate LiqPay merchant account?',
        a: 'Yes. You need a LiqPay merchant account (registered through PrivatBank). Toster connects to your existing merchant account — we never hold your funds or act as a payment intermediary.',
      },
      {
        q: 'What is the LiqPay transaction fee?',
        a: "LiqPay charges 2.75% for card transactions (Visa/Mastercard) and 1% for PrivatPay. Bank transfers are typically 0.5%. These are LiqPay's fees — Toster doesn't charge an additional payment processing fee on top.",
      },
      {
        q: 'Can customers pay with installments (рассрочка)?',
        a: 'Yes, if your LiqPay account is configured for installment payments (оплата частями). Toster passes through the payment parameters to LiqPay — configuration is done on the LiqPay merchant side.',
      },
      {
        q: 'Is LiqPay available in Poland or other EU countries?',
        a: "LiqPay is a Ukrainian payment provider and is primarily used for UAH transactions in Ukraine. For EU markets (Poland, Czech Republic, Germany), Toster integrates Stripe instead.",
      },
      {
        q: 'How long does the LiqPay integration setup take?',
        a: "Connecting LiqPay takes about 15 minutes once you have your LiqPay merchant credentials (public key and private key). Toster's onboarding team walks you through it during setup.",
      },
    ],
    relatedSlugs: ['stripe', 'telegram', 'sendpulse'],
  },
  {
    slug: 'stripe',
    name: 'Stripe',
    tagline: 'Accept card payments across Poland, Czech Republic, Germany, and beyond',
    description: 'Stripe powers Toster payments in EU markets. With Stripe, your delivery chain can accept cards, Apple Pay, Google Pay, and local payment methods in Poland, Czech Republic, Germany, and other Stripe-supported countries.',
    color: '#635BFF',
    abbr: 'ST',
    category: 'Payments',
    externalUrl: 'https://stripe.com',
    features: [
      {
        title: 'EU market coverage out of the box',
        body: 'Accept payments in PLN, CZK, EUR, and 135+ other currencies. Stripe handles the currency conversion, local tax rules, and card network requirements automatically.',
      },
      {
        title: 'Apple Pay and Google Pay on web and mobile',
        body: "Customers on your Toster-powered website and iOS/Android app see Apple Pay or Google Pay as the default option — no additional configuration required on your end once Stripe is connected.",
      },
      {
        title: 'Stripe Radar fraud protection',
        body: "Stripe's machine learning fraud detection runs on every transaction. Toster surfaces declined transactions with the reason code so your operators can follow up without guessing.",
      },
      {
        title: 'Automatic VAT and local tax compliance',
        body: 'Stripe Tax can calculate and collect VAT/GST for EU transactions automatically. Combined with Toster, this reduces the accounting overhead for multi-country chains significantly.',
      },
      {
        title: 'Webhook-powered order confirmation',
        body: "Stripe payment webhooks update the order status in Toster within 2 seconds of payment confirmation — fast enough that the kitchen receives the order before the customer puts their phone down.",
      },
    ],
    howItWorks: "Connect your Stripe account in Toster settings using the Stripe Connect OAuth flow. Once connected, all Toster payment links and in-app checkout flows route through Stripe. Stripe handles the payment UI, 3D Secure authentication, and card storage. Toster receives the webhook and creates or updates the order automatically.",
    useCases: [
      'Customer in Warsaw orders via your Toster app and pays with BLIK (Stripe-supported in Poland)',
      'Customer in Prague orders via your website and pays with card — CZK amount confirmed instantly',
      'German customer pays with Giropay via Stripe on your Toster-powered website',
      'Subscription-based corporate account billed monthly via Stripe with automatic retry on failed payments',
    ],
    faq: [
      {
        q: 'Do I need a Stripe account for each country?',
        a: 'No. A single Stripe account can accept payments in 40+ countries and 135+ currencies. You can run your Polish, Czech, and German locations from one Stripe account.',
      },
      {
        q: 'What local payment methods does Stripe support in Poland?',
        a: 'Stripe supports BLIK, P24 (Przelewy24), and card payments in Poland. Toster configures which methods appear at checkout based on your Stripe account settings.',
      },
      {
        q: 'Is Stripe available in Ukraine?',
        a: "Stripe's full merchant services are not available in Ukraine (as of 2026). For Ukrainian operations, Toster integrates LiqPay instead. If you operate in both Ukraine and EU, you'll have both LiqPay (for UA) and Stripe (for EU) configured separately per location.",
      },
      {
        q: "What's the Stripe transaction fee?",
        a: 'Standard Stripe pricing is 1.5% + €0.25 for European cards and 2.5% + €0.25 for non-European cards. Volume discounts are available via Stripe directly for high-volume chains. Toster does not add fees on top of Stripe.',
      },
      {
        q: 'Does Stripe support SEPA Direct Debit for recurring B2B billing?',
        a: "Yes. If you have corporate accounts that pay on a recurring basis, Stripe supports SEPA Direct Debit mandates. This can be configured for B2B customers directly in Toster's account management section.",
      },
    ],
    relatedSlugs: ['liqpay', 'telegram', 'sendpulse'],
  },
  {
    slug: 'sendpulse',
    name: 'SendPulse',
    tagline: 'Email, SMS, Viber, and push marketing — automated from your CRM data',
    description: 'SendPulse is the marketing automation platform at the heart of Toster marketing. Customer segments from Toster (RFM, churn risk, cohort) flow directly into SendPulse campaigns. Toster manages these campaigns for you as part of the Revenue plan.',
    color: '#3F51B5',
    abbr: 'SP',
    category: 'Marketing',
    externalUrl: 'https://sendpulse.com',
    features: [
      {
        title: 'Email, SMS, Viber, and push in one platform',
        body: "SendPulse covers all four channels that matter for food delivery retention: email (newsletters, reactivation), SMS (order confirmations, promos), Viber (UA/PL-dominant channel for business messages), and web push. Toster's team manages campaigns across all four channels from your CRM data.",
      },
      {
        title: 'Automated reactivation flows',
        body: 'Toster identifies customers at churn risk (no order in 14, 30, or 60 days, depending on your average order frequency). These customers automatically enter a reactivation flow in SendPulse — a sequence of 3–5 messages across channels.',
      },
      {
        title: 'RFM-based segmentation',
        body: 'Your customers are automatically scored by Recency, Frequency, and Monetary value. High-value customers get different messaging than low-frequency ones. This segmentation updates daily as orders come in.',
      },
      {
        title: 'Transactional messages (order updates)',
        body: 'Order confirmed, order cooking, courier dispatched, order delivered — all transactional message templates run through SendPulse. Customers stay informed without your operators sending manual messages.',
      },
      {
        title: 'Conversion tracking back to orders',
        body: 'When a customer clicks a campaign link and places an order within 48 hours, the order is attributed to the campaign in Toster reports. You can measure exact revenue per campaign.',
      },
    ],
    howItWorks: 'Toster syncs customer data to SendPulse via API in real time after each order. Campaign triggers (reactivation threshold crossed, birthday approaching, loyalty milestone reached) fire from Toster and execute message sequences in SendPulse. For the Revenue plan, Toster\'s marketing team manages the campaign calendar, writes copy, and reports monthly on campaign revenue attribution.',
    useCases: [
      "Customer places their 10th order → loyalty milestone Viber message with special promo fires automatically",
      'Customer hasn\'t ordered in 21 days → enters "we miss you" reactivation flow with escalating offers',
      'Friday 11am → weekly "weekend special" push notification sent to all customers who ordered in the last 30 days',
      "Customer's birthday in 7 days → birthday discount email sent with unique promo code",
    ],
    faq: [
      {
        q: 'Do I need a separate SendPulse account?',
        a: "For the Revenue plan, Toster manages SendPulse on your behalf using a shared account — you don't need your own. For custom setups or the Start plan, you can connect your own SendPulse account.",
      },
      {
        q: 'What languages do campaign messages support?',
        a: 'SendPulse supports all major languages. Toster manages campaigns in the language(s) matching your customer base — Ukrainian, Polish, Czech, German, English, Russian, or Spanish.',
      },
      {
        q: 'Is Viber messaging available in Poland and Czech Republic?',
        a: 'Yes. Viber Business Messages are available throughout Eastern Europe including Poland and Czech Republic. Viber typically has higher open rates than email in these markets for promotional messages.',
      },
      {
        q: 'Can I see campaign performance data in Toster?',
        a: 'Yes. Campaign revenue attribution (orders placed within 48h of a campaign click) appears in the Toster Marketing report. For detailed open/click rates, you can access the SendPulse dashboard directly.',
      },
      {
        q: "What's the difference between managed marketing and self-serve?",
        a: "The Revenue plan includes managed marketing: Toster's team writes campaign copy, schedules sends, and provides monthly reports. The Start plan includes the SendPulse connection but you manage campaigns yourself. Either way, the RFM data from Toster flows into SendPulse automatically.",
      },
    ],
    relatedSlugs: ['telegram', 'liqpay', 'stripe'],
  },
  {
    slug: 'telegram',
    name: 'Telegram',
    tagline: '7 purpose-built bots for operators, couriers, kitchen staff, and customers',
    description: "Telegram is the operational backbone of Toster's daily workflows. Seven purpose-built bots connect every role in the delivery chain — from customer ordering to courier dispatch to kitchen production — without requiring a custom mobile app for staff.",
    color: '#2AABEE',
    abbr: 'TG',
    category: 'Operations',
    externalUrl: 'https://telegram.org',
    features: [
      {
        title: 'Customer ordering bot',
        body: 'Customers can browse your menu, place orders, track delivery status, and check their loyalty balance entirely within Telegram. No app download required — the bot works on any device.',
      },
      {
        title: 'Courier GPS sharing and dispatch',
        body: "Couriers share live GPS via the courier bot. Dispatchers see all active couriers on the map in Toster, assign orders with one click, and couriers receive the delivery address with a navigation link — all inside Telegram.",
      },
      {
        title: 'Kitchen and cook workflow bot',
        body: 'Cooks start their shift by sharing location (system validates they\'re within 500m of their division). New orders appear on their screen with a timer. They confirm each item ready; the packer bot takes over for QC.',
      },
      {
        title: 'Packer photo verification bot',
        body: 'Packers receive packing tasks and upload a photo of the completed order via the packer bot. The photo is reviewed (manually or via AI) before the order moves to courier dispatch.',
      },
      {
        title: 'Manager and owner notification bot',
        body: 'Owner and manager bots send real-time alerts: new orders, delayed deliveries, courier offline, daily revenue reports, and low inventory warnings — all without requiring a CRM login.',
      },
    ],
    howItWorks: "Each role gets their own dedicated Telegram bot. Staff link their Telegram account to their Toster profile once (via a /start command with a unique code). From that point, all role-specific notifications, tasks, and commands flow through their designated bot. Bots communicate with the Toster backend via webhooks — typical latency under 1 second from event to bot notification.",
    useCases: [
      'Courier marks order as delivered via Telegram bot → CRM updates status, loyalty cashback credited, customer receives notification',
      'Kitchen cook marks all rolls ready → packer bot notified → packer uploads photo → dispatcher receives "ready for pickup" signal',
      'Owner receives daily revenue report at 23:00 via Telegram with comparison to last 7 days',
      'Customer sends /status to client bot → receives real-time courier location and ETA',
    ],
    faq: [
      {
        q: 'Do customers need a Telegram account to order?',
        a: "Yes. The customer ordering bot requires Telegram. For customers who prefer not to use Telegram, Toster also provides a branded website and iOS/Android app as alternative order channels.",
      },
      {
        q: 'What happens if a courier loses internet connection?',
        a: "Toster uses the last known GPS position and timestamps the loss of signal. The dispatcher sees the courier as 'offline' on the map and can manually reassign their orders if the gap exceeds your configured threshold (default: 5 minutes).",
      },
      {
        q: 'Can the bots be customized with our brand?',
        a: 'The customer-facing bot can be configured with your brand name, logo, and custom welcome message. Staff bots use the Toster name by default.',
      },
      {
        q: 'Are bots available in Ukraine and Poland?',
        a: "Yes. Telegram is widely used in Ukraine and Poland. The bots support Ukrainian, Polish, Russian, English, and other languages — configured per user preference.",
      },
      {
        q: 'How many concurrent users can the bots handle?',
        a: 'The bots use long-polling with a Node.js backend. We have tested them at 500+ concurrent active users without degradation. For larger operations, bots are deployable in a horizontally scaled configuration.',
      },
    ],
    relatedSlugs: ['sendpulse', 'liqpay', 'stripe'],
  },
];

export function getIntegrationBySlug(slug: string): Integration | undefined {
  return integrations.find((i) => i.slug === slug);
}

export function getRelatedIntegrations(slug: string): Integration[] {
  const integration = getIntegrationBySlug(slug);
  if (!integration) return [];
  return integration.relatedSlugs
    .map((s) => getIntegrationBySlug(s))
    .filter((i): i is Integration => Boolean(i));
}
