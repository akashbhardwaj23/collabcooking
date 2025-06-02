"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Heart, Share, Clock, Users, Scale } from "lucide-react"
import Link from "next/link"
import { Timer } from "@/components/timer"
import { useParams } from "next/navigation"

export default function RecipeDetailPage() {
  const params = useParams()
  const id = params.id as string;
  const [liked, setLiked] = useState(false)
  const [servings, setServings] = useState(4)
  const [currentStep, setCurrentStep] = useState(0)
  const [showCollaborators, setShowCollaborators] = useState(false)
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("")


  // Recipe data - in a real app, this would be fetched from the database
  const recipe = {
    id: id,
    title: "Buttery Croissants",
    description: "Classic French croissants with a buttery, flaky texture",
    originalServings: 4,
    cookTime: "2 hours 30 minutes",
    author: {
      name: "Gordon Ramsay",
      avatar: "/images/gordon-ramsay.png",
      id: "user1",
    },
    collaborators: [
      { name: "Vikas Khanna", avatar: "/images/vikas-khanna.png", id: "user2" },
      { name: "Alan Passard", avatar: "/images/male-chef.png", id: "user3" },
    ],
    ingredients: [
      { name: "All-purpose flour", amount: 3, unit: "cups" },
      { name: "Active dry yeast", amount: 1, unit: "packet" },
      { name: "Warm water", amount: 1, unit: "cup" },
      { name: "Sugar", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Unsalted butter, cold", amount: 1.5, unit: "cups" },
      { name: "Egg (for egg wash)", amount: 1, unit: "" },
    ],
    steps: [
      {
        instruction: "In a large bowl, dissolve yeast and sugar in warm water. Let stand for 5 minutes until foamy.",
        timer: 5,
      },
      {
        instruction: "Add flour and salt to the yeast mixture. Mix until a dough forms.",
        timer: 0,
      },
      {
        instruction: "Knead the dough on a floured surface for 8-10 minutes until smooth and elastic.",
        timer: 10,
      },
      {
        instruction: "Place dough in a greased bowl, cover, and let rise in a warm place for 1 hour.",
        timer: 60,
      },
      {
        instruction: "Roll out the dough into a rectangle. Place cold butter in the center and fold the dough over it.",
        timer: 0,
      },
      {
        instruction:
          "Roll out the dough, fold it into thirds, and refrigerate for 30 minutes. Repeat this process three times.",
        timer: 30,
      },
      {
        instruction: "Roll out the dough into a large rectangle and cut into triangles.",
        timer: 0,
      },
      {
        instruction: "Roll each triangle from the wide end towards the point. Shape into crescents.",
        timer: 0,
      },
      {
        instruction: "Place on a baking sheet, brush with egg wash, and let rise for 30 minutes.",
        timer: 30,
      },
      {
        instruction: "Preheat oven to 375°F (190°C) and bake for 15-20 minutes until golden brown.",
        timer: 18,
      },
    ],
    tags: ["French", "Breakfast", "Pastry"],
  }

  // Auto-scale ingredients based on servings
  const scaledIngredients = recipe.ingredients.map((ingredient) => ({
    ...ingredient,
    amount: (ingredient.amount * servings) / recipe.originalServings,
  }))

  const formatAmount = (amount: number) => {
    return amount % 1 === 0 ? amount.toString() : amount.toFixed(2)
  }

  const handleInviteCollaborator = () => {
    if (!newCollaboratorEmail || !newCollaboratorEmail.includes("@")) {
      alert("Please enter a valid email address")
      return
    }

    // In a real app, this would send an invitation to the email
    alert(`Invitation sent to ${newCollaboratorEmail}`)
    setNewCollaboratorEmail("")
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gradient-to-br from-orange-50 to-red-50 px-4 py-4">
      {/* Header with back button and action buttons */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/home" className="inline-flex items-center text-gray-600 hover:text-gray-900">
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

      {/* Recipe image */}
      <Card className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <div className="relative">
          <img src="/images/croissant.png" alt="Recipe" className="w-full h-48 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h1 className="text-white text-xl font-semibold">{recipe.title}</h1>
            <p className="text-white/90 text-sm">{recipe.description}</p>
          </div>
        </div>
      </Card>

      {/* Author and Collaborators */}
      <Card className="bg-white rounded-xl shadow-sm mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-green-600 font-medium text-sm">Recipe Curator</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCollaborators(!showCollaborators)}
              className="text-xs"
            >
              <Users className="h-3 w-3 mr-1" />
              {showCollaborators ? "Hide Collaborators" : "Show Collaborators"}
            </Button>
          </div>

          <div className="flex items-center mb-3">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={recipe.author.avatar || "/placeholder.svg"} alt={recipe.author.name} />
              <AvatarFallback>{recipe.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{recipe.author.name}</p>
              <p className="text-xs text-orange-500">Original Curator</p>
            </div>
          </div>

          {showCollaborators && (
            <>
              <div className="border-t border-gray-100 pt-3 mb-3">
                <p className="text-xs text-gray-500 mb-2">Collaborators:</p>
                <div className="flex flex-wrap gap-2">
                  {recipe.collaborators.map((collaborator, index) => (
                    <div key={index} className="flex items-center bg-gray-50 rounded-full px-2 py-1">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                        <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{collaborator.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500 mb-2">Invite a collaborator:</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={newCollaboratorEmail}
                    onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg"
                  />
                  <Button size="sm" onClick={handleInviteCollaborator} className="bg-orange-500 hover:bg-orange-600">
                    Invite
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Ingredient Scaling */}
      <Card className="bg-white rounded-xl shadow-sm mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-green-600 font-medium text-sm flex items-center">
              <Scale className="h-4 w-4 mr-2" />
              Ingredients
            </h2>
            <div className="flex items-center">
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-gray-600"
              >
                -
              </button>
              <span className="mx-2 text-sm">{servings} servings</span>
              <button
                onClick={() => setServings(servings + 1)}
                className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-gray-600"
              >
                +
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 mb-2">
            Original recipe serves {recipe.originalServings}. Ingredients automatically scaled.
          </p>

          <ul className="space-y-1">
            {scaledIngredients.map((ingredient, index) => (
              <li key={index} className="flex items-start text-xs">
                <span className="text-gray-400 mr-1 mt-0.5">•</span>
                <span className="text-gray-700 leading-relaxed">
                  {formatAmount(ingredient.amount)} {ingredient.unit} {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Step-by-Step Instructions with Timers */}
      <Card className="bg-white rounded-xl shadow-sm mb-4">
        <CardContent className="p-4">
          <h2 className="text-green-600 font-medium text-sm mb-3">Step-by-Step Instructions</h2>

          <div className="space-y-4">
            {recipe.steps.map((step, index) => (
              <div
                key={index}
                className={`border rounded-lg p-3 ${
                  currentStep === index ? "border-orange-500 bg-orange-50" : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xs font-medium">Step {index + 1}</h3>
                  {step.timer > 0 && (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {step.timer} min
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-gray-700 mb-3">{step.instruction}</p>

                {step.timer > 0 && currentStep === index && (
                  <Timer
                    minutes={step.timer}
                    onComplete={() => {
                      if (index < recipe.steps.length - 1) {
                        setCurrentStep(index + 1)
                      }
                    }}
                    className="mb-3"
                  />
                )}

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep(Math.max(0, index - 1))}
                    disabled={index === 0}
                    className="text-xs"
                  >
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setCurrentStep(Math.min(recipe.steps.length - 1, index + 1))}
                    disabled={index === recipe.steps.length - 1}
                    className="bg-orange-500 hover:bg-orange-600 text-xs"
                  >
                    {index === recipe.steps.length - 1 ? "Finish" : "Next Step"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {recipe.tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
