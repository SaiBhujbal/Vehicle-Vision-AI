"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileVideo, Calendar, Clock, BarChart2, Trash2 } from "lucide-react"
import Link from "next/link"
import DashboardHeader from "@/components/dashboard-header"
import { useToast } from "@/components/ui/use-toast"

interface DetectionHistory {
  id: string
  filename: string
  timestamp: string
  vehicleCount: number
  personCount: number
  duration: number
  thumbnailUrl?: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<DetectionHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/detection/history")
        if (!response.ok) {
          throw new Error("Failed to fetch history")
        }
        const data = await response.json()
        setHistory(data.history || [])
      } catch (error) {
        console.error("Error fetching history:", error)
        toast({
          title: "Error",
          description: "Failed to load detection history.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [toast])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/detection/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete detection")
      }

      setHistory((prev) => prev.filter((item) => item.id !== id))
      toast({
        title: "Detection deleted",
        description: "The detection has been removed from your history.",
      })
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
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <DashboardHeader />

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">Detection History</h1>
        <p className="text-gray-400 mb-8">View and manage your past video analysis sessions</p>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 bg-gray-800/50 p-1 backdrop-blur-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
              All Detections
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="data-[state=active]:bg-blue-600">
              Vehicles
            </TabsTrigger>
            <TabsTrigger value="pedestrians" className="data-[state=active]:bg-blue-600">
              Pedestrians
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">Loading detection history...</p>
              </div>
            ) : history.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.map((item) => (
                  <Card key={item.id} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm overflow-hidden">
                    <div className="aspect-video bg-gray-900 relative">
                      {item.thumbnailUrl ? (
                        <img
                          src={item.thumbnailUrl || "/placeholder.svg"}
                          alt={item.filename}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileVideo className="h-12 w-12 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg truncate">{item.filename}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(item.timestamp)}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Clock className="h-4 w-4 mr-2" />
                            {formatTime(item.timestamp)}
                          </div>
                          <div className="flex items-center text-blue-400">
                            <FileVideo className="h-4 w-4 mr-2" />
                            {item.vehicleCount} vehicles
                          </div>
                          <div className="flex items-center text-green-400">
                            <BarChart2 className="h-4 w-4 mr-2" />
                            {item.personCount} people
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="default" size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700" asChild>
                            <Link href={`/detection/${item.id}`}>View Details</Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 hover:bg-gray-700"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <FileVideo className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No detection history found</p>
                <p className="text-sm mt-2">Upload and analyze videos to see your history here</p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="vehicles">
            {/* Similar content as "all" but filtered for vehicles */}
            <div className="text-center py-12 text-gray-400">
              <FileVideo className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Vehicle detection filter</p>
              <p className="text-sm mt-2">This filter will show detections with vehicles</p>
            </div>
          </TabsContent>

          <TabsContent value="pedestrians">
            {/* Similar content as "all" but filtered for pedestrians */}
            <div className="text-center py-12 text-gray-400">
              <FileVideo className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Pedestrian detection filter</p>
              <p className="text-sm mt-2">This filter will show detections with pedestrians</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
