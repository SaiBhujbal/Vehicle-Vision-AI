"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Car, User, AlertTriangle, Truck, Bus, BikeIcon as Bicycle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

interface DetectionResultsProps {
  results: any[]
}

export default function DetectionResults({ results }: DetectionResultsProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current && results.length > 0) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [results])

  const getIcon = (type: string) => {
    switch (type) {
      case "person":
        return <User className="h-5 w-5 text-green-500 mr-2" />
      case "car":
        return <Car className="h-5 w-5 text-blue-500 mr-2" />
      case "truck":
        return <Truck className="h-5 w-5 text-blue-500 mr-2" />
      case "bus":
        return <Bus className="h-5 w-5 text-blue-500 mr-2" />
      case "motorcycle":
        return <Car className="h-5 w-5 text-blue-500 mr-2" />
      case "bicycle":
        return <Bicycle className="h-5 w-5 text-blue-500 mr-2" />
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
    }
  }

  const getGradient = (type: string) => {
    if (type === "person") {
      return "from-green-900/30 to-green-800/10 border-green-700/30"
    } else if (["car", "truck", "bus", "motorcycle", "bicycle"].includes(type)) {
      return "from-blue-900/30 to-blue-800/10 border-blue-700/30"
    } else {
      return "from-yellow-900/30 to-yellow-800/10 border-yellow-700/30"
    }
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
        <AlertTriangle className="h-12 w-12 mb-4 opacity-50" />
        <p className="text-lg">No detection results yet</p>
        <p className="text-sm mt-2">Start analysis to see results in real-time</p>
      </div>
    )
  }

  // Only show the last 10 results for performance
  const recentResults = results.slice(-10)

  return (
    <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
      <AnimatePresence initial={false}>
        <div className="space-y-4">
          {recentResults.map((result, index) => (
            <motion.div
              key={result.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800/70 rounded-lg p-3 border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-400">
                  Frame {result.frameNumber} • {new Date(result.timestamp).toLocaleTimeString()}
                </span>
                <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700/50">
                  {result.objects.length} objects
                </Badge>
              </div>

              <div className="space-y-2">
                {result.objects.map((obj: any, objIndex: number) => (
                  <motion.div
                    key={objIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: objIndex * 0.05 }}
                    className={`flex items-center bg-gradient-to-br ${getGradient(obj.type)} rounded-lg p-2 border`}
                  >
                    {getIcon(obj.type)}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium capitalize">{obj.type}</span>
                        <span className="text-sm text-gray-400">{Math.round(obj.confidence * 100)}% confidence</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${obj.confidence * 100}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="bg-blue-600 h-1.5 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </ScrollArea>
  )
}
