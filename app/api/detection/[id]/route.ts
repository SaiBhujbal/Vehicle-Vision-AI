import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import fs from "fs"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: "Detection ID is required" }, { status: 400 })
    }

    // Get video metadata
    const videoData = await kv.hgetall(`video:${id}`)
    if (!videoData) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    // Get detection results
    const resultIds = await kv.zrange(`detection:timeline:${id}`, 0, -1)
    const results = []

    for (const resultId of resultIds) {
      const result = await kv.hget(`detection:results:${id}`, resultId)
      if (result) {
        results.push(JSON.parse(result as string))
      }
    }

    // Get stats
    const stats = await kv.hgetall(`detection:stats:${id}`)

    // Check if processed video exists
    let processedVideoUrl = null
    if (videoData.processedPath) {
      const processedPath = videoData.processedPath as string
      if (fs.existsSync(processedPath)) {
        // In a real implementation, you would generate a signed URL or serve the video through a dedicated endpoint
        processedVideoUrl = `/api/video/${id}`
      }
    }

    return NextResponse.json({
      id,
      metadata: videoData,
      stats,
      results,
      processedVideoUrl,
    })
  } catch (error) {
    console.error("Error fetching detection:", error)
    return NextResponse.json({ error: "Failed to fetch detection" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: "Detection ID is required" }, { status: 400 })
    }

    // Remove from sorted set
    await kv.zrem("videos", id)

    // Delete detection results
    await kv.del(`detection:results:${id}`)
    await kv.del(`detection:timeline:${id}`)
    await kv.del(`detection:stats:${id}`)
    await kv.del(`video:${id}`)

    // Delete processed video file if exists
    const videoData = await kv.hgetall(`video:${id}`)
    if (videoData && videoData.processedPath) {
      const processedPath = videoData.processedPath as string
      if (fs.existsSync(processedPath)) {
        fs.unlinkSync(processedPath)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting detection:", error)
    return NextResponse.json({ error: "Failed to delete detection" }, { status: 500 })
  }
}
