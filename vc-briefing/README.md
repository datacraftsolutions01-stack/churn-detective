# VC Briefing

AI-powered pitch deck analysis tool for VCs. Generate professional investment briefs and key bullet points from pitch deck content using Gemini and OpenAI.

## Features

- **AI-Powered Analysis**: Uses Gemini 1.5 Flash for bullet point generation and GPT-4o Mini for detailed VC briefs
- **VC Persona Targeting**: Tailor briefs to specific investor types and preferences
- **Premium UI**: Modern, responsive design with Tailwind CSS
- **Ready for Deployment**: Optimized for Vercel deployment

## Setup

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd vc-briefing
   npm install
   ```

2. **Environment Variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your API keys:
   ```
   OPENAI_API_KEY=your_openai_key
   GEMINI_API_KEY=your_gemini_key
   NEXT_PUBLIC_GUMROAD_LINK=https://gumroad.com/your-product
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## API Keys

- **OpenAI**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- **Gemini**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_GUMROAD_LINK`
4. Deploy!

### Other Platforms

The app is a standard Next.js application and can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## Usage

1. Paste your pitch deck content in the textarea
2. Describe your target VC persona (e.g., "Early-stage SaaS investor focused on B2B")
3. Click "Generate VC Brief"
4. Get 5 key bullet points and a tailored 1-page investment brief

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o Mini, Google Gemini 1.5 Flash
- **Language**: TypeScript
- **Deployment**: Vercel-ready

## License

MIT License