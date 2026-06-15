'use client';

import { useState } from 'react';
import Logo from './Logo';

type NavLink = { label: string; href: string };

const navColors = [
  'hover:text-violet-300 hover:bg-violet-500/10',
  'hover:text-cyan-300 hover:bg-cyan-500/10',
  'hover:text-pink-300 hover:bg-pink-500/10',
  'hover:text-orange-300 hover:bg-orange-500/10',
  'hover:text-emerald-300 hover:bg-emerald-500/10',
  'hover:text-sky-300 hover:bg-sky-500/10',
];

export default function NavBar({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0a1e]/70 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-violet-500/40 via-cyan-400/40 to-pink-500/40" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm text-slate-300 transition ${navColors[i % navColors.length]}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="/#contact"
          className="hidden rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.4)] transition hover:scale-105 hover:shadow-[0_0_32px_rgba(244,114,182,0.45)] md:inline-flex"
        >
          Get Started
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-300 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm text-slate-300 transition ${navColors[i % navColors.length]}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500 px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Get Started
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
