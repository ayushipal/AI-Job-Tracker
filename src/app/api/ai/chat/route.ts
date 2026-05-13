import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const userMessage =
      messages[messages.length - 1]?.content || 'Hello'

    let response = ''

    if (
      userMessage.toLowerCase().includes('resume')
    ) {
      response = `
📄 Resume Optimization Tips

• Quantify achievements
• Add ATS keywords
• Keep to 1 page
• Tailor per job
      `
    } else if (
      userMessage.toLowerCase().includes('interview')
    ) {
      response = `
🎤 Interview Tips

• Practice STAR method
• Review React/Next.js
• Mock interviews
      `
    } else {
      response = `
🤖 AI Career Coach

Ask me about:
• Resume creation
• Cover letters
• Interview prep
• Job analysis
      `
    }

    return NextResponse.json({
      content: response,
    })
  } catch (error) {
    console.log('AI ERROR:', error)

    return NextResponse.json(
      {
        error: 'AI service temporarily unavailable.',
      },
      { status: 500 }
    )
  }
}