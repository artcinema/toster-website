import {
  Shield, Lock, Key, Eye, FileText, AlertTriangle,
  Clock, Database, Globe, ArrowRight, CheckCircle2,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const securityItems = [
  {
    icon: Lock,
    title: 'Authentication',
    description: 'JWT access tokens with 15-minute expiry. Refresh token rotation on every use. Separate signing secrets for staff and customer tokens. Atomic rotation prevents race conditions.',
    detail: '15m access / 7d refresh / atomic rotation',
  },
  {
    icon: Key,
    title: 'RBAC — 11 roles',
    description: 'Owner, manager, operator, cook, packer, courier, cashier, marketing, accountant, HR, and API-only roles. Granular permission matrix — staff see only what their role allows.',
    detail: '11 roles · granular permissions',
  },
  {
    icon: Database,
    title: 'Multi-tenancy isolation',
    description: 'Every query is scoped by org_id from JWT. No cross-tenant data leakage by design. PostgreSQL row-level security planned for defense-in-depth.',
    detail: 'org_id scoping · RLS planned',
  },
  {
    icon: Eye,
    title: 'Data privacy (GDPR)',
    description: 'Right to erasure (Art. 17) and portability (Art. 20) endpoints implemented. Customer data anonymization on request. EU-resident data stays in EU infrastructure.',
    detail: 'GDPR Art. 17 & 20 · EU data residency',
  },
  {
    icon: Shield,
    title: 'Webhook security',
    description: 'All outgoing webhooks signed with HMAC-SHA256. Replay protection via timestamp validation (5-minute window). Delivery log with retry history.',
    detail: 'HMAC-SHA256 · 5-min replay window',
  },
  {
    icon: FileText,
    title: 'Audit log',
    description: 'Every create, update, and delete is logged with before/after snapshots, user ID, IP address, and timestamp. Tamper-evident, queryable, exportable.',
    detail: 'before/after · IP · user · timestamp',
  },
  {
    icon: AlertTriangle,
    title: 'Rate limiting',
    description: '5 failed auth attempts per 15 minutes per IP. Per-org API quota enforcement. Redis-backed sliding window counters. Lockouts auto-expire.',
    detail: '5 attempts / 15 min · per-org quotas',
  },
  {
    icon: Clock,
    title: 'Secrets management',
    description: 'All secrets in Railway encrypted environment variables. Rotation policy documented. No secrets in code or logs. Separate secrets per environment.',
    detail: 'Railway env · rotation policy',
  },
  {
    icon: Globe,
    title: 'Fiscalization compliance',
    description: 'Integrated with certified fiscal providers in 6 countries: Checkbox (UA), KSeF (PL), EET (CZ), Fiskaly (DE), VeriFacTu (ES), Stripe Tax (US). Receipts are legally binding.',
    detail: '6 countries · certified providers',
  },
];

const badges = [
  { label: 'GDPR', sub: 'EU data protection', color: '#003DA5' },
  { label: 'PCI-adjacent', sub: 'via Stripe / LiqPay', color: '#1A1A1A' },
  { label: 'SOC 2', sub: 'in progress', color: '#6B7280', dimmed: true },
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div>
              <Badge variant="yellow" className="mb-4">Security</Badge>
            </div>
            <h1
              className="mb-4 text-4xl font-semibold tracking-tight text-[#0A0A0A] sm:text-5xl"
              style={{ lineHeight: 1.08 }}
            >
              Security built for serious business
            </h1>
            <p className="mb-10 text-lg text-[#525252] leading-relaxed">
              From authentication to audit logs — every layer of Toster is designed
              to protect your customers&apos; data and your business.
            </p>

            {/* Compliance badges */}
            <div className="flex flex-wrap justify-center gap-3">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 ${b.dimmed ? 'border-[#E5E5E5] bg-[#F5F5F5]' : 'border-[#E5E5E5] bg-white'}`}
                >
                  <span
                    className="inline-flex h-2 w-2 rounded-full"
                    style={{ backgroundColor: b.color }}
                  />
                  <span className={`text-sm font-semibold ${b.dimmed ? 'text-[#A3A3A3]' : 'text-[#0A0A0A]'}`}>
                    {b.label}
                  </span>
                  <span className={`text-xs ${b.dimmed ? 'text-[#A3A3A3]' : 'text-[#525252]'}`}>
                    {b.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Security items grid */}
      <section className="bg-white pb-24 sm:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {securityItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col rounded-2xl border border-[#E5E5E5] p-6 hover:border-[#FFD600]/50 transition-colors"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A0A0A]">
                    <Icon className="h-5 w-5 text-[#FFD600]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-[#0A0A0A]">{item.title}</h3>
                  <p className="flex-1 text-sm text-[#525252] leading-relaxed">{item.description}</p>
                  <div className="mt-4 rounded-lg bg-[#F5F5F5] px-3 py-1.5">
                    <p className="font-mono text-xs text-[#525252]">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Responsible disclosure */}
      <section className="border-t border-[#E5E5E5] bg-[#F5F5F5] py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-[#E5E5E5]">
              <Shield className="h-6 w-6 text-[#0A0A0A]" />
            </div>
            <h2 className="mb-3 text-2xl font-semibold text-[#0A0A0A]">
              Found a vulnerability?
            </h2>
            <p className="mb-6 text-[#525252] leading-relaxed">
              We take security seriously. If you discover a vulnerability, please report it
              responsibly. We aim to respond within 48 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <a href="mailto:security@toster.co">
                  security@toster.co <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What we check */}
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center text-2xl font-semibold text-[#0A0A0A] sm:text-3xl">
              Our security checklist
            </h2>
            <div className="space-y-3">
              {[
                'Input validation on every API endpoint (Zod)',
                'SQL injection prevention via Prisma parameterized queries',
                'XSS prevention via React\'s default escaping',
                'CORS configured per environment',
                'TLS enforced on all connections',
                'Secrets never logged or included in error responses',
                'Dependencies audited with npm audit on every deploy',
                'HTTP security headers (HSTS, CSP, X-Frame-Options)',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <p className="text-[#525252]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
