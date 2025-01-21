import { chatSession } from "@/utils/gemini_model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const result = await chatSession.sendMessage(prompt);
    const aiResponse = result.response.text();

    return NextResponse.json(
      {
        success: true,
        data: aiResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        errorMessage: error instanceof Error && error.message,
      },
      { status: 500 }
    );
  }
}
