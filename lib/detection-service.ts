"use server"

import { kv } from "@vercel/kv"
import { nanoid } from "nanoid"

// Mock detection results for demonstration
// In a real implementation, this would use the YOLOv11x model
const mockDetectionClasses = [
  "person",
  "bicycle",
  "car",
  "motorcycle",
  "bus",
  "truck",
  "traffic light",
  "stop sign",
  "parking meter",
  "bench",
]

interface DetectionResult {
  label: string
  confidence: number
  bbox: [number, number, number, number] // [x, y, width, height] normalized 0-1
}

interface DetectionResponse {
  id: string
  results: DetectionResult[]
  timestamp: string
  videoId?: string
  modelId?: string
}

// Define detection result types
interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

interface DetectedObject {
  type: string
  confidence: number
  boundingBox: BoundingBox
}

interface OldDetectionResult {
  id: string
  timestamp: string
  videoId: string
  frameNumber: number
  objects: DetectedObject[]
}

// Store detection result in Redis
export async function storeDetectionResult(result: OldDetectionResult): Promise<void> {
  try {
    // Store in a hash with key 'detection:results:{videoId}'
    await kv.hset(`detection:results:${result.videoId}`, {
      [result.id]: JSON.stringify(result),
    })

    // Add to a sorted set for time-based queries
    await kv.zadd(`detection:timeline:${result.videoId}`, {
      score: new Date(result.timestamp).getTime(),
      member: result.id,
    })
  } catch (error) {
    console.error("Failed to store detection result:", error)
    throw new Error("Failed to store detection result")
  }
}

// Get detection results for a video
export async function getDetectionResults(videoId: string): Promise<OldDetectionResult[]> {
  try {
    // Get all results for the video
    const resultIds = await kv.zrange(`detection:timeline:${videoId}`, 0, -1)

    if (!resultIds || resultIds.length === 0) {
      return []
    }

    // Get the actual results
    const results = await Promise.all(
      resultIds.map(async (id) => {
        const result = await kv.hget(`detection:results:${videoId}`, id)
        return result ? (JSON.parse(result) as OldDetectionResult) : null
      }),
    )

    // Filter out nulls and sort by frame number
    return results.filter(Boolean).sort((a, b) => a.frameNumber - b.frameNumber)
  } catch (error) {
    console.error("Failed to get detection results:", error)
    return []
  }
}

// Get summary statistics for a video
export async function getDetectionStats(videoId: string): Promise<{
  totalFrames: number
  totalObjects: number
  vehicleCount: number
  personCount: number
  otherCount: number
}> {
  try {
    const results = await getDetectionResults(videoId)

    if (results.length === 0) {
      return {
        totalFrames: 0,
        totalObjects: 0,
        vehicleCount: 0,
        personCount: 0,
        otherCount: 0,
      }
    }

    const totalFrames = results.length

    let totalObjects = 0
    let vehicleCount = 0
    let personCount = 0
    let otherCount = 0

    results.forEach((result) => {
      totalObjects += result.objects.length

      result.objects.forEach((obj) => {
        if (["car", "truck", "bus", "motorcycle", "bicycle"].includes(obj.type)) {
          vehicleCount++
        } else if (obj.type === "person") {
          personCount++
        } else {
          otherCount++
        }
      })
    })

    return {
      totalFrames,
      totalObjects,
      vehicleCount,
      personCount,
      otherCount,
    }
  } catch (error) {
    console.error("Failed to get detection stats:", error)
    return {
      totalFrames: 0,
      totalObjects: 0,
      vehicleCount: 0,
      personCount: 0,
      otherCount: 0,
    }
  }
}

export async function detectObjects(videoUrl: string, frameTime = 0): Promise<DetectionResponse> {
  try {
    // Check if we have an active YOLOv11x model
    const activeModelId = (await kv.get("activeModel")) as string | null
    let modelInfo = null

    if (activeModelId) {
      modelInfo = await kv.hgetall(`model:${activeModelId}`)
    }

    // Generate a unique ID for this detection
    const detectionId = nanoid()

    // In a real implementation, you would:
    // 1. Extract the frame at the specified time from the video
    // 2. Load the YOLOv11x model (if available)
    // 3. Run the model on the frame
    // 4. Process and return the results

    // For this demo, we'll generate mock results
    const numDetections = Math.floor(Math.random() * 5) + 1 // 1-5 detections

    const results: DetectionResult[] = Array.from({ length: numDetections }).map(() => {
      const classIndex = Math.floor(Math.random() * mockDetectionClasses.length)

      return {
        label: mockDetectionClasses[classIndex],
        confidence: 0.5 + Math.random() * 0.5, // 0.5-1.0 confidence
        bbox: [
          Math.random() * 0.8, // x
          Math.random() * 0.8, // y
          0.1 + Math.random() * 0.2, // width
          0.1 + Math.random() * 0.2, // height
        ],
      }
    })

    // Create the detection response
    const detection: DetectionResponse = {
      id: detectionId,
      results,
      timestamp: new Date().toISOString(),
      videoId: videoUrl.split("/").pop()?.split(".")[0] || undefined,
      modelId: activeModelId || undefined,
    }

    // Store the detection results
    await kv.set(`detection:${detectionId}`, JSON.stringify(detection))

    // Store as latest detection for chat context
    await kv.set("latestDetection", detection)

    // Add to detection history
    await kv.lpush("detectionHistory", detectionId)
    await kv.ltrim("detectionHistory", 0, 99) // Keep only the last 100 detections

    return detection
  } catch (error) {
    console.error("Error in object detection:", error)
    throw new Error("Failed to process detection")
  }
}

export async function getDetectionById(id: string): Promise<DetectionResponse | null> {
  try {
    const detection = await kv.get(`detection:${id}`)
    return detection ? JSON.parse(detection as string) : null
  } catch (error) {
    console.error("Error retrieving detection:", error)
    return null
  }
}

export async function getDetectionHistory(limit = 10): Promise<DetectionResponse[]> {
  try {
    // Get the most recent detection IDs
    const detectionIds = await kv.lrange("detectionHistory", 0, limit - 1)

    if (!detectionIds || detectionIds.length === 0) {
      return []
    }

    // Get the detection data for each ID
    const detectionsPromises = detectionIds.map((id) =>
      kv.get(`detection:${id}`).then((data) => (data ? JSON.parse(data as string) : null)),
    )

    const detections = await Promise.all(detectionsPromises)

    // Filter out any null values
    return detections.filter(Boolean)
  } catch (error) {
    console.error("Error retrieving detection history:", error)
    return []
  }
}
