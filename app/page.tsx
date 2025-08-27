use client;

import React, { useState } from "react";

export default function HomePage() {
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ churnReasons: string[]; actionPlan: string } | null>(null);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    setLoading(true);
    setError("");
    setResults(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackText }),
      });
      const data = await res.json();
      if (res.ok) {
        setResults(data);
      } else {
        setError(data.error || "Failed to analyze.");
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 text-center">
          Churn Detective
        </h1>
        <p className="mb-6 text-gray-600 text-center">
          Paste your customer feedback or CSV text below and let AI analyze churn causes and suggest an actionable retention plan.
        </p>
        <textarea
          className="w-full h-32 p-3 border-2 border-blue-200 rounded-lg mb-4 resize-vertical text-gray-800 focus:ring-2 focus:ring-blue-300 transition"
          placeholder="Paste customer feedback or CSV text here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          disabled={loading}
        />
        <button
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition mb-2"
          onClick={handleAnalyze}
          disabled={loading || !feedbackText.trim()}
        >
          {loading ? "Analyzing..." : "Analyze Churn"}
        </button>
        {error && (
          <div className="text-red-500 text-center mb-3 font-medium">
            {error}
          </div>
        )}
        {results && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Top Churn Causes:</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {results.churnReasons.map((r, i) => (
                <li key={i} className="mb-1">{r}</li>
              ))}
            </ul>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Retention Action Plan:</h2>
            <div className="prose prose-blue bg-blue-50 rounded-xl p-4" dangerouslySetInnerHTML={{ __html: results.actionPlan.replace(/\n/g, "<br/>") }} />
          </div>
        )}
        <a
          href={process.env.NEXT_PUBLIC_GUMROAD_LINK || "https://gumroad.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block text-center bg-pink-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-pink-700 transition"
        >
          Get more tools on Gumroad
        </a>
      </div>
      <footer className="mt-10 text-gray-400 text-sm">
        © 2025 Churn Detective. Powered by Next.js + Tailwind CSS.
      </footer>
    </main>
  );
}