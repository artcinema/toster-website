'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { locales, type Locale } from '@/i18n/config';
import { FlagIcon } from '@/components/ui/FlagIcon';

const languageNames: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  uk: 'Українська',
  pl: 'Polski',
  cs: 'Čeština',
  de: 'Deutsch',
  es: 'Español',
};

const localeFlagCode: Record<Locale, string> = {
  en: 'gb',
  ru: 'ru',
  uk: 'ua',
  pl: 'pl',
  cs: 'cz',
  de: 'de',
  es: 'es',
};

interface LanguageSwitcherProps {
  dark?: boolean;
}

export function LanguageSwitcher({ dark = false }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    // All locales use explicit prefix (localePrefix: 'always'), so just swap the prefix.
    const segments = pathname.split('/');
    const hasLocalePrefix = locales.includes(segments[1] as Locale);
    const rest = hasLocalePrefix ? segments.slice(2).join('/') : segments.slice(1).join('/');
    const newPath = `/${newLocale}${rest ? `/${rest}` : ''}`;
    window.location.assign(newPath);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label={`Language: ${languageNames[locale]}`}
        className={cn(
          'flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]',
          dark
            ? 'text-white hover:bg-white/10'
            : 'text-[#525252] hover:bg-[#F5F5F5] hover:text-[#0A0A0A]',
        )}
      >
        <FlagIcon code={localeFlagCode[locale]} className="h-4 w-5 rounded-sm" />
        <span className="hidden sm:inline">{languageNames[locale]}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[160px] rounded-xl border border-[#E5E5E5] bg-white p-1 shadow-lg"
          sideOffset={8}
          align="end"
        >
          {locales.map((loc) => (
            <DropdownMenu.Item
              key={loc}
              className={cn(
                'flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm outline-none transition-colors',
                loc === locale
                  ? 'bg-[#FFD600]/20 font-medium text-[#0A0A0A]'
                  : 'text-[#525252] hover:bg-[#F5F5F5] hover:text-[#0A0A0A]',
              )}
              onSelect={() => handleLocaleChange(loc)}
            >
              <FlagIcon code={localeFlagCode[loc]} className="h-4 w-5 rounded-sm" />
              <span>{languageNames[loc]}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
