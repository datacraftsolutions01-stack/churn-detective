import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateBrief } from '@/lib/llm';

const BodySchema = z.object({
  deckText: z.string().min(20, 'deckText must be at least 20 characters'),
  vcPersona: z.string().min(3, 'vcPersona is required'),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { deckText, vcPersona } = BodySchema.parse(json);
    const result = await generateBrief(deckText, vcPersona);
    return NextResponse.json(result);
  } catch (err: any) {
    const message = err?.message ?? 'Invalid request';
    return new NextResponse(message, { status: 400 });
  }
}

