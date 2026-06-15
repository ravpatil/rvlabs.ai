export default function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#" className={`group inline-flex items-center gap-3 ${className}`}>
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-pink-400/30 bg-gradient-to-br from-violet-600/30 via-pink-500/20 to-cyan-500/30 shadow-[0_0_28px_rgba(244,114,182,0.3)] transition group-hover:scale-105 group-hover:shadow-[0_0_36px_rgba(34,211,238,0.4)]">
        <span className="bg-gradient-to-r from-pink-300 via-white to-cyan-300 bg-clip-text text-sm font-black tracking-tight text-transparent">
          AI
        </span>
      </div>
      <div className="leading-tight">
        <p className="text-lg font-bold tracking-tight">
          <span className="bg-gradient-to-r from-violet-300 via-pink-200 to-cyan-300 bg-clip-text text-transparent">
            RV
          </span>
          <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">AI</span>
        </p>
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-pink-400/90">Labs</p>
      </div>
    </a>
  );
}
