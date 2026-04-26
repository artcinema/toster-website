'use client';

import { useEffect, useRef } from 'react';

/* ── tunables ─────────────────────────────────────────── */
const COURIER_COUNT = 6;
const TRAIL_LEN     = 20;

// Parallax — very subtle, CSS transition smooths it
const MOUSE_SHIFT   = 6;    // px at screen edge
const SCROLL_SHIFT  = 0.08; // fraction of scrollY

/* ── types ─────────────────────────────────────────────── */
interface Pt  { x: number; y: number }
interface Seg { a: Pt; b: Pt; major: boolean }
interface Courier {
  segIdx: number; t: number; speed: number; dir: 1 | -1;
  trail: Pt[]; pulse: number;
}

/* ── build a light city grid ──────────────────────────── */
function buildStreets(W: number, H: number): Seg[] {
  const segs: Seg[] = [];
  const add = (ax: number, ay: number, bx: number, by: number, major: boolean) =>
    segs.push({ a: { x: ax, y: ay }, b: { x: bx, y: by }, major });

  // Gentle horizontal curves as straight segments
  const hLines = [0.15, 0.30, 0.45, 0.60, 0.75, 0.88];
  hLines.forEach((r, i) => {
    const y = r * H;
    const wobble = (i % 2 === 0 ? 1 : -1) * H * 0.015;
    add(0, y, W * 0.5, y + wobble, i === 1 || i === 4);
    add(W * 0.5, y + wobble, W, y - wobble * 0.5, i === 1 || i === 4);
  });

  // Vertical
  const vLines = [0.10, 0.22, 0.35, 0.50, 0.64, 0.78, 0.91];
  vLines.forEach((r, i) => {
    const x = r * W;
    const wobble = (i % 2 === 0 ? 1 : -1) * W * 0.012;
    add(x, 0, x + wobble, H * 0.5, i === 2 || i === 5);
    add(x + wobble, H * 0.5, x - wobble * 0.5, H, i === 2 || i === 5);
  });

  // Two diagonals
  add(0, H * 0.08, W * 0.55, H * 0.72, false);
  add(W * 0.40, 0, W, H * 0.65, true);

  return segs;
}

