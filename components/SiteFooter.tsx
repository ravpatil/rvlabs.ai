export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-400">
          <span className="bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text font-semibold text-transparent">RVAI</span>{' '}
          <span className="text-cyan-400/80">Labs</span> — We ship LLMs on OpenShift
        </p>
        <div className="flex gap-4 text-xs text-slate-500">
          <a href="/blog" className="hover:text-cyan-400">Blog</a>
          <a href="/trainings" className="hover:text-cyan-400">Trainings</a>
          <a href="/community" className="hover:text-cyan-400">Community</a>
          <a href="/#contact" className="hover:text-cyan-400">Contact</a>
        </div>
        <p className="font-mono text-xs text-slate-500">© {new Date().getFullYear()} RVAI Labs</p>
      </div>
    </footer>
  );
}
