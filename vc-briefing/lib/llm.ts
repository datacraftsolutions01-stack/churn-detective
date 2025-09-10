import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function summarizeWithGemini(deckText: string): Promise<string[]> {
  try {
    const prompt = `Please analyze this pitch deck text and extract the 5 most important bullet points that would be relevant for a VC investor. Each bullet point should be concise (1-2 sentences) and highlight key business insights, market opportunity, traction, or competitive advantages.

Pitch deck text:
${deckText}

Please return only the 5 bullet points, one per line, without any additional formatting or numbering.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Split by lines and clean up
    const bullets = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 5); // Ensure we only get 5 bullets
    
    return bullets;
  } catch (error) {
    console.error('Error with Gemini API:', error);
    throw new Error('Failed to generate summary with Gemini');
  }
}

export async function generateVCBriefWithOpenAI(deckText: string, vcPersona: string): Promise<string> {
  try {
    const prompt = `You are a seasoned VC analyst writing a brief for a specific investor persona. Write a concise 1-page VC brief (maximum 300 words) based on the pitch deck information provided.

VC Persona: ${vcPersona}

Pitch Deck Information:
${deckText}

The brief should include:
1. Executive Summary (2-3 sentences)
2. Market Opportunity & Problem
3. Solution & Product
4. Business Model & Traction
5. Team & Competitive Advantage
6. Investment Highlights & Risks

Write in a professional, analytical tone that would help this specific VC persona quickly understand the opportunity and make an informed decision. Keep it under 300 words.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert VC analyst with deep experience in startup evaluation and investment decision-making.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const brief = completion.choices[0]?.message?.content || '';
    
    if (!brief) {
      throw new Error('No content generated from OpenAI');
    }
    
    return brief.trim();
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    throw new Error('Failed to generate VC brief with OpenAI');
  }
}