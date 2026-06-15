import {
  blogPosts,
  community,
  contactInfo,
  hero,
  navLinks,
  services,
  trainings,
  whyItems,
} from './data/siteContent';
import AIBackground from '../components/AIBackground';
import ContactForm from '../components/ContactForm';
import HeroSection from '../components/HeroSection';
import NavBar from '../components/NavBar';
import TileCard from '../components/TileCard';

const serviceIcons: Record<string, string> = {
  strategy: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  training: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  workshop: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  agents: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  platform: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2',
  llmops: 'M13 10V3L4 14h7v7l9-11h-7z',
};

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
    <main className="relative min-h-screen text-slate-100">
      <AIBackground />
      <div className="relative z-10">
        <NavBar links={navLinks} />
        <HeroSection hero={hero} />

        {/* Services */}
        <section id="services" className="px-6 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionLabel color="violet">Services</SectionLabel>
            <h2 className="mt-4 bg-gradient-to-r from-white via-violet-100 to-cyan-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Intelligent solutions for enterprise teams
            </h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              From strategy to production — modular AI capabilities delivered as interactive, production-grade systems.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service: any, i: number) => (
                <TileCard key={service.name} accent={accents[i % accents.length]}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={serviceIcons[service.icon] || serviceIcons.strategy}
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.description}</p>
                </TileCard>
              ))}
            </div>
          </div>
        </section>

        {/* Why RVAI */}
        <section id="why" className="px-6 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionLabel color="cyan">Why RVAI</SectionLabel>
            <h2 className="mt-4 bg-gradient-to-r from-cyan-200 via-white to-pink-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Built different. Built for production.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whyItems.map((item: any, i: number) => (
                <TileCard key={item.title} accent={accents[i % accents.length]}>
                  <p className="font-mono text-xs text-cyan-400/70">0{i + 1}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </TileCard>
              ))}
            </div>
          </div>
        </section>

        {/* Blogs */}
        <section id="blogs" className="px-6 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionLabel color="pink">Blogs</SectionLabel>
            <h2 className="mt-4 bg-gradient-to-r from-pink-200 via-white to-violet-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Insights from the AI frontier
            </h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              Deep dives on enterprise AI, platform engineering, and production LLMOps.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {blogPosts.map((post: any, i: number) => (
                <TileCard key={post.title} href={post.href} accent={accents[i % accents.length]} span={i === 0 ? 'lg' : 'sm'}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-violet-300">
                      {post.tag}
                    </span>
                    <span className="text-xs text-slate-500">{post.date}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white transition group-hover:text-cyan-200">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{post.description}</p>
                  <p className="mt-4 text-xs font-medium text-cyan-400 opacity-0 transition group-hover:opacity-100">
                    Read article →
                  </p>
                </TileCard>
              ))}
            </div>
          </div>
        </section>

        {/* Trainings */}
        <section id="trainings" className="px-6 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionLabel color="orange">Trainings</SectionLabel>
            <h2 className="mt-4 bg-gradient-to-r from-orange-200 via-white to-cyan-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Hands-on AI education
            </h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              Practical workshops and bootcamps designed for developer and platform teams.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trainings.map((training: any, i: number) => (
                <TileCard key={training.title} href={training.href} accent={accents[i % accents.length]}>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium uppercase text-cyan-300">
                      {training.level}
                    </span>
                    <span className="text-xs text-slate-500">{training.duration}</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{training.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{training.description}</p>
                </TileCard>
              ))}
            </div>
          </div>
        </section>

        {/* Community */}
        <section id="community" className="px-6 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionLabel color="emerald">Community</SectionLabel>
            <h2 className="mt-4 bg-gradient-to-r from-emerald-200 via-white to-cyan-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Connect. Learn. Build together.
            </h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              Join a growing network of AI practitioners, platform engineers, and enterprise innovators.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {community.map((item: any, i: number) => (
                <TileCard key={item.title} href={item.href} accent={accents[i % accents.length]}>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-400">
                    {item.type.slice(0, 2).toUpperCase()}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </TileCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 pb-24 pt-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 lg:grid-cols-5">
              <TileCard accent="violet" className="lg:col-span-2">
                <SectionLabel>Contact</SectionLabel>
                <h2 className="mt-4 text-2xl font-bold text-white">Ready to build with AI?</h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  Reach out for consulting, training, or a discovery call. RVAI Labs moves teams from exploration to
                  production-ready AI fast.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    { label: 'Email', value: contactInfo.email },
                    { label: 'LinkedIn', value: contactInfo.linkedin },
                    { label: 'WhatsApp', value: contactInfo.whatsapp },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{item.label}</p>
                      <p className="mt-1 text-sm text-slate-300">{item.value}</p>
                    </div>
                  ))}
                </div>
              </TileCard>
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <footer className="relative border-t border-white/10 px-6 py-8 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-400">
              <span className="bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text font-semibold text-transparent">RVAI</span>{' '}
              <span className="text-cyan-400/80">Labs</span> — Enterprise AI engineering
            </p>
            <p className="font-mono text-xs text-slate-500">© {new Date().getFullYear()} RVAI Labs</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
