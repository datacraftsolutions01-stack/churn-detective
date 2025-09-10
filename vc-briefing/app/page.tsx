"use client"

import { useState } from 'react'

type ApiResponse = {
  bullets: string[]
  brief: string
  error?: string
}

export default function HomePage() {
  const [deckText, setDeckText] = useState('')
  const [vcPersona, setVcPersona] = useState('Generalist Seed VC, B2B SaaS focus')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bullets, setBullets] = useState<string[]>([])
  const [brief, setBrief] = useState('')

  const gumroadLink = process.env.NEXT_PUBLIC_GUMROAD_LINK || 'https://gumroad.com'

  async function onGenerate() {
    setLoading(true)
    setError(null)
    setBullets([])
    setBrief('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deckText, vcPersona }),
      })
      const data: ApiResponse = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to generate brief')
      setBullets(data.bullets)
      setBrief(data.brief)
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">VC Briefing</h1>
        <p className="mt-2 text-gray-600">Summarize pitch decks and generate investor-ready briefs in seconds.</p>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 card p-6">
          <label className="block text-sm font-medium text-gray-700">Pitch Deck Text</label>
          <textarea
            className="mt-2 h-64 w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
            placeholder="Paste your pitch deck content here..."
            value={deckText}
            onChange={(e) => setDeckText(e.target.value)}
          />

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">VC Persona</label>
            <input
              className="mt-2 w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
              placeholder="e.g., General Partner at AI-first fund"
              value={vcPersona}
              onChange={(e) => setVcPersona(e.target.value)}
            />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button className="btn-primary" onClick={onGenerate} disabled={loading}>
              {loading ? 'Generating…' : 'Generate VC Brief'}
            </button>
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </div>

        <aside className="card p-6">
          <h2 className="text-lg font-semibold">Results</h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Key Takeaways</h3>
              {bullets.length === 0 ? (
                <p className="mt-2 text-gray-500">No bullets yet.</p>
              ) : (
                <ul className="mt-2 list-disc pl-5 text-gray-800">
                  {bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">VC Brief</h3>
              {brief ? (
                <div className="mt-2 max-w-none whitespace-pre-wrap leading-relaxed">{brief}</div>
              ) : (
                <p className="mt-2 text-gray-500">No brief yet.</p>
              )}
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-12 card p-8 text-center">
        <h2 className="text-2xl font-semibold">Upgrade your investor materials</h2>
        <p className="mt-2 text-gray-600">Grab our premium toolkit to accelerate fundraising.</p>
        <a
          href={gumroadLink}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-md bg-black px-5 py-2 text-white hover:opacity-90"
        >
          Visit Gumroad
        </a>
      </section>
    </main>
  )
}

