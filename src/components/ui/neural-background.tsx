'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
  isHub: boolean;
}

interface Bokeh {
  x: number;
  y: number;
  r: number;
  alpha: number;
  drift: number;
  driftSpeed: number;
}

const NODE_COUNT = 90;
const BOKEH_COUNT = 26;
const CONNECT_DIST = 175;
const MOUSE_RADIUS = 140;
const MOUSE_FORCE = 0.06;
const SCROLL_PARALLAX = 0.15;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvasMaybe = canvasRef.current;
    if (!canvasMaybe) return;
    const ctxMaybe = canvasMaybe.getContext('2d');
    if (!ctxMaybe) return;
    // Assign to explicitly non-null types so nested functions don't see null
    const canvas: HTMLCanvasElement = canvasMaybe;
    const ctx: CanvasRenderingContext2D = ctxMaybe;

    let W = 0;
    let H = 0;
    const nodes: Node[] = [];
    const bokeh: Bokeh[] = [];

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }

    function initAll() {
      nodes.length = 0;
      bokeh.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        const isHub = Math.random() < 0.12;
        nodes.push({
          x: rand(0, W), y: rand(0, H),
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: isHub ? rand(2.5, 4.5) : rand(0.8, 2.2),
          pulse: rand(0, Math.PI * 2),
          pulseSpeed: rand(0.008, 0.025),
          isHub,
        });
      }
      for (let i = 0; i < BOKEH_COUNT; i++) {
        bokeh.push({
          x: rand(0, W), y: rand(0, H),
          r: rand(30, 110),
          alpha: rand(0.04, 0.14),
          drift: rand(0, Math.PI * 2),
          driftSpeed: rand(0.002, 0.006),
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scrollOff = scrollRef.current * SCROLL_PARALLAX;

      // Bokeh
      for (const b of bokeh) {
        b.drift += b.driftSpeed;
        b.x += Math.sin(b.drift) * 0.3;
        b.y += Math.cos(b.drift * 0.7) * 0.2;
        const by = b.y - scrollOff;
        const g = ctx.createRadialGradient(b.x, by, 0, b.x, by, b.r);
        g.addColorStop(0, `rgba(255,214,0,${b.alpha})`);
        g.addColorStop(0.45, `rgba(255,214,0,${b.alpha * 0.35})`);
        g.addColorStop(1, 'rgba(255,214,0,0)');
        ctx.beginPath();
        ctx.arc(b.x, by, b.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < -30) n.x = W + 30;
        else if (n.x > W + 30) n.x = -30;
        if (n.y < -30) n.y = H + 30;
        else if (n.y > H + 30) n.y = -30;

        const ny = n.y - scrollOff;
        const dx = mx - n.x;
        const dy = my - ny;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
          n.vx *= 0.95;
          n.vy *= 0.95;
        } else {
          const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
          if (speed > 0.6) { n.vx *= 0.98; n.vy *= 0.98; }
        }
      }

      // Connections between nodes — avoid index access, use pair iteration
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!a) continue;
        const ay = a.y - scrollOff;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (!b) continue;
          const bny = b.y - scrollOff;
          const dx = b.x - a.x;
          const dy = bny - ay;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECT_DIST) continue;
          const fade = 1 - dist / CONNECT_DIST;
          ctx.beginPath();
          ctx.moveTo(a.x, ay);
          ctx.lineTo(b.x, bny);
          ctx.strokeStyle = (a.isHub || b.isHub)
            ? `rgba(255,214,0,${fade * 0.7})`
            : `rgba(255,255,255,${fade * 0.22})`;
          ctx.lineWidth = (a.isHub || b.isHub) ? 0.9 : 0.4;
          ctx.stroke();
        }
      }

      // Cursor connections
      if (mx > 0 && mx < W) {
        for (const n of nodes) {
          const ny = n.y - scrollOff;
          const dx = mx - n.x;
          const dy = my - ny;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const fade = 1 - dist / MOUSE_RADIUS;
            ctx.beginPath();
            ctx.moveTo(n.x, ny);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(255,214,0,${fade * 0.6})`;
            ctx.lineWidth = fade * 1.2;
            ctx.stroke();
          }
        }
        // Cursor glow
        const cg = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS * 0.6);
        cg.addColorStop(0, 'rgba(255,214,0,0.15)');
        cg.addColorStop(1, 'rgba(255,214,0,0)');
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_RADIUS * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,214,0,0.9)';
        ctx.fill();
      }

      // Draw nodes
      for (const n of nodes) {
        const ny = n.y - scrollOff;
        const glow = (Math.sin(n.pulse) + 1) / 2;
        const r = n.r * (1 + glow * 0.5);

        if (n.isHub) {
          const outer = ctx.createRadialGradient(n.x, ny, 0, n.x, ny, r * 9);
          outer.addColorStop(0, `rgba(255,214,0,${0.2 * glow})`);
          outer.addColorStop(1, 'rgba(255,214,0,0)');
          ctx.beginPath();
          ctx.arc(n.x, ny, r * 9, 0, Math.PI * 2);
          ctx.fillStyle = outer;
          ctx.fill();
        }

        const halo = ctx.createRadialGradient(n.x, ny, 0, n.x, ny, r * 4);
        halo.addColorStop(0, `rgba(255,214,0,${0.25 + glow * 0.25})`);
        halo.addColorStop(1, 'rgba(255,214,0,0)');
        ctx.beginPath();
        ctx.arc(n.x, ny, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, ny, r, 0, Math.PI * 2);
        ctx.fillStyle = n.isHub
          ? `rgba(255,214,0,${0.9 + glow * 0.1})`
          : `rgba(255,255,255,${0.55 + glow * 0.35})`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }
    function onScroll() {
      scrollRef.current = window.scrollY;
    }

    resize();
    initAll();
    draw();

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    const ro = new ResizeObserver(() => { resize(); initAll(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.72 }}
    />
  );
}
