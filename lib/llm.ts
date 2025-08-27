import { OpenAI } from "openai";

// You can easily swap this with Gemini, Claude, etc.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function clusterChurnReasons(feedbackText: string): Promise<string[]> {
  // Use OpenAI to extract and cluster churn reasons
  const prompt = `
    Analyze the following customer feedback and identify the main reasons for churn. 
    Return a concise JSON array of churn reason strings, sorted by frequency and importance.

    FEEDBACK:
    ${feedbackText}
  `;
  const resp = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 512,
  });
  // Try to parse a JSON array response
  try {
    const jsonStart = resp.choices[0]?.message?.content?.indexOf("[");
    const jsonEnd = resp.choices[0]?.message?.content?.lastIndexOf("]");
    if (jsonStart !== undefined && jsonEnd !== undefined && jsonStart >= 0 && jsonEnd > jsonStart) {
      const arr = JSON.parse(resp.choices[0].message.content.slice(jsonStart, jsonEnd + 1));
      return Array.isArray(arr) ? arr : [];
    }
    return resp.choices[0].message.content
      .split("\n")
      .filter((x) => x.trim().length > 0);
  } catch {
    return ["Unable to cluster reasons, please check your input."]; 
  }
}

export async function generateActionPlan(churnReasons: string[]): Promise<string> {
  // Use OpenAI to generate actionable retention plan based on churn reasons
  const planPrompt = `
    Given these top churn reasons: ${churnReasons.join(", ")}, provide a structured, actionable plan to reduce churn, formatted in Markdown. Make it clear and actionable.
  `;
  const resp = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: planPrompt }],
    max_tokens: 600,
  });
  return resp.choices[0]?.message?.content || "No action plan generated.";
}