import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '../../../components/PageShell';
import SiteFooter from '../../../components/SiteFooter';
import TileCard from '../../../components/TileCard';
import { articles, getArticle } from '../../data/articles';
import { blogPosts } from '../../data/siteContent';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then((p) => {
    const article = getArticle(p.slug);
    if (!article) return { title: 'Not Found' };
    return {
      title: `${article.title} | RVAI Labs`,
      description: article.description,
      openGraph: { title: article.title, description: article.description },
    };
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = blogPosts.filter((p: { slug: string }) => p.slug !== slug).slice(0, 2);

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <Link href="/blog" className="text-sm text-cyan-400 hover:text-cyan-300">← All articles</Link>
        <div className="mt-6 flex items-center gap-3">
          <span className="rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-xs text-violet-300">{article.tag}</span>
          <span className="text-xs text-slate-500">{article.date}</span>
          <span className="text-xs text-slate-500">{article.readTime} read</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{article.title}</h1>
        <p className="mt-4 text-lg text-slate-400">{article.description}</p>

        <div className="prose prose-invert mt-10 max-w-none space-y-5">
          {article.body.map((para) => (
            <p key={para.slice(0, 40)} className="text-base leading-relaxed text-slate-300">
              {para}
            </p>
          ))}
        </div>

        <TileCard accent="cyan" className="mt-12 !p-6">
          <p className="text-sm font-semibold text-white">Need help shipping this in production?</p>
          <p className="mt-2 text-sm text-slate-400">RVAI Labs designs and deploys enterprise AI on OpenShift and Kubernetes.</p>
          <Link href="/#contact" className="mt-4 inline-block text-sm font-medium text-cyan-400 hover:text-cyan-300">
            Book a discovery call →
          </Link>
        </TileCard>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-white">Related articles</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((post: any) => (
                <TileCard key={post.slug} href={post.href} accent="pink">
                  <h3 className="font-semibold text-white">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{post.description}</p>
                </TileCard>
              ))}
            </div>
          </div>
        )}
      </article>
      <SiteFooter />
    </PageShell>
  );
}
