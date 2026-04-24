'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { locales, type Locale } from '@/i18n/config';

const languageNames: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  uk: 'Українська',
  pl: 'Polski',
  cs: 'Čeština',
  de: 'Deutsch',
  es: 'Español',
};

const languageFlags: Record<Locale, string> = {
  en: '🇬🇧',
  ru: '🇷🇺',
  uk: '🇺🇦',
  pl: '🇵🇱',
  cs: '🇨🇿',
  de: '🇩🇪',
  es: '🇪🇸',
};

interface LanguageSwitcherProps {
  dark?: boolean;
}

export function LanguageSwitcher({ dark = false }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;

    const segments = pathname.split('/');
    const currentLocaleIndex = locales.includes(segments[1] as Locale) ? 1 : -1;

    let newPath: string;
    if (currentLocaleIndex !== -1) {
      if (newLocale === 'en') {
        segments.splice(1, 1);
        newPath = segments.join('/') || '/';
      } else {
        segments[1] = newLocale;
        newPath = segments.join('/');
      }
    } else {
      newPath = newLocale === 'en' ? pathname : `/${newLocale}${pathname}`;
    }

    router.push(newPath);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={cn(
          'flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]',
          dark
            ? 'text-white hover:bg-white/10'
            : 'text-[#525252] hover:bg-[#F5F5F5] hover:text-[#0A0A0A]',
        )}
      >
        <span>{languageFlags[locale]}</span>
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
              <span>{languageFlags[loc]}</span>
              <span>{languageNames[loc]}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
