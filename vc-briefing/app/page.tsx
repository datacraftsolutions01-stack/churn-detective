"use client";

import { useState } from "react";

type GenerateResponse = {
  bullets: string[];
  brief: string;
  error?: string;
};

export default function Home() {
  const [deckText, setDeckText] = useState("");
  const [vcPersona, setVcPersona] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);

  const gumroadLink = process.env.NEXT_PUBLIC_GUMROAD_LINK || "#";

  async function onGenerate() {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deckText, vcPersona }),
      });
      const data = (await res.json()) as GenerateResponse;
      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-black">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">vc-briefing</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">Turn any pitch deck into a VC-ready brief.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm p-5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Pitch deck text</label>
            <textarea
              className="w-full h-56 resize-y rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/50 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 placeholder:text-slate-400"
              placeholder="Paste key slides or notes..."
              value={deckText}
              onChange={(e) => setDeckText(e.target.value)}
            />
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">VC persona</label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/50 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 placeholder:text-slate-400"
                placeholder="e.g., Seed-stage fintech investor, thesis-driven climate fund"
                value={vcPersona}
                onChange={(e) => setVcPersona(e.target.value)}
              />
            </div>
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={onGenerate}
                disabled={loading || deckText.trim().length === 0 || vcPersona.trim().length === 0}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {loading ? "Generating..." : "Generate VC Brief"}
              </button>
              {error && <span className="text-sm text-red-600 dark:text-red-400">{error}</span>}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm p-5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Output</h2>
            {!result && !loading && (
              <p className="text-slate-500 dark:text-slate-400 mt-2">Your 5 bullets and VC brief will appear here.</p>
            )}
            {result && (
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">5 bullets</h3>
                  <ul className="mt-2 list-disc list-inside text-slate-800 dark:text-slate-200 space-y-1">
                    {result.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">VC brief (≤300 words)</h3>
                  <div className="mt-2 whitespace-pre-wrap text-slate-800 dark:text-slate-100 leading-relaxed">
                    {result.brief}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        <section className="mt-10">
          <a
            href={gumroadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 p-6 text-white dark:text-slate-900 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">Upgrade your fundraising</h3>
                <p className="mt-1 opacity-90">Get templates and investor tools on Gumroad.</p>
              </div>
              <span className="text-sm opacity-90">Open Gumroad →</span>
            </div>
          </a>
        </section>
      </div>
    </div>
  );
}
