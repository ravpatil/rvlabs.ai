import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '../../../components/PageShell';
import SiteFooter from '../../../components/SiteFooter';
import TileCard from '../../../components/TileCard';
import { getTraining, trainings } from '../../data/siteContent';

export function generateStaticParams() {
  return trainings.map((t: { slug: string }) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then((p) => {
    const t = getTraining(p.slug);
    if (!t) return { title: 'Not Found' };
    return { title: `${t.title} | RVAI Labs Training`, description: t.description };
  });
}

export default async function TrainingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const training = getTraining(slug);
  if (!training) notFound();

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <Link href="/trainings" className="text-sm text-cyan-400 hover:text-cyan-300">← All trainings</Link>
        <div className="mt-6 flex items-center gap-3">
          <span className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-300">{training.level}</span>
          <span className="text-xs text-slate-500">{training.duration}</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-white">{training.title}</h1>
        <p className="mt-4 text-lg text-slate-400">{training.description}</p>

        <TileCard accent="orange" className="mt-10 !p-6">
          <h2 className="font-semibold text-white">Syllabus</h2>
          <ul className="mt-4 space-y-2">
            {training.syllabus?.map((item: string, i: number) => (
              <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="font-mono text-xs text-orange-400">{String(i + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
        </TileCard>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#contact"
            className="rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white"
          >
            Book this training
          </Link>
          <span className="flex items-center text-sm text-slate-500">{training.price}</span>
        </div>
      </div>
      <SiteFooter />
    </PageShell>
  );
}
