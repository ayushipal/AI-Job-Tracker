import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.openai.com/v1/models", {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    
    if (res.ok) {
      return NextResponse.json({ success: true, message: "✅ OpenAI Connected!" });
    }
    return NextResponse.json({ error: "❌ Invalid API Key" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "❌ Connection Failed" }, { status: 500 });
  }
}