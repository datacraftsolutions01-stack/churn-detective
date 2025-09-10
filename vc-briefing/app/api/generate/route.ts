import { NextRequest, NextResponse } from "next/server";
import { summarizeWithGemini, writeBriefWithOpenAI, GenerateOutput } from "@/lib/llm";
import { z } from "zod";

const BodySchema = z.object({
  deckText: z.string().min(1, "deckText required"),
  vcPersona: z.string().min(1, "vcPersona required"),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { deckText, vcPersona } = parsed.data;

    const bullets = await summarizeWithGemini(deckText);
    const brief = await writeBriefWithOpenAI(bullets, vcPersona);

    const payload: GenerateOutput = { bullets, brief };
    return NextResponse.json(payload);
  } catch (err: unknown) {
    console.error("/api/generate error", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

