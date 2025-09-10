import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const geminiApiKey = process.env.GEMINI_API_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!geminiApiKey) {
  // Fail fast in server environment when key is missing
  console.warn("GEMINI_API_KEY is not set. Gemini features will fail.");
}

if (!openaiApiKey) {
  console.warn("OPENAI_API_KEY is not set. OpenAI features will fail.");
}

const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

export async function summarizeWithGemini(deckText: string): Promise<string[]> {
  if (!genAI) {
    throw new Error("Gemini client not configured");
  }
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Summarize the following startup pitch deck succinctly into exactly 5 bullet points.\n\nPitch Deck:\n"""\n${deckText}\n"""\n\nReturn only the 5 bullets, each starting with a dash.`;
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const bullets = text
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^[-•]\s?/, ""))
    .filter((line) => line.length > 0)
    .slice(0, 5);
  // Ensure exactly 5 bullets when possible
  return bullets;
}

export async function writeBriefWithOpenAI(
  deckBullets: string[],
  vcPersona: string
): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI client not configured");
  }
  const prompt = `You are a seasoned venture capitalist analyst. Using the 5 bullet point summary of a startup pitch, write a concise 1-page investment brief tailored to the following VC persona. Limit to 300 words. Use clear, compelling, non-hyped language.\n\nVC Persona: ${vcPersona}\n\nBullets:\n- ${deckBullets.join("\n- ")}\n\nDeliver:\nA single paragraph or short sections (no more than 5 lines per paragraph), <=300 words.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.6,
    messages: [
      { role: "system", content: "You are an expert VC analyst who writes crisp, actionable briefs." },
      { role: "user", content: prompt },
    ],
  });
  const content = completion.choices[0]?.message?.content ?? "";
  return content.trim();
}

export type GenerateOutput = {
  bullets: string[];
  brief: string;
};

