import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { kv } from "@vercel/kv"

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const { settings } = await req.json()

    if (!settings) {
      return NextResponse.json({ error: "Settings are required" }, { status: 400 })
    }

    // Save settings
    await kv.hset(`user:${userId}:settings`, settings)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating user settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Get settings
    const settings = await kv.hgetall(`user:${userId}:settings`)

    // Default settings if none exist
    const defaultSettings = {
      emailNotifications: true,
      detectionAlerts: true,
      modelUpdates: true,
      darkMode: true,
    }

    return NextResponse.json({
      settings: settings || defaultSettings,
    })
  } catch (error) {
    console.error("Error getting user settings:", error)
    return NextResponse.json({ error: "Failed to get settings" }, { status: 500 })
  }
}
