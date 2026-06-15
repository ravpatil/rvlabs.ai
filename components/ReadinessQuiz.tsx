'use client';

import { useState } from 'react';
import TileCard from './TileCard';

const QUESTIONS = [
  {
    q: 'Do you have a defined AI use-case backlog with business owners?',
    scores: [0, 1, 2],
  },
  {
    q: 'Is there a shared inference/serving platform (not just notebooks)?',
    scores: [0, 2, 3],
  },
  {
    q: 'Do you run evals or regression tests before promoting models?',
    scores: [0, 1, 3],
  },
  {
    q: 'Are security, data classification, and audit requirements documented?',
    scores: [0, 2, 3],
  },
  {
    q: 'Do platform and app teams share ownership of AI in production?',
    scores: [0, 1, 2],
  },
];

const LABELS = ['Not yet', 'In progress', 'Yes'];

function getTier(score: number) {
  if (score >= 10) return { label: 'Production-ready', color: 'text-emerald-400', advice: 'You are well-positioned to scale. RVAI Labs can help optimize cost, evals, and multi-team rollout.' };
  if (score >= 6) return { label: 'Scaling up', color: 'text-cyan-400', advice: 'Strong foundations — focus on LLMOps rigor and platform consolidation. A 90-day roadmap workshop would accelerate you.' };
  if (score >= 3) return { label: 'Early stage', color: 'text-orange-400', advice: 'Good momentum. Prioritize one production-shaped PoC with observability before expanding use cases.' };
  return { label: 'Exploring', color: 'text-pink-400', advice: 'Start with discovery: map 2–3 use cases, assess data readiness, and design a reference architecture on your existing stack.' };
}

export default function ReadinessQuiz() {
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1));
  const [done, setDone] = useState(false);

  const score = answers.reduce((sum, a, i) => sum + (a >= 0 ? QUESTIONS[i].scores[a] : 0), 0);
  const tier = getTier(score);
  const allAnswered = answers.every((a) => a >= 0);

  return (
    <TileCard accent="violet" className="!p-8">
      <h3 className="text-lg font-bold text-white">AI Readiness Score</h3>
      <p className="mt-1 text-xs text-slate-400">5 questions · instant assessment</p>

      <div className="mt-6 space-y-5">
        {QUESTIONS.map((item, qi) => (
          <div key={item.q}>
            <p className="text-sm text-slate-300">{item.q}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {LABELS.map((label, li) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    const next = [...answers];
                    next[qi] = li;
                    setAnswers(next);
                    setDone(false);
                  }}
                  className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                    answers[qi] === li
                      ? 'border-violet-400/50 bg-violet-500/20 text-violet-200'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled={!allAnswered}
        onClick={() => setDone(true)}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 py-3 text-sm font-semibold text-white disabled:opacity-40"
      >
        Get my score
      </button>

      {done && allAnswered && (
        <div className="mt-6 rounded-xl border border-violet-500/30 bg-violet-500/10 p-5 text-center">
          <p className="font-mono text-4xl font-bold text-white">{score}<span className="text-lg text-slate-400">/15</span></p>
          <p className={`mt-2 text-lg font-semibold ${tier.color}`}>{tier.label}</p>
          <p className="mt-3 text-sm text-slate-300">{tier.advice}</p>
          <a href="#contact" className="mt-4 inline-block text-sm font-medium text-cyan-400 hover:text-cyan-300">
            Discuss your roadmap →
          </a>
        </div>
      )}
    </TileCard>
  );
}
