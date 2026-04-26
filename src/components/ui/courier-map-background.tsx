'use client';

import { useEffect, useRef } from 'react';

/* ─── tunables ─────────────────────────────────────────── */
const COURIER_COUNT   = 7;
const SCROLL_FACTOR   = 0.18;   // how much the canvas shifts on scroll
const MOUSE_FACTOR    = 14;     // px of shift at screen edge
const TILT_FACTOR     = 10;     // px of shift at max gyro tilt
const TRAIL_LEN       = 28;     // past positions kept for trail

/* ─── types ────────────────────────────────────────────── */
interface Pt  { x: number; y: number }
interface Seg { a: Pt; b: Pt; width: number; type: 'highway' | 'main' | 'side' }

interface Courier {
  segIdx: number;
  t:      number;   // 0–1 progress along seg
  speed:  number;
  dir:    1 | -1;
  trail:  Pt[];
  pulse:  number;
  pulseSpeed: number;
}

/* ─── build city street network ──────────────────────────
   Returns a list of straight segments that look like real
   city blocks: a few wide arterials + many side streets.
*/
function buildStreets(W: number, H: number): Seg[] {
  const segs: Seg[] = [];

  const add = (ax: number, ay: number, bx: number, by: number, type: Seg['type']) =>
    segs.push({ a: { x: ax, y: ay }, b: { x: bx, y: by }, width: type === 'highway' ? 4.5 : type === 'main' ? 2.5 : 1.2, type });

  /* ── horizontal arterials ── */
  const hRows = [0.14, 0.28, 0.42, 0.58, 0.72, 0.86];
  hRows.forEach((ry, i) => {
    const y = ry * H;
    const type: Seg['type'] = i % 3 === 1 ? 'highway' : 'main';
    add(0, y, W * 0.38, y + H * 0.012, type);
    add(W * 0.38, y + H * 0.012, W * 0.62, y - H * 0.008, type);
    add(W * 0.62, y - H * 0.008, W, y + H * 0.004, type);
  });

  /* ── vertical arterials ── */
  const vCols = [0.12, 0.25, 0.38, 0.52, 0.65, 0.78, 0.90];
  vCols.forEach((rx, i) => {
    const x = rx * W;
    const type: Seg['type'] = i % 2 === 0 ? 'main' : 'highway';
    add(x + W * 0.006, 0, x - W * 0.004, H * 0.45, type);
    add(x - W * 0.004, H * 0.45, x + W * 0.008, H, type);
  });

  /* ── diagonal shortcuts ── */
  add(0,        H * 0.05,  W * 0.32, H * 0.62,  'main');
  add(W * 0.18, 0,         W * 0.72, H * 0.85,  'side');
  add(W * 0.45, 0,         W,        H * 0.55,  'main');
  add(0,        H * 0.70,  W * 0.55, H,         'side');
  add(W * 0.60, 0,         W,        H * 0.40,  'highway');
  add(W,        H * 0.20,  W * 0.35, H,         'main');

  /* ── fine side streets (horizontal grid) ── */
  for (let r = 1; r <= 10; r++) {
    const y = (r / 11) * H;
    if (hRows.some(ry => Math.abs(ry - r / 11) < 0.06)) continue;
    add(0, y, W, y + (Math.random() - 0.5) * H * 0.02, 'side');
  }
  /* ── fine side streets (vertical grid) ── */
  for (let c = 1; c <= 12; c++) {
    const x = (c / 13) * W;
    if (vCols.some(rx => Math.abs(rx - c / 13) < 0.05)) continue;
    add(x, 0, x + (Math.random() - 0.5) * W * 0.02, H, 'side');
  }

  return segs;
}

