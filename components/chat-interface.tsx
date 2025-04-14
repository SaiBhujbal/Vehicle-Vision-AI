"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Bot, User, Loader2, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface ChatInterfaceProps {
  detectionResults?: any[]
}

export default function ChatInterface({ detectionResults }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Vehicle Vision AI assistant. I can help answer questions about your video analysis, detection results, or provide information about vehicles and traffic analysis. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [includeDetections, setIncludeDetections] = useState(true)
  const [apiKeyError, setApiKeyError] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
          includeDetections: includeDetections && detectionResults && detectionResults.length > 0,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      setSessionId(data.sessionId)

      // Check if the response contains an API key error message
      if (data.response && data.response.includes("GEMINI_API_KEY environment variable is not set")) {
        setApiKeyError(true)
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      })

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Chat with AI Assistant</h3>
        <div className="flex items-center space-x-2">
          <Switch id="include-detections" checked={includeDetections} onCheckedChange={setIncludeDetections} />
          <Label htmlFor="include-detections" className="text-sm text-gray-400">
            Include detection context
          </Label>
        </div>
      </div>

      {apiKeyError && (
        <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3 mb-4 flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-200">
            <p className="font-medium mb-1">API Key Missing</p>
            <p>
              The GEMINI_API_KEY environment variable is not set. Please add this environment variable to use the AI
              assistant.
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
            <div
              className={`flex max-w-[80%] ${
                message.role === "assistant" ? "bg-gray-700/50 text-white" : "bg-blue-600/50 text-white"
              } rounded-lg px-4 py-2`}
            >
              <div className="mr-2 mt-1">
                {message.role === "assistant" ? (
                  <Bot className="h-5 w-5 text-blue-400" />
                ) : (
                  <User className="h-5 w-5 text-blue-300" />
                )}
              </div>
              <div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] bg-gray-700/50 text-white rounded-lg px-4 py-2">
              <div className="mr-2 mt-1">
                <Bot className="h-5 w-5 text-blue-400" />
              </div>
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about your video analysis..."
          className="min-h-[60px] bg-gray-700/50 border-gray-600 resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 transition-all"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  )
}
