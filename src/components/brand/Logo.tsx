import { BRAND_YELLOW, LOGO_BOX_H, LOGO_LOCKUP_W, LOGO_MARK_PATH, LOGO_WORD_PATH } from './logo-paths';

/**
 * Toster logo — brand kit 2026-11-09.
 *
 * - `variant`: `lockup` (mark + word, default) or `mark`.
 * - `size`: mark height H in px (min: mark 16, lockup 20).
 * - `tone`: `auto` — everything `currentColor` (light surfaces: ink); `brand` — yellow mark, word `currentColor`.
 *   The yellow mark goes on dark surfaces only (on white it is 1.4:1).
 * - `title`: accessible name; `''` makes it decorative when the name is already given nearby (e.g. a link
 *   `aria-label`).
 */
export interface LogoProps {
  variant?: 'mark' | 'lockup';
  size?: number;
  tone?: 'auto' | 'brand';
  title?: string;
  className?: string;
}

export function Logo({ variant = 'lockup', size = 24, tone = 'auto', title = 'Toster', className }: LogoProps) {
  const w = variant === 'mark' ? 400 : LOGO_LOCKUP_W;
  const h = variant === 'mark' ? 400 : LOGO_BOX_H;
  const k = size / 400;
  const label = title || undefined;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * k}
      height={h * k}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      fill="currentColor"
      className={className}
      style={{ display: 'block', flex: 'none' }}
    >
      <path d={LOGO_MARK_PATH} fill={tone === 'brand' ? BRAND_YELLOW : undefined} />
      {variant === 'lockup' && <path d={LOGO_WORD_PATH} />}
    </svg>
  );
}
