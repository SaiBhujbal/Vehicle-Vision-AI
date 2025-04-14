"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [isPlaying, setIsPlaying] = useState(false)

  // Auto-play video when it comes into view
  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch((e) => console.error("Video play error:", e))
      setIsPlaying(true)
    }
  }, [isInView])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((e) => console.error("Video play error:", e))
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-950 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-950 to-transparent z-10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">See YOLOv11x in Action</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch our advanced detection system identify vehicles and pedestrians in real-time with precision and
            accuracy
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-800"
        >
          <video
            ref={videoRef}
            src="/videos/detection-demo.mov"
            className="w-full aspect-video object-cover"
            loop
            muted
            playsInline
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between p-6">
            <div className="text-white">
              <h3 className="text-xl font-bold">YOLOv11x Detection Demo</h3>
              <p className="text-sm text-gray-300">Real-time object detection with bounding boxes</p>
            </div>
            <Button
              onClick={togglePlay}
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
            <div className="text-blue-400 font-bold mb-2">High Accuracy</div>
            <p className="text-gray-300">
              Our YOLOv11x model achieves over 95% detection accuracy on standard benchmarks
            </p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
            <div className="text-green-400 font-bold mb-2">Real-time Processing</div>
            <p className="text-gray-300">
              Process 30+ frames per second on standard hardware for true real-time detection
            </p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
            <div className="text-purple-400 font-bold mb-2">Multiple Object Classes</div>
            <p className="text-gray-300">
              Detect and classify vehicles, pedestrians, traffic signs, and more in a single pass
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
