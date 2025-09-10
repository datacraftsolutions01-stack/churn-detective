import { NextRequest, NextResponse } from 'next/server';
import { generateVCBrief } from '@/lib/llm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { deckText, vcPersona } = body;

    // Validate input
    if (!deckText || !vcPersona) {
      return NextResponse.json(
        { error: 'Both deckText and vcPersona are required' },
        { status: 400 }
      );
    }

    if (typeof deckText !== 'string' || typeof vcPersona !== 'string') {
      return NextResponse.json(
        { error: 'deckText and vcPersona must be strings' },
        { status: 400 }
      );
    }

    // Check if API keys are configured
    if (!process.env.OPENAI_API_KEY || !process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API keys not configured. Please check your environment variables.' },
        { status: 500 }
      );
    }

    // Generate the VC brief
    const result = await generateVCBrief(deckText, vcPersona);

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}