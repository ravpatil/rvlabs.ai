"use client";

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (loggedIn) fetchContent();
  }, [loggedIn]);

  async function login(e: any) {
    e.preventDefault();
    setStatus('logging-in');
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (res.ok) {
      setLoggedIn(true);
      setStatus('idle');
    } else {
      setStatus('error');
    }
  }

  async function fetchContent() {
    setStatus('loading');
    const res = await fetch('/api/admin/content');
    const text = await res.text();
    setContent(text);
    setStatus('idle');
  }

  async function saveContent() {
    setStatus('saving');
    try {
      const parsed = JSON.parse(content); // validate
      const res = await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: parsed }) });
      if (res.ok) {
        setStatus('saved');
      } else {
        const data = await res.json();
        setStatus('error:' + (data?.error || 'save failed'));
      }
    } catch (err: any) {
      setStatus('invalid JSON: ' + err.message);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-slate-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold">RVLabs Admin</h1>

        {!loggedIn ? (
          <form onSubmit={login} className="mt-6 space-y-4">
            <label className="block text-sm font-medium">Admin password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded px-3 py-2 bg-[#0b0b0b]" />
            <div>
              <button type="submit" className="rounded bg-orange-500 px-4 py-2">Log in</button>
            </div>
            {status === 'error' && <p className="text-red-400">Login failed</p>}
          </form>
        ) : (
          <section className="mt-6">
            <div className="mb-4 flex gap-2">
              <button onClick={fetchContent} className="rounded bg-slate-800 px-3 py-2">Reload</button>
              <button onClick={saveContent} className="rounded bg-orange-500 px-3 py-2">Save</button>
            </div>
            <p className="text-sm text-slate-400">Edit the site content as JSON and click Save. You can also configure GitHub credentials to commit changes.</p>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={30} className="mt-4 w-full rounded bg-[#0b0b0b] p-3 font-mono text-sm" />
            <p className="mt-3 text-sm text-slate-300">Status: {status}</p>
          </section>
        )}
      </div>
    </main>
  );
}
