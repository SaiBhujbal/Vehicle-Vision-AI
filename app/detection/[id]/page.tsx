"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileVideo, Calendar, Clock, BarChart2, Car, Users, Trash2 } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { useToast } from "@/components/ui/use-toast"
import VideoPlayer from "@/components/video-player"

interface DetectionDetail {
  id: string
  filename: string
  timestamp: string
  vehicleCount: number
  personCount: number
  duration: number
  videoUrl?: string
  thumbnailUrl?: string
  results: any[]
}

export default function DetectionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [detection, setDetection] = useState<DetectionDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDetection = async () => {
      try {
        const response = await fetch(`/api/detection/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch detection")
        }
        const data = await response.json()
        setDetection(data)
      } catch (error) {
        console.error("Error fetching detection:", error)
        toast({
          title: "Error",
          description: "Failed to load detection details.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchDetection()
    }
  }, [params.id, toast])

  const handleDelete = async () => {
    if (!detection) return

    try {
      const response = await fetch(`/api/detection/${detection.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete detection")
      }

      toast({
        title: "Detection deleted",
        description: "The detection has been removed from your history.",
      })

      router.push("/history")
    } catch (error) {
      console.error("Error deleting detection:", error)
      toast({
        title: "Error",
        description: "Failed to delete detection.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <DashboardHeader />

      <div className="container mx-auto py-8 px-4">
        <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to History
        </Button>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading detection details...</p>
          </div>
        ) : detection ? (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">{detection.filename}</h1>
                <div className="flex flex-wrap gap-4 mt-2 text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatDate(detection.timestamp)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {formatTime(detection.timestamp)}
                  </div>
                </div>
              </div>
              <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Detection
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="col-span-2 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Video Playback</CardTitle>
                </CardHeader>
                <CardContent>
                  {detection.videoUrl ? (
                    <VideoPlayer src={detection.videoUrl} isPlaying={false} detectionResults={detection.results} />
                  ) : (
                    <div className="aspect-video bg-gray-900 flex items-center justify-center">
                      <FileVideo className="h-12 w-12 text-gray-600" />
                      <p className="ml-2 text-gray-400">Video not available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Detection Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 p-4 rounded-lg border border-blue-700/30">
                      <div className="flex items-center mb-2">
                        <Car className="h-5 w-5 text-blue-400 mr-2" />
                        <p className="text-sm text-blue-400">Vehicles Detected</p>
                      </div>
                      <p className="text-3xl font-bold">{detection.vehicleCount}</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 p-4 rounded-lg border border-green-700/30">
                      <div className="flex items-center mb-2">
                        <Users className="h-5 w-5 text-green-400 mr-2" />
                        <p className="text-sm text-green-400">Pedestrians</p>
                      </div>
                      <p className="text-3xl font-bold">{detection.personCount}</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-4 rounded-lg border border-purple-700/30">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-purple-400 mr-2" />
                        <p className="text-sm text-purple-400">Duration</p>
                      </div>
                      <p className="text-3xl font-bold">{detection.duration.toFixed(1)}s</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 p-4 rounded-lg border border-orange-700/30">
                      <div className="flex items-center mb-2">
                        <BarChart2 className="h-5 w-5 text-orange-400 mr-2" />
                        <p className="text-sm text-orange-400">Avg. Confidence</p>
                      </div>
                      <p className="text-3xl font-bold">
                        {detection.results && detection.results.length > 0
                          ? Math.round(
                              (detection.results
                                .flatMap((r) => r.objects.map((obj: any) => obj.confidence))
                                .reduce((a: number, b: number) => a + b, 0) /
                                detection.results.flatMap((r) => r.objects).length) *
                                100,
                            ) + "%"
                          : "0%"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <FileVideo className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Detection not found</p>
            <p className="text-sm mt-2">The requested detection may have been deleted or does not exist</p>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/history")}>
              Return to History
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
