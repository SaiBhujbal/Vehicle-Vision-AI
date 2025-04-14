import { NextResponse } from "next/server"

export async function GET() {
  try {
    const hasGeminiApiKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== ""

    return NextResponse.json({
      hasGeminiApiKey,
    })
  } catch (error) {
    console.error("Error checking environment variables:", error)
    return NextResponse.json({ error: "Failed to check environment variables" }, { status: 500 })
  }
}
