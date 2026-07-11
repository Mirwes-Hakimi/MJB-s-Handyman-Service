// SERVER-ONLY: ANTHROPIC_API_KEY is read here; it never reaches the browser
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// System prompt gives Claude context about MJB's so answers are on-brand
const SYSTEM_PROMPT = `You are a friendly assistant for MJB's Handyman Service, \
owned by Mark Brommage in Santa Rosa, CA (Sonoma County). \
Services: carpentry, window repair/installation, painting, plaster finishes, \
custom kitchen and bathroom renovations. \
Contact: (707) 727-3258 or Marbroman321@gmail.com. \
Keep answers concise. For quotes or scheduling, encourage calling or using the callback form on the website.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // messages comes from the client as { role: "user"|"assistant", content: string }[]
    const messages: Anthropic.MessageParam[] = body.messages;

    if (!messages?.length) {
      return NextResponse.json({ message: "No messages provided." }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    });

    // Narrow the discriminated union — only text blocks have .text
    const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === "text");
    const reply = textBlock?.text ?? "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server error. Please try again." }, { status: 500 });
  }
}
