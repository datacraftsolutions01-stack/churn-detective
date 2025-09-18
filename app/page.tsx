'use client';

import { useState } from 'react';

export default function Home() {
  const [deckText, setDeckText] = useState('');
  const [vcPersona, setVcPersona] = useState('');
  const [brief, setBrief] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const gumroadLink = process.env.NEXT_PUBLIC_GUMROAD_LINK || '#';

  const handleGenerate = async () => {
    if (!deckText.trim() || !vcPersona.trim()) {
      setError('Please fill in both fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setBrief('');

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
        throw new Error(data.error || 'Failed to generate brief');
      }

      setBrief(data.brief);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setDeckText('');
    setVcPersona('');
    setBrief('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            VC Briefing
          </h1>
          <p className="text-lg text-gray-600">
            Transform your pitch deck into a professional VC brief with AI
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="space-y-6">
            {/* Pitch Deck Text */}
            <div>
              <label htmlFor="deckText" className="block text-sm font-medium text-gray-700 mb-2">
                Pitch Deck Text
              </label>
              <textarea
                id="deckText"
                value={deckText}
                onChange={(e) => setDeckText(e.target.value)}
                placeholder="Paste your pitch deck content here... Include key information about your product, market, business model, traction, team, and financial projections."
                className="textarea-field"
                rows={8}
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 50 characters. Include comprehensive details for better analysis.
              </p>
            </div>

            {/* VC Persona */}
            <div>
              <label htmlFor="vcPersona" className="block text-sm font-medium text-gray-700 mb-2">
                VC Persona
              </label>
              <input
                id="vcPersona"
                type="text"
                value={vcPersona}
                onChange={(e) => setVcPersona(e.target.value)}
                placeholder="e.g., Early-stage SaaS investor focused on B2B productivity tools, $1M-$10M checks, Series A/B"
                className="input-field"
              />
              <p className="text-xs text-gray-500 mt-1">
                Describe the VC's investment focus, stage, and typical check size.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !deckText.trim() || !vcPersona.trim()}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate VC Brief'
                )}
              </button>
              <button
                onClick={handleClear}
                className="btn-secondary"
              >
                Clear
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Output Section */}
        {brief && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated VC Brief</h2>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {brief}
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => navigator.clipboard.writeText(brief)}
                className="btn-secondary text-sm"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        )}

        {/* Gumroad CTA */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need More Advanced Features?
            </h3>
            <p className="text-gray-600 mb-4">
              Get access to premium VC briefing tools, custom templates, and advanced analytics.
            </p>
            <a
              href={gumroadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Premium Access
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by AI • Built with Next.js 14 & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}