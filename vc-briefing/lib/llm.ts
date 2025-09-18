import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

export type BriefResult = {
  bullets: string[];
  brief: string;
  provider: 'openai' | 'gemini';
};

function buildPrompt(deckText: string, vcPersona: string): string {
  return [
    'You are an expert venture analyst. Given a startup pitch deck text and a target VC persona:',
    '1) Produce exactly 5 crisp bullet points covering: market, problem, solution/product, traction/metrics, and moat/defensibility.',
    '2) Write a concise 1-page VC brief (about 150-250 words) tailored to the persona, focusing on investability, risks, and next steps.',
    'Return strictly valid JSON with the following shape:',
    '{ "bullets": string[5], "brief": string }',
    '',
    `VC Persona: ${vcPersona}`,
    'Pitch Deck Text:',
    deckText,
  ].join('\n');
}

export async function generateWithOpenAI(deckText: string, vcPersona: string): Promise<BriefResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set.');
  }
  const openai = new OpenAI({ apiKey });
  const prompt = buildPrompt(deckText, vcPersona);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Respond only with valid minified JSON matching the required schema.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.2,
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0]?.message?.content || '';
  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch {
    // Attempt to extract JSON
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('OpenAI returned non-JSON response');
    parsed = JSON.parse(match[0]);
  }

  const bullets: string[] = Array.isArray(parsed.bullets) ? parsed.bullets.slice(0, 5).map(String) : [];
  const brief: string = typeof parsed.brief === 'string' ? parsed.brief : '';
  if (bullets.length !== 5 || !brief) {
    throw new Error('OpenAI response missing required fields');
  }
  return { bullets, brief, provider: 'openai' };
}

export async function generateWithGemini(deckText: string, vcPersona: string): Promise<BriefResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set.');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = buildPrompt(deckText, vcPersona) + '\nReturn JSON only.';

  const res = await model.generateContent(prompt);
  const text = res.response.text();
  let parsed: any;
  try {
    parsed = JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Gemini returned non-JSON response');
    parsed = JSON.parse(match[0]);
  }

  const bullets: string[] = Array.isArray(parsed.bullets) ? parsed.bullets.slice(0, 5).map(String) : [];
  const brief: string = typeof parsed.brief === 'string' ? parsed.brief : '';
  if (bullets.length !== 5 || !brief) {
    throw new Error('Gemini response missing required fields');
  }
  return { bullets, brief, provider: 'gemini' };
}

export async function generateBrief(deckText: string, vcPersona: string): Promise<BriefResult> {
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  if (!hasOpenAI && !hasGemini) {
    throw new Error('Set OPENAI_API_KEY or GEMINI_API_KEY in your environment.');
  }
  // Prefer OpenAI when both are available
  if (hasOpenAI) return generateWithOpenAI(deckText, vcPersona);
  return generateWithGemini(deckText, vcPersona);
}

