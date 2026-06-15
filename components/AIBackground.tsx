'use client';

import { useEffect, useRef } from 'react';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: [number, number, number];
  pulse: number;
  pulseSpeed: number;
};

const PALETTE: [number, number, number][] = [
  [139, 92, 246],   // violet
  [34, 211, 238],   // cyan
  [244, 114, 182],  // pink
  [251, 146, 60],   // orange
  [52, 211, 153],   // emerald
  [167, 139, 250],  // light violet
  [56, 189, 248],   // sky
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function rgba(c: [number, number, number], a: number) {
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;
}

export default function AIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationId: number;
    let nodes: Node[] = [];
    let time = 0;

    const mouse = { x: -9999, y: -9999, active: false };
    const smoothMouse = { x: -9999, y: -9999 };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onLeave = () => {
      mouse.active = false;
    };

    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = window.innerWidth * window.innerHeight;
      const count = reducedMotion
        ? Math.min(40, Math.floor(area / 28000))
        : Math.min(130, Math.floor(area / 12000));

      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (reducedMotion ? 0.15 : 0.35),
        vy: (Math.random() - 0.5) * (reducedMotion ? 0.15 : 0.35),
        radius: 1.2 + Math.random() * 2.2,
        color: PALETTE[i % PALETTE.length],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      }));
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      time += 0.016;

      ctx.clearRect(0, 0, w, h);

      if (mouse.active) {
        smoothMouse.x = lerp(smoothMouse.x, mouse.x, 0.12);
        smoothMouse.y = lerp(smoothMouse.y, mouse.y, 0.12);
      }

      // Move nodes
      for (const node of nodes) {
        if (!reducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > w) node.vx *= -1;
          if (node.y < 0 || node.y > h) node.vy *= -1;
        }
        node.pulse += node.pulseSpeed;
      }

      const connectDist = reducedMotion ? 100 : 160;

      // Inter-node connections — colorful neural mesh
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            const t = 1 - dist / connectDist;
            const pulse = 0.5 + 0.5 * Math.sin(time * 2 + i * 0.3 + j * 0.2);
            const alpha = t * (0.12 + pulse * 0.1);
            const c = PALETTE[(i + j) % PALETTE.length];

            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, rgba(nodes[i].color, alpha));
            grad.addColorStop(1, rgba(nodes[j].color, alpha));

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6 + t * 0.8;
            ctx.stroke();
          }
        }
      }

      // Cursor-reactive connections
      if (mouse.active) {
        const cursorRadius = 220;
        const nearby: { node: Node; dist: number }[] = [];

        for (const node of nodes) {
          const dx = smoothMouse.x - node.x;
          const dy = smoothMouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < cursorRadius) nearby.push({ node, dist });
        }

        nearby.sort((a, b) => a.dist - b.dist);
        const connectCount = Math.min(nearby.length, 12);

        for (let i = 0; i < connectCount; i++) {
          const { node, dist } = nearby[i];
          const t = 1 - dist / cursorRadius;
          const alpha = t * 0.55;
          const hueShift = (i / connectCount) * 0.5;

          const grad = ctx.createLinearGradient(smoothMouse.x, smoothMouse.y, node.x, node.y);
          grad.addColorStop(0, `rgba(244, 114, 182, ${alpha * 0.9})`);
          grad.addColorStop(0.5, `rgba(34, 211, 238, ${alpha * 0.7})`);
          grad.addColorStop(1, rgba(node.color, alpha * 0.8));

          ctx.beginPath();
          ctx.moveTo(smoothMouse.x, smoothMouse.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1 + t * 1.5;
          ctx.stroke();

          // Connect nearby cursor-linked nodes to each other
          if (i < connectCount - 1 && i < 6) {
            const next = nearby[i + 1].node;
            const ndx = node.x - next.x;
            const ndy = node.y - next.y;
            const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
            if (ndist < 120) {
              const nt = 1 - ndist / 120;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(next.x, next.y);
              ctx.strokeStyle = rgba(PALETTE[Math.floor(hueShift * PALETTE.length) % PALETTE.length], nt * 0.25);
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }

        // Cursor glow
        const glow = ctx.createRadialGradient(smoothMouse.x, smoothMouse.y, 0, smoothMouse.x, smoothMouse.y, 80);
        glow.addColorStop(0, 'rgba(244, 114, 182, 0.18)');
        glow.addColorStop(0.4, 'rgba(34, 211, 238, 0.08)');
        glow.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(smoothMouse.x, smoothMouse.y, 80, 0, Math.PI * 2);
        ctx.fill();

        // Cursor dot
        ctx.beginPath();
        ctx.arc(smoothMouse.x, smoothMouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(smoothMouse.x, smoothMouse.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = 0.7 + 0.3 * Math.sin(node.pulse);
        const r = node.radius * pulse;

        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4);
        glow.addColorStop(0, rgba(node.color, 0.5));
        glow.addColorStop(1, rgba(node.color, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(node.color, 0.85);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', onLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  );
}
