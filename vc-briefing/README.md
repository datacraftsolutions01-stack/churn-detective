# VC Briefing

An AI-powered Next.js application that transforms pitch decks into personalized VC briefs using Gemini and OpenAI.

## Features

- **AI-Powered Analysis**: Uses Gemini 1.5 Flash to extract key insights from pitch decks
- **Personalized Briefs**: Generates tailored VC briefs using GPT-4o Mini based on specific investor personas
- **Modern UI**: Built with Next.js 14, TypeScript, and Tailwind CSS for a premium SaaS experience
- **Real-time Generation**: Fast, parallel processing of both bullet points and full briefs
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Services**: 
  - Google Gemini 1.5 Flash (for bullet point extraction)
  - OpenAI GPT-4o Mini (for VC brief generation)
- **Deployment**: Ready for Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd vc-briefing
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your API keys to `.env.local`:
```env
OPENAI_API_KEY=your_openai_key_here
GEMINI_API_KEY=your_gemini_key_here
NEXT_PUBLIC_GUMROAD_LINK=https://gumroad.com/your-product
```

### Running the Application

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Input Pitch Deck**: Paste your pitch deck content in the textarea
2. **Define VC Persona**: Describe the specific investor you're targeting
3. **Generate Brief**: Click the button to get AI-generated insights and brief
4. **Review Output**: Get 5 key bullet points and a personalized 1-page VC brief

## API Endpoints

### POST `/api/generate`

Generates VC brief from pitch deck text and investor persona.

**Request Body:**
```json
{
  "deckText": "Your pitch deck content...",
  "vcPersona": "Early-stage SaaS investor focused on B2B productivity tools"
}
```

**Response:**
```json
{
  "bullets": [
    "Key insight 1",
    "Key insight 2",
    "..."
  ],
  "brief": "Full VC brief text...",
  "success": true
}
```

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
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o Mini | Yes |
| `GEMINI_API_KEY` | Google Gemini API key for 1.5 Flash | Yes |
| `NEXT_PUBLIC_GUMROAD_LINK` | Gumroad product link for CTA | No |

## Project Structure

```
vc-briefing/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page component
├── lib/
│   └── llm.ts                    # AI service functions
├── .env.local.example            # Environment variables template
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub.