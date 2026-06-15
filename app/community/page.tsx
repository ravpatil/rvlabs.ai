import Link from 'next/link';
import PageShell from '../../components/PageShell';
import SiteFooter from '../../components/SiteFooter';
import TileCard from '../../components/TileCard';
import { community, contactInfo, newsletter } from '../data/siteContent';

export const metadata = {
  title: 'Community | RVAI Labs',
  description: 'Meetups, open source, talks, and the RVAI Signal newsletter.',
};

const accents = ['emerald', 'cyan', 'pink', 'violet'] as const;

export default function CommunityPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300">← Home</Link>
        <h1 className="mt-6 bg-gradient-to-r from-emerald-200 via-white to-cyan-200 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          RVAI Community
        </h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Connect with AI practitioners, platform engineers, and enterprise innovators.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {community.map((item: any, i: number) => {
            const href = item.href.startsWith('http') ? item.href : item.href.replace('/community', '') || '/community';
            return (
            <TileCard key={item.title} href={href.startsWith('#') ? `/community${href}` : href} accent={accents[i % accents.length]}>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-400">
                {item.type.slice(0, 2).toUpperCase()}
              </span>
              <h2 className="mt-4 text-base font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{item.description}</p>
            </TileCard>
            );
          })}
        </div>

        <div id="meetups" className="mt-16 scroll-mt-24">
          <TileCard accent="cyan" className="!p-8">
            <h2 className="text-xl font-bold text-white">AI Platform Meetups</h2>
            <p className="mt-3 text-sm text-slate-400">
              Monthly virtual sessions covering Kubernetes AI, LLMOps, and enterprise GenAI adoption.
              Next session: OpenShift AI serving patterns — join the waitlist.
            </p>
            <Link href="/#contact" className="mt-4 inline-block text-sm font-medium text-cyan-400">Join waitlist →</Link>
          </TileCard>
        </div>

        <div id="talks" className="mt-8 scroll-mt-24">
          <TileCard accent="pink" className="!p-8">
            <h2 className="text-xl font-bold text-white">Technical Talks</h2>
            <p className="mt-3 text-sm text-slate-400">
              Conference presentations on AI infrastructure, agentic workflows, and production LLMOps.
              Invite RVAI Labs to speak at your event.
            </p>
            <Link href="/#contact" className="mt-4 inline-block text-sm font-medium text-pink-400">Invite us to speak →</Link>
          </TileCard>
        </div>

        <div id="newsletter" className="mt-8 scroll-mt-24">
          <TileCard accent="violet" className="!p-8 text-center">
            <h2 className="text-xl font-bold text-white">{newsletter.title}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">{newsletter.description}</p>
            <a
              href={`mailto:${contactInfo.email}?subject=Subscribe%20to%20RVAI%20Signal`}
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white"
            >
              {newsletter.cta}
            </a>
          </TileCard>
        </div>
      </div>
      <SiteFooter />
    </PageShell>
  );
}