/* ─── lerp helper ── */
function lerp(a: Pt, b: Pt, t: number): Pt {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

/* ─── main component ──────────────────────────────────── */
export function CourierMapBackground() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const frameRef    = useRef<number>(0);
  const mouseRef    = useRef<Pt>({ x: 0, y: 0 });   // normalised –1..1
  const tiltRef     = useRef<Pt>({ x: 0, y: 0 });   // normalised –1..1
  const scrollRef   = useRef(0);

  useEffect(() => {
    const canvasMaybe  = canvasRef.current;
    const wrapperMaybe = wrapperRef.current;
    if (!canvasMaybe || !wrapperMaybe) return;
    const canvas:  HTMLCanvasElement      = canvasMaybe;
    const wrapper: HTMLDivElement         = wrapperMaybe;
    const ctx:     CanvasRenderingContext2D = canvas.getContext('2d')!;

    let W = 0, H = 0;
    let segs: Seg[]     = [];
    let couriers: Courier[] = [];

    /* ── resize & rebuild ── */
    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      segs = buildStreets(W, H);
      couriers = Array.from({ length: COURIER_COUNT }, () => {
        const segIdx = Math.floor(Math.random() * segs.length);
        return {
          segIdx,
          t:          Math.random(),
          speed:      0.0006 + Math.random() * 0.0008,
          dir:        (Math.random() < 0.5 ? 1 : -1) as 1 | -1,
          trail:      [],
          pulse:      Math.random() * Math.PI * 2,
          pulseSpeed: 0.04 + Math.random() * 0.03,
        };
      });
    }

    /* ── draw a single frame ── */
    function draw() {
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const tx = tiltRef.current.x;
      const ty = tiltRef.current.y;
      const scroll = scrollRef.current;

      /* Parallax shift applied via wrapper transform */
      const shiftX = (mx + tx) * MOUSE_FACTOR;
      const shiftY = (my + ty) * MOUSE_FACTOR - scroll * SCROLL_FACTOR;
      wrapper.style.transform = `translate(${shiftX}px, ${shiftY}px)`;

      /* ── background ── */
      ctx.fillStyle = '#f5f3ec';
      ctx.fillRect(0, 0, W, H);

      /* ── city blocks (filled rectangles between major roads) ── */
      // Just a subtle tint overlay — real geometry kept lightweight
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = '#ede8d8';
      for (let i = 0; i < 24; i++) {
        const bx = (i % 6) * (W / 5.5) - W * 0.04;
        const by = Math.floor(i / 6) * (H / 3.5) + (i % 3) * H * 0.04;
        const bw = W * (0.09 + Math.sin(i) * 0.04);
        const bh = H * (0.08 + Math.cos(i * 0.7) * 0.03);
        ctx.fillRect(bx, by, bw, bh);
      }
      ctx.globalAlpha = 1;

      /* ── street network ── */
      for (const seg of segs) {
        ctx.beginPath();
        ctx.moveTo(seg.a.x, seg.a.y);
        ctx.lineTo(seg.b.x, seg.b.y);
        if (seg.type === 'highway') {
          ctx.strokeStyle = '#c8be84';
          ctx.lineWidth   = seg.width;
        } else if (seg.type === 'main') {
          ctx.strokeStyle = '#d4cfa0';
          ctx.lineWidth   = seg.width;
        } else {
          ctx.strokeStyle = '#ddd8c0';
          ctx.lineWidth   = seg.width;
        }
        ctx.stroke();

        /* brand-yellow centre line for highways */
        if (seg.type === 'highway') {
          ctx.beginPath();
          ctx.setLineDash([12, 10]);
          ctx.moveTo(seg.a.x, seg.a.y);
          ctx.lineTo(seg.b.x, seg.b.y);
          ctx.strokeStyle = 'rgba(255,214,0,0.35)';
          ctx.lineWidth   = 1;
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      /* ── update & draw couriers ── */
      for (const c of couriers) {
        c.t     += c.speed * c.dir;
        c.pulse += c.pulseSpeed;

        if (c.t > 1 || c.t < 0) {
          c.dir    = (c.dir * -1) as 1 | -1;
          c.t      = Math.max(0, Math.min(1, c.t));
          /* occasionally jump to a different street */
          if (Math.random() < 0.3) {
            c.segIdx = Math.floor(Math.random() * segs.length);
            c.trail  = [];
          }
        }

        const seg = segs[c.segIdx];
        if (!seg) continue;
        const pos = lerp(seg.a, seg.b, c.t);

        /* record trail */
        c.trail.push({ ...pos });
        if (c.trail.length > TRAIL_LEN) c.trail.shift();

        /* draw trail */
        if (c.trail.length > 1) {
          for (let i = 1; i < c.trail.length; i++) {
            const prev = c.trail[i - 1]!;
            const curr = c.trail[i]!;
            const alpha = (i / c.trail.length) * 0.55;
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.strokeStyle = `rgba(255,214,0,${alpha})`;
            ctx.lineWidth   = 1.5 * (i / c.trail.length);
            ctx.stroke();
          }
        }

        /* outer pulse ring */
        const pulse = (Math.sin(c.pulse) + 1) / 2;
        const ringR = 10 + pulse * 6;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,214,0,${0.15 + pulse * 0.2})`;
        ctx.lineWidth   = 1.5;
        ctx.stroke();

        /* glow */
        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 18);
        glow.addColorStop(0, `rgba(255,214,0,${0.4 + pulse * 0.3})`);
        glow.addColorStop(1, 'rgba(255,214,0,0)');
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        /* dot */
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD600';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
        ctx.strokeStyle = '#a89000';
        ctx.lineWidth   = 1;
        ctx.stroke();

        /* icon — motorcycle silhouette (simple shapes) */
        ctx.save();
        ctx.translate(pos.x, pos.y - 12);
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.ellipse(0, 0, 5, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      /* ── restaurant markers (static) ── */
      const pins: Pt[] = [
        { x: W * 0.22, y: H * 0.33 },
        { x: W * 0.57, y: H * 0.55 },
        { x: W * 0.78, y: H * 0.22 },
        { x: W * 0.40, y: H * 0.72 },
      ];
      for (const p of pins) {
        /* teardrop */
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.beginPath();
        ctx.arc(0, -12, 9, 0, Math.PI * 2);
        ctx.fillStyle = '#1a1a2e';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-5, -6);
        ctx.lineTo(5, -6);
        ctx.lineTo(0, 4);
        ctx.closePath();
        ctx.fillStyle = '#1a1a2e';
        ctx.fill();
        /* fork-knife icon hint */
        ctx.fillStyle = '#FFD600';
        ctx.fillRect(-1.5, -18, 1, 8);
        ctx.fillRect(1.5, -18, 1, 8);
        ctx.restore();
      }

      /* ── soft edge vignette so map fades into white ── */
      const vW = ctx.createLinearGradient(0, 0, W, 0);
      vW.addColorStop(0,   'rgba(255,255,255,0.55)');
      vW.addColorStop(0.1, 'rgba(255,255,255,0)');
      vW.addColorStop(0.9, 'rgba(255,255,255,0)');
      vW.addColorStop(1,   'rgba(255,255,255,0.55)');
      ctx.fillStyle = vW;
      ctx.fillRect(0, 0, W, H);

      const vH = ctx.createLinearGradient(0, 0, 0, H);
      vH.addColorStop(0,   'rgba(255,255,255,0.4)');
      vH.addColorStop(0.15, 'rgba(255,255,255,0)');
      vH.addColorStop(0.75, 'rgba(255,255,255,0)');
      vH.addColorStop(1,   'rgba(255,255,255,0.85)');
      ctx.fillStyle = vH;
      ctx.fillRect(0, 0, W, H);

      frameRef.current = requestAnimationFrame(draw);
    }

    /* ── event listeners ── */
    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left  - W / 2) / (W / 2),
        y: (e.clientY - rect.top   - H / 2) / (H / 2),
      };
    }
    function onMouseLeave() {
      mouseRef.current = { x: 0, y: 0 };
    }
    function onScroll() {
      scrollRef.current = window.scrollY;
    }
    function onDeviceOrientation(e: DeviceOrientationEvent) {
      /* gamma = left-right tilt (–90..90), beta = front-back (–180..180) */
      const gamma = e.gamma ?? 0;
      const beta  = e.beta  ?? 0;
      tiltRef.current = {
        x: Math.max(-1, Math.min(1, gamma / 30)),
        y: Math.max(-1, Math.min(1, (beta - 45) / 30)),
      };
    }

    resize();
    draw();

    canvas.addEventListener('mousemove',  onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll',     onScroll, { passive: true });
    window.addEventListener('deviceorientation', onDeviceOrientation as EventListener, { passive: true });

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener('mousemove',  onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll',     onScroll);
      window.removeEventListener('deviceorientation', onDeviceOrientation as EventListener);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      /* slightly oversized so parallax shift doesn't expose edges */
      className="absolute"
      style={{ inset: '-3%', width: '106%', height: '106%', willChange: 'transform' }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
      />
    </div>
  );
}
