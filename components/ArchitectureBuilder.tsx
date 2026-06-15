'use client';

import { useState } from 'react';
import TileCard from './TileCard';

const PATTERNS = [
  {
    id: 'rag',
    label: 'RAG Pipeline',
    nodes: ['Documents', 'Embeddings', 'Vector DB', 'Retriever', 'LLM', 'App'],
    colors: ['violet', 'cyan', 'pink', 'orange', 'emerald', 'sky'],
  },
  {
    id: 'agents',
    label: 'Agentic Workflow',
    nodes: ['Trigger', 'Planner', 'Tools', 'Policy Gate', 'LLM', 'Action'],
    colors: ['pink', 'violet', 'cyan', 'orange', 'emerald', 'sky'],
  },
  {
    id: 'serving',
    label: 'Model Serving',
    nodes: ['Ingress', 'Router', 'vLLM', 'GPU Pool', 'Metrics', 'Client'],
    colors: ['cyan', 'violet', 'pink', 'orange', 'emerald', 'sky'],
  },
] as const;

const accentBorder: Record<string, string> = {
  violet: 'border-violet-500/40 bg-violet-500/10',
  cyan: 'border-cyan-500/40 bg-cyan-500/10',
  pink: 'border-pink-500/40 bg-pink-500/10',
  orange: 'border-orange-500/40 bg-orange-500/10',
  emerald: 'border-emerald-500/40 bg-emerald-500/10',
  sky: 'border-sky-500/40 bg-sky-500/10',
};

export default function ArchitectureBuilder() {
  const [active, setActive] = useState(0);
  const pattern = PATTERNS[active];

  return (
    <TileCard accent="pink" className="!p-8">
      <h3 className="text-lg font-bold text-white">Architecture Explorer</h3>
      <p className="mt-1 text-xs text-slate-400">Pick a pattern — see the enterprise AI flow</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PATTERNS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              active === i
                ? 'border-pink-400/50 bg-pink-500/20 text-pink-200'
                : 'border-white/10 text-slate-400 hover:border-white/20'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {pattern.nodes.map((node, i) => (
          <div key={node} className="flex items-center gap-2">
            <div
              className={`rounded-lg border px-3 py-2 text-xs font-medium text-white transition-all duration-500 ${accentBorder[pattern.colors[i]]}`}
            >
              {node}
            </div>
            {i < pattern.nodes.length - 1 && (
              <span className="text-slate-500">→</span>
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        RVAI Labs designs and deploys these patterns on OpenShift & Kubernetes
      </p>
    </TileCard>
  );
}
