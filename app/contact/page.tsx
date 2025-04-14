"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteFooter } from "@/components/site-footer"
import { Car, Mail, Phone, MapPin, Send, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold">Vehicle Vision AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/documentation" className="text-gray-300 hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Card className="border-gray-800 bg-gray-900/50 h-full">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>
                    Fill out the form and our team will get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-gray-400 mb-6">Thank you for reaching out. We'll get back to you shortly.</p>
                      <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="How can we help you?"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Please provide details about your inquiry..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          className="min-h-[120px] bg-gray-800 border-gray-700"
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>Sending...</>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-400">support@vehiclevisionai.com</p>
                      <p className="text-gray-400">info@vehiclevisionai.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                      <p className="text-gray-400">+1 (555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Office</h3>
                      <p className="text-gray-400">
                        123 AI Boulevard, Suite 456
                        <br />
                        San Francisco, CA 94105
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM (PST)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saturday:</span>
                    <span>10:00 AM - 4:00 PM (PST)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Need immediate assistance?</h3>
                <p className="text-gray-300 mb-4">
                  Our support team is available for urgent inquiries via live chat during business hours.
                </p>
                <Button variant="outline" className="bg-transparent border-white/20 hover:bg-white/10">
                  Start Live Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="rounded-lg overflow-hidden h-[400px] bg-gray-800 flex items-center justify-center">
            <p className="text-gray-400">Interactive map would be displayed here</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
