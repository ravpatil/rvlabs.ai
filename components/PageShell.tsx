import AIBackground from './AIBackground';
import NavBar from './NavBar';
import { navLinks } from '../app/data/siteContent';

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen text-slate-100">
      <AIBackground />
      <div className="relative z-10">
        <NavBar links={navLinks} />
        {children}
      </div>
    </main>
  );
}
