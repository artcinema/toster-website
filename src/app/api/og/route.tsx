import { ImageResponse } from 'next/og';

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
        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#FFD600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: 700,
              color: '#0A0A0A',
            }}
          >
            T
          </div>
          <span style={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF' }}>Toster</span>
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
