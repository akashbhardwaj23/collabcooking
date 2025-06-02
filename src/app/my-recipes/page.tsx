"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Plus } from "lucide-react"
import Link from "next/link"

export default function MyRecipesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 px-4 py-4">
      {/* Header exactly as in screenshot */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-sm">🔥</span>
          </div>
          <h1 className="text-base font-medium text-orange-500">My recipes</h1>
        </div>

        <Link href="/create-recipe">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Create Recipe
          </Button>
        </Link>
      </div>

      {/* Recipe cards exactly as in screenshot */}
      <div className="space-y-4">
        <Card className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <Link href="/recipe/1">
            <div className="relative">
              <img
                src="/images/macandcheese.png"
                alt="Mac & Cheese Fusion Bowls"
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white rounded-full p-2">
                <Heart className="h-4 w-4 text-gray-400" />
              </div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-white text-gray-900 text-sm px-2 py-1">1263</Badge>
              </div>
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                <span className="text-white text-sm font-medium">North Indian</span>
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-gray-900 text-sm">Mac & Cheese Fusion Bowls</h3>
            </CardContent>
          </Link>
        </Card>

        <Card className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <Link href="/recipe/2">
            <div className="relative">
              <img
                src="/images/croissant.png"
                alt="Mac & Cheese Fusion Bowls"
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white rounded-full p-2">
                <Heart className="h-4 w-4 text-gray-400" />
              </div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-white text-gray-900 text-sm px-2 py-1">1263</Badge>
              </div>
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                <span className="text-white text-sm font-medium">North Indian</span>
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-gray-900 text-sm">Mac & Cheese Fusion Bowls</h3>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  )
}
