'use client';

import { useState } from 'react';

interface GenerationResult {
  bullets: string[];
  brief: string;
}

export default function Home() {
  const [deckText, setDeckText] = useState('');
  const [vcPersona, setVcPersona] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deckText.trim() || !vcPersona.trim()) {
      setError('Please fill in both fields');
      return;
    }

    setIsLoading(true);
    setError(null);
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
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VC</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">VC Briefing</h1>
            </div>
            <div className="text-sm text-slate-600">
              AI-Powered Pitch Analysis
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Transform Your Pitch Deck
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get AI-generated bullet points and personalized VC briefs tailored to specific investor personas. 
            Perfect for preparing for investor meetings and fundraising.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">Generate VC Brief</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="deckText" className="block text-sm font-medium text-slate-700 mb-2">
                  Pitch Deck Text
                </label>
                <textarea
                  id="deckText"
                  value={deckText}
                  onChange={(e) => setDeckText(e.target.value)}
                  placeholder="Paste your pitch deck content here... Include problem, solution, market size, business model, traction, team, etc."
                  className="w-full h-48 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="vcPersona" className="block text-sm font-medium text-slate-700 mb-2">
                  VC Persona
                </label>
                <input
                  type="text"
                  id="vcPersona"
                  value={vcPersona}
                  onChange={(e) => setVcPersona(e.target.value)}
                  placeholder="e.g., Early-stage SaaS investor focused on B2B productivity tools, Series A specialist in fintech, etc."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !deckText.trim() || !vcPersona.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  'Generate VC Brief'
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">Generated Brief</h3>
            
            {result ? (
              <div className="space-y-6">
                {/* Bullet Points */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Key Insights
                  </h4>
                  <ul className="space-y-2">
                    {result.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                          {index + 1}
                        </span>
                        <p className="text-slate-700 text-sm leading-relaxed">{bullet}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* VC Brief */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    VC Brief
                  </h4>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {result.brief}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-slate-500 text-sm">
                  Your generated VC brief will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        {process.env.NEXT_PUBLIC_GUMROAD_LINK && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Scale Your Fundraising?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Get access to our premium VC briefing templates, investor database, and advanced AI tools to supercharge your fundraising process.
              </p>
              <a
                href={process.env.NEXT_PUBLIC_GUMROAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                Get Premium Access
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600 text-sm">
            <p>© 2024 VC Briefing. Built with Next.js, Tailwind CSS, and AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}