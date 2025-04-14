"use client"

import { useEffect, useRef } from "react"

export default function HeroDetectionAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Vehicle class with detection box
    class Vehicle {
      x: number
      y: number
      width: number
      height: number
      speed: number
      color: string
      type: string
      showDetection: boolean
      detectionOpacity: number
      confidence: number
      lane: number
      detectionDuration: number
      detectionTimer: number

      constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        speed: number,
        color: string,
        type: string,
        lane: number,
      ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.color = color
        this.type = type
        this.showDetection = false
        this.detectionOpacity = 0
        this.confidence = 0.85 + Math.random() * 0.14 // 85-99% confidence
        this.lane = lane
        this.detectionDuration = 2000 + Math.random() * 3000 // 2-5 seconds
        this.detectionTimer = 0
      }

      draw() {
        if (!ctx) return

        // Draw vehicle
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)

        // Draw windows for cars
        if (this.type === "car") {
          ctx.fillStyle = "#111"
          ctx.fillRect(this.x + this.width * 0.2, this.y, this.width * 0.3, this.height * 0.4)
          ctx.fillRect(this.x + this.width * 0.6, this.y, this.width * 0.3, this.height * 0.4)
        }

        // Draw wheels
        ctx.fillStyle = "#333"
        ctx.fillRect(this.x, this.y + this.height * 0.8, this.width * 0.2, this.height * 0.2)
        ctx.fillRect(this.x + this.width * 0.8, this.y + this.height * 0.8, this.width * 0.2, this.height * 0.2)

        // Draw detection box if active
        if (this.detectionOpacity > 0) {
          // Draw bounding box
          ctx.strokeStyle = `rgba(0, 255, 0, ${this.detectionOpacity})`
          ctx.lineWidth = 2
          ctx.strokeRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10)

          // Draw filled box with transparency
          ctx.fillStyle = `rgba(0, 255, 0, ${this.detectionOpacity * 0.2})`
          ctx.fillRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10)

          // Draw label
          ctx.fillStyle = `rgba(255, 255, 255, ${this.detectionOpacity})`
          ctx.font = "12px Arial"
          ctx.fillText(`${this.type} ${Math.round(this.confidence * 100)}%`, this.x, this.y - 10)
        }
      }

      update(deltaTime: number) {
        this.x += this.speed * (deltaTime / 16) // Normalize by expected frame time

        // Reset position when out of bounds
        if (this.speed > 0 && this.x > canvas.width) {
          this.x = -this.width
          this.showDetection = false
          this.detectionOpacity = 0
          this.detectionTimer = 0
          this.confidence = 0.85 + Math.random() * 0.14
        } else if (this.speed < 0 && this.x < -this.width) {
          this.x = canvas.width
          this.showDetection = false
          this.detectionOpacity = 0
          this.detectionTimer = 0
          this.confidence = 0.85 + Math.random() * 0.14
        }

        // Randomly show detection
        if (Math.random() < 0.002 && !this.showDetection && this.detectionTimer === 0) {
          this.showDetection = true
        }

        // Fade in/out detection box
        if (this.showDetection && this.detectionOpacity < 1) {
          this.detectionOpacity += 0.05 * (deltaTime / 16)
        } else if (!this.showDetection && this.detectionOpacity > 0) {
          this.detectionOpacity -= 0.05 * (deltaTime / 16)
        }

        // Handle detection timer
        if (this.showDetection && this.detectionOpacity >= 1) {
          this.detectionTimer += deltaTime
          if (this.detectionTimer >= this.detectionDuration) {
            this.showDetection = false
            this.detectionTimer = 0
          }
        }

        this.draw()
      }
    }

    // Person class with detection
    class Person {
      x: number
      y: number
      size: number
      speed: number
      color: string
      showDetection: boolean
      detectionOpacity: number
      confidence: number
      walkCycle: number
      legAngle: number
      detectionDuration: number
      detectionTimer: number

      constructor(x: number, y: number, size: number, speed: number, color: string) {
        this.x = x
        this.y = y
        this.size = size
        this.speed = speed
        this.color = color
        this.showDetection = false
        this.detectionOpacity = 0
        this.confidence = 0.85 + Math.random() * 0.14 // 85-99% confidence
        this.walkCycle = 0
        this.legAngle = 0
        this.detectionDuration = 2000 + Math.random() * 3000 // 2-5 seconds
        this.detectionTimer = 0
      }

      draw() {
        if (!ctx) return

        // Head
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y - this.size * 0.5, this.size * 0.2, 0, Math.PI * 2)
        ctx.fill()

        // Body
        ctx.fillRect(this.x - this.size * 0.1, this.y - this.size * 0.3, this.size * 0.2, this.size * 0.5)

        // Legs with walking animation
        ctx.save()
        ctx.translate(this.x, this.y + this.size * 0.2)

        // Left leg
        ctx.save()
        ctx.rotate(Math.sin(this.walkCycle) * 0.3)
        ctx.fillRect(-this.size * 0.1, 0, this.size * 0.05, this.size * 0.3)
        ctx.restore()

        // Right leg
        ctx.save()
        ctx.rotate(Math.sin(this.walkCycle + Math.PI) * 0.3)
        ctx.fillRect(this.size * 0.05, 0, this.size * 0.05, this.size * 0.3)
        ctx.restore()

        ctx.restore()

        // Arms with walking animation
        ctx.save()
        ctx.translate(this.x, this.y - this.size * 0.1)

        // Left arm
        ctx.save()
        ctx.rotate(Math.sin(this.walkCycle + Math.PI) * 0.2)
        ctx.fillRect(-this.size * 0.2, -this.size * 0.1, this.size * 0.1, this.size * 0.2)
        ctx.restore()

        // Right arm
        ctx.save()
        ctx.rotate(Math.sin(this.walkCycle) * 0.2)
        ctx.fillRect(this.size * 0.1, -this.size * 0.1, this.size * 0.1, this.size * 0.2)
        ctx.restore()

        ctx.restore()

        // Draw detection box if active
        if (this.detectionOpacity > 0) {
          // Calculate bounding box
          const boxX = this.x - this.size * 0.3
          const boxY = this.y - this.size * 0.7
          const boxWidth = this.size * 0.6
          const boxHeight = this.size * 1.2

          // Draw bounding box
          ctx.strokeStyle = `rgba(255, 0, 0, ${this.detectionOpacity})`
          ctx.lineWidth = 2
          ctx.strokeRect(boxX, boxY, boxWidth, boxHeight)

          // Draw filled box with transparency
          ctx.fillStyle = `rgba(255, 0, 0, ${this.detectionOpacity * 0.2})`
          ctx.fillRect(boxX, boxY, boxWidth, boxHeight)

          // Draw label
          ctx.fillStyle = `rgba(255, 255, 255, ${this.detectionOpacity})`
          ctx.font = "12px Arial"
          ctx.fillText(`person ${Math.round(this.confidence * 100)}%`, boxX, boxY - 5)
        }
      }

      update(deltaTime: number) {
        this.x += this.speed * (deltaTime / 16)

        // Update walk cycle
        this.walkCycle += Math.abs(this.speed) * 0.1 * (deltaTime / 16)

        // Reset position when out of bounds
        if (this.speed > 0 && this.x > canvas.width) {
          this.x = -this.size
          this.showDetection = false
          this.detectionOpacity = 0
          this.detectionTimer = 0
          this.confidence = 0.85 + Math.random() * 0.14
        } else if (this.speed < 0 && this.x < -this.size) {
          this.x = canvas.width
          this.showDetection = false
          this.detectionOpacity = 0
          this.detectionTimer = 0
          this.confidence = 0.85 + Math.random() * 0.14
        }

        // Randomly show detection
        if (Math.random() < 0.002 && !this.showDetection && this.detectionTimer === 0) {
          this.showDetection = true
        }

        // Fade in/out detection box
        if (this.showDetection && this.detectionOpacity < 1) {
          this.detectionOpacity += 0.05 * (deltaTime / 16)
        } else if (!this.showDetection && this.detectionOpacity > 0) {
          this.detectionOpacity -= 0.05 * (deltaTime / 16)
        }

        // Handle detection timer
        if (this.showDetection && this.detectionOpacity >= 1) {
          this.detectionTimer += deltaTime
          if (this.detectionTimer >= this.detectionDuration) {
            this.showDetection = false
            this.detectionTimer = 0
          }
        }

        this.draw()
      }
    }

    // Create vehicles with different lanes
    const lanes = [
      { y: canvas.height * 0.5, direction: 1 }, // Right lane 1
      { y: canvas.height * 0.55, direction: 1 }, // Right lane 2
      { y: canvas.height * 0.7, direction: -1 }, // Left lane 1
      { y: canvas.height * 0.75, direction: -1 }, // Left lane 2
    ]

    const vehicleColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"]
    const vehicleTypes = ["car", "car", "car", "truck", "bus", "motorcycle", "car"]

    const vehicles = []

    // Create 15-20 vehicles distributed across lanes
    const vehicleCount = 15 + Math.floor(Math.random() * 6)

    for (let i = 0; i < vehicleCount; i++) {
      const laneIndex = Math.floor(Math.random() * lanes.length)
      const lane = lanes[laneIndex]
      const colorIndex = Math.floor(Math.random() * vehicleColors.length)

      const vehicleWidth = 60 + Math.floor(Math.random() * 60) // 60-120px
      const vehicleHeight = vehicleWidth * 0.5

      const x =
        lane.direction > 0 ? -vehicleWidth - Math.random() * canvas.width : canvas.width + Math.random() * canvas.width

      const speed = (0.5 + Math.random() * 1.5) * lane.direction // 0.5-2.0 speed multiplier

      vehicles.push(
        new Vehicle(
          x,
          lane.y - vehicleHeight / 2,
          vehicleWidth,
          vehicleHeight,
          speed,
          vehicleColors[colorIndex],
          vehicleTypes[colorIndex % vehicleTypes.length],
          laneIndex,
        ),
      )
    }

    // Create people on sidewalks
    const sidewalks = [
      { y: canvas.height * 0.3, direction: 1 }, // Top sidewalk, right direction
      { y: canvas.height * 0.35, direction: -1 }, // Top sidewalk, left direction
      { y: canvas.height * 0.9, direction: -1 }, // Bottom sidewalk, left direction
      { y: canvas.height * 0.85, direction: 1 }, // Bottom sidewalk, right direction
    ]

    const people = []

    // Create 10-15 people distributed across sidewalks
    const peopleCount = 10 + Math.floor(Math.random() * 6)

    for (let i = 0; i < peopleCount; i++) {
      const sidewalkIndex = Math.floor(Math.random() * sidewalks.length)
      const sidewalk = sidewalks[sidewalkIndex]

      const personSize = 20 + Math.floor(Math.random() * 10) // 20-30px

      const x =
        sidewalk.direction > 0
          ? -personSize - Math.random() * canvas.width
          : canvas.width + Math.random() * canvas.width

      const speed = (0.3 + Math.random() * 0.7) * sidewalk.direction // 0.3-1.0 speed multiplier

      people.push(new Person(x, sidewalk.y, personSize, speed, "#fff"))
    }

    // Draw road
    const drawRoad = () => {
      if (!ctx) return

      // Road background
      ctx.fillStyle = "#111"
      ctx.fillRect(0, canvas.height * 0.4, canvas.width, canvas.height * 0.4)

      // Road lines
      ctx.strokeStyle = "#fff"
      ctx.setLineDash([30, 15])

      // Center line
      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.6)
      ctx.lineTo(canvas.width, canvas.height * 0.6)
      ctx.stroke()

      // Lane dividers
      ctx.setLineDash([10, 10])
      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.5)
      ctx.lineTo(canvas.width, canvas.height * 0.5)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.7)
      ctx.lineTo(canvas.width, canvas.height * 0.7)
      ctx.stroke()

      // Sidewalks
      ctx.fillStyle = "#333"
      ctx.fillRect(0, canvas.height * 0.4 - 10, canvas.width, 10)
      ctx.fillRect(0, canvas.height * 0.8, canvas.width, 10)

      // Sidewalk texture
      ctx.setLineDash([5, 15])
      ctx.strokeStyle = "#444"

      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.3)
      ctx.lineTo(canvas.width, canvas.height * 0.3)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.35)
      ctx.lineTo(canvas.width, canvas.height * 0.35)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.85)
      ctx.lineTo(canvas.width, canvas.height * 0.85)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.9)
      ctx.lineTo(canvas.width, canvas.height * 0.9)
      ctx.stroke()
    }

    // Animation loop with time-based animation
    let lastTime = 0

    const animate = (time: number) => {
      if (!ctx) return

      // Calculate delta time
      const deltaTime = lastTime ? time - lastTime : 0
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.8)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawRoad()

      // Update and draw vehicles
      vehicles.forEach((vehicle) => vehicle.update(deltaTime))

      // Update and draw people
      people.forEach((person) => person.update(deltaTime))

      requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-70" />
}
