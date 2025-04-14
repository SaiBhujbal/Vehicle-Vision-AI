"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, Shield, Eye, Save } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // General settings
  const [username, setUsername] = useState("user123")
  const [email, setEmail] = useState("user@example.com")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [detectionAlerts, setDetectionAlerts] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(false)

  // Privacy settings
  const [saveHistory, setSaveHistory] = useState(true)
  const [shareAnalytics, setShareAnalytics] = useState(false)

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <DashboardHeader />

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400 mb-8">Manage your account and application preferences</p>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-8 bg-gray-800/50 p-1 backdrop-blur-sm">
            <TabsTrigger value="general" className="data-[state=active]:bg-blue-600">
              <Settings className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-600">
              <Shield className="mr-2 h-4 w-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription className="text-gray-400">Manage your basic account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-gray-700/50 border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-700/50 border-gray-600"
                    />
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-700/50 border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-700/50 border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-700/50 border-gray-600"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveSettings}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-400">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="detection-alerts">Detection Alerts</Label>
                      <p className="text-sm text-gray-400">Get notified when new detections are processed</p>
                    </div>
                    <Switch id="detection-alerts" checked={detectionAlerts} onCheckedChange={setDetectionAlerts} />
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-reports">Weekly Reports</Label>
                      <p className="text-sm text-gray-400">Receive weekly summary of your detection activities</p>
                    </div>
                    <Switch id="weekly-reports" checked={weeklyReports} onCheckedChange={setWeeklyReports} />
                  </div>
                </div>

                <Button
                  onClick={handleSaveSettings}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription className="text-gray-400">Control your data and privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="save-history">Save Detection History</Label>
                      <p className="text-sm text-gray-400">Store your detection results for future reference</p>
                    </div>
                    <Switch id="save-history" checked={saveHistory} onCheckedChange={setSaveHistory} />
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="share-analytics">Share Anonymous Analytics</Label>
                      <p className="text-sm text-gray-400">Help improve our detection models with anonymous data</p>
                    </div>
                    <Switch id="share-analytics" checked={shareAnalytics} onCheckedChange={setShareAnalytics} />
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-2">
                    <Label>Data Retention</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                        30 Days
                      </Button>
                      <Button variant="outline" className="border-blue-600 bg-blue-600/20 hover:bg-blue-600/30">
                        90 Days
                      </Button>
                      <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                        1 Year
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSaveSettings}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>

                <div className="pt-4">
                  <Button
                    variant="destructive"
                    className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Request Data Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
