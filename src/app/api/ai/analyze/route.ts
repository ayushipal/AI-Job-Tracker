import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { job, resume } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
Compare this:

Resume: ${resume}
Job: ${job}

Give:
- match %
- missing skills
- suggestions
          `
        }
      ]
    })
  });

  const data = await response.json();

  return NextResponse.json({
    result: data.choices[0].message.content
  });
}