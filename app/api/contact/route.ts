// SERVER-ONLY: Route Handlers always run on the server, never in the browser
import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation — name and phone are the minimum we need to follow up
    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { message: "Name and phone are required." },
        { status: 400 }
      );
    }

    await saveLead({
      name:                 body.name.trim(),
      phone:                body.phone.trim(),
      email:                body.email?.trim() || undefined,
      jobDescription:       body.jobDescription?.trim() || undefined,
      preferredContactTime: body.preferredContactTime?.trim() || undefined,
      source:               body.source === "chat" ? "chat" : "form",
    });

    return NextResponse.json({ message: "Lead saved." }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
