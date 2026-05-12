import { NextRequest, NextResponse } from 'next/server';

// Streams podcast audio from GitHub Releases through this domain so the
// <audio> tag can play it inline. GitHub release-assets signs URLs with
// `Content-Disposition: attachment`, which Safari (and some Chrome
// versions) refuse to play — they treat it as a download instead of
// streamable media. We re-emit the response with `inline` disposition
// and a proper `audio/mp4` content type.
//
// Range requests are forwarded so the browser's seek-bar works without
// downloading the entire file. Cache-Control is long-lived because the
// audio is content-addressed via release tag.

const EPISODES: Record<string, string> = {
  'ai-brain-dark-kitchens':
    'https://github.com/artcinema/toster-website/releases/download/media-v1/The_AI_Brain_Running_Dark_Kitchens.m4a',
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const upstream = EPISODES[slug];
  if (!upstream) {
    return NextResponse.json({ error: 'Unknown episode' }, { status: 404 });
  }

  // Forward Range so the browser can seek without re-downloading.
  const headers = new Headers();
  const range = req.headers.get('range');
  if (range) headers.set('range', range);

  let res: Response;
  try {
    res = await fetch(upstream, { headers, redirect: 'follow' });
  } catch (err) {
    console.error('[media/episode] upstream fetch failed:', err);
    return NextResponse.json({ error: 'Upstream unavailable' }, { status: 502 });
  }

  if (!res.ok && res.status !== 206) {
    return NextResponse.json(
      { error: `Upstream returned ${res.status}` },
      { status: 502 },
    );
  }

  // Strip the attachment disposition GitHub signs into the URL, set proper
  // audio MIME type, and pass through length / range headers for seeking.
  const out = new Headers();
  out.set('Content-Type', 'audio/mp4');
  out.set('Content-Disposition', 'inline');
  out.set('Accept-Ranges', 'bytes');
  out.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');

  for (const h of ['content-length', 'content-range', 'last-modified', 'etag']) {
    const v = res.headers.get(h);
    if (v) out.set(h, v);
  }

  return new NextResponse(res.body, { status: res.status, headers: out });
}
