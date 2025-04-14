"use server"

import { spawn } from "child_process"
import fs from "fs"
import path from "path"
import { nanoid } from "nanoid"
import { kv } from "@vercel/kv"

// Define types for detection results
export interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

export interface DetectedObject {
  type: string
  confidence: number
  boundingBox: BoundingBox
}

export interface DetectionResult {
  id: string
  timestamp: string
  videoId: string
  frameNumber: number
  objects: DetectedObject[]
}

// Main function to process video with YOLOv11
export async function processVideoWithYOLO(
  videoFile: Buffer,
  fileName: string,
  modelPath = "yolov11n.pt", // Default model if none uploaded
): Promise<{ videoId: string; outputPath: string; detectionResults: DetectionResult[] }> {
  try {
    // Generate unique ID for this video processing job
    const videoId = nanoid()

    // Create temporary directories for processing
    const tempDir = path.join("/tmp", videoId)
    const framesDir = path.join(tempDir, "frames")
    const outputDir = path.join(tempDir, "output")
    const outputVideoPath = path.join(outputDir, `${videoId}_processed.mp4`)

    // Ensure directories exist
    fs.mkdirSync(tempDir, { recursive: true })
    fs.mkdirSync(framesDir, { recursive: true })
    fs.mkdirSync(outputDir, { recursive: true })

    // Save uploaded video to temp directory
    const videoPath = path.join(tempDir, fileName)
    fs.writeFileSync(videoPath, videoFile)

    // Step 1: Extract frames from video using ffmpeg
    await extractFrames(videoPath, framesDir)

    // Step 2: Process each frame with YOLOv11
    const detectionResults = await processFramesWithYOLO(framesDir, outputDir, videoId, modelPath)

    // Step 3: Combine processed frames back into video
    await combineFramesToVideo(outputDir, outputVideoPath)

    // Step 4: Store detection results in KV store
    await storeDetectionResults(detectionResults, videoId)

    // Return results
    return {
      videoId,
      outputPath: outputVideoPath,
      detectionResults,
    }
  } catch (error) {
    console.error("Error processing video:", error)
    throw new Error(`Failed to process video: ${error.message}`)
  }
}

// Extract frames from video using ffmpeg
async function extractFrames(videoPath: string, outputDir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-i",
      videoPath,
      "-vf",
      "fps=10", // Extract 10 frames per second
      `${outputDir}/frame_%04d.jpg`,
    ])

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`ffmpeg process exited with code ${code}`))
      }
    })

    ffmpeg.stderr.on("data", (data) => {
      console.log(`ffmpeg: ${data}`)
    })
  })
}

// Process frames with YOLOv11 using Ultralytics
async function processFramesWithYOLO(
  framesDir: string,
  outputDir: string,
  videoId: string,
  modelPath: string,
): Promise<DetectionResult[]> {
  // Get all frame files
  const frameFiles = fs.readdirSync(framesDir).sort()
  const detectionResults: DetectionResult[] = []

  // Process each frame with YOLOv11 using Python script
  for (let i = 0; i < frameFiles.length; i++) {
    const frameFile = frameFiles[i]
    const framePath = path.join(framesDir, frameFile)
    const outputFramePath = path.join(outputDir, frameFile)

    // Run YOLOv11 detection on frame
    const frameResult = await runYOLODetection(framePath, outputFramePath, modelPath)

    // Create detection result object
    const result: DetectionResult = {
      id: nanoid(),
      timestamp: new Date().toISOString(),
      videoId,
      frameNumber: i,
      objects: frameResult.map((obj) => ({
        type: obj.class,
        confidence: obj.confidence,
        boundingBox: {
          x: obj.bbox[0],
          y: obj.bbox[1],
          width: obj.bbox[2] - obj.bbox[0],
          height: obj.bbox[3] - obj.bbox[1],
        },
      })),
    }

    detectionResults.push(result)
  }

  return detectionResults
}

// Run YOLOv11 detection on a single frame
async function runYOLODetection(framePath: string, outputPath: string, modelPath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    // Command to run Python script with Ultralytics YOLOv11
    const python = spawn("python", [
      "-c",
      `
import sys
from ultralytics import YOLO
import cv2
import json

# Load YOLOv11 model
model = YOLO("${modelPath}")

# Read image
image = cv2.imread("${framePath}")

# Run detection
results = model(image)

# Process results
detections = []
for result in results:
    boxes = result.boxes
    for box in boxes:
        x1, y1, x2, y2 = box.xyxy[0].tolist()
        conf = float(box.conf[0])
        cls = int(box.cls[0])
        cls_name = result.names[cls]
        
        detections.append({
            "class": cls_name,
            "confidence": conf,
            "bbox": [x1, y1, x2, y2]
        })
        
        # Draw bounding box on image
        cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
        cv2.putText(image, f"{cls_name} {conf:.2f}", (int(x1), int(y1) - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# Save annotated image
cv2.imwrite("${outputPath}", image)

# Output detections as JSON
print(json.dumps(detections))
      `,
    ])

    let outputData = ""

    python.stdout.on("data", (data) => {
      outputData += data.toString()
    })

    python.on("close", (code) => {
      if (code === 0) {
        try {
          const detections = JSON.parse(outputData)
          resolve(detections)
        } catch (error) {
          reject(new Error(`Failed to parse YOLOv11 output: ${error.message}`))
        }
      } else {
        reject(new Error(`Python process exited with code ${code}`))
      }
    })

    python.stderr.on("data", (data) => {
      console.error(`Python error: ${data}`)
    })
  })
}

// Combine processed frames back into video
async function combineFramesToVideo(framesDir: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-framerate",
      "10",
      "-pattern_type",
      "glob",
      "-i",
      `${framesDir}/*.jpg`,
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      outputPath,
    ])

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`ffmpeg process exited with code ${code}`))
      }
    })

    ffmpeg.stderr.on("data", (data) => {
      console.log(`ffmpeg: ${data}`)
    })
  })
}

// Store detection results in KV store
async function storeDetectionResults(results: DetectionResult[], videoId: string): Promise<void> {
  try {
    // Store each detection result
    for (const result of results) {
      await kv.hset(`detection:results:${videoId}`, {
        [result.id]: JSON.stringify(result),
      })

      // Add to timeline
      await kv.zadd(`detection:timeline:${videoId}`, {
        score: new Date(result.timestamp).getTime(),
        member: result.id,
      })
    }

    // Store summary statistics
    const totalFrames = results.length
    let totalObjects = 0
    let vehicleCount = 0
    let personCount = 0

    results.forEach((result) => {
      totalObjects += result.objects.length

      result.objects.forEach((obj) => {
        if (["car", "truck", "bus", "motorcycle", "bicycle"].includes(obj.type)) {
          vehicleCount++
        } else if (obj.type === "person") {
          personCount++
        }
      })
    })

    await kv.hset(`detection:stats:${videoId}`, {
      totalFrames,
      totalObjects,
      vehicleCount,
      personCount,
      processedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error storing detection results:", error)
    throw new Error(`Failed to store detection results: ${error.message}`)
  }
}
