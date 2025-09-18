# vc-briefing

Minimal Next.js 14 + Tailwind app to generate a concise 1-page VC brief from pitch deck text using OpenAI or Gemini.

## Quickstart

1. Install deps
```
npm install
```

2. Copy env example and fill values
```
cp .env.local.example .env.local
# Fill OPENAI_API_KEY and/or GEMINI_API_KEY
# Optionally set NEXT_PUBLIC_GUMROAD_LINK
```

3. Run dev server
```
npm run dev
```

Visit http://localhost:3000

## Deploy

Ready for GitHub → Vercel. Add `OPENAI_API_KEY` and/or `GEMINI_API_KEY` as Project Environment Variables in Vercel, plus `NEXT_PUBLIC_GUMROAD_LINK`.

## Notes
- API route: `/api/generate` (POST JSON: `{ deckText, vcPersona }`).
- Prefers OpenAI if both keys provided; falls back to Gemini.
- Output: `{"bullets": string[5], "brief": string, "provider": "openai"|"gemini"}`.