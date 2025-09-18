"use client";

import { useState } from 'react';

type ApiResponse = {
  bullets: string[];
  brief: string;
  provider: 'openai' | 'gemini';
};

export default function HomePage() {
  const [deckText, setDeckText] = useState<string>("");
  const [vcPersona, setVcPersona] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const gumroadUrl = process.env.NEXT_PUBLIC_GUMROAD_LINK || '#';

  async function handleGenerate() {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deckText, vcPersona }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to generate');
      }
      const data: ApiResponse = await res.json();
      setResult(data);
    } catch (e: any) {
      setError(e?.message ?? 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">VC Briefing</h1>
        <p className="mt-2 text-gray-600">Paste your pitch deck text and get a concise 1-page VC brief tailored to a specific investor persona.</p>
      </header>

      <section className="card p-6 space-y-6">
        <div>
          <label className="label">Pitch deck text</label>
          <textarea
            className="input mt-1 min-h-[180px]"
            value={deckText}
            onChange={(e) => setDeckText(e.target.value)}
            placeholder="Problem, solution, market, traction, business model, team, competition, metrics..."
          />
        </div>

        <div>
          <label className="label">VC persona</label>
          <input
            className="input mt-1"
            value={vcPersona}
            onChange={(e) => setVcPersona(e.target.value)}
            placeholder="e.g., Seed-stage SaaS investor focused on AI-first B2B tools"
          />
        </div>

        <div className="flex gap-3">
          <button className="btn" onClick={handleGenerate} disabled={loading || !deckText || !vcPersona}>
            {loading ? 'Generating…' : 'Generate VC Brief'}
          </button>
          <a
            href={gumroadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Gumroad
          </a>
        </div>
      </section>

      <section className="mt-8 space-y-4">
        {error && (
          <div className="card border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
        )}
        {result && (
          <div className="card p-6">
            <div className="mb-4 text-sm text-gray-500">Provider: {result.provider}</div>
            <h2 className="text-xl font-semibold text-gray-900">5-Point Summary</h2>
            <ul className="mt-2 list-disc pl-6 text-gray-800">
              {result.bullets.map((b, i) => (
                <li key={i} className="mb-1">{b}</li>
              ))}
            </ul>
            <h2 className="mt-6 text-xl font-semibold text-gray-900">1-Page VC Brief</h2>
            <p className="mt-2 whitespace-pre-wrap text-gray-800">{result.brief}</p>
          </div>
        )}
      </section>
    </main>
  );
}

