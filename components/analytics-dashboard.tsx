"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Users, Clock, BarChart2 } from "lucide-react"
import { useDetectionStore } from "@/lib/detection-store"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface AnalyticsDashboardProps {
  detectionResults: any[]
}

export default function AnalyticsDashboard({ detectionResults }: AnalyticsDashboardProps) {
  const { vehicleCount, personCount, totalFrames } = useDetectionStore()

  // Prepare data for charts
  const prepareTimeSeriesData = () => {
    if (detectionResults.length === 0) return []

    // Group by every 10 frames
    const groupSize = Math.max(1, Math.floor(detectionResults.length / 20))
    const groupedData = []

    for (let i = 0; i < detectionResults.length; i += groupSize) {
      const group = detectionResults.slice(i, i + groupSize)
      const vehicleCount = group.reduce(
        (acc, result) =>
          acc +
          result.objects.filter((obj: any) => ["car", "truck", "bus", "motorcycle", "bicycle"].includes(obj.type))
            .length,
        0,
      )

      const personCount = group.reduce(
        (acc, result) => acc + result.objects.filter((obj: any) => obj.type === "person").length,
        0,
      )

      groupedData.push({
        frame: `F${group[0].frameNumber}`,
        vehicles: vehicleCount,
        persons: personCount,
      })
    }

    return groupedData
  }

  const prepareVehicleTypeData = () => {
    if (detectionResults.length === 0) return []

    const vehicleTypes: Record<string, number> = {
      car: 0,
      truck: 0,
      bus: 0,
      motorcycle: 0,
      bicycle: 0,
    }

    detectionResults.forEach((result) => {
      result.objects.forEach((obj: any) => {
        if (vehicleTypes.hasOwnProperty(obj.type)) {
          vehicleTypes[obj.type]++
        }
      })
    })

    return Object.entries(vehicleTypes)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => ({
        name: type.charAt(0).toUpperCase() + type.slice(1),
        value: count,
      }))
  }

  const prepareConfidenceData = () => {
    if (detectionResults.length === 0) return []

    const confidenceRanges = {
      "90-100%": 0,
      "80-90%": 0,
      "70-80%": 0,
      "60-70%": 0,
      "Below 60%": 0,
    }

    detectionResults.forEach((result) => {
      result.objects.forEach((obj: any) => {
        const confidence = obj.confidence * 100

        if (confidence >= 90) {
          confidenceRanges["90-100%"]++
        } else if (confidence >= 80) {
          confidenceRanges["80-90%"]++
        } else if (confidence >= 70) {
          confidenceRanges["70-80%"]++
        } else if (confidence >= 60) {
          confidenceRanges["60-70%"]++
        } else {
          confidenceRanges["Below 60%"]++
        }
      })
    })

    return Object.entries(confidenceRanges)
      .map(([range, count]) => ({ name: range, value: count }))
      .filter((item) => item.value > 0)
  }

  const timeSeriesData = prepareTimeSeriesData()
  const vehicleTypeData = prepareVehicleTypeData()
  const confidenceData = prepareConfidenceData()

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  if (detectionResults.length === 0) {
    return (
      <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <BarChart2 className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg">No detection data available</p>
            <p className="text-sm mt-2">Upload and analyze a video to see analytics</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-400 mb-1">Vehicles Detected</p>
                <p className="text-3xl font-bold">{vehicleCount}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Car className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 text-xs text-blue-300/70">
              {vehicleCount > 0 &&
                totalFrames > 0 &&
                `Average ${(vehicleCount / totalFrames).toFixed(1)} vehicles per frame`}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-400 mb-1">Pedestrians</p>
                <p className="text-3xl font-bold">{personCount}</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4 text-xs text-green-300/70">
              {personCount > 0 &&
                totalFrames > 0 &&
                `Average ${(personCount / totalFrames).toFixed(1)} pedestrians per frame`}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-400 mb-1">Frames Analyzed</p>
                <p className="text-3xl font-bold">{totalFrames}</p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-full">
                <Clock className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <div className="mt-4 text-xs text-purple-300/70">
              {totalFrames > 0 && `${(totalFrames / 30).toFixed(1)} seconds @ 30fps`}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-700/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-400 mb-1">Detection Rate</p>
                <p className="text-3xl font-bold">
                  {detectionResults.length > 0
                    ? Math.round(detectionResults.reduce((acc, curr) => acc + curr.objects.length, 0) / totalFrames)
                    : "0"}
                </p>
              </div>
              <div className="bg-orange-500/20 p-3 rounded-full">
                <BarChart2 className="h-6 w-6 text-orange-400" />
              </div>
            </div>
            <div className="mt-4 text-xs text-orange-300/70">Objects detected per frame</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="bg-gray-800/50 p-1 backdrop-blur-sm">
          <TabsTrigger value="timeline" className="data-[state=active]:bg-blue-600">
            Timeline Analysis
          </TabsTrigger>
          <TabsTrigger value="distribution" className="data-[state=active]:bg-blue-600">
            Vehicle Distribution
          </TabsTrigger>
          <TabsTrigger value="confidence" className="data-[state=active]:bg-blue-600">
            Confidence Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Detection Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="frame" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "white" }} />
                    <Legend />
                    <Line type="monotone" dataKey="vehicles" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="persons" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Vehicle Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                    <div className="flex items-center justify-center">
                      <PieChart width={300} height={300}>
                        <Pie
                          data={vehicleTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {vehicleTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "white" }}
                        />
                      </PieChart>
                    </div>
                    <div className="flex items-center justify-center">
                      <BarChart
                        width={300}
                        height={300}
                        data={vehicleTypeData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "white" }}
                        />
                        <Bar dataKey="value" fill="#3b82f6">
                          {vehicleTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </div>
                  </div>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confidence">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Detection Confidence Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                    <div className="flex items-center justify-center">
                      <PieChart width={300} height={300}>
                        <Pie
                          data={confidenceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {confidenceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "white" }}
                        />
                      </PieChart>
                    </div>
                    <div className="flex items-center justify-center">
                      <BarChart
                        width={300}
                        height={300}
                        data={confidenceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "white" }}
                        />
                        <Bar dataKey="value" fill="#3b82f6">
                          {confidenceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </div>
                  </div>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
