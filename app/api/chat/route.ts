import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import { nanoid } from "nanoid"
import { generateChatResponse, saveChatHistory, getChatHistory } from "@/lib/gemini-service"

export async function POST(req: Request) {
  try {
    const { message, sessionId: existingSessionId, includeDetections } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Check if GEMINI_API_KEY is set
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === "") {
      console.error("GEMINI_API_KEY environment variable is not set")
      return NextResponse.json({
        response:
          "GEMINI_API_KEY environment variable is not set. Please add this environment variable to use the AI assistant.",
        sessionId: existingSessionId || nanoid(),
      })
    }

    // Generate or use existing session ID
    const sessionId = existingSessionId || nanoid()

    // Get chat history
    const chatHistory = await getChatHistory(sessionId)

    // Add user message to history
    chatHistory.push({ role: "user", content: message })

    // Get latest detection results if requested
    let detectionResults = undefined
    if (includeDetections) {
      const latestDetection = await kv.get("latestDetection")
      if (latestDetection) {
        detectionResults = (latestDetection as any).results
      }
    }

    // Generate response
    const assistantResponse = await generateChatResponse(chatHistory, detectionResults)

    // Add assistant response to history
    chatHistory.push({ role: "assistant", content: assistantResponse })

    // Save updated chat history
    await saveChatHistory(sessionId, chatHistory)

    return NextResponse.json({
      response: assistantResponse,
      sessionId,
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}
