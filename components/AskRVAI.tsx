'use client';

import { useState } from 'react';
import TileCard from './TileCard';

const SUGGESTIONS = [
  'How do we deploy RAG on OpenShift?',
  'What is a good LLMOps starting point?',
  'How do enterprise AI agents stay compliant?',
];

export default function AskRVAI() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(q?: string) {
    const text = (q ?? query).trim();
    if (text.length < 3) return;

    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }
      setAnswer(data.answer);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="ask-rvai">
    <TileCard accent="cyan" className="!p-8">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/30 to-cyan-500/30 text-sm">✦</span>
        <div>
          <h3 className="text-lg font-bold text-white">Ask RVAI</h3>
          <p className="text-xs text-slate-400">Describe your AI challenge — get a tailored starting point</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="e.g. We need RAG for internal docs on Kubernetes..."
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/50"
        />
        <button
          type="button"
          onClick={() => submit()}
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setQuery(s);
              submit(s);
            }}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400 transition hover:border-cyan-500/30 hover:text-cyan-300"
          >
            {s}
          </button>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      {answer && (
        <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">RVAI Labs</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">{answer}</p>
          <a href="#contact" className="mt-4 inline-block text-xs font-medium text-pink-400 hover:text-pink-300">
            Book a discovery call →
          </a>
        </div>
      )}
    </TileCard>
    </div>
  );
}
