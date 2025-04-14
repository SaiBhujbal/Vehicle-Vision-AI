import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import { nanoid } from "nanoid"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const modelFile = formData.get("model") as File

    if (!modelFile) {
      return NextResponse.json({ error: "No model file provided" }, { status: 400 })
    }

    // Validate file type
    if (!modelFile.name.endsWith(".pt")) {
      return NextResponse.json({ error: "Invalid file type. Only .pt files are supported" }, { status: 400 })
    }

    // Generate a unique ID for the model
    const modelId = nanoid()

    // Create models directory if it doesn't exist
    const modelsDir = path.join(process.cwd(), "models")
    if (!fs.existsSync(modelsDir)) {
      fs.mkdirSync(modelsDir, { recursive: true })
    }

    // Save model file
    const modelFileName = `model_${modelId}.pt`
    const modelPath = path.join(modelsDir, modelFileName)

    // Convert file to buffer and save
    const arrayBuffer = await modelFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    fs.writeFileSync(modelPath, buffer)

    const modelData = {
      filename: modelFileName,
      originalName: modelFile.name,
      uploadDate: new Date().toISOString(),
      size: modelFile.size,
      isActive: false,
      filePath: modelPath,
    }

    // Store model metadata in Redis
    await kv.hset(`model:${modelId}`, modelData)

    // Add to models list
    await kv.sadd("models", modelId)

    return NextResponse.json({
      success: true,
      model: {
        id: modelId,
        ...modelData,
      },
    })
  } catch (error) {
    console.error("Error uploading model:", error)
    return NextResponse.json({ error: "Failed to upload model" }, { status: 500 })
  }
}
