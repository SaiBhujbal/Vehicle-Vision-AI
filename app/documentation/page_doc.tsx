"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, ArrowLeft, FileText, Code, Server, Shield, Settings, ExternalLink, Play } from "lucide-react"
import { DocsSidebar } from "@/components/docs-sidebar"
import { SiteFooter } from "@/components/site-footer"

export default function DocumentationPage() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState("getting-started")

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
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

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DocsSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Main content */}
        <div className="flex-1 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            {activeSection === "getting-started" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
                  <p className="text-gray-400 text-lg mb-6">
                    Welcome to Vehicle Vision AI documentation. Learn how to set up and use our platform for vehicle and
                    pedestrian detection.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800/50 border-gray-700 p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-blue-400" />
                      Quick Start Guide
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Get up and running with Vehicle Vision AI in just a few minutes.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-gray-600"
                      onClick={() => setActiveSection("quick-start")}
                    >
                      Read Guide
                    </Button>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700 p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <Code className="mr-2 h-5 w-5 text-green-400" />
                      API Reference
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Comprehensive API documentation for developers integrating with our platform.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-gray-600"
                      onClick={() => setActiveSection("api-reference")}
                    >
                      View API Docs
                    </Button>
                  </Card>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Key Features</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                      <div className="text-blue-400 font-bold mb-2 flex items-center">
                        <Car className="mr-2 h-5 w-5" />
                        YOLOv11x Detection
                      </div>
                      <p className="text-gray-300">
                        State-of-the-art object detection with the latest YOLOv11x model for unparalleled accuracy.
                      </p>
                    </div>

                    <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                      <div className="text-green-400 font-bold mb-2 flex items-center">
                        <Server className="mr-2 h-5 w-5" />
                        Real-time Processing
                      </div>
                      <p className="text-gray-300">
                        Process video feeds in real-time with minimal latency for immediate insights.
                      </p>
                    </div>

                    <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                      <div className="text-purple-400 font-bold mb-2 flex items-center">
                        <Shield className="mr-2 h-5 w-5" />
                        Secure & Private
                      </div>
                      <p className="text-gray-300">
                        Your data stays private with our secure processing and storage systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-blue-300">For Web Interface</h3>
                      <ul className="list-disc list-inside text-gray-300 ml-4 mt-2 space-y-1">
                        <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                        <li>Stable internet connection</li>
                        <li>Minimum screen resolution: 1280 x 720</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-blue-300">For API Usage</h3>
                      <ul className="list-disc list-inside text-gray-300 ml-4 mt-2 space-y-1">
                        <li>API key (available in your dashboard)</li>
                        <li>HTTPS support</li>
                        <li>JSON parsing capabilities</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-blue-300">For Local Processing</h3>
                      <ul className="list-disc list-inside text-gray-300 ml-4 mt-2 space-y-1">
                        <li>CUDA-compatible GPU (recommended)</li>
                        <li>8GB+ RAM</li>
                        <li>Python 3.8 or higher</li>
                        <li>PyTorch 2.0+</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "quick-start" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-4">Quick Start Guide</h1>
                  <p className="text-gray-400 text-lg mb-6">
                    Get up and running with Vehicle Vision AI in just a few minutes.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                    <h2 className="text-2xl font-semibold mb-4">Step 1: Create an Account</h2>
                    <p className="text-gray-300 mb-4">
                      Sign up for a Vehicle Vision AI account to access all features and services.
                    </p>
                    <ol className="list-decimal list-inside text-gray-300 ml-4 space-y-2">
                      <li>
                        Visit the{" "}
                        <Link href="/" className="text-blue-400 hover:underline">
                          Vehicle Vision AI homepage
                        </Link>
                      </li>
                      <li>Click on "Get Started" or "Sign Up"</li>
                      <li>Fill in your details and create your account</li>
                      <li>Verify your email address</li>
                    </ol>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                    <h2 className="text-2xl font-semibold mb-4">Step 2: Upload a Video</h2>
                    <p className="text-gray-300 mb-4">Upload a video to analyze with our YOLOv11x detection model.</p>
                    <ol className="list-decimal list-inside text-gray-300 ml-4 space-y-2">
                      <li>
                        Navigate to the{" "}
                        <Link href="/dashboard" className="text-blue-400 hover:underline">
                          Dashboard
                        </Link>
                      </li>
                      <li>Click on "Upload Video" or drag and drop your video file</li>
                      <li>Wait for the upload to complete</li>
                      <li>Click "Start Analysis" to begin processing</li>
                    </ol>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                    <h2 className="text-2xl font-semibold mb-4">Step 3: View Results</h2>
                    <p className="text-gray-300 mb-4">Explore the detection results and analytics for your video.</p>
                    <ol className="list-decimal list-inside text-gray-300 ml-4 space-y-2">
                      <li>Once processing is complete, view the detection results in real-time</li>
                      <li>Switch to the "Analytics" tab to see detailed statistics</li>
                      <li>Use the "AI Assistant" tab to ask questions about your results</li>
                      <li>Download or share your results as needed</li>
                    </ol>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                    <h2 className="text-2xl font-semibold mb-4">Step 4: Customize Detection</h2>
                    <p className="text-gray-300 mb-4">Customize the detection settings to suit your specific needs.</p>
                    <ol className="list-decimal list-inside text-gray-300 ml-4 space-y-2">
                      <li>Navigate to the "Models" section in your dashboard</li>
                      <li>Upload a custom YOLOv11x model or select from available models</li>
                      <li>Adjust confidence thresholds and detection parameters</li>
                      <li>Save your settings for future use</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-700/30">
                  <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
                  <p className="text-gray-300 mb-4">
                    Now that you're up and running, explore these additional resources:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="border-gray-600 justify-start"
                      onClick={() => setActiveSection("api-reference")}
                    >
                      <Code className="mr-2 h-5 w-5" />
                      API Reference
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-600 justify-start"
                      onClick={() => setActiveSection("models")}
                    >
                      <Settings className="mr-2 h-5 w-5" />
                      Custom Models
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-600 justify-start"
                      onClick={() => setActiveSection("tutorials")}
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Tutorials
                    </Button>
                    <Button variant="outline" className="border-gray-600 justify-start" asChild>
                      <Link href="/contact">
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Contact Support
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "api-reference" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-4">API Reference</h1>
                  <p className="text-gray-400 text-lg mb-6">
                    Comprehensive documentation for the Vehicle Vision AI API.
                  </p>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="bg-gray-800/50 p-1 backdrop-blur-sm">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="authentication" className="data-[state=active]:bg-blue-600">
                      Authentication
                    </TabsTrigger>
                    <TabsTrigger value="endpoints" className="data-[state=active]:bg-blue-600">
                      Endpoints
                    </TabsTrigger>
                    <TabsTrigger value="examples" className="data-[state=active]:bg-blue-600">
                      Examples
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-6">
                      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                        <h2 className="text-2xl font-semibold mb-4">API Overview</h2>
                        <p className="text-gray-300 mb-4">
                          The Vehicle Vision AI API allows you to integrate our powerful object detection capabilities
                          into your own applications.
                        </p>
                        <p className="text-gray-300 mb-4">
                          Our RESTful API provides endpoints for uploading videos, processing frames, retrieving
                          detection results, and managing custom models.
                        </p>
                        <h3 className="text-xl font-medium mt-6 mb-3">Base URL</h3>
                        <div className="bg-gray-900 p-3 rounded-md font-mono text-sm">
                          https://api.vehiclevisionai.com/v1
                        </div>
                      </div>

                      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                        <h2 className="text-2xl font-semibold mb-4">Rate Limits</h2>
                        <p className="text-gray-300 mb-4">API rate limits vary by subscription plan:</p>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-700/50">
                                <th className="border border-gray-600 px-4 py-2 text-left">Plan</th>
                                <th className="border border-gray-600 px-4 py-2 text-left">Requests per minute</th>
                                <th className="border border-gray-600 px-4 py-2 text-left">Requests per day</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-gray-600 px-4 py-2">Starter</td>
                                <td className="border border-gray-600 px-4 py-2">60</td>
                                <td className="border border-gray-600 px-4 py-2">10,000</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-600 px-4 py-2">Professional</td>
                                <td className="border border-gray-600 px-4 py-2">300</td>
                                <td className="border border-gray-600 px-4 py-2">50,000</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-600 px-4 py-2">Enterprise</td>
                                <td className="border border-gray-600 px-4 py-2">1,000</td>
                                <td className="border border-gray-600 px-4 py-2">Unlimited</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="authentication" className="mt-6">
                    <div className="space-y-6">
                      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                        <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
                        <p className="text-gray-300 mb-4">
                          Vehicle Vision AI uses API keys to authenticate requests. You can view and manage your API
                          keys in your dashboard.
                        </p>
                        <p className="text-gray-300 mb-4">
                          Your API keys carry many privileges, so be sure to keep them secure. Do not share your API
                          keys in publicly accessible areas such as GitHub, client-side code, etc.
                        </p>
                        <h3 className="text-xl font-medium mt-6 mb-3">Authentication Header</h3>
                        <p className="text-gray-300 mb-4">
                          All API requests must include your API key in the Authorization header:
                        </p>
                        <div className="bg-gray-900 p-3 rounded-md font-mono text-sm">
                          Authorization: Bearer YOUR_API_KEY
                        </div>
                      </div>

                      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                        <h2 className="text-2xl font-semibold mb-4">Example Request with Authentication</h2>
                        <div className="bg-gray-900 p-3 rounded-md font-mono text-sm">
                          <pre>{`curl -X GET \\
  https://api.vehiclevisionai.com/v1/detection/history \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</pre>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="endpoints" className="mt-6">
                    <div className="space-y-6">
                      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                        <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-medium mb-3">Detection</h3>
                            <div className="space-y-4">
                              <div>
                                <div className="flex items-center">
                                  <span className="bg-green-700 text-white px-2 py-1 rounded-md text-xs mr-2">
                                    POST
                                  </span>
                                  <code className="font-mono text-sm">/detection</code>
                                </div>
                                <p className="text-gray-300 mt-1 ml-14">
                                  Upload and process a video for object detection
                                </p>
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <span className="bg-blue-700 text-white px-2 py-1 rounded-md text-xs mr-2">GET</span>
                                  <code className="font-mono text-sm">/detection/{"{id}"}</code>
                                </div>
                                <p className="text-gray-300 mt-1 ml-14">Get detection results for a specific video</p>
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <span className="bg-blue-700 text-white px-2 py-1 rounded-md text-xs mr-2">GET</span>
                                  <code className="font-mono text-sm">/detection/history</code>
                                </div>
                                <p className="text-gray-300 mt-1 ml-14">Get detection history</p>
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <span className="bg-red-700 text-white px-2 py-1 rounded-md text-xs mr-2">
                                    DELETE
                                  </span>
                                  <code className="font-mono text-sm">/detection/{"{id}"}</code>
                                </div>
                                <p className="text-gray-300 mt-1 ml-14">Delete a detection</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl font-medium mb-3">Models</h3>
                            <div className="space-y-4">
                              <div>
                                <div className="flex items-center">
                                  <span className="bg-green-700 text-white px-2 py-1 rounded-md text-xs mr-2">
                                    POST
                                  </span>
                                  <code className="font-mono text-sm">/model/upload</code>
                                </div>
                                <p className="text-gray-300 mt-1 ml-14">Upload a custom YOLOv11x model</p>
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <span className="bg-blue-700 text-white px-2 py-1 rounded-md text-xs mr-2">GET</span>
                                  <code className="font-mono text-sm">/model/list</code>
                                </div>
                                <p className="text-gray-300 mt-1 ml-14">List all available models</p>
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <span className="bg-green-700 text-white px-2 py-1 rounded-md text-xs mr-2">
                                    POST
                                  </span>
                                  <code className="font-mono text-sm">/model/set-active</code>
                                </div>
                                <p className="text-gray-300 mt-1 ml-14">Set a model as active</p>
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <span className="bg-red-700 text-white px-2 py-1 rounded-md text-xs mr-2">POST</span>
                                  <code className="font-mono text-sm">/model/delete</code>
                                </div>
                                <p className="text-gray-300 mt-1 ml-14">Delete a model</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl font-medium mb-3">Videos</h3>
                            <div className="space-y-4">
                              <div>
                                <div className="flex items-center">
                                  <span className="bg-blue-700 text-white px-2 py-1 rounded-md text-xs mr-2">GET</span>
                                  <code className="font-mono text-sm">/video/{"{id}"}</code>
                                </div>
                                <p className="text-gray-300 mt-1 ml-14">Get a processed video</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="examples" className="mt-6">
                    <div className="space-y-6">
                      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                        <h2 className="text-2xl font-semibold mb-4">Example: Upload and Process a Video</h2>
                        <div className="bg-gray-900 p-3 rounded-md font-mono text-sm">
                          <pre>{`curl -X POST \\
  https://api.vehiclevisionai.com/v1/detection \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "video=@/path/to/your/video.mp4"`}</pre>
                        </div>
                        <h3 className="text-xl font-medium mt-6 mb-3">Response</h3>
                        <div className="bg-gray-900 p-3 rounded-md font-mono text-sm">
                          <pre>{`{
  "success": true,
  "videoId": "abc123xyz",
  "frameCount": 150,
  "message": "Video processed successfully"
}`}</pre>
                        </div>
                      </div>

                      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                        <h2 className="text-2xl font-semibold mb-4">Example: Get Detection Results</h2>
                        <div className="bg-gray-900 p-3 rounded-md font-mono text-sm">
                          <pre>{`curl -X GET \\
  https://api.vehiclevisionai.com/v1/detection/abc123xyz \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</pre>
                        </div>
                        <h3 className="text-xl font-medium mt-6 mb-3">Response</h3>
                        <div className="bg-gray-900 p-3 rounded-md font-mono text-sm">
                          <pre>{`{
  "id": "abc123xyz",
  "metadata": {
    "originalName": "traffic.mp4",
    "processedPath": "/path/to/processed/video.mp4",
    "uploadedAt": "2023-06-15T10:30:00Z",
    "size": 15728640,
    "frameCount": 150,
    "modelUsed": "yolov11n.pt"
  },
  "stats": {
    "totalFrames": 150,
    "totalObjects": 523,
    "vehicleCount": 342,
    "personCount": 181,
    "processedAt": "2023-06-15T10:35:00Z"
  },
  "results": [
    {
      "id": "frame001",
      "timestamp": "2023-06-15T10:30:01Z",
      "videoId": "abc123xyz",
      "frameNumber": 0,
      "objects": [
        {
          "type": "car",
          "confidence": 0.95,
          "boundingBox": {
            "x": 100,
            "y": 150,
            "width": 200,
            "height": 100
          }
        },
        {
          "type": "person",
          "confidence": 0.87,
          "boundingBox": {
            "x": 300,
            "y": 200,
            "width": 50,
            "height": 100
          }
        }
      ]
    }
    // Additional frames...
  ],
  "processedVideoUrl": "/api/video/abc123xyz"
}`}</pre>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeSection === "models" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-4">Custom Models</h1>
                  <p className="text-gray-400 text-lg mb-6">
                    Learn how to use and customize YOLOv11x models for your specific detection needs.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                    <h2 className="text-2xl font-semibold mb-4">Using Pre-trained Models</h2>
                    <p className="text-gray-300 mb-4">
                      Vehicle Vision AI comes with several pre-trained YOLOv11x models optimized for different
                      scenarios:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-700/50">
                            <th className="border border-gray-600 px-4 py-2 text-left">Model</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Size</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Best For</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">YOLOv11n</td>
                            <td className="border border-gray-600 px-4 py-2">7.8 MB</td>
                            <td className="border border-gray-600 px-4 py-2">Nano model, fastest inference</td>
                            <td className="border border-gray-600 px-4 py-2">Mobile devices, edge computing</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">YOLOv11s</td>
                            <td className="border border-gray-600 px-4 py-2">24.2 MB</td>
                            <td className="border border-gray-600 px-4 py-2">Small model, good balance</td>
                            <td className="border border-gray-600 px-4 py-2">General purpose detection</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">YOLOv11m</td>
                            <td className="border border-gray-600 px-4 py-2">86.5 MB</td>
                            <td className="border border-gray-600 px-4 py-2">Medium model, high accuracy</td>
                            <td className="border border-gray-600 px-4 py-2">Professional applications</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">YOLOv11l</td>
                            <td className="border border-gray-600 px-4 py-2">195.3 MB</td>
                            <td className="border border-gray-600 px-4 py-2">Large model, highest accuracy</td>
                            <td className="border border-gray-600 px-4 py-2">Critical detection scenarios</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                    <h2 className="text-2xl font-semibold mb-4">Uploading Custom Models</h2>
                    <p className="text-gray-300 mb-4">
                      You can upload your own custom YOLOv11x models trained on specific datasets:
                    </p>
                    <ol className="list-decimal list-inside text-gray-300 ml-4 space-y-2">
                      <li>Navigate to the "Models" section in your dashboard</li>
                      <li>Click on "Upload Model" or drag and drop your .pt file</li>
                      <li>Provide a name and description for your model</li>
                      <li>Click "Upload" to complete the process</li>
                    </ol>
                    <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mt-4">
                      <p className="text-blue-300 font-medium">Note:</p>
                      <p className="text-gray-300">
                        Only PyTorch (.pt) model files are supported. Maximum file size is 500MB.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                    <h2 className="text-2xl font-semibold mb-4">Training Custom Models</h2>
                    <p className="text-gray-300 mb-4">
                      For advanced users, we provide tools to train custom YOLOv11x models on your own datasets:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-medium mb-2">1. Prepare Your Dataset</h3>
                        <p className="text-gray-300">
                          Organize your dataset in the YOLO format with images and corresponding label files.
                        </p>
                        <div className="bg-gray-900 p-3 rounded-md font-mono text-sm mt-2">
                          <pre>{`dataset/
├── images/
│   ├── train/
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── ...
│   └── val/
│       ├── image1.jpg
│       ├── image2.jpg
│       └── ...
└── labels/
    ├── train/
    │   ├── image1.txt
    │   ├── image2.txt
    │   └── ...
    └── val/
        ├── image1.txt
        ├── image2.txt
        └── ...`}</pre>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-2">2. Create a YAML Configuration</h3>
                        <p className="text-gray-300">Define your dataset configuration in a YAML file.</p>
                        <div className="bg-gray-900 p-3 rounded-md font-mono text-sm mt-2">
                          <pre>{`# dataset.yaml
path: /path/to/dataset
train: images/train
val: images/val

# Classes
names:
  0: car
  1: truck
  2: bus
  3: motorcycle
  4: bicycle
  5: person`}</pre>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-2">3. Train Your Model</h3>
                        <p className="text-gray-300">
                          Use our training script or the Ultralytics YOLOv11 framework to train your model.
                        </p>
                        <div className="bg-gray-900 p-3 rounded-md font-mono text-sm mt-2">
                          <pre>{`# Using our CLI tool
vehiclevision train --data dataset.yaml --model yolov11n.pt --epochs 100 --batch-size 16

# Or using Ultralytics directly
python -c "from ultralytics import YOLO; YOLO('yolov11n.pt').train(data='dataset.yaml', epochs=100, batch=16)"`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "tutorials" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-4">Tutorials</h1>
                  <p className="text-gray-400 text-lg mb-6">
                    Step-by-step guides to help you get the most out of Vehicle Vision AI.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800/50 border-gray-700 p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-blue-400" />
                      Traffic Monitoring Setup
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Learn how to set up a complete traffic monitoring system with Vehicle Vision AI.
                    </p>
                    <Button variant="outline" className="w-full border-gray-600">
                      View Tutorial
                    </Button>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700 p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <Code className="mr-2 h-5 w-5 text-green-400" />
                      API Integration Guide
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Step-by-step guide to integrating our API into your applications.
                    </p>
                    <Button variant="outline" className="w-full border-gray-600">
                      View Tutorial
                    </Button>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700 p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <Settings className="mr-2 h-5 w-5 text-purple-400" />
                      Custom Model Training
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Learn how to train and deploy custom YOLOv11x models for specific use cases.
                    </p>
                    <Button variant="outline" className="w-full border-gray-600">
                      View Tutorial
                    </Button>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700 p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <Server className="mr-2 h-5 w-5 text-orange-400" />
                      Edge Deployment
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Deploy Vehicle Vision AI on edge devices for real-time processing.
                    </p>
                    <Button variant="outline" className="w-full border-gray-600">
                      View Tutorial
                    </Button>
                  </Card>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                  <h2 className="text-2xl font-semibold mb-4">Video Tutorials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-3">
                        <Play className="h-12 w-12 text-gray-600" />
                      </div>
                      <h3 className="font-medium">Getting Started with Vehicle Vision AI</h3>
                      <p className="text-gray-400 text-sm mt-1">10:25 • Basic introduction to the platform</p>
                    </div>
                    <div>
                      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-3">
                        <Play className="h-12 w-12 text-gray-600" />
                      </div>
                      <h3 className="font-medium">Advanced Analytics Dashboard</h3>
                      <p className="text-gray-400 text-sm mt-1">15:40 • Deep dive into analytics features</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
