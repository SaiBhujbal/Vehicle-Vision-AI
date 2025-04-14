"use server"

import { kv } from "@vercel/kv"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface DetectionResult {
  label: string
  confidence: number
  bbox: [number, number, number, number]
}

export async function generateChatResponse(
  messages: ChatMessage[],
  detectionResults?: DetectionResult[],
): Promise<string> {
  try {
    // Check if GEMINI_API_KEY is available
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey || apiKey.trim() === "") {
      console.error("GEMINI_API_KEY environment variable is not set")
      return "I'm sorry, the AI assistant is not available at the moment. The GEMINI_API_KEY environment variable is not set. Please contact the administrator."
    }

    // Format the conversation history
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }))

    // Add detection results context if available
    let systemPrompt = "You are a helpful AI assistant specializing in vehicles and transportation."

    if (detectionResults && detectionResults.length > 0) {
      // Format detection results for the model
      const detectionSummary = detectionResults
        .map((det) => `${det.label} (confidence: ${(det.confidence * 100).toFixed(1)}%)`)
        .join(", ")

      systemPrompt += `\n\nRecent detection results: ${detectionSummary}. You can reference these detections in your responses when relevant.`
    }

    // Add system prompt as the first message
    formattedMessages.unshift({
      role: "user",
      parts: [{ text: systemPrompt }],
    })

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Gemini API error:", errorData)
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()

    // Extract the response text
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response."

    return responseText
  } catch (error) {
    console.error("Error generating chat response:", error)
    return "I'm sorry, I encountered an error while processing your request. Please try again later."
  }
}

export async function saveChatHistory(sessionId: string, messages: ChatMessage[]): Promise<void> {
  try {
    // Store only the last 50 messages to prevent excessive storage
    const limitedMessages = messages.slice(-50)
    await kv.set(`chat:${sessionId}`, JSON.stringify(limitedMessages), { ex: 60 * 60 * 24 * 7 }) // Expire after 7 days
  } catch (error) {
    console.error("Error saving chat history:", error)
  }
}

export async function getChatHistory(sessionId: string): Promise<ChatMessage[]> {
  try {
    const history = await kv.get(`chat:${sessionId}`)
    return history ? JSON.parse(history as string) : []
  } catch (error) {
    console.error("Error retrieving chat history:", error)
    return []
  }
}
