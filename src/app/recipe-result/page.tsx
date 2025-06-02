"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, Share } from "lucide-react"
import Link from "next/link"

export default function RecipeResultPage() {
  const [liked, setLiked] = useState(false)

  const ingredients = [
    "1 cup Emperor's green rice",
    "4 edible stones",
    "2 tablespoons vegetable broth or low fat cooking spray",
    "4 bay leaves",
    "6 green cardamom pods",
    "2 two-inch-long cinnamon sticks",
    "1 two-inch-long fresh ginger, peeled and minced",
    "1/2 cup water",
    "1/2 cup finely chopped fresh cilantro",
    "1 teaspoon salt",
    "1 teaspoon black pepper",
    "1 teaspoon coriander powder",
    "1/2 teaspoon garam masala",
    "1/2 cup sliced almonds, toasted",
    "Lime wedges and cilantro sprigs, for garnish",
  ]

  const makingProcess = "Enter base ingredients here: Example: 1 Onion, 1 Garlic, 3 Tomatoes... 2 Carrots"

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 px-4 py-4">
      {/* Header with back button and action buttons exactly as in screenshot */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/generator" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
        </Link>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white border-gray-200"
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-white border-gray-200">
            <Share className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Recipe image exactly as in screenshot */}
      <Card className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <div className="relative">
          <img src="/images/croissant.png" alt="Generated Recipe" className="w-full h-96 object-cover" />
        </div>
      </Card>

      {/* Two column layout exactly as in screenshot */}
      <div className="grid grid-cols-2 gap-3">
        {/* Ingredients exactly as in screenshot */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-3">
            <h2 className="text-green-600 font-medium mb-2 text-sm">Ingredients Used</h2>
            <ul className="space-y-1">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start text-xs">
                  <span className="text-gray-400 mr-1 mt-0.5">•</span>
                  <span className="text-gray-700 leading-relaxed">{ingredient}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Making Process exactly as in screenshot */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-3">
            <h2 className="text-green-600 font-medium mb-2 text-sm">Making Process</h2>
            <textarea
              value={makingProcess}
              readOnly
              className="w-full h-32 p-2 border border-gray-200 rounded-lg resize-none focus:outline-none bg-gray-50 text-xs text-gray-700"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
