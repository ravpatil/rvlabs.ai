import Link from 'next/link';
import {
  blogPosts,
  brandTagline,
  caseStudies,
  certifications,
  community,
  hero,
  howWeWork,
  industries,
  labTeam,
  services,
  testimonials,
  trainings,
  whyItems,
} from './data/siteContent';
import ArchitectureBuilder from '../components/ArchitectureBuilder';
import AskRVAI from '../components/AskRVAI';
import ContactSection from '../components/ContactSection';
import HeroSection from '../components/HeroSection';
import PageShell from '../components/PageShell';
import ReadinessQuiz from '../components/ReadinessQuiz';
import ScrollReveal from '../components/ScrollReveal';
import ServiceCard from '../components/ServiceCard';
import SiteFooter from '../components/SiteFooter';
import TileCard from '../components/TileCard';

const accents = ['violet', 'cyan', 'pink', 'orange', 'emerald', 'sky'] as const;

const sectionColors: Record<string, { line: string; text: string }> = {
  violet: { line: 'from-violet-400 via-pink-400 to-cyan-400', text: 'text-violet-300' },
  cyan: { line: 'from-cyan-400 via-sky-400 to-violet-400', text: 'text-cyan-300' },
  pink: { line: 'from-pink-400 via-violet-400 to-orange-400', text: 'text-pink-300' },
  orange: { line: 'from-orange-400 via-pink-400 to-violet-400', text: 'text-orange-300' },
  emerald: { line: 'from-emerald-400 via-cyan-400 to-violet-400', text: 'text-emerald-300' },
};

