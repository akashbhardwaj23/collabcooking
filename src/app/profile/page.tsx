"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Heart, ChefHat, Home, Settings, Download } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header exactly as in screenshot */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-lg">🔥</span>
          </div>
          <h1 className="text-2xl font-bold text-orange-500">My account</h1>
        </div>

        {/* Profile Card exactly as in screenshot */}
        <Card className="bg-white rounded-2xl shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <img src="/images/naruto-avatar.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Naruto Uzumaki</h2>
              <p className="text-gray-500 text-sm">naruto.uzumaki@gmail.com</p>
            </div>
          </CardContent>
        </Card>

        {/* Edit Account exactly as in screenshot */}
        <Link href="/profile/edit">
          <Card className="bg-white rounded-2xl shadow-sm mb-6 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Edit Account Information</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Subscription section exactly as in screenshot */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700">Subscription model</span>
          <span className="text-green-600 font-medium">FREE</span>
        </div>

        <Link href="/subscription">
          <Button className="w-full h-12 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-medium mb-6">
            Subscribe Now
          </Button>
        </Link>

        {/* Menu items exactly as in screenshot */}
        <Link href="/notifications">
          <Card className="bg-white rounded-2xl shadow-sm mb-4 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Notification</span>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/about">
          <Card className="bg-white rounded-2xl shadow-sm mb-4 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">About us</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/terms">
          <Card className="bg-white rounded-2xl shadow-sm mb-6 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Terms and Conditions</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Logout button exactly as in screenshot */}
        <Button
          variant="outline"
          className="w-full h-12 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-xl font-medium"
        >
          Log out
        </Button>
      </div>

      {/* Sidebar Navigation exactly as in screenshot */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
        <div className="flex flex-col items-center space-y-6 py-4">
          <Link href="/">
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
              <Home className="h-5 w-5 text-gray-500" />
            </div>
          </Link>
          <Link href="/generator">
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
              <ChefHat className="h-5 w-5 text-gray-500" />
            </div>
          </Link>
          <Link href="/favourites">
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
              <Heart className="h-5 w-5 text-gray-500" />
            </div>
          </Link>
          <Link href="/my-recipes">
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
              <Download className="h-5 w-5 text-gray-500" />
            </div>
          </Link>
          <Link href="/profile">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500">
              <Settings className="h-5 w-5 text-white" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
