import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

const GEMINI_MODEL = 'gemini-1.5-flash'
const OPENAI_MODEL = 'gpt-4o-mini'

export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY')
  return new GoogleGenerativeAI(apiKey)
}

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY')
  return new OpenAI({ apiKey })
}

export async function summarizeWithGemini(deckText: string): Promise<string[]> {
  const genAI = getGeminiClient()
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL })
  const prompt = `Summarize the following pitch deck into 5 concise bullet points. Return ONLY the 5 bullets, each starting with a dash (-), no extra text.\n\nPitch deck:\n\n${deckText}`
  const res = await model.generateContent(prompt)
  const text = res.response.text()
  const bullets = text
    .split('\n')
    .map((line) => line.trim().replace(/^[-\*]\s?/, ''))
    .filter((line) => line.length > 0)
    .slice(0, 5)
  return bullets
}

export async function briefWithOpenAI(bullets: string[], vcPersona: string): Promise<string> {
  const openai = getOpenAIClient()
  const prompt = [
    'You are an expert venture investor communicator.',
    `Persona: ${vcPersona}`,
    'Using the 5 bullet points summarizing a startup pitch deck, write a polished 1-page VC brief tailored to the persona.',
    'Requirements: ≤300 words, crisp, investor-ready, structured with short paragraphs and bold key points.',
    'Bullets:',
    ...bullets.map((b, i) => `${i + 1}. ${b}`),
  ].join('\n')

  const completion = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [
      { role: 'system', content: 'Write concise professional VC briefings under 300 words.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
  })
  const content = completion.choices[0]?.message?.content ?? ''
  return content.trim()
}

