import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { LanguageSwitcher } from './LanguageSwitcher';
import { siteConfig } from '@/config/site';

export function Footer() {
  const t = useTranslations();

  const links = [
    { label: 'Features',        href: '/features' },
    { label: 'AI',              href: '/ai' },
    { label: 'Integrations',    href: '/integrations' },
    { label: 'For Chains',      href: '/for-chains' },
    { label: 'Pricing',         href: '/pricing' },
    { label: 'Blog',            href: '/blog' },
    { label: 'About',           href: '/about' },
    { label: 'Security',        href: '/security' },
    { label: 'API',             href: '/api' },
    { label: 'Privacy',         href: '/privacy-policy' },
    { label: 'Terms',           href: '/terms' },
    { label: 'Subprocessors',   href: '/legal/subprocessors' },
    { label: 'DPA',             href: '/legal/dpa' },
    { label: 'Cookie Policy',   href: '/legal/cookies' },
    { label: 'Imprint',         href: '/legal/imprint' },
    { label: 'AUP',             href: '/legal/aup' },
  ];

  return (
    <footer className="border-t border-[#E5E5E5] bg-white">
      <Container>
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold text-[#0A0A0A]">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FFD600]">
              <span className="text-sm font-bold">T</span>
            </span>
            <span>Toster</span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-[#A3A3A3] transition-colors hover:text-[#0A0A0A]"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`mailto:hello@toster.co`}
              className="text-sm text-[#A3A3A3] transition-colors hover:text-[#0A0A0A]"
            >
              hello@toster.co
            </a>
          </nav>

          {/* Social + Lang */}
          <div className="flex shrink-0 items-center gap-3">
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer"
              className="text-[#A3A3A3] transition-colors hover:text-[#0A0A0A]" aria-label="LinkedIn">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer"
              className="text-[#A3A3A3] transition-colors hover:text-[#0A0A0A]" aria-label="Telegram">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E5E5E5] py-3">
          <p className="text-center text-xs text-[#A3A3A3]">
            {t('Footer.copyright')}
            <span className="mx-2 opacity-40">·</span>
            ADS L.L.C-FZ, Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba, Dubai, UAE
          </p>
        </div>
      </Container>
    </footer>
  );
}
