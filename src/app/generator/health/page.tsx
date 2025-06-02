"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const dishCategories = [
  { name: "Breakfast", selected: true },
  { name: "Lunch", selected: false },
  { name: "Dinner", selected: false },
]

const macronutrientOptions = [
  { name: "High Protein", selected: true },
  { name: "Low Carb", selected: false },
  { name: "Balanced", selected: false },
]

const nutrientDensityOptions = [
  { name: "High in Vitamins", selected: true },
  { name: "High in Minerals", selected: false },
  { name: "High in other beneficial nutrients", selected: false },
]

const calorieControlOptions = [
  { name: "Low", selected: true },
  { name: "Medium", selected: false },
  { name: "High", selected: false },
]

const sugarPreferenceOptions = [
  { name: "No added sugar", selected: true },
  { name: "Low sugar", selected: false },
  { name: "Sugar free", selected: false },
]

export default function HealthRecipeGeneratorPage() {
  const [ingredients, setIngredients] = useState(
    "Enter base ingredients here: Example: 1 Onion, 1 Garlic, 3 Tomatoes... 2 Carrots",
  )
  const [gender, setGender] = useState("male")
  const [currentWeight, setCurrentWeight] = useState("")
  const [targetWeight, setTargetWeight] = useState("")
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
      {/* Header */}
      <header className="bg-transparent p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🔥</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Recipe Generator</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/generator">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🍳</span>
              </div>
            </Link>
            <Link href="/favourites">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 text-sm">❤️</span>
              </div>
            </Link>
            <Link href="/saved">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 text-sm">⭐</span>
              </div>
            </Link>
            <Link href="/profile">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 text-sm">👤</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="mb-6">
          <Link href="/generator" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipe Generator
          </Link>
        </div>

        <div className="space-y-6">
          {/* Main Ingredients */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-green-600 font-medium mb-2">Main Ingredients</p>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full h-20 p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter base ingredients here..."
              />
            </CardContent>
          </Card>

          {/* Gender Selection */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-green-600 font-medium mb-2">Gender</p>
              <div className="flex space-x-4">
                <Button
                  onClick={() => setGender("male")}
                  className={`px-8 py-2 rounded-full ${
                    gender === "male" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Male
                </Button>
                <Button
                  onClick={() => setGender("female")}
                  className={`px-8 py-2 rounded-full ${
                    gender === "female" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Female
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Weight Information */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div>
                <Input
                  placeholder="Your current weight"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  className="h-12 border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <Input
                  placeholder="Weight to reduce"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  className="h-12 border-gray-200 rounded-xl"
                />
              </div>
            </CardContent>
          </Card>

          {/* Dish Category */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-green-600 font-medium mb-2">Pick a Dish Category</p>
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

          {/* Macronutrient Balance */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-green-600 font-medium mb-2">Macronutrient Balance</p>
              <div className="flex flex-wrap gap-3">
                {macronutrientOptions.map((option, index) => (
                  <Badge
                    key={index}
                    className={`px-4 py-2 rounded-full cursor-pointer ${
                      option.selected ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {option.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nutrient Density */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-green-600 font-medium mb-2">Nutrient Density</p>
              <div className="flex flex-wrap gap-3">
                {nutrientDensityOptions.map((option, index) => (
                  <Badge
                    key={index}
                    className={`px-4 py-2 rounded-full cursor-pointer ${
                      option.selected ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {option.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calorie Control */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-green-600 font-medium mb-2">Calorie Control</p>
              <div className="flex flex-wrap gap-3">
                {calorieControlOptions.map((option, index) => (
                  <Badge
                    key={index}
                    className={`px-4 py-2 rounded-full cursor-pointer ${
                      option.selected ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {option.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sugar Preference */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <p className="text-green-600 font-medium mb-2">Sugar preference</p>
              <div className="flex flex-wrap gap-3">
                {sugarPreferenceOptions.map((option, index) => (
                  <Badge
                    key={index}
                    className={`px-4 py-2 rounded-full cursor-pointer ${
                      option.selected ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {option.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            onClick={handleLetsCook}
            disabled={isGenerating}
            className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl text-lg"
          >
            {isGenerating ? "Generating Recipe..." : "Let's Cook"}
          </Button>
        </div>
      </div>
    </div>
  )
}
