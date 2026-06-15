import type { Metadata } from 'next';
import '../styles/globals.css';
import JsonLd from '../components/JsonLd';
import { brandTagline, hero } from './data/siteContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rvlabs.ai';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'RVAI Labs | Enterprise AI Engineering',
    template: '%s | RVAI Labs',
  },
  description: brandTagline + ' ' + hero.copy,
  keywords: ['enterprise AI', 'OpenShift AI', 'LLMOps', 'Kubernetes AI', 'RAG', 'agentic AI', 'RVAI Labs'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'RVAI Labs',
    title: 'RVAI Labs | Enterprise AI Engineering',
    description: brandTagline,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RVAI Labs',
    description: brandTagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
