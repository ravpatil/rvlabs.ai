'use client';

import { useState } from 'react';
import TileCard from './TileCard';

const serviceIcons: Record<string, string> = {
  strategy: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  training: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  workshop: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  agents: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  platform: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2',
  llmops: 'M13 10V3L4 14h7v7l9-11h-7z',
};

const accents = ['violet', 'cyan', 'pink', 'orange', 'emerald', 'sky'] as const;

type Service = {
  name: string;
  description: string;
  icon: string;
  stack?: string[];
};

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);
  const accent = accents[index % accents.length];

  return (
    <TileCard accent={accent} onClick={() => setOpen(!open)} className="cursor-pointer">
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={serviceIcons[service.icon] || serviceIcons.strategy} />
          </svg>
        </div>
        <span className="text-xs text-slate-500">{open ? '−' : '+'}</span>
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">{service.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.description}</p>

      <div className={`overflow-hidden transition-all duration-300 ${open ? 'mt-4 max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        {service.stack && (
          <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
            {service.stack.map((tag) => (
              <span key={tag} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </TileCard>
  );
}