function SectionLabel({ children, color = 'violet' }: { children: React.ReactNode; color?: string }) {
  const c = sectionColors[color] || sectionColors.violet;
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] ${c.text}`}>
      <span className={`h-px w-8 bg-gradient-to-r ${c.line}`} />
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <PageShell>
      <HeroSection hero={hero} tagline={brandTagline} />

      {/* Signature experiences */}
      <section className="px-6 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel color="cyan">Experience</SectionLabel>
            <h2 className="mt-4 bg-gradient-to-r from-cyan-200 via-white to-pink-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Try before you talk to us
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <ScrollReveal delay={100}><AskRVAI /></ScrollReveal>
            <ScrollReveal delay={200}><ReadinessQuiz /></ScrollReveal>
            <ScrollReveal delay={300} className="lg:col-span-2"><ArchitectureBuilder /></ScrollReveal>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="px-6 pb-8 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {industries.map((ind: string) => (
                <span key={ind} className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-400">
                  {ind}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel color="violet">Services</SectionLabel>
            <h2 className="mt-4 bg-gradient-to-r from-white via-violet-100 to-cyan-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Intelligent solutions for enterprise teams
            </h2>
            <p className="mt-3 max-w-2xl text-slate-400">Click a tile to explore the tech stack. From strategy to production.</p>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service: any, i: number) => (
              <ScrollReveal key={service.name} delay={i * 80}>
                <ServiceCard service={service} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel color="pink">Work</SectionLabel>
            <h2 className="mt-4 bg-gradient-to-r from-pink-200 via-white to-violet-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Production outcomes, not prototypes
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {caseStudies.map((cs: any, i: number) => (
              <ScrollReveal key={cs.title} delay={i * 100}>
                <TileCard accent={accents[i % accents.length]}>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{cs.client}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{cs.title}</h3>
                  <p className="mt-3 text-sm text-slate-400"><span className="text-pink-400">Challenge:</span> {cs.problem}</p>
                  <p className="mt-2 text-sm text-slate-400"><span className="text-cyan-400">Approach:</span> {cs.approach}</p>
                  <p className="mt-2 text-sm text-slate-300"><span className="text-emerald-400">Outcome:</span> {cs.outcome}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cs.metrics.map((m: string) => (
                      <span key={m} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-violet-300">{m}</span>
                    ))}
                  </div>
                </TileCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel color="emerald">Testimonials</SectionLabel>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Trusted by platform & engineering leaders</h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((t: any, i: number) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <TileCard accent={accents[i % accents.length]}>
                  <p className="text-sm leading-relaxed text-slate-300">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </TileCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why RVAI */}
      <section id="why" className="px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel color="cyan">Why RVAI</SectionLabel>
            <h2 className="mt-4 bg-gradient-to-r from-cyan-200 via-white to-pink-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Built different. Built for production.
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyItems.map((item: any, i: number) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <TileCard accent={accents[i % accents.length]}>
                  <p className="font-mono text-xs text-cyan-400/70">0{i + 1}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </TileCard>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-8">
            <div className="flex flex-wrap gap-2">
              {certifications.map((c: string) => (
                <span key={c} className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">{c}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How We Work */}
      <section id="how-we-work" className="px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel color="orange">Process</SectionLabel>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">How we work</h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howWeWork.map((step: any, i: number) => (
              <ScrollReveal key={step.step} delay={i * 100}>
                <TileCard accent={accents[i % accents.length]}>
                  <p className="font-mono text-2xl font-bold text-orange-400/80">{step.step}</p>
                  <h3 className="mt-3 font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{step.description}</p>
                </TileCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Lab */}
      <section id="the-lab" className="px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel color="violet">The Lab</SectionLabel>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Practices behind RVAI Labs</h2>
            <p className="mt-3 max-w-2xl text-slate-400">Specialized teams — not a one-size-fits-all consultancy.</p>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {labTeam.map((member: any, i: number) => (
              <ScrollReveal key={member.name} delay={i * 80}>
                <TileCard accent={accents[i % accents.length]}>
                  <h3 className="text-base font-semibold text-white">{member.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{member.focus}</p>
                </TileCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs preview */}
      <section id="blogs" className="px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionLabel color="pink">Blogs</SectionLabel>
                <h2 className="mt-4 bg-gradient-to-r from-pink-200 via-white to-violet-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                  Insights from the AI frontier
                </h2>
              </div>
              <Link href="/blog" className="text-sm font-medium text-cyan-400 hover:text-cyan-300">View all →</Link>
            </div>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {blogPosts.slice(0, 4).map((post: any, i: number) => (
              <ScrollReveal key={post.slug} delay={i * 80}>
                <TileCard href={post.href} accent={accents[i % accents.length]} span={i === 0 ? 'lg' : 'sm'}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 font-mono text-[10px] uppercase text-violet-300">{post.tag}</span>
                    <span className="text-xs text-slate-500">{post.date}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{post.description}</p>
                </TileCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trainings preview */}
      <section id="trainings" className="px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionLabel color="orange">Trainings</SectionLabel>
                <h2 className="mt-4 bg-gradient-to-r from-orange-200 via-white to-cyan-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                  Hands-on AI education
                </h2>
              </div>
              <Link href="/trainings" className="text-sm font-medium text-cyan-400 hover:text-cyan-300">View all →</Link>
            </div>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trainings.map((t: any, i: number) => (
              <ScrollReveal key={t.slug} delay={i * 80}>
                <TileCard href={t.href} accent={accents[i % accents.length]}>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] uppercase text-cyan-300">{t.level}</span>
                    <span className="text-xs text-slate-500">{t.duration}</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{t.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{t.description}</p>
                </TileCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Community preview */}
      <section id="community" className="px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionLabel color="emerald">Community</SectionLabel>
                <h2 className="mt-4 bg-gradient-to-r from-emerald-200 via-white to-cyan-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                  Connect. Learn. Build together.
                </h2>
              </div>
              <Link href="/community" className="text-sm font-medium text-cyan-400 hover:text-cyan-300">Explore →</Link>
            </div>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {community.map((item: any, i: number) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <TileCard href={item.href.startsWith('http') ? item.href : item.href} accent={accents[i % accents.length]}>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-400">
                    {item.type.slice(0, 2).toUpperCase()}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                </TileCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
    </PageShell>
  );
}
