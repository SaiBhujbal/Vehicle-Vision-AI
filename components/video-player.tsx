"use client"

import { useRef, useEffect, useState } from "react"
import { useDetectionStore } from "@/lib/detection-store"

interface VideoPlayerProps {
  src: string
  isPlaying: boolean
  detectionResults: any[]
}

export default function VideoPlayer({ src, isPlaying, detectionResults }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const { addDetectionResult } = useDetectionStore()
  const requestRef = useRef<number | null>(null)

  // Handle video loading
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleVideoLoaded = () => {
      setVideoLoaded(true)
      console.log("Video loaded successfully")
    }

    videoElement.addEventListener("loadeddata", handleVideoLoaded)

    return () => {
      videoElement.removeEventListener("loadeddata", handleVideoLoaded)
    }
  }, [src])

  // Handle video playback
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      const playPromise = videoElement.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error playing video:", error)
          setError("Failed to play video. Please try again.")
        })
      }
    } else {
      videoElement.pause()
    }
  }, [isPlaying])

  // Track current frame and add detection results to store
  useEffect(() => {
    if (!isPlaying || !videoLoaded || detectionResults.length === 0) return

    const videoElement = videoRef.current
    if (!videoElement) return

    const fps = 30 // Assuming 30fps
    let lastTime = 0

    const updateFrame = (time: number) => {
      // Only update every 1/30th of a second
      if (time - lastTime >= 1000 / fps) {
        lastTime = time

        // Calculate current frame based on video time
        const frameIndex = Math.floor(videoElement.currentTime * fps)
        setCurrentFrame(frameIndex)

        // Find corresponding detection result
        const result = detectionResults.find((r) => r.frameNumber === frameIndex)

        // Add to store if found
        if (result && !result.added) {
          addDetectionResult(result)
          result.added = true // Mark as added to prevent duplicates
        }
      }

      if (isPlaying) {
        requestRef.current = requestAnimationFrame(updateFrame)
      }
    }

    requestRef.current = requestAnimationFrame(updateFrame)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, videoLoaded, detectionResults, addDetectionResult])

  return (
    <div className="relative rounded-lg overflow-hidden">
      <video ref={videoRef} src={src} className="w-full rounded-lg" controls={!isPlaying} loop muted playsInline />

      {error && <div className="absolute bottom-0 left-0 right-0 bg-red-900/80 text-white p-2 text-sm">{error}</div>}
    </div>
  )
}
