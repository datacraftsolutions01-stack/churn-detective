import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

export interface LLMResponse {
  success: boolean;
  content?: string;
  error?: string;
}

export async function callGemini(prompt: string): Promise<LLMResponse> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { success: false, error: 'GEMINI_API_KEY not found in environment variables' };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { success: true, content: text };
  } catch (error) {
    console.error('Gemini API error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export async function callOpenAI(prompt: string): Promise<LLMResponse> {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return { success: false, error: 'OPENAI_API_KEY not found in environment variables' };
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return { success: false, error: 'No content returned from OpenAI' };
    }

    return { success: true, content };
  } catch (error) {
    console.error('OpenAI API error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export async function generateVCBrief(deckText: string, vcPersona: string): Promise<LLMResponse> {
  const prompt = `
You are an expert VC analyst. Based on the following pitch deck text and VC persona, create a concise 1-page VC brief.

Pitch Deck Text:
${deckText}

VC Persona:
${vcPersona}

Please provide:
1. A 2-3 sentence executive summary
2. 5 key bullet points covering: market opportunity, business model, traction, team, and investment thesis
3. A brief recommendation (invest/pass/needs more info) with reasoning

Format the response as a clean, professional VC brief that can be easily read and shared.
`;

  // Try OpenAI first, fallback to Gemini
  let response = await callOpenAI(prompt);
  
  if (!response.success) {
    console.log('OpenAI failed, trying Gemini...');
    response = await callGemini(prompt);
  }

  return response;
}