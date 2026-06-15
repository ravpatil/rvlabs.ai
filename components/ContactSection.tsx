import ContactForm from './ContactForm';
import TileCard from './TileCard';
import { contactInfo } from '../app/data/siteContent';

function SectionLabel() {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">
      <span className="h-px w-8 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400" />
      Contact
    </p>
  );
}

export default function ContactSection() {
  const calendly =
    process.env.NEXT_PUBLIC_CALENDLY_URL || contactInfo.calendlyUrl || '';
  const whatsapp = contactInfo.whatsappLink || `https://wa.me/${contactInfo.whatsapp?.replace(/\D/g, '')}`;

  return (
    <section id="contact" className="px-6 pb-24 pt-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap gap-3">
          {calendly ? (
            <a
              href={calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(244,114,182,0.35)] transition hover:scale-105"
            >
              Book 30-min Discovery
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
          ) : (
            <a
              href={`mailto:${contactInfo.email}?subject=RVAI%20Discovery%20Call`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(244,114,182,0.35)] transition hover:scale-105"
            >
              Book Discovery Call
            </a>
          )}
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
          >
            WhatsApp Chat
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
          </a>
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          <TileCard accent="violet" className="lg:col-span-2">
            <SectionLabel />
            <h2 className="mt-4 text-2xl font-bold text-white">Ready to build with AI?</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Reach out for consulting, training, or a discovery call. RVAI Labs moves teams from exploration to
              production-ready AI fast.
            </p>
            <p className="mt-3 text-xs text-cyan-400/80">{contactInfo.responseTime}</p>
            <div className="mt-8 space-y-4">
              <a href={`mailto:${contactInfo.email}`} className="block rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3 transition hover:border-violet-500/30">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Email</p>
                <p className="mt-1 text-sm text-slate-300">{contactInfo.email}</p>
              </a>
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3 transition hover:border-cyan-500/30">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">LinkedIn</p>
                <p className="mt-1 text-sm text-slate-300">Connect on LinkedIn</p>
              </a>
            </div>
          </TileCard>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
