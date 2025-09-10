# VC Briefing

Next.js 14 + Tailwind app that summarizes pitch decks (Gemini) and generates VC briefs (OpenAI).

## Setup

1. Copy env example:
   ```bash
   cp .env.local.example .env.local
   ```
2. Fill in `OPENAI_API_KEY`, `GEMINI_API_KEY`, and `NEXT_PUBLIC_GUMROAD_LINK`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run dev server:
   ```bash
   npm run dev
   ```

## Deploy

- Push to GitHub and import into Vercel.
- Set the same environment variables in Vercel project settings.

