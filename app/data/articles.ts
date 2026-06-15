export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  readTime: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: 'enterprise-ai-roadmap-2026',
    title: 'Enterprise AI Roadmap for 2026',
    description: 'A practical guide for turning AI experiments into production-ready systems.',
    date: 'Mar 2026',
    tag: 'Strategy',
    readTime: '8 min',
    body: [
      'Most enterprises are past the "should we use AI?" phase. The real question is how to move from isolated pilots to systems that survive security review, platform operations, and executive scrutiny.',
      'Start by inventorying data sensitivity, latency requirements, and integration surfaces. Not every use case needs a fine-tuned model — many production wins come from RAG, workflow automation, and disciplined API boundaries.',
      'Phase 1: Identify 2–3 high-value workflows with measurable KPIs (ticket deflection, cycle time, error rate). Phase 2: Build a reference architecture on your existing Kubernetes or OpenShift footprint. Phase 3: Establish LLMOps — versioning, evals, cost dashboards, and on-call runbooks.',
      'RVAI Labs typically sees teams succeed when platform engineering and application teams share ownership of the inference path, not when AI lives in a siloed innovation lab.',
    ],
  },
  {
    slug: 'kubernetes-ai-patterns',
    title: 'Kubernetes AI Patterns',
    description: 'How to architect scalable AI workloads on OpenShift and cloud native platforms.',
    date: 'Feb 2026',
    tag: 'Platform',
    readTime: '10 min',
    body: [
      'Running AI on Kubernetes is not just scheduling GPUs — it is designing for multi-tenancy, model lifecycle, and observability from day one.',
      'Pattern 1: Separate training and inference namespaces with distinct quota and network policies. Pattern 2: Use KServe or vLLM behind a unified ingress with token-based routing. Pattern 3: Centralize embedding pipelines so RAG indices stay consistent across teams.',
      'On OpenShift AI, leverage Data Science Pipelines for reproducible training and ModelMesh for elastic serving. Pair with Prometheus metrics on queue depth, TTFT, and GPU utilization.',
      'The goal is not maximum model size — it is predictable SLOs at sustainable cost.',
    ],
  },
  {
    slug: 'llmops-for-real-teams',
    title: 'LLMOps for Real Teams',
    description: 'Best practices for deployment, monitoring, and support of large language models.',
    date: 'Jan 2026',
    tag: 'LLMOps',
    readTime: '7 min',
    body: [
      'LLMOps is where MLops meets API product management. Your model is a service with consumers, SLAs, and incident response expectations.',
      'Version everything: prompts, retrieval corpora, model weights, and evaluation suites. Run regression evals before every promotion — hallucination rate, latency p95, and cost per 1K tokens.',
      'Operate with dashboards operators understand: error budgets, cache hit rates, and human escalation volume. Pair automated alerts with playbooks for model rollback and corpus rollback independently.',
      'Teams that treat prompts as code — reviewed, tested, and deployed — ship faster with fewer production surprises.',
    ],
  },
  {
    slug: 'building-agentic-workflows',
    title: 'Building Agentic Workflows',
    description: 'Design patterns for autonomous AI agents in enterprise environments.',
    date: 'Dec 2025',
    tag: 'Agents',
    readTime: '9 min',
    body: [
      'Agentic systems promise autonomy, but enterprise adoption demands control. The winning pattern is constrained agency: agents that plan within approved tool boundaries and audit every action.',
      'Start with human-in-the-loop for high-impact operations. Log tool calls, reasoning traces, and outcomes to a durable event store. Implement policy gates for PII, spend limits, and external API access.',
      'Compose agents from small, testable skills rather than monolithic prompts. Use retrieval for domain context and structured outputs for downstream systems.',
      'Measure success by task completion rate and mean time to resolution — not by how "autonomous" the demo looks.',
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
