import Link from 'next/link';
import PageShell from '../../components/PageShell';
import SiteFooter from '../../components/SiteFooter';
import TileCard from '../../components/TileCard';
import { trainings } from '../data/siteContent';

export const metadata = {
  title: 'Trainings | RVAI Labs',
  description: 'Hands-on enterprise AI workshops, OpenShift AI bootcamps, and LLMOps masterclasses.',
};

const accents = ['violet', 'cyan', 'pink', 'orange'] as const;

export default function TrainingsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300">← Home</Link>
        <h1 className="mt-6 bg-gradient-to-r from-orange-200 via-white to-cyan-200 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          Training Programs
        </h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Practical workshops and bootcamps for developer and platform teams. Corporate onsite available.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {trainings.map((t: any, i: number) => (
            <TileCard key={t.slug} href={t.href} accent={accents[i % accents.length]}>
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] uppercase text-cyan-300">{t.level}</span>
                <span className="text-xs text-slate-500">{t.duration}</span>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white">{t.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{t.description}</p>
              <p className="mt-4 text-xs font-medium text-orange-400">View syllabus →</p>
            </TileCard>
          ))}
        </div>

        <TileCard accent="emerald" className="mt-12 !p-8 text-center">
          <h2 className="text-xl font-bold text-white">Corporate Onsite Training</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">
            Custom curricula tailored to your stack, team size, and production goals.
          </p>
          <Link href="/#contact" className="mt-6 inline-block rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white">
            Request a quote
          </Link>
        </TileCard>
      </div>
      <SiteFooter />
    </PageShell>
  );
}
