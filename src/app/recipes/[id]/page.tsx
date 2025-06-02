"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ChefHat, Clock, Users, Star, ArrowLeft, Scale, Edit } from "lucide-react"
import Link from "next/link"
import { Timer } from "@/components/timer"
import { useAuth } from "@/components/auth-provider"

interface Ingredient {
  name: string
  amount: number
  unit: string
}

interface Step {
  instruction: string
  timer?: number
}

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const [servings, setServings] = useState(4)
  const [currentStep, setCurrentStep] = useState(0)
  const [activeTimer, setActiveTimer] = useState<number | null>(null)
  const [canEdit, setCanEdit] = useState(false)

  const { user } = useAuth()

  // Mock recipe data - in real app, fetch from database using params.id
  const recipe = {
    id: params.id,
    title: "Herb & Cheese Crusted Rolls",
    description:
      "Delicious homemade rolls with a crispy herb and cheese crust. Perfect for dinner parties or family meals.",
    author: { name: "Sarah Chen", avatar: "/images/female-chef.png", id: "user1" },
    collaborators: [
      { name: "Mike Rodriguez", avatar: "/images/male-chef.png", id: "user2" },
      { name: "Emma Wilson", avatar: "/images/gordon-ramsay.png", id: "user3" },
    ],
    image: "/images/croissant.png",
    cookTime: "45 min",
    originalServings: 4,
    tags: ["Vegetarian", "Bread", "Dinner"],
    rating: 4.8,
    isPublic: true,
    createdBy: "user1",
    ingredients: [
      { name: "All-purpose flour", amount: 3, unit: "cups" },
      { name: "Active dry yeast", amount: 1, unit: "packet" },
      { name: "Warm water", amount: 1, unit: "cup" },
      { name: "Sugar", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Olive oil", amount: 2, unit: "tbsp" },
      { name: "Shredded cheese", amount: 1, unit: "cup" },
      { name: "Mixed herbs", amount: 2, unit: "tbsp" },
    ] as Ingredient[],
    steps: [
      {
        instruction: "In a large bowl, dissolve yeast and sugar in warm water. Let stand for 5 minutes until foamy.",
        timer: 5,
      },
      {
        instruction: "Add flour, salt, and olive oil to the yeast mixture. Mix until a dough forms.",
        timer: undefined,
      },
      { instruction: "Knead the dough on a floured surface for 8-10 minutes until smooth and elastic.", timer: 10 },
      { instruction: "Place dough in a greased bowl, cover, and let rise in a warm place for 1 hour.", timer: 60 },
      { instruction: "Punch down dough and divide into 8 equal pieces. Shape into rolls.", timer: undefined },
      {
        instruction: "Place rolls on a baking sheet, brush with oil, and sprinkle with cheese and herbs.",
        timer: undefined,
      },
      { instruction: "Let rise for another 30 minutes until doubled in size.", timer: 30 },
      { instruction: "Preheat oven to 375°F (190°C) and bake for 15-20 minutes until golden brown.", timer: 18 },
    ] as Step[],
  }

  // Check if user can edit (owner or collaborator)
  const isOwner = recipe.createdBy === user?.id
  const isCollaborator = recipe.collaborators.some((c) => c.id === user?.id)
  const canEditValue = isOwner || isCollaborator

  useEffect(() => {
    setCanEdit(canEditValue)
  }, [user])

  // Auto-scale ingredients based on servings
  const scaledIngredients = recipe.ingredients.map((ingredient) => ({
    ...ingredient,
    amount: (ingredient.amount * servings) / recipe.originalServings,
  }))

  const formatAmount = (amount: number) => {
    return amount % 1 === 0 ? amount.toString() : amount.toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ChefHat className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-bold text-gray-900">CuisineQuest</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {canEdit && (
                <Link href={`/recipes/${recipe.id}/edit`}>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Recipe
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipes
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipe Header */}
            <Card>
              <div className="relative">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white text-gray-900">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {recipe.rating}
                  </Badge>
                </div>
                {!recipe.isPublic && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white">Private</Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-3xl">{recipe.title}</CardTitle>
                <p className="text-gray-600">{recipe.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.cookTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{servings} servings</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>

            {/* Author & Collaborators with Credit */}
            <Card>
              <CardHeader>
                <CardTitle>Recipe Authors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={recipe.author.avatar || "/placeholder.svg"} alt={recipe.author.name} />
                    <AvatarFallback>
                      {recipe.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{recipe.author.name}</p>
                    <p className="text-sm text-orange-600 font-medium">Original Curator</p>
                  </div>
                </div>
                {recipe.collaborators.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Collaborators:</p>
                    <div className="space-y-2">
                      {recipe.collaborators.map((collaborator, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                            <AvatarFallback>
                              {collaborator.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{collaborator.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Step-by-Step Instructions with Built-in Timers */}
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 ${
                        index === currentStep ? "border-orange-500 bg-orange-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-2">Step {index + 1}</h4>
                          <p className="text-gray-700">{step.instruction}</p>
                        </div>
                        {step.timer && (
                          <div className="ml-4 text-center">
                            <div className="text-sm text-gray-500 mb-1">Timer</div>
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {step.timer} min
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Built-in Timer Component */}
                      {step.timer && index === currentStep && (
                        <div className="mt-4">
                          <Timer
                            minutes={step.timer}
                            onComplete={() => {
                              // Auto-advance to next step or show completion
                              if (index < recipe.steps.length - 1) {
                                setCurrentStep(index + 1)
                              }
                              // Audible/Visual alert handled by Timer component
                            }}
                          />
                        </div>
                      )}

                      <div className="flex justify-between mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentStep(Math.max(0, index - 1))}
                          disabled={index === 0}
                        >
                          Previous
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setCurrentStep(Math.min(recipe.steps.length - 1, index + 1))}
                          disabled={index === recipe.steps.length - 1}
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          {index === recipe.steps.length - 1 ? "Complete" : "Next Step"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Automatic Ingredient Scaling */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scale className="h-5 w-5 mr-2" />
                  Scale Recipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Servings</label>
                    <Input
                      type="number"
                      min="1"
                      value={servings}
                      onChange={(e) => setServings(Number.parseInt(e.target.value) || 1)}
                      className="mt-1"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Original recipe serves {recipe.originalServings}. Ingredients will be automatically scaled.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Auto-Scaled Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle>Ingredients (Auto-Scaled)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {scaledIngredients.map((ingredient, index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span className="text-sm">{ingredient.name}</span>
                      <span className="text-sm font-medium">
                        {formatAmount(ingredient.amount)} {ingredient.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cooking Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Cooking Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      Step {currentStep + 1} of {recipe.steps.length}
                    </span>
                    <span>{Math.round(((currentStep + 1) / recipe.steps.length) * 100)}%</span>
                  </div>
                  <Progress value={((currentStep + 1) / recipe.steps.length) * 100} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
