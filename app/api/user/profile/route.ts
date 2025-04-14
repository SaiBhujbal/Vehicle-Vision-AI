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
    const { name, email, image } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Get current user data
    const user = await kv.hgetall(`user:${userId}`)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if email is being changed
    if (email.toLowerCase() !== user.email) {
      // Check if new email already exists
      const emailExists = await kv.exists(`user:email:${email.toLowerCase()}`)
      if (emailExists) {
        return NextResponse.json({ error: "Email already in use" }, { status: 409 })
      }

      // Delete old email reference
      await kv.del(`user:email:${user.email}`)
    }

    // Update user data
    const updatedUser = {
      ...user,
      name,
      email: email.toLowerCase(),
      image: image || user.image || null,
      updatedAt: new Date().toISOString(),
    }

    // Save updated user data
    await kv.hset(`user:${userId}`, updatedUser)
    await kv.hset(`user:email:${email.toLowerCase()}`, updatedUser)

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        name,
        email: email.toLowerCase(),
        image: updatedUser.image,
      },
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
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

    // Get user data
    const user = await kv.hgetall(`user:${userId}`)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        image: user.image || null,
      },
    })
  } catch (error) {
    console.error("Error getting user profile:", error)
    return NextResponse.json({ error: "Failed to get profile" }, { status: 500 })
  }
}
