"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, BarChart2, Settings, History, FileVideo, Menu, X } from "lucide-react"
import { useState } from "react"

export default function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <FileVideo className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-xl">VehicleVision AI</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="text-gray-400 hover:text-white">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard" className="text-gray-400 hover:text-white">
              <BarChart2 className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/history" className="text-gray-400 hover:text-white">
              <History className="h-4 w-4 mr-2" />
              History
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/models" className="text-gray-400 hover:text-white">
              <FileVideo className="h-4 w-4 mr-2" />
              Models
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/settings" className="text-gray-400 hover:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
          <Button variant="default" size="sm" className="ml-2">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-b border-gray-700">
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/" className="text-gray-400 hover:text-white">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/dashboard" className="text-gray-400 hover:text-white">
                <BarChart2 className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/history" className="text-gray-400 hover:text-white">
                <History className="h-4 w-4 mr-2" />
                History
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/models" className="text-gray-400 hover:text-white">
                <FileVideo className="h-4 w-4 mr-2" />
                Models
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/settings" className="text-gray-400 hover:text-white">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
            <Button variant="default" size="sm" className="justify-start">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
