"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileUp, Upload, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

interface ModelUploadProps {
  onSuccess?: () => void
}

export default function ModelUpload({ onSuccess }: ModelUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      validateAndSetFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      validateAndSetFile(selectedFile)
    }
  }

  const validateAndSetFile = (file: File) => {
    // Check if file is a .pt file (PyTorch model)
    if (!file.name.endsWith(".pt")) {
      toast({
        title: "Invalid file",
        description: "Please upload a valid PyTorch model file (.pt)",
        variant: "destructive",
      })
      return
    }

    // Check file size (limit to 500MB)
    if (file.size > 500 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Model file size must be less than 500MB",
        variant: "destructive",
      })
      return
    }

    setFile(file)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    const formData = new FormData()
    formData.append("model", file)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 10
          return newProgress > 90 ? 90 : newProgress
        })
      }, 300)

      const response = await fetch("/api/model/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to upload model")
      }

      const data = await response.json()

      toast({
        title: "Upload successful",
        description: "Your model has been uploaded and is ready to use",
      })

      // Reset state
      setFile(null)
      setUploadProgress(0)

      // Call success callback
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error uploading model:", error)
      toast({
        title: "Upload failed",
        description: (error as Error).message || "Failed to upload model",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleCancel = () => {
    setFile(null)
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging ? "border-blue-500 bg-blue-500/10" : "border-gray-600 hover:border-blue-500 hover:bg-blue-500/5"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pt" />
          <FileUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium mb-1">Upload YOLOv11x Model</p>
          <p className="text-sm text-gray-400 mb-4">Drag and drop your .pt file or click to browse</p>
          <Button variant="outline" className="border-gray-600">
            <Upload className="h-4 w-4 mr-2" />
            Select Model File
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-800/30">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <FileUp className="h-5 w-5 text-blue-400 mr-2" />
              <span className="font-medium truncate max-w-[200px]">{file.name}</span>
            </div>
            {!isUploading && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {isUploading ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2 bg-gray-700" />
            </div>
          ) : (
            <Button onClick={handleUpload} className="w-full bg-blue-600 hover:bg-blue-700 mt-2">
              <Upload className="h-4 w-4 mr-2" />
              Upload Model
            </Button>
          )}
        </div>
      )}

      <div className="text-sm text-gray-400 space-y-1 mt-4">
        <p>• Supported format: PyTorch model (.pt)</p>
        <p>• Maximum file size: 500MB</p>
        <p>• YOLOv11x models are recommended for best performance</p>
      </div>
    </div>
  )
}
