'use client';

import { useEffect, useState } from 'react';

export default function TypingText({ text, className = '' }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className={className}>
      {displayed}
      {!done && <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-cyan-400" />}
    </p>
  );
}
