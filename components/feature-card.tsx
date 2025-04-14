"use client"

import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  gradient?: string
  borderColor?: string
  iconBg?: string
}

export default function FeatureCard({
  icon,
  title,
  description,
  gradient = "from-gray-800 to-gray-700",
  borderColor = "border-gray-700",
  iconBg = "bg-gray-700",
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card
        className={`h-full bg-gradient-to-br ${gradient} border ${borderColor} hover:shadow-lg transition-all duration-300`}
      >
        <CardContent className="p-6 h-full">
          <div className={`mb-4 w-14 h-14 rounded-full ${iconBg} flex items-center justify-center`}>{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
