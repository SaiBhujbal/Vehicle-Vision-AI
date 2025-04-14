"use client"

import { create } from "zustand"

interface DetectionObject {
  type: string
  confidence: number
  boundingBox: {
    x: number
    y: number
    width: number
    height: number
  }
}

interface DetectionResult {
  id: string
  timestamp: string
  frameNumber: number
  objects: DetectionObject[]
}

interface DetectionStore {
  detectionResults: DetectionResult[]
  vehicleCount: number
  personCount: number
  totalFrames: number
  addDetectionResult: (result: DetectionResult) => void
  clearDetectionResults: () => void
}

export const useDetectionStore = create<DetectionStore>((set) => ({
  detectionResults: [],
  vehicleCount: 0,
  personCount: 0,
  totalFrames: 0,

  addDetectionResult: (result) =>
    set((state) => {
      const newResults = [...state.detectionResults, result]

      // Calculate vehicle and person counts
      const vehicleCount = newResults.reduce(
        (acc, curr) =>
          acc +
          curr.objects.filter((obj) => ["car", "truck", "bus", "motorcycle", "bicycle"].includes(obj.type)).length,
        0,
      )

      const personCount = newResults.reduce(
        (acc, curr) => acc + curr.objects.filter((obj) => obj.type === "person").length,
        0,
      )

      return {
        detectionResults: newResults,
        vehicleCount,
        personCount,
        totalFrames: newResults.length,
      }
    }),

  clearDetectionResults: () =>
    set({
      detectionResults: [],
      vehicleCount: 0,
      personCount: 0,
      totalFrames: 0,
    }),
}))
