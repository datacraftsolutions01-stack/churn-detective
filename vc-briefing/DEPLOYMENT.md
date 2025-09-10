# Deployment Guide

## Quick Start

1. **Extract the zip file**
   ```bash
   unzip vc-briefing.zip
   cd vc-briefing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Run locally**
   ```bash
   npm run dev
   ```

## Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `OPENAI_API_KEY`
     - `GEMINI_API_KEY`
     - `NEXT_PUBLIC_GUMROAD_LINK`
   - Deploy!

## Environment Variables

Required for production:
- `OPENAI_API_KEY`: Your OpenAI API key
- `GEMINI_API_KEY`: Your Google Gemini API key
- `NEXT_PUBLIC_GUMROAD_LINK`: Your Gumroad product link

## API Keys Setup

### OpenAI
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add to environment variables

### Gemini
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to environment variables

## Testing

After deployment, test the application:
1. Visit your deployed URL
2. Enter sample pitch deck content
3. Enter a VC persona description
4. Click "Generate VC Brief"
5. Verify the output is generated correctly

## Troubleshooting

- **Build errors**: Ensure all environment variables are set
- **API errors**: Check that your API keys are valid and have sufficient credits
- **CORS issues**: The app is configured for standard deployment, no CORS setup needed