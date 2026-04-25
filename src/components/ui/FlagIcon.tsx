import * as React from 'react';

interface FlagProps {
  className?: string;
}

// Crisp inline SVG flags — no emoji, no external deps

export const FlagGB = ({ className = 'h-4 w-5' }: FlagProps) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#012169"/>
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/>
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5"/>
    <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="12"/>
    <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8"/>
  </svg>
);

export const FlagUA = ({ className = 'h-4 w-5' }: FlagProps) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="20" fill="#005BBB"/>
    <rect y="20" width="60" height="20" fill="#FFD500"/>
  </svg>
);

export const FlagPL = ({ className = 'h-4 w-5' }: FlagProps) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="20" fill="#fff"/>
    <rect y="20" width="60" height="20" fill="#DC143C"/>
  </svg>
);

export const FlagCZ = ({ className = 'h-4 w-5' }: FlagProps) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="20" fill="#fff"/>
    <rect y="20" width="60" height="20" fill="#D7141A"/>
    <path d="M0,0 L30,20 L0,40 Z" fill="#11457E"/>
  </svg>
);

export const FlagDE = ({ className = 'h-4 w-5' }: FlagProps) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="13.33" fill="#000"/>
    <rect y="13.33" width="60" height="13.33" fill="#DD0000"/>
    <rect y="26.66" width="60" height="13.34" fill="#FFCE00"/>
  </svg>
);

export const FlagES = ({ className = 'h-4 w-5' }: FlagProps) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#AA151B"/>
    <rect y="10" width="60" height="20" fill="#F1BF00"/>
  </svg>
);

export const FlagRU = ({ className = 'h-4 w-5' }: FlagProps) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="13.33" fill="#fff"/>
    <rect y="13.33" width="60" height="13.33" fill="#0039A6"/>
    <rect y="26.66" width="60" height="13.34" fill="#D52B1E"/>
  </svg>
);

export const FlagAE = ({ className = 'h-4 w-5' }: FlagProps) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#fff"/>
    <rect y="0" width="60" height="13.33" fill="#00732F"/>
    <rect y="26.67" width="60" height="13.33" fill="#000"/>
    <rect width="15" height="40" fill="#FF0000"/>
  </svg>
);

export const FlagCH = ({ className = 'h-4 w-5' }: FlagProps) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#FF0000"/>
    <rect x="24" y="8" width="12" height="24" fill="#fff"/>
    <rect x="16" y="16" width="28" height="8" fill="#fff"/>
  </svg>
);

const flagMap: Record<string, React.ComponentType<FlagProps>> = {
  en: FlagGB,
  gb: FlagGB,
  uk: FlagUA,
  ua: FlagUA,
  pl: FlagPL,
  cs: FlagCZ,
  cz: FlagCZ,
  de: FlagDE,
  es: FlagES,
  ru: FlagRU,
  ae: FlagAE,
  ch: FlagCH,
};

export function FlagIcon({ code, className }: { code: string; className?: string }) {
  const Icon = flagMap[code.toLowerCase()];
  if (!Icon) return null;
  return <Icon className={className ?? 'h-4 w-5 rounded-[2px]'} />;
}
