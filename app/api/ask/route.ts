import { NextResponse } from 'next/server';

const RESPONSES: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['rag', 'retrieval', 'knowledge', 'document'],
    answer:
      'For enterprise RAG, start with a governed document corpus, hybrid retrieval (dense + keyword), and PHI/PII guardrails. RVAI Labs typically deploys this on OpenShift with vector storage, eval pipelines, and human escalation for edge cases. Next step: map your top 3 support or ops workflows and measure deflection potential.',
  },
  {
    keywords: ['agent', 'automation', 'workflow', 'autonomous'],
    answer:
      'Agentic workflows work best with constrained tool access, audit logs, and human-in-the-loop for high-impact actions. We design agents as composable skills with policy gates — not open-ended autonomy. A 2-week discovery workshop usually surfaces 2–3 high-ROI automation targets.',
  },
  {
    keywords: ['openshift', 'kubernetes', 'k8s', 'platform', 'gpu'],
    answer:
      'For Kubernetes/OpenShift AI, prioritize GPU scheduling, multi-tenant namespaces, and a unified serving layer (KServe/vLLM). RVAI Labs builds reference architectures with observability baked in: TTFT, queue depth, cost per 1K tokens. Book a discovery call to review your current cluster footprint.',
  },
  {
    keywords: ['llmops', 'serving', 'deploy', 'production', 'monitor'],
    answer:
      'LLMOps essentials: version prompts and corpora independently, run regression evals before promotion, and operate with SRE-friendly dashboards. We help teams go from notebook to on-call runbooks in 90 days. Start with one model, one use case, one SLO.',
  },
  {
    keywords: ['training', 'workshop', 'learn', 'course', 'bootcamp'],
    answer:
      'RVAI Labs offers hands-on trainings from GenAI fundamentals to OpenShift AI bootcamps and LLMOps masterclasses. Browse /trainings for syllabi, or contact us for corporate onsite programs tailored to your stack.',
  },
  {
    keywords: ['cost', 'budget', 'pricing', 'expensive'],
    answer:
      'Control LLM costs with caching, model routing (small vs large), batching, and token budgets per tenant. We implement cost dashboards alongside latency SLOs so finance and engineering share the same view. Happy to review your current spend patterns in a discovery session.',
  },
  {
    keywords: ['security', 'compliance', 'enterprise', 'soc', 'gdpr'],
    answer:
      'Enterprise AI requires data classification, network policies, SSO, and audit trails from day one. RVAI Labs aligns architectures with SOC2-style controls and sector-specific requirements. We never recommend shipping pilots that cannot pass security review.',
  },
];

function matchResponse(query: string): string {
  const q = query.toLowerCase();
  for (const r of RESPONSES) {
    if (r.keywords.some((k) => q.includes(k))) return r.answer;
  }
  return `Thanks for your question about "${query.slice(0, 80)}". RVAI Labs specializes in production AI on OpenShift/Kubernetes — strategy, LLMOps, RAG, and agentic workflows. For a tailored answer, book a discovery call or email ${process.env.CONTACT_TO_EMAIL || 'rvgpatil@gmail.com'}. Try asking about RAG, agents, LLMOps, or OpenShift AI.`;
}

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== 'string' || query.trim().length < 3) {
      return NextResponse.json({ error: 'Please enter a longer question.' }, { status: 400 });
    }
    if (query.length > 500) {
      return NextResponse.json({ error: 'Question too long.' }, { status: 400 });
    }

    const answer = matchResponse(query.trim());
    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
