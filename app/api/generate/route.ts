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

    if (deckText.length < 50) {
      return NextResponse.json(
        { error: 'Deck text must be at least 50 characters long' },
        { status: 400 }
      );
    }

    // Generate VC brief
    const result = await generateVCBrief(deckText, vcPersona);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to generate VC brief' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      brief: result.content,
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}