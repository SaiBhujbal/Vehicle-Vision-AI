import { type NextRequest, NextResponse } from "next/server"
import { processVideoWithYOLO } from "@/lib/video-processing"
import { kv } from "@vercel/kv"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const videoFile = formData.get("video") as File

    if (!videoFile) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 })
    }

    // Get active model path
    const activeModelId = (await kv.get("activeModelId")) as string | null
    let modelPath = "yolov11n.pt" // Default model

    if (activeModelId) {
      const modelData = await kv.hgetall(`model:${activeModelId}`)
      if (modelData) {
        modelPath = (modelData.filePath as string) || modelPath
      }
    }

    // Convert File to Buffer
    const arrayBuffer = await videoFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Process video with YOLOv11
    const { videoId, outputPath, detectionResults } = await processVideoWithYOLO(buffer, videoFile.name, modelPath)

    // Store video metadata
    await kv.hset(`video:${videoId}`, {
      originalName: videoFile.name,
      processedPath: outputPath,
      uploadedAt: new Date().toISOString(),
      size: videoFile.size,
      frameCount: detectionResults.length,
      modelUsed: modelPath,
    })

    // Add to videos list
    await kv.zadd("videos", {
      score: Date.now(),
      member: videoId,
    })

    return NextResponse.json({
      success: true,
      videoId,
      frameCount: detectionResults.length,
      message: "Video processed successfully",
    })
  } catch (error) {
    console.error("Error processing video:", error)
    return NextResponse.json({ error: "Failed to process video" }, { status: 500 })
  }
}
