'use client';

import { useRef, useState, type ReactNode } from 'react';

type TileCardProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  span?: 'sm' | 'md' | 'lg' | 'wide' | 'tall';
  accent?: 'violet' | 'cyan' | 'orange' | 'emerald' | 'pink' | 'sky';
  onClick?: () => void;
};

const spanClasses = {
  sm: '',
  md: 'sm:col-span-1',
  lg: 'sm:col-span-2',
  wide: 'sm:col-span-2 lg:col-span-3',
  tall: 'sm:row-span-2',
};

const accentStyles = {
  violet: {
    glow: 'group-hover:shadow-[0_0_50px_rgba(139,92,246,0.35)] group-hover:border-violet-400/50',
    spot: 'rgba(139,92,246,0.15)',
    border: 'border-violet-500/15',
    topLine: 'via-violet-400/70',
  },
  cyan: {
    glow: 'group-hover:shadow-[0_0_50px_rgba(34,211,238,0.35)] group-hover:border-cyan-400/50',
    spot: 'rgba(34,211,238,0.15)',
    border: 'border-cyan-500/15',
    topLine: 'via-cyan-400/70',
  },
  orange: {
    glow: 'group-hover:shadow-[0_0_50px_rgba(251,146,60,0.35)] group-hover:border-orange-400/50',
    spot: 'rgba(251,146,60,0.15)',
    border: 'border-orange-500/15',
    topLine: 'via-orange-400/70',
  },
  emerald: {
    glow: 'group-hover:shadow-[0_0_50px_rgba(52,211,153,0.35)] group-hover:border-emerald-400/50',
    spot: 'rgba(52,211,153,0.15)',
    border: 'border-emerald-500/15',
    topLine: 'via-emerald-400/70',
  },
  pink: {
    glow: 'group-hover:shadow-[0_0_50px_rgba(244,114,182,0.35)] group-hover:border-pink-400/50',
    spot: 'rgba(244,114,182,0.15)',
    border: 'border-pink-500/15',
    topLine: 'via-pink-400/70',
  },
  sky: {
    glow: 'group-hover:shadow-[0_0_50px_rgba(56,189,248,0.35)] group-hover:border-sky-400/50',
    spot: 'rgba(56,189,248,0.15)',
    border: 'border-sky-500/15',
    topLine: 'via-sky-400/70',
  },
};

export default function TileCard({
  children,
  className = '',
  href,
  span = 'sm',
  accent = 'violet',
  onClick,
}: TileCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const style = accentStyles[accent];

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const inner = (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setGlow({ x: 50, y: 50 })}
      className={`group relative overflow-hidden rounded-2xl border ${style.border} bg-white/[0.06] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.09] ${style.glow} ${!href ? spanClasses[span] : ''} ${className}`}
      style={{
        background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${style.spot} 0%, transparent 55%), rgba(255,255,255,0.05)`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${style.topLine} to-transparent`} />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className={`block ${spanClasses[span]}`}>
        {inner}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`block w-full text-left ${spanClasses[span]}`}>
        {inner}
      </button>
    );
  }

  return inner;
}
