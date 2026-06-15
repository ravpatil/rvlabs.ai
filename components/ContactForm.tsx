"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Failed to send message");
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err?.message || "Unknown error");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm">
      <div>
        <label className="block text-sm font-semibold text-slate-200">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="Your name" className="mt-3 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-violet-500/50 focus:ring-violet-500/20" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-200">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" className="mt-3 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-violet-500/50 focus:ring-violet-500/20" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-200">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} placeholder="How can RVAI Labs help your team?" className="mt-3 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-violet-500/50 focus:ring-violet-500/20" />
      </div>

      <div>
        <button disabled={status === "sending"} type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(244,114,182,0.35)] transition hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(34,211,238,0.45)]">
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
      </div>

      {status === "success" && <p className="text-sm text-green-400">Message sent — thanks! I will reply soon.</p>}
      {status === "error" && <p className="text-sm text-red-400">Error sending message: {error}</p>}
    </form>
  );
}
