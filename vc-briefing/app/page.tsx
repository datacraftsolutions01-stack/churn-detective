'use client';

import { useState } from 'react';

interface VCBriefResult {
  bullets: string[];
  brief: string;
}

export default function Home() {
  const [deckText, setDeckText] = useState('');
  const [vcPersona, setVcPersona] = useState('');
  const [result, setResult] = useState<VCBriefResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deckText.trim() || !vcPersona.trim()) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deckText: deckText.trim(),
          vcPersona: vcPersona.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate VC brief');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const gumroadLink = process.env.NEXT_PUBLIC_GUMROAD_LINK || 'https://gumroad.com/your-product';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">VC Briefing</h1>
              <p className="text-slate-600 mt-1">AI-powered pitch deck analysis for VCs</p>
            </div>
            <div className="hidden sm:block">
              <a
                href={gumroadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Get Premium Access
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Generate Your VC Brief</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="deckText" className="block text-sm font-medium text-slate-700 mb-2">
                    Pitch Deck Content
                  </label>
                  <textarea
                    id="deckText"
                    value={deckText}
                    onChange={(e) => setDeckText(e.target.value)}
                    placeholder="Paste your pitch deck content here... Include key information about your business, market, team, financials, etc."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors duration-200"
                    rows={12}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="vcPersona" className="block text-sm font-medium text-slate-700 mb-2">
                    VC Persona
                  </label>
                  <input
                    id="vcPersona"
                    type="text"
                    value={vcPersona}
                    onChange={(e) => setVcPersona(e.target.value)}
                    placeholder="e.g., Early-stage SaaS investor focused on B2B, Series A fintech specialist, etc."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </div>
                  ) : (
                    'Generate VC Brief'
                  )}
                </button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Output Area */}
          <div className="space-y-8">
            {result && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Your VC Brief</h2>
                
                {/* Bullet Points */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Key Points</h3>
                  <ul className="space-y-3">
                    {result.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                        <p className="text-slate-700">{bullet}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Brief */}
                <div>
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Investment Brief</h3>
                  <div className="bg-slate-50 rounded-lg p-6">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{result.brief}</p>
                  </div>
                </div>
              </div>
            )}

            {!result && !loading && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Ready to Generate</h3>
                  <p className="text-slate-600">Fill in the form and click &quot;Generate VC Brief&quot; to get your AI-powered analysis.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Fundraising?</h2>
          <p className="text-xl mb-8 opacity-90">Get premium access to advanced features and unlimited generations.</p>
          <a
            href={gumroadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200"
          >
            Get Premium Access
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <p>&copy; 2024 VC Briefing. Built with Next.js and AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}