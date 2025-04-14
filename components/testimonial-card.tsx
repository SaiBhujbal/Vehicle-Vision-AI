"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatarSrc?: string
  rating?: number
}

export default function TestimonialCard({ quote, author, role, avatarSrc, rating = 5 }: TestimonialCardProps) {
  return (
    <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 h-full hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <Quote className="h-6 w-6 text-blue-500" />
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-600"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="mb-6 text-gray-300 italic">{quote}</p>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3 border border-gray-600">
              <AvatarFallback className="bg-blue-900">{author.charAt(0)}</AvatarFallback>
              {avatarSrc && <AvatarImage src={avatarSrc} alt={author} />}
            </Avatar>
            <div>
              <p className="font-semibold">{author}</p>
              <p className="text-sm text-gray-400">{role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
