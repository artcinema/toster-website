import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env['RESEND_API_KEY']);
const NOTIFY_EMAIL = 'teslenko.art@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      fullName?: string;
      email?: string;
      company?: string;
      phone?: string;
      country?: string;
      locations?: string;
      currentSystem?: string;
      message?: string;
      website?: string; // honeypot
    };

    // Honeypot
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    // Basic validation
    if (!body.fullName || !body.email || !body.company) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const countryLabels: Record<string, string> = {
      UA: '🇺🇦 Ukraine', PL: '🇵🇱 Poland', CZ: '🇨🇿 Czech Republic',
      DE: '🇩🇪 Germany', ES: '🇪🇸 Spain', US: '🇺🇸 United States', other: 'Other',
    };

    const htmlBody = `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <div style="background:#FFD600;padding:16px 24px;border-radius:12px 12px 0 0">
    <h2 style="margin:0;color:#0A0A0A;font-size:18px">🎯 New Demo Request — Toster</h2>
  </div>
  <div style="border:1px solid #E5E5E5;border-top:0;padding:24px;border-radius:0 0 12px 12px">
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:8px 0;color:#737373;width:40%">Name</td><td style="padding:8px 0;font-weight:600">${body.fullName}</td></tr>
      <tr><td style="padding:8px 0;color:#737373">Email</td><td style="padding:8px 0"><a href="mailto:${body.email}">${body.email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#737373">Company</td><td style="padding:8px 0;font-weight:600">${body.company}</td></tr>
      <tr><td style="padding:8px 0;color:#737373">Phone</td><td style="padding:8px 0">${body.phone ?? '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#737373">Country</td><td style="padding:8px 0">${countryLabels[body.country ?? ''] ?? body.country ?? '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#737373">Locations</td><td style="padding:8px 0">${body.locations ?? '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#737373">Current system</td><td style="padding:8px 0">${body.currentSystem || '—'}</td></tr>
      ${body.message ? `<tr><td style="padding:8px 0;color:#737373;vertical-align:top">Message</td><td style="padding:8px 0">${body.message}</td></tr>` : ''}
    </table>
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #F5F5F5;font-size:12px;color:#A3A3A3">
      Submitted via toster.co · ${new Date().toISOString()}
    </div>
  </div>
</div>`;

    await resend.emails.send({
      from: 'Toster Demo <onboarding@resend.dev>',
      to: NOTIFY_EMAIL,
      replyTo: body.email,
      subject: `Demo request: ${body.company} (${countryLabels[body.country ?? ''] ?? body.country ?? ''})`,
      html: htmlBody,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[request-demo]', err);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
