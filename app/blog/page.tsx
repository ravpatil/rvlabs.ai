import Link from 'next/link';
import PageShell from '../../components/PageShell';
import SiteFooter from '../../components/SiteFooter';
import TileCard from '../../components/TileCard';
import { blogPosts } from '../data/siteContent';

export const metadata = {
  title: 'Blog | RVAI Labs',
  description: 'Enterprise AI, LLMOps, and cloud-native platform engineering insights.',
};

const accents = ['violet', 'cyan', 'pink', 'orange'] as const;

export default function BlogPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300">← Home</Link>
        <h1 className="mt-6 bg-gradient-to-r from-pink-200 via-white to-violet-200 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          RVAI Signal Blog
        </h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Deep dives on enterprise AI, platform engineering, and production LLMOps.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {blogPosts.map((post: any, i: number) => (
            <TileCard key={post.slug} href={post.href} accent={accents[i % accents.length]} span={i === 0 ? 'lg' : 'sm'}>
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 font-mono text-[10px] uppercase text-violet-300">
                  {post.tag}
                </span>
                <span className="text-xs text-slate-500">{post.date}</span>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white">{post.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{post.description}</p>
              <p className="mt-4 text-xs font-medium text-cyan-400">Read article →</p>
            </TileCard>
          ))}
        </div>
      </div>
      <SiteFooter />
    </PageShell>
  );
}
