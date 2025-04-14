"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUp, Check, Trash2, FileVideo, Calendar, HardDrive } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { useToast } from "@/components/ui/use-toast"
import ModelUpload from "@/components/model-upload"

interface Model {
  id: string
  filename: string
  originalName: string
  uploadDate: string
  size: number
  isActive: boolean
}

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchModels = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/model/list")
      if (!response.ok) {
        throw new Error("Failed to fetch models")
      }
      const data = await response.json()
      setModels(data.models || [])
    } catch (error) {
      console.error("Error fetching models:", error)
      toast({
        title: "Error",
        description: "Failed to load models.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchModels()
  }, [])

  const handleSetActive = async (id: string) => {
    try {
      const response = await fetch("/api/model/set-active", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error("Failed to set active model")
      }

      setModels((prev) =>
        prev.map((model) => ({
          ...model,
          isActive: model.id === id,
        })),
      )

      toast({
        title: "Model activated",
        description: "The selected model is now active for all detections.",
      })
    } catch (error) {
      console.error("Error setting active model:", error)
      toast({
        title: "Error",
        description: "Failed to set active model.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/model/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete model")
      }

      setModels((prev) => prev.filter((model) => model.id !== id))

      toast({
        title: "Model deleted",
        description: "The model has been removed from your account.",
      })
    } catch (error) {
      console.error("Error deleting model:", error)
      toast({
        title: "Error",
        description: "Failed to delete model.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB"
    else return (bytes / 1073741824).toFixed(1) + " GB"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <DashboardHeader />

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">YOLOv11x Models</h1>
        <p className="text-gray-400 mb-8">Upload and manage your custom detection models</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm col-span-1">
            <CardHeader>
              <CardTitle>Upload New Model</CardTitle>
            </CardHeader>
            <CardContent>
              <ModelUpload onSuccess={fetchModels} />
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm lg:col-span-2">
            <CardHeader>
              <CardTitle>Your Models</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-400">Loading models...</p>
                </div>
              ) : models.length > 0 ? (
                <div className="space-y-4">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      className={`p-4 rounded-lg border ${
                        model.isActive ? "bg-blue-900/20 border-blue-700" : "bg-gray-800/50 border-gray-700"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <FileVideo className="h-5 w-5 text-blue-400 mr-2" />
                            <h3 className="font-medium">{model.originalName}</h3>
                            {model.isActive && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-400 space-y-1">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Uploaded on {formatDate(model.uploadDate)}
                            </div>
                            <div className="flex items-center">
                              <HardDrive className="h-4 w-4 mr-1" />
                              {formatFileSize(model.size)}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {!model.isActive && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-600 text-blue-400 hover:bg-blue-900/30"
                              onClick={() => handleSetActive(model.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Set Active
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-400 hover:bg-red-900/30"
                            onClick={() => handleDelete(model.id)}
                            disabled={model.isActive}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <FileUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No models uploaded yet</p>
                  <p className="text-sm mt-2">Upload a YOLOv11x model file (.pt) to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
