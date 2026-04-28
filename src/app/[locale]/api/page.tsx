'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Key, Lock, Zap, ShoppingCart, Users, Package, ChefHat,
  Truck, BarChart2, Star, Tag, Bell, Code2, Copy, Check,
  ArrowRight, Shield, Globe, AlertCircle,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { fadeInUp, staggerChildren } from '@/lib/motion';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Endpoint {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  scope?: string;
}

interface ApiSection {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  endpoints: Endpoint[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BASE_URL = 'https://api.toster.co/api';

const SCOPES = [
  { scope: 'orders:read',     description: 'Read orders and order history' },
  { scope: 'orders:write',    description: 'Create and update orders' },
  { scope: 'customers:read',  description: 'Access customer profiles and segments' },
  { scope: 'customers:write', description: 'Update customer data and tags' },
  { scope: 'products:read',   description: 'Read menu items and categories' },
  { scope: 'kitchen:read',    description: 'Monitor kitchen queue and status' },
  { scope: 'couriers:read',   description: 'View courier assignments and GPS' },
  { scope: 'analytics:read',  description: 'Access revenue and performance data' },
  { scope: 'loyalty:read',    description: 'Read loyalty balances and history' },
  { scope: 'loyalty:write',   description: 'Award and redeem loyalty bonuses' },
  { scope: 'reviews:read',    description: 'Read customer reviews and ratings' },
  { scope: 'webhooks:write',  description: 'Subscribe to real-time event hooks' },
];

const SECTIONS: ApiSection[] = [
  {
    id: 'orders',
    icon: ShoppingCart,
    title: 'Orders',
    description: 'Create, read, and manage the full order lifecycle from placement to delivery.',
    color: '#3B82F6',
    endpoints: [
      { method: 'GET',   path: '/orders',            description: 'List orders with pagination and filters',                scope: 'orders:read'  },
      { method: 'GET',   path: '/orders/:id',        description: 'Get a single order with full details',                  scope: 'orders:read'  },
      { method: 'POST',  path: '/orders',            description: 'Create a new order',                                    scope: 'orders:write' },
      { method: 'PATCH', path: '/orders/:id/status', description: 'Advance order status through the delivery pipeline',    scope: 'orders:write' },
      { method: 'GET',   path: '/orders/:id/track',  description: 'Get real-time courier GPS and ETA for an order',        scope: 'orders:read'  },
    ],
  },
  {
    id: 'customers',
    icon: Users,
    title: 'Customers',
    description: 'Access and manage customer profiles, tags, segments, and purchase history.',
    color: '#8B5CF6',
    endpoints: [
      { method: 'GET',   path: '/customers',         description: 'Search and list customers',               scope: 'customers:read'  },
      { method: 'GET',   path: '/customers/:id',     description: 'Get customer profile with order history', scope: 'customers:read'  },
      { method: 'PATCH', path: '/customers/:id',     description: 'Update tags, notes, or contact info',     scope: 'customers:write' },
      { method: 'GET',   path: '/customers/:id/orders', description: 'Paginated order history for a customer', scope: 'customers:read' },
    ],
  },
  {
    id: 'products',
    icon: Package,
    title: 'Menu & Products',
    description: 'Read your full menu catalogue including categories, modifiers, and pricing.',
    color: '#F59E0B',
    endpoints: [
      { method: 'GET', path: '/products',           description: 'List all products with categories',       scope: 'products:read' },
      { method: 'GET', path: '/products/:id',       description: 'Get a single product with all modifiers', scope: 'products:read' },
      { method: 'GET', path: '/products/categories', description: 'List all menu categories',               scope: 'products:read' },
    ],
  },
  {
    id: 'kitchen',
    icon: ChefHat,
    title: 'Kitchen',
    description: 'Monitor the live kitchen queue and cooking status for each station.',
    color: '#EF4444',
    endpoints: [
      { method: 'GET',   path: '/kitchen/queue',        description: 'Current kitchen queue ordered by priority', scope: 'kitchen:read' },
      { method: 'GET',   path: '/kitchen/stats',        description: 'Average prep time and throughput metrics',  scope: 'kitchen:read' },
    ],
  },
  {
    id: 'couriers',
    icon: Truck,
    title: 'Couriers',
    description: 'Track courier locations, assignments, and shift performance in real time.',
    color: '#10B981',
    endpoints: [
      { method: 'GET', path: '/couriers',          description: 'List all couriers with current status',      scope: 'couriers:read' },
      { method: 'GET', path: '/couriers/:id',      description: 'Get courier profile and active assignment',  scope: 'couriers:read' },
      { method: 'GET', path: '/couriers/:id/location', description: 'Latest GPS coordinates and route',       scope: 'couriers:read' },
    ],
  },
  {
    id: 'analytics',
    icon: BarChart2,
    title: 'Analytics',
    description: 'Pull revenue, order volume, and funnel data for any date range.',
    color: '#6366F1',
    endpoints: [
      { method: 'GET', path: '/analytics/revenue',  description: 'Revenue totals broken down by day or hour', scope: 'analytics:read' },
      { method: 'GET', path: '/analytics/orders',   description: 'Order count, AOV, and conversion rate',     scope: 'analytics:read' },
      { method: 'GET', path: '/analytics/top-products', description: 'Best-selling items by quantity and revenue', scope: 'analytics:read' },
    ],
  },
  {
    id: 'loyalty',
    icon: Star,
    title: 'Loyalty',
    description: 'Read and manage loyalty balances, award bonuses, and process redemptions.',
    color: '#F59E0B',
    endpoints: [
      { method: 'GET',  path: '/loyalty/:customer_id',         description: 'Get loyalty balance and tier',        scope: 'loyalty:read'  },
      { method: 'GET',  path: '/loyalty/:customer_id/history', description: 'Bonus earn and spend history',        scope: 'loyalty:read'  },
      { method: 'POST', path: '/loyalty/award',                description: 'Award bonus points to a customer',    scope: 'loyalty:write' },
    ],
  },
  {
    id: 'webhooks',
    icon: Bell,
    title: 'Webhooks',
    description: 'Subscribe to real-time events pushed to your endpoint via HTTPS POST.',
    color: '#EC4899',
    endpoints: [
      { method: 'GET',    path: '/webhooks',       description: 'List active webhook subscriptions',   scope: 'webhooks:write' },
      { method: 'POST',   path: '/webhooks',       description: 'Create a new webhook subscription',   scope: 'webhooks:write' },
      { method: 'DELETE', path: '/webhooks/:id',   description: 'Remove a webhook subscription',       scope: 'webhooks:write' },
    ],
  },
];

const WEBHOOK_EVENTS = [
  'order.created', 'order.confirmed', 'order.cooking', 'order.packed',
  'order.dispatched', 'order.delivered', 'order.cancelled',
  'customer.created', 'review.submitted', 'loyalty.awarded',
];

const METHOD_COLORS: Record<string, string> = {
  GET:    'bg-[#ECFDF5] text-[#059669]',
  POST:   'bg-[#EFF6FF] text-[#2563EB]',
  PATCH:  'bg-[#FFF7ED] text-[#D97706]',
  PUT:    'bg-[#FFF7ED] text-[#D97706]',
  DELETE: 'bg-[#FEF2F2] text-[#DC2626]',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="ml-2 text-[#A3A3A3] hover:text-white transition-colors">
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  return (
    <div className="relative rounded-xl bg-[#0A0A0A] border border-[#1F1F1F] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1F1F1F]">
        <span className="text-xs text-[#555]">{lang}</span>
        <CopyButton text={code} />
      </div>
      <pre className="px-4 py-4 text-sm text-[#E5E5E5] overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function EndpointRow({ ep }: { ep: Endpoint }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#F5F5F5] last:border-0">
      <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold font-mono w-14 text-center ${METHOD_COLORS[ep.method]}`}>
        {ep.method}
      </span>
      <div className="min-w-0 flex-1">
        <code className="text-sm font-mono text-[#0A0A0A]">{ep.path}</code>
        <p className="mt-0.5 text-xs text-[#737373]">{ep.description}</p>
      </div>
      {ep.scope && (
        <span className="shrink-0 rounded-full bg-[#F5F5F5] px-2 py-0.5 text-[10px] font-mono text-[#737373]">
          {ep.scope}
        </span>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApiPage() {
  const [activeSection, setActiveSection] = React.useState('overview');

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="border-b border-[#E5E5E5] bg-[#FAFAFA] py-16">
        <Container>
          <motion.div {...fadeInUp} className="max-w-2xl">
            <Badge className="mb-4 gap-1.5 bg-[#FFF9C4] text-[#92400E] border-0">
              <Code2 className="h-3 w-3" />
              Public API · v1
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-5xl">
              Toster API
            </h1>
            <p className="mt-4 text-lg text-[#525252]">
              REST API to read orders, customers, analytics, and more — or push data
              back into Toster from any external system. Everything uses standard JSON
              over HTTPS.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-4 py-2 text-sm text-[#525252]">
                <Globe className="h-4 w-4 text-[#A3A3A3]" />
                <code className="font-mono text-xs">{BASE_URL}</code>
                <CopyButton text={BASE_URL} />
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-4 py-2 text-sm text-[#525252]">
                <Zap className="h-4 w-4 text-[#A3A3A3]" />
                1 000 req / min per key
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-4 py-2 text-sm text-[#525252]">
                <Shield className="h-4 w-4 text-[#A3A3A3]" />
                TLS 1.3 · scope-based auth
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <Container>
        <div className="flex gap-10 py-12">

          {/* Sidebar nav */}
          <aside className="hidden w-48 shrink-0 lg:block">
            <div className="sticky top-8 space-y-1">
              {[
                { id: 'overview',       label: 'Overview'      },
                { id: 'authentication', label: 'Authentication' },
                { id: 'scopes',         label: 'Scopes'        },
                { id: 'errors',         label: 'Errors'        },
                ...SECTIONS.map((s) => ({ id: s.id, label: s.title })),
                { id: 'webhooks-guide', label: 'Webhook Events' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveSection(item.id)}
                  className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#FFF9C4] font-medium text-[#0A0A0A]'
                      : 'text-[#737373] hover:text-[#0A0A0A]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1 space-y-16">

            {/* Overview */}
            <motion.section id="overview" {...fadeInUp}>
              <h2 className="text-2xl font-bold text-[#0A0A0A]">Overview</h2>
              <p className="mt-3 text-[#525252]">
                All API endpoints are REST and return JSON. Authentication uses a Bearer
                token sent in the <code className="font-mono text-sm bg-[#F5F5F5] px-1 rounded">Authorization</code> header.
                Each API key carries a set of scopes that controls exactly which endpoints it can reach.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Lock,    title: 'Scoped API keys',    desc: 'Grant only the permissions your integration needs.' },
                  { icon: Zap,     title: '1 000 req/min',      desc: 'Per-key rate limit with standard 429 response.' },
                  { icon: Bell,    title: 'Webhooks',           desc: 'Push events to your endpoint instead of polling.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-xl border border-[#E5E5E5] p-4">
                    <Icon className="mb-2 h-5 w-5 text-[#FFD600]" />
                    <div className="font-semibold text-[#0A0A0A]">{title}</div>
                    <p className="mt-1 text-xs text-[#737373]">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Authentication */}
            <motion.section id="authentication" {...fadeInUp}>
              <h2 className="text-2xl font-bold text-[#0A0A0A]">Authentication</h2>
              <p className="mt-3 text-[#525252]">
                Generate an API key in <strong>Settings → API Keys</strong> inside your Toster dashboard.
                Keys look like <code className="font-mono text-sm bg-[#F5F5F5] px-1 rounded">966_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</code>.
              </p>
              <p className="mt-2 text-[#525252]">
                Pass the key as a Bearer token on every request:
              </p>
              <div className="mt-4 space-y-4">
                <CodeBlock lang="bash" code={`curl ${BASE_URL}/orders \\
  -H "Authorization: Bearer 966_YOUR_API_KEY" \\
  -H "Accept: application/json"`} />

                <CodeBlock lang="javascript" code={`const res = await fetch('${BASE_URL}/orders', {
  headers: {
    Authorization: 'Bearer 966_YOUR_API_KEY',
    Accept: 'application/json',
  },
});
const { items, total } = await res.json();`} />
              </div>
              <div className="mt-4 flex gap-2 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-4 text-sm text-[#92400E]">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Never expose your API key in client-side code. Rotate keys immediately if compromised.</span>
              </div>
            </motion.section>

            {/* Scopes */}
            <motion.section id="scopes" {...fadeInUp}>
              <h2 className="text-2xl font-bold text-[#0A0A0A]">Scopes</h2>
              <p className="mt-3 text-[#525252]">
                Each key is issued with a set of scopes. Calling an endpoint without the required scope
                returns <code className="font-mono text-sm bg-[#F5F5F5] px-1 rounded">403 Forbidden</code>.
              </p>
              <div className="mt-4 overflow-hidden rounded-xl border border-[#E5E5E5]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#F5F5F5] bg-[#FAFAFA]">
                      <th className="px-4 py-2.5 text-left font-semibold text-[#0A0A0A]">Scope</th>
                      <th className="px-4 py-2.5 text-left font-semibold text-[#0A0A0A]">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCOPES.map(({ scope, description }) => (
                      <tr key={scope} className="border-b border-[#F5F5F5] last:border-0">
                        <td className="px-4 py-2.5">
                          <code className="font-mono text-xs text-[#2563EB]">{scope}</code>
                        </td>
                        <td className="px-4 py-2.5 text-[#525252]">{description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* Pagination & Errors */}
            <motion.section id="errors" {...fadeInUp}>
              <h2 className="text-2xl font-bold text-[#0A0A0A]">Pagination & Errors</h2>
              <p className="mt-3 text-[#525252]">
                List endpoints support <code className="font-mono text-sm bg-[#F5F5F5] px-1 rounded">?page=1&limit=20</code> (max 100).
                The response envelope is always:
              </p>
              <div className="mt-4">
                <CodeBlock lang="json" code={`{
  "items": [...],
  "total": 1842,
  "page": 1,
  "pages": 93
}`} />
              </div>
              <p className="mt-6 text-[#525252]">Errors follow a consistent shape:</p>
              <div className="mt-4">
                <CodeBlock lang="json" code={`{
  "error": "Order not found",
  "details": { "id": "ord_abc123" }
}`} />
              </div>
              <div className="mt-4 overflow-hidden rounded-xl border border-[#E5E5E5]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#F5F5F5] bg-[#FAFAFA]">
                      <th className="px-4 py-2.5 text-left font-semibold text-[#0A0A0A]">Status</th>
                      <th className="px-4 py-2.5 text-left font-semibold text-[#0A0A0A]">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['200 OK',                  'Success'],
                      ['201 Created',             'Resource created successfully'],
                      ['400 Bad Request',         'Invalid parameters or missing required fields'],
                      ['401 Unauthorized',        'Missing or invalid API key'],
                      ['403 Forbidden',           'Key lacks the required scope'],
                      ['404 Not Found',           'Resource does not exist in your org'],
                      ['429 Too Many Requests',   'Rate limit exceeded — back off and retry'],
                      ['500 Internal Server Error','Something went wrong on our side'],
                    ].map(([status, meaning]) => (
                      <tr key={status} className="border-b border-[#F5F5F5] last:border-0">
                        <td className="px-4 py-2.5">
                          <code className="font-mono text-xs text-[#0A0A0A]">{status}</code>
                        </td>
                        <td className="px-4 py-2.5 text-[#525252]">{meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* Endpoint sections */}
            {SECTIONS.filter((s) => s.id !== 'webhooks').map((section) => {
              const Icon = section.icon;
              return (
                <motion.section key={section.id} id={section.id} {...fadeInUp}>
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ background: `${section.color}18` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: section.color }} />
                    </span>
                    <h2 className="text-2xl font-bold text-[#0A0A0A]">{section.title}</h2>
                  </div>
                  <p className="mt-2 text-[#525252]">{section.description}</p>
                  <div className="mt-4 overflow-hidden rounded-xl border border-[#E5E5E5]">
                    {section.endpoints.map((ep) => (
                      <EndpointRow key={`${ep.method}${ep.path}`} ep={ep} />
                    ))}
                  </div>
                </motion.section>
              );
            })}

            {/* Webhooks guide */}
            <motion.section id="webhooks-guide" {...fadeInUp}>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FCE7F3]">
                  <Bell className="h-4 w-4 text-[#EC4899]" />
                </span>
                <h2 className="text-2xl font-bold text-[#0A0A0A]">Webhook Events</h2>
              </div>
              <p className="mt-2 text-[#525252]">
                Instead of polling, subscribe to events and Toster will POST a JSON payload
                to your URL within seconds of the event firing.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {WEBHOOK_EVENTS.map((e) => (
                  <code key={e} className="rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-1 text-xs font-mono text-[#525252]">
                    {e}
                  </code>
                ))}
              </div>

              <p className="mt-6 text-[#525252]">Example <code className="font-mono text-sm bg-[#F5F5F5] px-1 rounded">order.created</code> payload:</p>
              <div className="mt-4">
                <CodeBlock lang="json" code={`{
  "event": "order.created",
  "created_at": "2026-04-28T14:22:00Z",
  "data": {
    "id": "clx7...",
    "number": 4821,
    "status": "NEW",
    "total": 1250,
    "customer": {
      "id": "clx8...",
      "name": "Anna K.",
      "phone": "+380671234567"
    },
    "items": [
      { "name": "Philadelphia Roll", "qty": 2, "price": 340 }
    ]
  }
}`} />
              </div>

              <p className="mt-6 text-[#525252]">
                Verify the request is from Toster using the <code className="font-mono text-sm bg-[#F5F5F5] px-1 rounded">X-Toster-Signature</code> header —
                an HMAC-SHA256 of the raw body signed with your webhook secret.
              </p>
              <div className="mt-4">
                <CodeBlock lang="javascript" code={`import { createHmac } from 'crypto';

function verifySignature(rawBody, signature, secret) {
  const expected = createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  return \`sha256=\${expected}\` === signature;
}`} />
              </div>
            </motion.section>

            {/* CTA */}
            <motion.section {...fadeInUp} className="rounded-2xl bg-[#0A0A0A] p-8 text-center">
              <Key className="mx-auto mb-4 h-8 w-8 text-[#FFD600]" />
              <h3 className="text-xl font-bold text-white">Ready to integrate?</h3>
              <p className="mt-2 text-sm text-[#A3A3A3]">
                Generate your first API key from the Toster dashboard in under a minute.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-[#FFD600] text-[#0A0A0A] hover:bg-[#F5CC00]">
                  <a href={siteConfig.appUrl} target="_blank" rel="noopener noreferrer">
                    Open Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg" className="border-[#333] text-white hover:bg-[#1A1A1A]">
                  <a href="mailto:hello@toster.co">Contact us</a>
                </Button>
              </div>
            </motion.section>

          </main>
        </div>
      </Container>
    </div>
  );
}
