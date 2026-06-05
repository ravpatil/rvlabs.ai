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
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-800/90 bg-[#101010]/95 p-8">
      <div>
        <label className="block text-sm font-semibold text-slate-200">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="Your name" className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-orange-500 focus:ring-orange-500/30" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-200">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-orange-500 focus:ring-orange-500/30" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-200">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} placeholder="How can RVLabs help your team?" className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-orange-500 focus:ring-orange-500/30" />
      </div>

      <div>
        <button disabled={status === "sending"} type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-400">
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
      </div>

      {status === "success" && <p className="text-sm text-green-400">Message sent — thanks! I will reply soon.</p>}
      {status === "error" && <p className="text-sm text-red-400">Error sending message: {error}</p>}
    </form>
  );
}
