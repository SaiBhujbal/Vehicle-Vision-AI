import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Model ID is required" }, { status: 400 })
    }

    // Check if model exists
    const modelData = await kv.get(`model:${id}`)
    if (!modelData) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 })
    }

    // Get all model IDs
    const modelIds = await kv.smembers("models")

    // Update all models to be inactive
    for (const modelId of modelIds) {
      const model = await kv.get(`model:${modelId}`)
      if (model) {
        await kv.set(`model:${modelId}`, {
          ...model,
          isActive: modelId === id,
        })
      }
    }

    // Set active model ID in a separate key for easy access
    await kv.set("activeModelId", id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error setting active model:", error)
    return NextResponse.json({ error: "Failed to set active model" }, { status: 500 })
  }
}
