"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChefHat, Plus, X, Clock, Users, Save, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createRecipe } from "@/lib/recipes"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

interface Ingredient {
  id: string
  name: string
  amount: number
  unit: string
}

interface Step {
  id: string
  instruction: string
  timer?: number
}

export default function NewRecipePage() {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    servings: 4,
    cookTime: "",
    tags: [] as string[],
    image: "",
    isPublic: true,
  })

  const [ingredients, setIngredients] = useState<Ingredient[]>([{ id: "1", name: "", amount: 0, unit: "cups" }])
  const [steps, setSteps] = useState<Step[]>([{ id: "1", instruction: "", timer: undefined }])
  const [newTag, setNewTag] = useState("")
  const [collaboratorEmail, setCollaboratorEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth()
  const router = useRouter()

  const addIngredient = () => {
    const newId = (ingredients.length + 1).toString()
    setIngredients([...ingredients, { id: newId, name: "", amount: 0, unit: "cups" }])
  }

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id))
  }

  const updateIngredient = (id: string, field: keyof Ingredient, value : string | number) => {
    setIngredients(ingredients.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing)))
  }

  const addStep = () => {
    const newId = (steps.length + 1).toString()
    setSteps([...steps, { id: newId, instruction: "", timer: undefined }])
  }

  const removeStep = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id))
  }

  const updateStep = (id: string, field: keyof Step, value: string | number | undefined) => {
    setSteps(steps.map((step) => (step.id === id ? { ...step, [field]: value } : step)))
  }

  const addTag = () => {
    if (newTag && !recipe.tags.includes(newTag)) {
      setRecipe({ ...recipe, tags: [...recipe.tags, newTag] })
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setRecipe({ ...recipe, tags: recipe.tags.filter((t) => t !== tag) })
  }

  const handleSave = async (isPublic = false) => {
    if (!user) return

    setIsLoading(true)

    try {
      const recipeData = {
        title: recipe.title,
        description: recipe.description,
        servings: recipe.servings,
        cook_time: recipe.cookTime,
        image_url: recipe.image,
        is_public: isPublic,
        tags: recipe.tags,
        ingredients: ingredients
          .filter((ing) => ing.name && ing.amount)
          .map((ing, index) => ({
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            order_index: index,
          })),
        steps: steps
          .filter((step) => step.instruction)
          .map((step, index) => ({
            instruction: step.instruction,
            timer_minutes: step.timer,
            order_index: index,
          })),
      }

      const newRecipe = await createRecipe(recipeData, user.id)
      router.push(`/recipes/${newRecipe.id}`)
    } catch (error) {
      console.error("Error creating recipe:", error)
    } finally {
      setIsLoading(false)
    }
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
              <Button variant="outline" onClick={() => handleSave(false)} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => handleSave(true)}
                disabled={isLoading}
              >
                <Share2 className="h-4 w-4 mr-2" />
                {isLoading ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipes
          </Link>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Recipe Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Recipe Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter recipe title..."
                  value={recipe.title}
                  onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your recipe..."
                  value={recipe.description}
                  onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="servings">Servings *</Label>
                  <Input
                    id="servings"
                    type="number"
                    min="1"
                    value={recipe.servings}
                    onChange={(e) => setRecipe({ ...recipe, servings: Number.parseInt(e.target.value) || 1 })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cookTime">Cook Time</Label>
                  <Input
                    id="cookTime"
                    placeholder="e.g., 30 minutes"
                    value={recipe.cookTime}
                    onChange={(e) => setRecipe({ ...recipe, cookTime: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Tags (e.g., &quot;Vegan&quot;, &quot;Gluten-Free&quot;)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button type="button" onClick={addTag}>
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients with Scaling */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Ingredients (Auto-scaling enabled)
                <Button onClick={addIngredient} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Ingredient
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="flex gap-2 items-center">
                    <Input
                      placeholder="Ingredient name *"
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(ingredient.id, "name", e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Input
                      type="number"
                      placeholder="Amount *"
                      value={ingredient.amount || ""}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, "amount", Number.parseFloat(e.target.value) || 0)
                      }
                      className="w-24"
                      required
                    />
                    <Select
                      value={ingredient.unit}
                      onValueChange={(value) => updateIngredient(ingredient.id, "unit", value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cups">cups</SelectItem>
                        <SelectItem value="tbsp">tbsp</SelectItem>
                        <SelectItem value="tsp">tsp</SelectItem>
                        <SelectItem value="oz">oz</SelectItem>
                        <SelectItem value="lbs">lbs</SelectItem>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="ml">ml</SelectItem>
                        <SelectItem value="l">l</SelectItem>
                        <SelectItem value="pieces">pieces</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeIngredient(ingredient.id)}
                      disabled={ingredients.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step-by-Step Instructions with Timers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Step-by-Step Instructions
                <Button onClick={addStep} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label>Step {index + 1}</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeStep(step.id)}
                        disabled={steps.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Describe this step in detail..."
                      value={step.instruction}
                      onChange={(e) => updateStep(step.id, "instruction", e.target.value)}
                      className="mb-2"
                      required
                    />
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <Input
                        type="number"
                        placeholder="Timer (minutes)"
                        value={step.timer || ""}
                        onChange={(e) => updateStep(step.id, "timer", Number.parseInt(e.target.value) || undefined)}
                        className="w-32"
                      />
                      <span className="text-sm text-gray-500">minutes (optional timer)</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Collaboration */}
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="collaborator">Invite Collaborators by Email</Label>
                  <div className="flex gap-2">
                    <Input
                      id="collaborator"
                      type="email"
                      placeholder="Enter email address..."
                      value={collaboratorEmail}
                      onChange={(e) => setCollaboratorEmail(e.target.value)}
                    />
                    <Button type="button">
                      <Users className="h-4 w-4 mr-2" />
                      Invite
                    </Button>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Credit Policy:</strong> You will be credited as the original curator of this recipe.
                    Collaborators can edit and contribute, but your authorship will always be preserved.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={recipe.isPublic}
                    onChange={(e) => setRecipe({ ...recipe, isPublic: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="isPublic">Make this recipe public (others can view but not edit)</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
