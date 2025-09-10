import { NextRequest, NextResponse } from 'next/server'
import { briefWithOpenAI, summarizeWithGemini } from '@/lib/llm'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const deckText: string = body?.deckText || ''
    const vcPersona: string = body?.vcPersona || ''

    if (!deckText || !vcPersona) {
      return NextResponse.json({ error: 'deckText and vcPersona are required' }, { status: 400 })
    }

    const bullets = await summarizeWithGemini(deckText)
    const brief = await briefWithOpenAI(bullets, vcPersona)

    return NextResponse.json({ bullets, brief })
  } catch (error: any) {
    console.error('Generate API error:', error)
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 })
  }
}

