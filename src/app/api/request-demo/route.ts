import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const schema = z.object({
  fullName:      z.string().min(2).max(200),
  email:         z.string().email(),
  company:       z.string().min(1).max(200),
  phone:         z.string().min(7).max(30),
  country:       z.string().min(1).max(50),
  locations:     z.string().min(1).max(20),
  currentSystem: z.string().max(200).optional(),
  message:       z.string().max(2000).optional(),
  consent:       z.boolean().optional(),
  website:       z.string().max(0).optional(), // honeypot
});

const COUNTRY_LABELS: Record<string, string> = {
  UA: '🇺🇦 Ukraine', PL: '🇵🇱 Poland', CZ: '🇨🇿 Czech Republic',
  DE: '🇩🇪 Germany', ES: '🇪🇸 Spain', US: '🇺🇸 United States', other: 'Other',
};

const NOTIFY_EMAIL = process.env['DEMO_NOTIFY_EMAIL'] ?? 'teslenko.art@gmail.com';

type Payload = z.infer<typeof schema>;

async function sendEmail(data: Payload): Promise<void> {
  const host = process.env['SMTP_HOST'];
  const user = process.env['SMTP_USER'];
  const pass = process.env['SMTP_PASS'];
  if (!host || !user || !pass) return;

  const transporter = nodemailer.createTransport({
    host,
    port: parseInt(process.env['SMTP_PORT'] ?? '587'),
    secure: process.env['SMTP_SECURE'] === 'true',
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });

  const country = COUNTRY_LABELS[data.country] ?? data.country;
  const from = process.env['SMTP_FROM_NAME']
    ? `"${process.env['SMTP_FROM_NAME']}" <${user}>`
    : `Toster Demo <${user}>`;

  const html = `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <div style="background:#FFD600;padding:16px 24px;border-radius:12px 12px 0 0">
    <h2 style="margin:0;color:#0A0A0A;font-size:18px">🎯 New Demo Request — Toster</h2>
  </div>
  <div style="border:1px solid #E5E5E5;border-top:0;padding:24px;border-radius:0 0 12px 12px">
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:8px 0;color:#737373;width:40%">Name</td><td style="padding:8px 0;font-weight:600">${data.fullName}</td></tr>
      <tr><td style="padding:8px 0;color:#737373">Email</td><td style="padding:8px 0"><a href="mailto:${data.email}">${data.email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#737373">Company</td><td style="padding:8px 0;font-weight:600">${data.company}</td></tr>
      <tr><td style="padding:8px 0;color:#737373">Phone</td><td style="padding:8px 0">${data.phone}</td></tr>
      <tr><td style="padding:8px 0;color:#737373">Country</td><td style="padding:8px 0">${country}</td></tr>
      <tr><td style="padding:8px 0;color:#737373">Locations</td><td style="padding:8px 0">${data.locations}</td></tr>
      <tr><td style="padding:8px 0;color:#737373">Current system</td><td style="padding:8px 0">${data.currentSystem ?? '—'}</td></tr>
      ${data.message ? `<tr><td style="padding:8px 0;color:#737373;vertical-align:top">Message</td><td style="padding:8px 0">${data.message}</td></tr>` : ''}
    </table>
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #F5F5F5;font-size:12px;color:#A3A3A3">
      Submitted via toster.co · ${new Date().toISOString()}
    </div>
  </div>
</div>`;

  await transporter.sendMail({
    from,
    to: NOTIFY_EMAIL,
    replyTo: data.email,
    subject: `Demo request: ${data.company} (${country})`,
    html,
  });
}

function escMd(s: string): string {
  return s.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}

async function sendTelegram(data: Payload): Promise<void> {
  const token = process.env['TELEGRAM_TOKEN_OWNER'];
  const chatId = process.env['OWNER_TELEGRAM_CHAT_ID'] ?? process.env['DEMO_TELEGRAM_CHAT_ID'];
  if (!token || !chatId) return;

  const country = COUNTRY_LABELS[data.country] ?? data.country;
  const text = [
    `🎯 *New Demo Request*`,
    ``,
    `👤 *${escMd(data.fullName)}*`,
    `🏢 ${escMd(data.company)} · ${country}`,
    `📍 ${escMd(data.locations)} location(s)`,
    `📧 ${escMd(data.email)}`,
    `📱 ${escMd(data.phone)}`,
    data.currentSystem ? `🖥 Current: ${escMd(data.currentSystem)}` : '',
    data.message ? `\n💬 _${escMd(data.message)}_` : '',
  ].filter(Boolean).join('\n');

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot
    if (data.website) return NextResponse.json({ ok: true });

    await Promise.allSettled([sendEmail(data), sendTelegram(data)]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[request-demo]', err);
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}
