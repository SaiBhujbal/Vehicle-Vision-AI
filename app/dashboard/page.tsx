"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Play,
  Pause,
  RotateCcw,
  MessageSquare,
  BarChart2,
  Clock,
  Users,
  Car,
  Video,
  AlertTriangle,
} from "lucide-react"
import VideoUploader from "@/components/video-uploader"
import VideoPlayer from "@/components/video-player"
import DetectionResults from "@/components/detection-results"
import ChatInterface from "@/components/chat-interface"
import AnalyticsDashboard from "@/components/analytics-dashboard"
import DashboardHeader from "@/components/dashboard-header"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { useDetectionStore } from "@/lib/detection-store"

export default function Dashboard() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [videoId, setVideoId] = useState<string | null>(null)
  const [apiKeyError, setApiKeyError] = useState(false)
  const { toast } = useToast()

  const { detectionResults, clearDetectionResults, vehicleCount, personCount, totalFrames } = useDetectionStore()

  // Check if GEMINI_API_KEY is set
  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const response = await fetch("/api/check-env", {
          method: "GET",
        })
        const data = await response.json()
        setApiKeyError(!data.hasGeminiApiKey)
      } catch (error) {
        console.error("Error checking API key:", error)
      }
    }

    checkApiKey()
  }, [])

  // Fetch detection results if videoId is available
  useEffect(() => {
    if (videoId) {
      fetchDetectionResults(videoId)
    }
  }, [videoId])

  const fetchDetectionResults = async (id: string) => {
    try {
      const response = await fetch(`/api/detection/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch detection results")
      }

      const data = await response.json()

      // Clear previous results
      clearDetectionResults()

      // Add results to store
      if (data.results && Array.isArray(data.results)) {
        data.results.forEach((result: any) => {
          // Add to store
        })
      }

      // Set processed video URL
      if (data.processedVideoUrl) {
        setProcessedVideoUrl(data.processedVideoUrl)
      }
    } catch (error) {
      console.error("Error fetching detection results:", error)
      toast({
        title: "Error",
        description: "Failed to fetch detection results",
        variant: "destructive",
      })
    }
  }

  const handleVideoUpload = (file: File) => {
    setVideoFile(file)
    setVideoUrl(URL.createObjectURL(file))
    clearDetectionResults()
    setProcessingProgress(0)
    setVideoId(null)
    setProcessedVideoUrl(null)

    toast({
      title: "Video uploaded successfully",
      description: "Your video is ready for analysis.",
    })
  }

  const handleStartAnalysis = async () => {
    if (!videoFile || isProcessing) return

    setIsProcessing(true)
    setProcessingProgress(0)

    // Create form data
    const formData = new FormData()
    formData.append("video", videoFile)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProcessingProgress((prev) => {
          const newProgress = prev + Math.random() * 5
          return newProgress > 95 ? 95 : newProgress
        })
      }, 500)

      // Send video for processing
      const response = await fetch("/api/detection", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setProcessingProgress(100)

      if (!response.ok) {
        throw new Error("Failed to process video")
      }

      const data = await response.json()
      setVideoId(data.videoId)

      toast({
        title: "Analysis complete",
        description: "Your video has been processed successfully.",
        variant: "default",
      })

      // Start playback after processing
      setIsAnalyzing(true)
      setIsPlaying(true)
    } catch (error) {
      console.error("Error processing video:", error)
      toast({
        title: "Error",
        description: "Failed to process video. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleStopAnalysis = () => {
    setIsPlaying(false)
    setIsAnalyzing(false)

    toast({
      title: "Analysis paused",
      description: "You can resume the analysis at any time.",
      variant: "default",
    })
  }

  const handleResetAnalysis = () => {
    clearDetectionResults()
    setIsAnalyzing(false)
    setIsPlaying(false)

    toast({
      title: "Analysis reset",
      description: "All detection results have been cleared.",
      variant: "default",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <DashboardHeader />

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">Vehicle Vision AI Dashboard</h1>
        <p className="text-gray-400 mb-8">Monitor and analyze vehicle and pedestrian detection in real-time</p>

        {apiKeyError && (
          <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 mb-8 flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-yellow-200 mb-1">API Key Missing</h3>
              <p className="text-yellow-100/80">
                The GEMINI_API_KEY environment variable is not set. The AI assistant will not work properly. Please add
                this environment variable to your project settings.
              </p>
            </div>
          </div>
        )}

        <Tabs defaultValue="video" className="w-full">
          <TabsList className="mb-8 bg-gray-800/50 p-1 backdrop-blur-sm">
            <TabsTrigger value="video" className="data-[state=active]:bg-blue-600">
              <Video className="mr-2 h-4 w-4" />
              Video Analysis
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
              <BarChart2 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-blue-600">
              <MessageSquare className="mr-2 h-4 w-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="col-span-2 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Video Feed</CardTitle>
                  {isAnalyzing && (
                    <div className="flex items-center text-sm text-green-400">
                      <span className="relative flex h-3 w-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      Live Detection
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {videoUrl ? (
                    <VideoPlayer
                      src={processedVideoUrl || videoUrl}
                      isPlaying={isPlaying}
                      detectionResults={detectionResults}
                    />
                  ) : (
                    <VideoUploader onUpload={handleVideoUpload} />
                  )}

                  {isProcessing && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Processing video with YOLOv11...</span>
                        <span>{Math.round(processingProgress)}%</span>
                      </div>
                      <Progress value={processingProgress} className="h-2 bg-gray-700" />
                    </div>
                  )}

                  {videoUrl && (
                    <div className="flex mt-4 space-x-4">
                      {!isAnalyzing ? (
                        <Button
                          onClick={handleStartAnalysis}
                          className="bg-green-600 hover:bg-green-700 transition-all"
                          disabled={isProcessing}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          {isProcessing ? "Processing..." : "Start Analysis"}
                        </Button>
                      ) : (
                        <Button
                          onClick={handleStopAnalysis}
                          className="bg-yellow-600 hover:bg-yellow-700 transition-all"
                        >
                          <Pause className="mr-2 h-4 w-4" />
                          Pause Analysis
                        </Button>
                      )}

                      <Button
                        onClick={handleResetAnalysis}
                        variant="outline"
                        className="border-gray-600 hover:bg-gray-700 transition-all"
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Detection Results</CardTitle>
                  <span className="text-sm text-gray-400">{detectionResults.length} frames</span>
                </CardHeader>
                <CardContent>
                  <DetectionResults results={detectionResults} />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {detectionResults.length > 0 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 p-4 rounded-lg border border-blue-700/30">
                        <div className="flex items-center mb-2">
                          <Car className="h-5 w-5 text-blue-400 mr-2" />
                          <p className="text-sm text-blue-400">Vehicles Detected</p>
                        </div>
                        <p className="text-3xl font-bold">{vehicleCount}</p>
                        <div className="mt-2 text-xs text-blue-300/70">
                          {vehicleCount > 0 && `~${Math.round((vehicleCount / totalFrames) * 100)}% of frames`}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 p-4 rounded-lg border border-green-700/30">
                        <div className="flex items-center mb-2">
                          <Users className="h-5 w-5 text-green-400 mr-2" />
                          <p className="text-sm text-green-400">Pedestrians</p>
                        </div>
                        <p className="text-3xl font-bold">{personCount}</p>
                        <div className="mt-2 text-xs text-green-300/70">
                          {personCount > 0 && `~${Math.round((personCount / totalFrames) * 100)}% of frames`}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-4 rounded-lg border border-purple-700/30">
                        <div className="flex items-center mb-2">
                          <Clock className="h-5 w-5 text-purple-400 mr-2" />
                          <p className="text-sm text-purple-400">Frames Analyzed</p>
                        </div>
                        <p className="text-3xl font-bold">{totalFrames}</p>
                        <div className="mt-2 text-xs text-purple-300/70">
                          {totalFrames > 0 && `${(totalFrames / 30).toFixed(1)} seconds @ 30fps`}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 p-4 rounded-lg border border-orange-700/30">
                        <div className="flex items-center mb-2">
                          <BarChart2 className="h-5 w-5 text-orange-400 mr-2" />
                          <p className="text-sm text-orange-400">Avg. Confidence</p>
                        </div>
                        <p className="text-3xl font-bold">
                          {detectionResults.length > 0
                            ? Math.round(
                                (detectionResults
                                  .flatMap((r) => r.objects.map((obj: any) => obj.confidence))
                                  .reduce((a: number, b: number) => a + b, 0) /
                                  detectionResults.flatMap((r) => r.objects).length) *
                                  100,
                              ) + "%"
                            : "0%"}
                        </p>
                        <div className="mt-2 text-xs text-orange-300/70">Based on all detections</div>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        document
                          .querySelector('[data-value="chat"]')
                          ?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 transition-all"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ask AI Assistant About Results
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Upload and analyze a video to see detection results</p>
                    <p className="text-sm mt-2">Our AI model will detect vehicles and pedestrians in real-time</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard detectionResults={detectionResults} />
          </TabsContent>

          <TabsContent value="chat">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <ChatInterface detectionResults={detectionResults} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
