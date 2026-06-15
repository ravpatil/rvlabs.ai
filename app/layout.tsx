import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'RVAI Labs | Enterprise AI Engineering',
  description: 'RVAI Labs helps organizations build, deploy, and scale production-ready AI systems.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
