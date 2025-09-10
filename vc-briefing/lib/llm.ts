import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

// Initialize Gemini (only if API key is available)
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }) : null;

// Initialize OpenAI (only if API key is available)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export interface VCBriefResult {
  bullets: string[];
  brief: string;
}

export async function generateVCBrief(deckText: string, vcPersona: string): Promise<VCBriefResult> {
  try {
    // Check if API keys are available
    if (!model || !openai) {
      throw new Error('API keys not configured. Please check your environment variables.');
    }

    // Use Gemini to generate bullet points
    const bulletPrompt = `Summarize the following pitch deck into exactly 5 key bullet points. Each bullet should be concise and highlight the most important aspects of the business:

${deckText}

Return only the 5 bullet points, one per line, without numbering or additional formatting.`;

    const bulletResult = await model.generateContent(bulletPrompt);
    const bulletResponse = await bulletResult.response;
    const bulletsText = bulletResponse.text();
    const bullets = bulletsText.split('\n').filter(line => line.trim()).slice(0, 5);

    // Use OpenAI to generate the VC brief
    const briefPrompt = `Write a 1-page VC brief (maximum 300 words) for the following pitch deck, tailored specifically for this VC persona: "${vcPersona}"

Pitch deck content:
${deckText}

The brief should be professional, concise, and highlight the key investment thesis, market opportunity, and why this would be attractive to the specific VC persona mentioned. Focus on the most compelling aspects that would resonate with this type of investor.`;

    const briefCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: briefPrompt,
        },
      ],
      max_tokens: 400,
      temperature: 0.7,
    });

    const brief = briefCompletion.choices[0]?.message?.content || '';

    return {
      bullets,
      brief,
    };
  } catch (error) {
    console.error('Error generating VC brief:', error);
    throw new Error('Failed to generate VC brief. Please check your API keys and try again.');
  }
}