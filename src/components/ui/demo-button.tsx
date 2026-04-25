'use client';

import * as React from 'react';
import { siteConfig } from '@/config/site';

// Demo subdomain auto-logins on load — just redirect there directly.
// Fallback: if demoUrl is not separate from appUrl, pass token in URL.
async function startDemo() {
  const demoUrl = siteConfig.demoUrl;
  const appUrl = siteConfig.appUrl;

  // If a dedicated demo subdomain is configured, redirect there directly
  if (demoUrl !== appUrl) {
    window.location.href = demoUrl;
    return;
  }

  // Legacy path: obtain token and pass via URL param
  const res = await fetch(`${siteConfig.apiUrl}/auth/demo`, { method: 'POST' });
  if (!res.ok) throw new Error('demo_unavailable');
  const { accessToken } = await res.json();
  window.location.href = `${appUrl}?token=${encodeURIComponent(accessToken)}`;
}

interface DemoButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: React.ReactNode;
}

export function DemoButton({ children, disabled, className, ...rest }: DemoButtonProps) {
  const [loading, setLoading] = React.useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await startDemo();
    } catch {
      window.location.href = siteConfig.demoUrl;
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      {...rest}
      onClick={handleClick}
      disabled={disabled || loading}
      className={className}
    >
      {loading ? '…' : children}
    </button>
  );
}
