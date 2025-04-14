"use server"

import { kv } from "@vercel/kv"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { nanoid } from "nanoid"

// Define message type
interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

// Store chat message in Redis
export async function storeChatMessage(message: ChatMessage): Promise<void> {
  try {
    // Store in a list with key 'chat:history'
    await kv.lpush("chat:history", JSON.stringify(message))

    // Trim the list to keep only the last 100 messages
    await kv.ltrim("chat:history", 0, 99)
  } catch (error) {
    console.error("Failed to store chat message:", error)
    throw new Error("Failed to store chat message")
  }
}

// Get chat history from Redis
export async function getChatHistory(): Promise<ChatMessage[]> {
  try {
    // Get the last 50 messages
    const messages = await kv.lrange("chat:history", 0, 49)

    // Parse and reverse to get chronological order
    return messages.map((msg) => JSON.parse(msg) as ChatMessage).reverse()
  } catch (error) {
    console.error("Failed to get chat history:", error)
    return []
  }
}

// Create a new chat message and get AI response
export async function createChatMessage(userMessage: string, context: string): Promise<{ text: string }> {
  try {
    // Create system prompt with context
    const systemPrompt = `You are an AI assistant for Vehicle Vision AI, a platform that detects humans, vehicles, and other objects in video feeds.
    
    ${context}
    
    Provide helpful, accurate, and concise responses about the video analysis, vehicle detection, traffic patterns, and safety recommendations. If you don't know something, admit it rather than making up information.`

    // Generate response using OpenAI
    const response = await generateText({
      model: openai("gpt-4o"),
      prompt: userMessage,
      system: systemPrompt,
      temperature: 0.7,
      maxTokens: 500,
    })

    // Store user message
    const userChatMessage: ChatMessage = {
      id: nanoid(),
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
    }
    await storeChatMessage(userChatMessage)

    // Store assistant message
    const assistantChatMessage: ChatMessage = {
      id: nanoid(),
      role: "assistant",
      content: response.text,
      timestamp: new Date().toISOString(),
    }
    await storeChatMessage(assistantChatMessage)

    return { text: response.text }
  } catch (error) {
    console.error("Failed to create chat message:", error)
    throw new Error("Failed to create chat message")
  }
}
