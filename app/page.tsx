import Link from "next/link"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import FaqAccordion from "@/components/faq-accordion"
import HeroDetectionAnimation from "@/components/hero-detection-animation"
import CompanyLogos from "@/components/company-logos"
import { SiteFooter } from "@/components/site-footer"
import { Car, Shield, Zap, BarChart, ArrowRight } from "lucide-react"
import VideoShowcase from "@/components/video-showcase"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold">Vehicle Vision AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/documentation" className="text-gray-300 hover:text-white transition-colors">
              Documentation
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
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <HeroDetectionAnimation />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-gray-950/50 to-gray-950/90 z-10"></div>
        <div className="container mx-auto px-4 relative z-20 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
                Advanced Vehicle Detection with YOLOv11x
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                Detect vehicles, humans, and obstacles in real-time with our state-of-the-art AI platform powered by
                YOLOv11x.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/dashboard">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/documentation">Documentation</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
              <div className="perspective-1200 animate-fade-in-up delay-200">
                <div className="relative w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 shadow-2xl transform rotate-x-2 hover:rotate-x-0 transition-transform duration-500">
                  <div className="absolute inset-0.5 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-[10px]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center">
              <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
              </div>
              <span className="text-white/50 text-sm mt-2">Scroll Down</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-gray-400 mb-8">Trusted by leading companies</h2>
          <CompanyLogos />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform offers cutting-edge capabilities for vehicle and object detection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Car className="h-10 w-10" />}
              title="YOLOv11x Detection"
              description="State-of-the-art object detection with the latest YOLOv11x model for unparalleled accuracy."
              gradient="from-blue-900/20 to-blue-800/10"
              borderColor="border-blue-700/30"
              iconBg="bg-blue-900/30"
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10" />}
              title="Real-time Processing"
              description="Process video feeds in real-time with minimal latency for immediate insights."
              gradient="from-green-900/20 to-green-800/10"
              borderColor="border-green-700/30"
              iconBg="bg-green-900/30"
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10" />}
              title="Secure & Private"
              description="Your data stays private with our secure processing and storage systems."
              gradient="from-purple-900/20 to-purple-800/10"
              borderColor="border-purple-700/30"
              iconBg="bg-purple-900/30"
            />
            <FeatureCard
              icon={<BarChart className="h-10 w-10" />}
              title="Advanced Analytics"
              description="Gain valuable insights with comprehensive analytics and reporting tools."
              gradient="from-orange-900/20 to-orange-800/10"
              borderColor="border-orange-700/30"
              iconBg="bg-orange-900/30"
            />
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <VideoShowcase />

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from organizations that have transformed their operations with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Vehicle Vision AI has revolutionized our traffic monitoring system. The accuracy is impressive."
              author="Sarah Johnson"
              role="CTO, Urban Transit Solutions"
              avatarUrl="/placeholder.svg?height=80&width=80"
            />
            <TestimonialCard
              quote="The real-time detection capabilities have significantly improved our security operations."
              author="Michael Chen"
              role="Security Director, Metro Systems"
              avatarUrl="/placeholder.svg?height=80&width=80"
            />
            <TestimonialCard
              quote="Implementing this platform was seamless, and the results exceeded our expectations."
              author="Emma Rodriguez"
              role="Innovation Lead, Smart City Initiative"
              avatarUrl="/placeholder.svg?height=80&width=80"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of organizations using Vehicle Vision AI to transform their operations
          </p>
          <Button size="lg" className="text-lg px-8 py-6 bg-white text-blue-900 hover:bg-gray-200" asChild>
            <Link href="/dashboard">
              Try it Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
