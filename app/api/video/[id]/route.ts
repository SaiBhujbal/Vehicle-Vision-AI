import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import fs from "fs"
import { headers } from "next/headers"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 })
    }

    // Get video metadata
    const videoData = await kv.hgetall(`video:${id}`)
    if (!videoData || !videoData.processedPath) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    const processedPath = videoData.processedPath as string

    // Check if file exists
    if (!fs.existsSync(processedPath)) {
      return NextResponse.json({ error: "Video file not found" }, { status: 404 })
    }

    // Read file
    const videoBuffer = fs.readFileSync(processedPath)

    // Set appropriate headers for video streaming
    const headersList = headers()
    const range = headersList.get("range")

    if (range) {
      // Handle range requests for video streaming
      const parts = range.replace(/bytes=/, "").split("-")
      const start = Number.parseInt(parts[0], 10)
      const end = parts[1] ? Number.parseInt(parts[1], 10) : videoBuffer.length - 1
      const chunkSize = end - start + 1

      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoBuffer.length}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize.toString(),
        "Content-Type": "video/mp4",
      }

      return new NextResponse(videoBuffer.slice(start, end + 1), {
        status: 206,
        headers,
      })
    } else {
      // Return the full video
      return new NextResponse(videoBuffer, {
        headers: {
          "Content-Type": "video/mp4",
          "Content-Length": videoBuffer.length.toString(),
        },
      })
    }
  } catch (error) {
    console.error("Error serving video:", error)
    return NextResponse.json({ error: "Failed to serve video" }, { status: 500 })
  }
}
