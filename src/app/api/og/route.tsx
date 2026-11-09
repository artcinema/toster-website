import { ImageResponse } from 'next/og';
import {
  BRAND_YELLOW,
  LOGO_BOX_H,
  LOGO_LOCKUP_W,
  LOGO_MARK_PATH,
  LOGO_WORD_PATH,
} from '@/components/brand/logo-paths';

/** Lockup mark height on the card, px (brand kit: yellow mark on dark, word in white). */
const LOGO_H = 40;

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Toster — Food Delivery CRM';
  const sub = searchParams.get('sub') || 'Run your delivery network on autopilot';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          background: '#0A0A0A',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo lockup (brand kit 2026-11-09): yellow mark + white wordmark, master paths */}
        <div style={{ display: 'flex', marginBottom: '48px' }}>
          <svg
            width={(LOGO_LOCKUP_W * LOGO_H) / 400}
            height={(LOGO_BOX_H * LOGO_H) / 400}
            viewBox={`0 0 ${LOGO_LOCKUP_W} ${LOGO_BOX_H}`}
          >
            <path d={LOGO_MARK_PATH} fill={BRAND_YELLOW} />
            <path d={LOGO_WORD_PATH} fill="#FFFFFF" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
            maxWidth: '900px',
            marginBottom: '24px',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '700px',
          }}
        >
          {sub}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: '#FFD600',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
