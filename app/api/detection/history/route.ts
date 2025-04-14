import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function GET() {
  try {
    // Get detection history from KV store
    const historyIds = await kv.zrange("detectionHistory", 0, -1, { rev: true })

    const history = []

    for (const id of historyIds) {
      const detection = await kv.get(`detection:${id}`)
      if (detection) {
        history.push({
          id,
          ...detection,
        })
      }
    }

    return NextResponse.json({ history })
  } catch (error) {
    console.error("Error fetching detection history:", error)
    return NextResponse.json({ error: "Failed to fetch detection history" }, { status: 500 })
  }
}
