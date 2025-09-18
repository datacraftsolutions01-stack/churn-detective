# VC Briefing

A minimal Next.js 14 + Tailwind app that generates professional VC briefs from pitch deck text using AI.

## Features

- **AI-Powered Analysis**: Uses OpenAI GPT-4o-mini or Google Gemini 1.5 Flash
- **Clean SaaS UI**: Modern, responsive design with Tailwind CSS
- **Professional Output**: Generates structured VC briefs with executive summary, key points, and recommendations
- **Flexible Input**: Accepts any pitch deck text and VC persona
- **Easy Deployment**: Ready for Vercel deployment

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   - `OPENAI_API_KEY`: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
   - `GEMINI_API_KEY`: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - `NEXT_PUBLIC_GUMROAD_LINK`: Your Gumroad product link

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Paste your pitch deck text** in the textarea (minimum 50 characters)
2. **Describe the VC persona** (investment focus, stage, check size)
3. **Click "Generate VC Brief"** to create a professional analysis
4. **Copy the result** to share with your team

## API Endpoints

### POST /api/generate

Generates a VC brief from pitch deck text and VC persona.

**Request Body**:
```json
{
  "deckText": "Your pitch deck content...",
  "vcPersona": "Early-stage SaaS investor focused on B2B tools..."
}
```

**Response**:
```json
{
  "success": true,
  "brief": "Generated VC brief content..."
}
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini / Google Gemini 1.5 Flash
- **Language**: TypeScript
- **Deployment**: Vercel-ready

## Deployment

This app is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## License

MIT License - feel free to use this for your own projects.