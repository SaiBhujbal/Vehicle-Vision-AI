import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function GET() {
  try {
    // Get all model IDs
    const modelIds = await kv.smembers("models")

    const models = []

    // Get model data for each ID
    for (const id of modelIds) {
      const modelData = await kv.get(`model:${id}`)
      if (modelData) {
        models.push({
          id,
          ...modelData,
        })
      }
    }

    return NextResponse.json({ models })
  } catch (error) {
    console.error("Error listing models:", error)
    return NextResponse.json({ error: "Failed to list models" }, { status: 500 })
  }
}
