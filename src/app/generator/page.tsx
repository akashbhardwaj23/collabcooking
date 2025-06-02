"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Heart, ChefHat, Home, Settings, Download } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const chefs = [
  { name: "Shivra Khanna", avatar: "/images/female-chef.png", selected: false },
  { name: "Gordon Ramsay", avatar: "/images/gordon-ramsay.png", selected: true },
  { name: "Vikas Khanna", avatar: "/images/vikas-khanna.png", selected: false },
  { name: "Alan Passard", avatar: "/images/male-chef.png", selected: false },
  { name: "Shivra Khanna", avatar: "/images/female-chef.png", selected: false },
]

const dishCategories = [
  { name: "Breakfast", selected: true },
  { name: "Lunch", selected: false },
  { name: "Dinner", selected: false },
]

const cuisineTypes = [
  { name: "Indian", selected: true },
  { name: "Mexican", selected: false },
  { name: "Asian", selected: false },
  { name: "Vegetarian", selected: false },
]

const cookingMethods = [
  { name: "Baking", selected: true },
  { name: "Grilling", selected: false },
  { name: "Frying", selected: false },
  { name: "Roasting", selected: false },
]

export default function RecipeGeneratorPage() {
  const [ingredients, setIngredients] = useState(
    "Enter base ingredients here: Example: 1 Onion, 1 Garlic, 3 Tomatoes... 2 Carrots",
  )
  const [applyChefStyle, setApplyChefStyle] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState("India")
  const [selectedChef, setSelectedChef] = useState("Gordon Ramsay")
  const [michelinRecipe, setMichelinRecipe] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)

  const router = useRouter()

  const handleLetsCook = async () => {
    setIsGenerating(true)

    // Simulate recipe generation
    setTimeout(() => {
      setIsGenerating(false)
      router.push("/recipe-result")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header exactly as in screenshot */}
      <header className="bg-transparent p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🔥</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Recipe Generator</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🍳</span>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-sm">❤️</span>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-sm">⭐</span>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-sm">👤</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="mb-6">
          <Link href="/home" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="space-y-6">
          {/* Main Ingredients exactly as in screenshot */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Main Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full h-20 p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter base ingredients here..."
              />
            </CardContent>
          </Card>

          {/* Chef Style exactly as in screenshot */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-gray-900 font-medium mb-4">Would you like to apply the style of popular chef ?</p>
              <div className="flex space-x-4">
                <Button
                  onClick={() => setApplyChefStyle(true)}
                  className={`px-8 py-2 rounded-full ${
                    applyChefStyle ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setApplyChefStyle(false)}
                  className={`px-8 py-2 rounded-full ${
                    !applyChefStyle ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  No
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Country Selection exactly as in screenshot */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-gray-900 font-medium mb-4">Select the country of your chef</p>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full h-12 rounded-xl border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="Italy">Italy</SelectItem>
                  <SelectItem value="Japan">Japan</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Chef Selection exactly as in screenshot */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-gray-900 font-medium mb-4">Pick your Chef</p>
              <div className="grid grid-cols-5 gap-4">
                {chefs.map((chef, index) => (
                  <div
                    key={index}
                    className={`text-center cursor-pointer p-3 rounded-xl transition-all ${
                      selectedChef === chef.name ? "bg-orange-500" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedChef(chef.name)}
                  >
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarImage src={chef.avatar || "/placeholder.svg"} alt={chef.name} />
                      <AvatarFallback>
                        {chef.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className={`text-sm font-medium ${chef.selected ? "text-white" : "text-gray-900"}`}>
                      {chef.name}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* All other sections exactly as in screenshot */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-gray-900 font-medium mb-4">Pick a Dish Category</p>
              <div className="flex space-x-3">
                {dishCategories.map((category, index) => (
                  <Badge
                    key={index}
                    className={`px-4 py-2 rounded-full cursor-pointer ${
                      category.selected ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-gray-900 font-medium mb-4">Pick a Cuisine</p>
              <div className="flex flex-wrap gap-3">
                {cuisineTypes.map((cuisine, index) => (
                  <Badge
                    key={index}
                    className={`px-4 py-2 rounded-full cursor-pointer ${
                      cuisine.selected ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cuisine.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-gray-900 font-medium mb-4">Cooking Method</p>
              <div className="flex flex-wrap gap-3">
                {cookingMethods.map((method, index) => (
                  <Badge
                    key={index}
                    className={`px-4 py-2 rounded-full cursor-pointer ${
                      method.selected ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {method.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-gray-900 font-medium mb-4">Would you a Michelin Recipe ?</p>
              <div className="flex space-x-4">
                <Button
                  onClick={() => setMichelinRecipe(true)}
                  className={`px-8 py-2 rounded-full ${
                    michelinRecipe ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setMichelinRecipe(false)}
                  className={`px-8 py-2 rounded-full ${
                    !michelinRecipe ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  No
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button exactly as in screenshot */}
          <Button
            onClick={handleLetsCook}
            disabled={isGenerating}
            className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl text-lg"
          >
            {isGenerating ? "Generating Recipe..." : "Let's Cook"}
          </Button>
        </div>
      </div>

      {/* Sidebar Navigation exactly as in screenshot */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
        <div className="flex flex-col items-center space-y-6 py-4">
          <Link href="/home">
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
              <Home className="h-5 w-5 text-gray-500" />
            </div>
          </Link>
          <Link href="/generator">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500">
              <ChefHat className="h-5 w-5 text-white" />
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
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
              <Settings className="h-5 w-5 text-gray-500" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
