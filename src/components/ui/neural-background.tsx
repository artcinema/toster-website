'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  ox: number; // origin x
  oy: number; // origin y
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let nodes: Node[] = [];
    let bokeh: Bokeh[] = [];

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.scale(dpr, dpr);
    }

    function initNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => {
        const isHub = Math.random() < 0.12;
        const x = rand(0, W);
        const y = rand(0, H);
        return {
          x, y, ox: x, oy: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: isHub ? rand(2.5, 4.5) : rand(0.8, 2.2),
          pulse: rand(0, Math.PI * 2),
          pulseSpeed: rand(0.008, 0.025),
          isHub,
        };
      });
    }

    function initBokeh() {
      bokeh = Array.from({ length: BOKEH_COUNT }, () => ({
        x: rand(0, W),
        y: rand(0, H),
        r: rand(30, 110),
        alpha: rand(0.04, 0.14),
        drift: rand(0, Math.PI * 2),
        driftSpeed: rand(0.002, 0.006),
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scrollOffset = scrollRef.current * SCROLL_PARALLAX;

      // Bokeh layer
      for (const b of bokeh) {
        b.drift += b.driftSpeed;
        b.x += Math.sin(b.drift) * 0.3;
        b.y += Math.cos(b.drift * 0.7) * 0.2;
        const by = b.y - scrollOffset;

        const g = ctx!.createRadialGradient(b.x, by, 0, b.x, by, b.r);
        g.addColorStop(0, `rgba(255,214,0,${b.alpha})`);
        g.addColorStop(0.45, `rgba(255,214,0,${b.alpha * 0.35})`);
        g.addColorStop(1, 'rgba(255,214,0,0)');
        ctx!.beginPath();
        ctx!.arc(b.x, by, b.r, 0, Math.PI * 2);
        ctx!.fillStyle = g;
        ctx!.fill();
      }

      // Update nodes with mouse attraction + drift
      for (const n of nodes) {
        // Slow drift
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        // Wrap around
        if (n.x < -30) n.x = W + 30;
        else if (n.x > W + 30) n.x = -30;
        if (n.y < -30) n.y = H + 30;
        else if (n.y > H + 30) n.y = -30;

        // Mouse attraction
        const ny = n.y - scrollOffset;
        const dx = mx - n.x;
        const dy = my - ny;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
          // Dampen so they don't fly off
          n.vx *= 0.95;
          n.vy *= 0.95;
        } else {
          // Gentle return to natural drift speed
          const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
          if (speed > 0.6) {
            n.vx *= 0.98;
            n.vy *= 0.98;
          }
        }
      }

      // Draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const ay = a.y - scrollOffset;
          const by = b.y - scrollOffset;
          const dx = b.x - a.x;
          const dy = by - ay;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECT_DIST) continue;

          const fade = 1 - dist / CONNECT_DIST;
          const isSpecial = a.isHub || b.isHub;
          ctx!.beginPath();
          ctx!.moveTo(a.x, ay);
          ctx!.lineTo(b.x, by);
          ctx!.strokeStyle = isSpecial
            ? `rgba(255,214,0,${fade * 0.7})`
            : `rgba(255,255,255,${fade * 0.22})`;
          ctx!.lineWidth = isSpecial ? 0.9 : 0.4;
          ctx!.stroke();
        }
      }

      // Draw cursor connections
      if (mx > 0 && mx < W) {
        for (const n of nodes) {
          const ny = n.y - scrollOffset;
          const dx = mx - n.x;
          const dy = my - ny;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const fade = 1 - dist / MOUSE_RADIUS;
            ctx!.beginPath();
            ctx!.moveTo(n.x, ny);
            ctx!.lineTo(mx, my);
            ctx!.strokeStyle = `rgba(255,214,0,${fade * 0.6})`;
            ctx!.lineWidth = fade * 1.2;
            ctx!.stroke();
          }
        }

        // Cursor glow node
        const cg = ctx!.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS * 0.6);
        cg.addColorStop(0, 'rgba(255,214,0,0.15)');
        cg.addColorStop(1, 'rgba(255,214,0,0)');
        ctx!.beginPath();
        ctx!.arc(mx, my, MOUSE_RADIUS * 0.6, 0, Math.PI * 2);
        ctx!.fillStyle = cg;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(mx, my, 3, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(255,214,0,0.9)';
        ctx!.fill();
      }

      // Draw nodes
      for (const n of nodes) {
        const ny = n.y - scrollOffset;
        const glow = (Math.sin(n.pulse) + 1) / 2;
        const r = n.r * (1 + glow * 0.5);

        // Hub outer glow
        if (n.isHub) {
          const outer = ctx!.createRadialGradient(n.x, ny, 0, n.x, ny, r * 9);
          outer.addColorStop(0, `rgba(255,214,0,${0.2 * glow})`);
          outer.addColorStop(1, 'rgba(255,214,0,0)');
          ctx!.beginPath();
          ctx!.arc(n.x, ny, r * 9, 0, Math.PI * 2);
          ctx!.fillStyle = outer;
          ctx!.fill();
        }

        // Soft halo
        const halo = ctx!.createRadialGradient(n.x, ny, 0, n.x, ny, r * 4);
        halo.addColorStop(0, `rgba(255,214,0,${0.25 + glow * 0.25})`);
        halo.addColorStop(1, 'rgba(255,214,0,0)');
        ctx!.beginPath();
        ctx!.arc(n.x, ny, r * 4, 0, Math.PI * 2);
        ctx!.fillStyle = halo;
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(n.x, ny, r, 0, Math.PI * 2);
        ctx!.fillStyle = n.isHub
          ? `rgba(255,214,0,${0.9 + glow * 0.1})`
          : `rgba(255,255,255,${0.55 + glow * 0.35})`;
        ctx!.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    // Mouse tracking relative to canvas
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }

    // Scroll parallax
    function onScroll() {
      scrollRef.current = window.scrollY;
    }

    resize();
    initNodes();
    initBokeh();
    draw();

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    const ro = new ResizeObserver(() => { resize(); initNodes(); initBokeh(); });
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
