"use client"

import { useEffect, useRef } from "react"

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.7 // 70% of viewport height
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Vehicle class
    class Vehicle {
      x: number
      y: number
      width: number
      height: number
      speed: number
      color: string
      type: string

      constructor(x: number, y: number, width: number, height: number, speed: number, color: string, type: string) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.color = color
        this.type = type
      }

      draw() {
        if (!ctx) return

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
      }

      update() {
        this.x += this.speed
        if (this.speed > 0 && this.x > canvas.width) {
          this.x = -this.width
        } else if (this.speed < 0 && this.x < -this.width) {
          this.x = canvas.width
        }
        this.draw()
      }
    }

    // Person class
    class Person {
      x: number
      y: number
      size: number
      speed: number
      color: string

      constructor(x: number, y: number, size: number, speed: number, color: string) {
        this.x = x
        this.y = y
        this.size = size
        this.speed = speed
        this.color = color
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

        // Legs
        ctx.fillRect(this.x - this.size * 0.1, this.y + this.size * 0.2, this.size * 0.05, this.size * 0.3)
        ctx.fillRect(this.x + this.size * 0.05, this.y + this.size * 0.2, this.size * 0.05, this.size * 0.3)

        // Arms
        ctx.fillRect(this.x - this.size * 0.2, this.y - this.size * 0.2, this.size * 0.1, this.size * 0.2)
        ctx.fillRect(this.x + this.size * 0.1, this.y - this.size * 0.2, this.size * 0.1, this.size * 0.2)
      }

      update() {
        this.x += this.speed
        if (this.speed > 0 && this.x > canvas.width) {
          this.x = -this.size
        } else if (this.speed < 0 && this.x < -this.size) {
          this.x = canvas.width
        }
        this.draw()
      }
    }

    // Create vehicles
    const vehicles = [
      new Vehicle(100, canvas.height * 0.5, 80, 40, 1, "#3b82f6", "car"),
      new Vehicle(300, canvas.height * 0.5, 100, 50, 1.5, "#10b981", "car"),
      new Vehicle(600, canvas.height * 0.5, 120, 60, 0.8, "#f59e0b", "car"),
      new Vehicle(900, canvas.height * 0.5, 150, 70, 1.2, "#ef4444", "car"),
      new Vehicle(200, canvas.height * 0.7, 80, 40, -1, "#8b5cf6", "car"),
      new Vehicle(500, canvas.height * 0.7, 100, 50, -1.3, "#ec4899", "car"),
      new Vehicle(800, canvas.height * 0.7, 120, 60, -0.9, "#06b6d4", "car"),
    ]

    // Create people
    const people = [
      new Person(150, canvas.height * 0.3, 30, 0.5, "#fff"),
      new Person(350, canvas.height * 0.3, 30, 0.7, "#fff"),
      new Person(550, canvas.height * 0.3, 30, 0.4, "#fff"),
      new Person(750, canvas.height * 0.3, 30, 0.6, "#fff"),
      new Person(250, canvas.height * 0.9, 30, -0.5, "#fff"),
      new Person(450, canvas.height * 0.9, 30, -0.6, "#fff"),
      new Person(650, canvas.height * 0.9, 30, -0.4, "#fff"),
    ]

    // Draw road
    const drawRoad = () => {
      if (!ctx) return

      // Road background
      ctx.fillStyle = "#111"
      ctx.fillRect(0, canvas.height * 0.4, canvas.width, canvas.height * 0.4)

      // Road lines
      ctx.strokeStyle = "#fff"
      ctx.setLineDash([30, 15])
      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.6)
      ctx.lineTo(canvas.width, canvas.height * 0.6)
      ctx.stroke()

      // Sidewalks
      ctx.fillStyle = "#333"
      ctx.fillRect(0, canvas.height * 0.4 - 10, canvas.width, 10)
      ctx.fillRect(0, canvas.height * 0.8, canvas.width, 10)
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.8)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawRoad()

      // Update and draw vehicles
      vehicles.forEach((vehicle) => vehicle.update())

      // Update and draw people
      people.forEach((person) => person.update())

      // Add detection boxes occasionally
      if (Math.random() < 0.02) {
        const randomIndex = Math.floor(Math.random() * vehicles.length)
        const vehicle = vehicles[randomIndex]

        ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"
        ctx.lineWidth = 2
        ctx.strokeRect(vehicle.x - 5, vehicle.y - 5, vehicle.width + 10, vehicle.height + 10)

        ctx.fillStyle = "rgba(0, 0, 255, 0.2)"
        ctx.fillRect(vehicle.x - 5, vehicle.y - 5, vehicle.width + 10, vehicle.height + 10)

        ctx.fillStyle = "white"
        ctx.font = "12px Arial"
        ctx.fillText("Vehicle 98%", vehicle.x, vehicle.y - 10)
      }

      if (Math.random() < 0.01) {
        const randomIndex = Math.floor(Math.random() * people.length)
        const person = people[randomIndex]

        ctx.strokeStyle = "rgba(0, 255, 0, 0.5)"
        ctx.lineWidth = 2
        ctx.strokeRect(person.x - person.size * 0.3, person.y - person.size * 0.7, person.size * 0.6, person.size * 1.2)

        ctx.fillStyle = "rgba(0, 255, 0, 0.2)"
        ctx.fillRect(person.x - person.size * 0.3, person.y - person.size * 0.7, person.size * 0.6, person.size * 1.2)

        ctx.fillStyle = "white"
        ctx.font = "12px Arial"
        ctx.fillText("Person 95%", person.x - person.size * 0.3, person.y - person.size * 0.8)
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-60" />
}
