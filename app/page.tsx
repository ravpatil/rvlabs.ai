import {
  blogPosts,
  contactInfo,
  founderBadges,
  hero,
  navLinks,
  services,
  videos,
  whyItems,
} from './data/siteContent';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-slate-100">
      <header className="mx-auto max-w-6xl px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">RVLabs</p>
            <p className="mt-2 text-sm text-slate-400">Enterprise AI consulting, training & solutions</p>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            {navLinks.map((link: any) => (
              <a key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 inline-flex rounded-full bg-orange-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.26em] text-orange-300 ring-1 ring-orange-300/20">
            {hero.badge}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            {hero.copy}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={hero.primaryCta.href} className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-orange-400">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-white">
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl space-y-10 px-6 pb-16 sm:px-8">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-8 shadow-glow">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">Services</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">What RVLabs delivers for enterprise teams</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service: any) => (
              <div key={service.name} className="rounded-3xl border border-slate-800/90 bg-[#101010]/95 p-6 transition hover:-translate-y-1 hover:border-orange-500/50">
                <p className="text-base font-semibold text-white">{service.name}</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-10 shadow-glow">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">Why RVLabs</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Enterprise-first AI with cloud native rigor</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-400">
              RVLabs focuses on secure, scalable AI adoption for organizations that need more than prototypes — they need reliable systems, operational workflows, and team enablement.
            </p>
          </div>
          <div className="grid gap-4">
            {whyItems.map((item: any) => (
              <div key={item} className="rounded-3xl border border-slate-800/90 bg-[#101010]/95 p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-orange-300">{item.split(' ')[0]}</p>
                <p className="mt-4 text-lg font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-10 shadow-glow">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">About Founder</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Built for enterprise AI, OpenShift, and modern teams</h2>
            <p className="mt-5 text-base leading-8 text-slate-400">
              Founder experience includes large-scale AI infrastructure, LLM serving, production support, and technical training for developer and platform teams.
            </p>
            <div className="mt-8 grid gap-3 text-slate-300 sm:grid-cols-2">
              {founderBadges.map((badge: any) => (
                <span key={badge} className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-2 text-sm text-orange-200">
                  {badge}
                </span>
              ))}
            </div>
            <p className="mt-8 text-sm uppercase tracking-[0.3em] text-slate-500">Editable content</p>
            <p className="mt-3 text-slate-400">
              Update text, add your own case studies, and swap the photo block with your professional portrait.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/80 bg-[#111111]/95 p-10 text-center shadow-glow">
            <div className="mx-auto mb-8 flex h-48 w-48 items-center justify-center rounded-full bg-slate-900 text-slate-500">
              <span className="text-sm uppercase tracking-[0.3em]">Photo</span>
            </div>
            <p className="text-base leading-8 text-slate-400">
              Replace this placeholder with your professional photo, logo, or a short brand video screenshot.
            </p>
          </div>
        </div>
      </section>

      <section id="insights" className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-10 shadow-glow">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">Insights</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Blog posts and video resources</h2>
            <p className="mt-5 text-base leading-8 text-slate-400">
              Quickly edit the lists below to publish new articles, add videos, and show your enterprise AI expertise.
            </p>
          </div>
          <div className="grid gap-4">
            {blogPosts.map((post: any) => (
              <a key={post.title} href={post.href} className="rounded-3xl border border-slate-800/90 bg-[#101010]/95 p-6 transition hover:border-orange-500/60">
                <p className="text-lg font-semibold text-white">{post.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">{post.description}</p>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {videos.map((video: any) => (
            <a key={video.title} href={video.href} className="rounded-3xl border border-slate-800/90 bg-[#101010]/95 p-6 transition hover:border-cyan-400/50">
              <div className="inline-flex items-center gap-3 rounded-full bg-orange-500/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-orange-300">
                Video
              </div>
              <p className="mt-4 text-lg font-semibold text-white">{video.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-400">{video.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 pb-24 sm:px-8">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-10 shadow-glow">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">Contact</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Ready to start your enterprise AI journey?</h2>
              <p className="mt-5 text-base leading-8 text-slate-400">
                Reach out for consulting, training, or a discovery call. RVLabs moves teams from exploration to production-ready AI fast.
              </p>
              <div className="mt-8 space-y-4 text-slate-300">
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-sm text-slate-400">{contactInfo.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-white">LinkedIn</p>
                  <p className="text-sm text-slate-400">{contactInfo.linkedin}</p>
                </div>
                <div>
                  <p className="font-semibold text-white">WhatsApp</p>
                  <p className="text-sm text-slate-400">{contactInfo.whatsapp}</p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
