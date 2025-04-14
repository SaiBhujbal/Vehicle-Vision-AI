"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileVideo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VideoUploaderProps {
  onUpload: (file: File) => void
}

export default function VideoUploader({ onUpload }: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("video/")) {
        onUpload(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300",
        isDragging
          ? "border-blue-500 bg-blue-500/10"
          : isHovering
            ? "border-gray-500 bg-gray-500/5"
            : "border-gray-600",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300",
            isDragging || isHovering ? "bg-blue-500/20" : "bg-gray-800",
          )}
        >
          <FileVideo
            className={cn(
              "h-10 w-10 transition-all duration-300",
              isDragging || isHovering ? "text-blue-400" : "text-gray-400",
            )}
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">Upload Video</h3>
        <p className="text-gray-400 mb-6 max-w-md">
          Drag and drop your video file here, or click to browse. Our AI will analyze the video for vehicles and
          pedestrians.
        </p>
        <Button onClick={handleButtonClick} className="bg-blue-600 hover:bg-blue-700 transition-all" size="lg">
          <Upload className="mr-2 h-4 w-4" />
          Select Video
        </Button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" className="hidden" />
        <p className="mt-6 text-xs text-gray-500">Supported formats: MP4, WebM, MOV, AVI (Max size: 100MB)</p>
      </div>
    </div>
  )
}
