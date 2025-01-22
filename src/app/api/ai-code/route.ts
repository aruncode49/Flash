import { codeSession } from "@/utils/gemini_model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const result = await codeSession.sendMessage(prompt);
    const aiCodeResponse = result.response.text();

    return NextResponse.json(
      {
        success: true,
        data: JSON.parse(aiCodeResponse),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        errorMessage: error,
      },
      { status: 500 }
    );
  }
}
