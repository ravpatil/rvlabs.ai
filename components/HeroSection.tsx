'use client';

import { useEffect, useState } from 'react';
import TileCard from './TileCard';

type Hero = {
  badge: string;
  title: string;
  copy: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const stats = [
  { value: '50+', label: 'Enterprise deployments' },
  { value: '12', label: 'AI workshops delivered' },
  { value: '99.9%', label: 'Platform uptime focus' },
];

export default function HeroSection({ hero }: { hero: Hero }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative px-6 pb-20 pt-12 sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-7xl">
        <div
          className={`grid gap-4 transition-all duration-700 sm:grid-cols-2 lg:grid-cols-4 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <TileCard span="wide" accent="violet" className="lg:col-span-2 lg:row-span-2 !p-8 sm:!p-10">
            <div className="flex h-full flex-col justify-between gap-8">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-gradient-to-r from-violet-500/15 via-pink-500/10 to-cyan-500/15 px-3 py-1 text-xs font-medium uppercase tracking-widest text-pink-200">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-pink-400" />
                  {hero.badge}
                </p>
                <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  <span className="bg-gradient-to-r from-white via-violet-100 to-cyan-200 bg-clip-text text-transparent">
                    {hero.title}
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">{hero.copy}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={hero.primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(244,114,182,0.4)] transition hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
                >
                  {hero.primaryCta.label}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:border-pink-400/40 hover:bg-pink-500/10 hover:text-white"
                >
                  {hero.secondaryCta.label}
                </a>
              </div>
            </div>
          </TileCard>

          <TileCard accent="cyan" className="flex flex-col justify-center">
            <p className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text font-mono text-3xl font-bold text-transparent">{stats[0].value}</p>
            <p className="mt-2 text-sm text-slate-400">{stats[0].label}</p>
          </TileCard>

          <TileCard accent="orange" className="flex flex-col justify-center">
            <p className="bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text font-mono text-3xl font-bold text-transparent">{stats[1].value}</p>
            <p className="mt-2 text-sm text-slate-400">{stats[1].label}</p>
          </TileCard>

          <TileCard accent="pink" className="flex flex-col justify-center lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI-Native Platform Engineering</p>
                <p className="text-xs text-slate-500">OpenShift · Kubernetes · LLMOps</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {['LLM', 'RAG', 'Agents', 'MLOps'].map((tag, i) => {
                const tagColors = ['text-violet-300 border-violet-400/30', 'text-cyan-300 border-cyan-400/30', 'text-pink-300 border-pink-400/30', 'text-orange-300 border-orange-400/30'];
                return (
                <span
                  key={tag}
                  className={`rounded-md border bg-white/[0.04] px-2 py-1 font-mono text-[10px] ${tagColors[i]}`}
                >
                  {tag}
                </span>
              );})}
            </div>
          </TileCard>

          <TileCard accent="violet" className="flex flex-col justify-center">
            <p className="bg-gradient-to-r from-violet-300 to-pink-400 bg-clip-text font-mono text-3xl font-bold text-transparent">{stats[2].value}</p>
            <p className="mt-2 text-sm text-slate-400">{stats[2].label}</p>
          </TileCard>
        </div>
      </div>
    </section>
  );
}
