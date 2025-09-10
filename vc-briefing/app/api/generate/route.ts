import { NextRequest, NextResponse } from 'next/server';
import { summarizeWithGemini, generateVCBriefWithOpenAI } from '@/lib/llm';

export async function POST(request: NextRequest) {
  try {
    const { deckText, vcPersona } = await request.json();

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

    // Generate summary with Gemini and brief with OpenAI in parallel
    const [bullets, brief] = await Promise.all([
      summarizeWithGemini(deckText),
      generateVCBriefWithOpenAI(deckText, vcPersona)
    ]);

    return NextResponse.json({
      bullets,
      brief,
      success: true
    });

  } catch (error) {
    console.error('Error in generate API route:', error);
    
    // Return appropriate error message
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}