function lerp(a: Pt, b: Pt, t: number): Pt {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

/* ── component ─────────────────────────────────────────── */
export function CourierMapBackground() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRef   = useRef<number>(0);

  // Smoothed shift targets
  const targetRef  = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas  = canvasRef.current!;
    const wrapper = wrapperRef.current!;
    const ctx     = canvas.getContext('2d')!;

    let W = 0, H = 0;
    let segs: Seg[]      = [];
    let couriers: Courier[] = [];

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      segs = buildStreets(W, H);
      couriers = Array.from({ length: COURIER_COUNT }, () => ({
        segIdx: Math.floor(Math.random() * segs.length),
        t:      Math.random(),
        speed:  0.0003 + Math.random() * 0.0004,
        dir:    (Math.random() < 0.5 ? 1 : -1) as 1 | -1,
        trail:  [],
        pulse:  Math.random() * Math.PI * 2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      /* Smooth lerp toward target shift */
      const cr = currentRef.current;
      const tr = targetRef.current;
      cr.x += (tr.x - cr.x) * 0.06;
      cr.y += (tr.y - cr.y) * 0.06;
      wrapper.style.transform = `translate(${cr.x.toFixed(2)}px, ${cr.y.toFixed(2)}px)`;

      /* Background — pure white */
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, H);

      /* Streets — very faint */
      for (const seg of segs) {
        ctx.beginPath();
        ctx.moveTo(seg.a.x, seg.a.y);
        ctx.lineTo(seg.b.x, seg.b.y);
        ctx.strokeStyle = seg.major
          ? 'rgba(160,150,110,0.55)'
          : 'rgba(185,178,150,0.38)';
        ctx.lineWidth = seg.major ? 2.8 : 1.4;
        ctx.stroke();
      }

      /* Couriers */
      for (const c of couriers) {
        c.t     += c.speed * c.dir;
        c.pulse += 0.035;

        if (c.t > 1 || c.t < 0) {
          c.dir = (c.dir * -1) as 1 | -1;
          c.t   = Math.max(0, Math.min(1, c.t));
          if (Math.random() < 0.25) {
            c.segIdx = Math.floor(Math.random() * segs.length);
            c.trail  = [];
          }
        }

        const seg = segs[c.segIdx];
        if (!seg) continue;
        const pos = lerp(seg.a, seg.b, c.t);
        c.trail.push({ ...pos });
        if (c.trail.length > TRAIL_LEN) c.trail.shift();

        /* Trail — very faint yellow */
        for (let i = 1; i < c.trail.length; i++) {
          const p = c.trail[i - 1]!;
          const q = c.trail[i]!;
          const a = (i / c.trail.length) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(255,214,0,${a * 1.5})`;
          ctx.lineWidth   = 1.6 * (i / c.trail.length);
          ctx.stroke();
        }

        /* Pulse ring */
        const pv  = (Math.sin(c.pulse) + 1) / 2;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 8 + pv * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,214,0,${0.08 + pv * 0.10})`;
        ctx.lineWidth   = 1;
        ctx.stroke();

        /* Dot */
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,200,0,${0.80 + pv * 0.2})`;
        ctx.fill();
      }

      /* Restaurant pins — minimal */
      const pins: Pt[] = [
        { x: W * 0.20, y: H * 0.35 },
        { x: W * 0.52, y: H * 0.60 },
        { x: W * 0.76, y: H * 0.25 },
        { x: W * 0.38, y: H * 0.78 },
      ];
      for (const p of pins) {
        ctx.beginPath();
        ctx.arc(p.x, p.y - 8, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(40,40,65,0.45)';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(p.x - 3.5, p.y - 4);
        ctx.lineTo(p.x + 3.5, p.y - 4);
        ctx.lineTo(p.x, p.y + 1);
        ctx.closePath();
        ctx.fillStyle = 'rgba(40,40,65,0.45)';
        ctx.fill();
      }

      /* Edge fade — ensure text readability */
      const fadeX = ctx.createLinearGradient(0, 0, W, 0);
      fadeX.addColorStop(0,    'rgba(255,255,255,0.6)');
      fadeX.addColorStop(0.12, 'rgba(255,255,255,0)');
      fadeX.addColorStop(0.88, 'rgba(255,255,255,0)');
      fadeX.addColorStop(1,    'rgba(255,255,255,0.6)');
      ctx.fillStyle = fadeX;
      ctx.fillRect(0, 0, W, H);

      const fadeY = ctx.createLinearGradient(0, 0, 0, H);
      fadeY.addColorStop(0,    'rgba(255,255,255,0.35)');
      fadeY.addColorStop(0.2,  'rgba(255,255,255,0)');
      fadeY.addColorStop(0.7,  'rgba(255,255,255,0)');
      fadeY.addColorStop(1,    'rgba(255,255,255,0.9)');
      ctx.fillStyle = fadeY;
      ctx.fillRect(0, 0, W, H);

      frameRef.current = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const nx   = (e.clientX - rect.left - W / 2) / (W / 2);
      const ny   = (e.clientY - rect.top  - H / 2) / (H / 2);
      targetRef.current = { x: nx * MOUSE_SHIFT, y: ny * MOUSE_SHIFT };
    }
    function onMouseLeave() {
      targetRef.current = { x: 0, y: 0 };
    }
    function onScroll() {
      targetRef.current = {
        ...targetRef.current,
        y: -window.scrollY * SCROLL_SHIFT,
      };
    }

    resize();
    draw();

    canvas.addEventListener('mousemove',  onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll',     onScroll, { passive: true });
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener('mousemove',  onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll',     onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute"
      style={{ inset: '-4%', width: '108%', height: '108%' }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        /* overall opacity keeps it ghost-like */
        style={{ opacity: 0.78 }}
      />
    </div>
  );
}
