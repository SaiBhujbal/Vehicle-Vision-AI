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

    // Check if this is the active model
    if ((modelData as any).isActive) {
      return NextResponse.json(
        {
          error: "Cannot delete the active model. Please set another model as active first.",
        },
        { status: 400 },
      )
    }

    // Remove from models set
    await kv.srem("models", id)

    // Delete model data
    await kv.del(`model:${id}`)

    // In a real implementation, you would also delete the file from storage

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting model:", error)
    return NextResponse.json({ error: "Failed to delete model" }, { status: 500 })
  }
}
