"use client"
import Link from "next/link"
import { FileText, Code, Settings, BookOpen, Server, Shield, HelpCircle, ChevronRight, Home } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface DocsSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function DocsSidebar({ activeSection, setActiveSection }: DocsSidebarProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar className="border-r border-gray-800">
        <SidebarHeader className="border-b border-gray-800">
          <div className="p-2">
            <Link href="/" className="flex items-center gap-2 px-2 py-1.5">
              <Home className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Vehicle Vision AI</span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeSection === "getting-started"}
                onClick={() => setActiveSection("getting-started")}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                <span>Getting Started</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeSection === "quick-start"}
                onClick={() => setActiveSection("quick-start")}
              >
                <FileText className="h-5 w-5 mr-2" />
                <span>Quick Start Guide</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeSection === "api-reference"}
                onClick={() => setActiveSection("api-reference")}
              >
                <Code className="h-5 w-5 mr-2" />
                <span>API Reference</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === "models"} onClick={() => setActiveSection("models")}>
                <Settings className="h-5 w-5 mr-2" />
                <span>Custom Models</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === "tutorials"} onClick={() => setActiveSection("tutorials")}>
                <FileText className="h-5 w-5 mr-2" />
                <span>Tutorials</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeSection === "deployment"}
                onClick={() => setActiveSection("deployment")}
              >
                <Server className="h-5 w-5 mr-2" />
                <span>Deployment</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === "security"} onClick={() => setActiveSection("security")}>
                <Shield className="h-5 w-5 mr-2" />
                <span>Security</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === "faq"} onClick={() => setActiveSection("faq")}>
                <HelpCircle className="h-5 w-5 mr-2" />
                <span>FAQ</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-gray-800">
          <div className="p-4">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
            >
              <span>Contact Support</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
