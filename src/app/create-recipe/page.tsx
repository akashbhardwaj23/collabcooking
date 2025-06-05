"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, X, Clock, Users, Save, Share2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

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

export default function CreateRecipePage() {
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
  const [collaborators, setCollaborators] = useState<{ email: string; status: string }[]>([])

  const { user } = useAuth()
  const router = useRouter()

  const addIngredient = () => {
    const newId = (ingredients.length + 1).toString()
    setIngredients([...ingredients, { id: newId, name: "", amount: 0, unit: "cups" }])
  }

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id))
  }

  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
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

  const inviteCollaborator = () => {
    if (!collaboratorEmail || !collaboratorEmail.includes("@")) {
      alert("Please enter a valid email address")
      return
    }
    if (collaborators.some((c) => c.email === collaboratorEmail)) {
      alert("This email has already been invited")
      return
    }
    setCollaborators([
      ...collaborators,
      {
        email: collaboratorEmail,
        status: "Pending",
      },
    ])
    setCollaboratorEmail("")
  }

  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to save a recipe")
      return
    }

    if (!recipe.title) {
      alert("Please enter a recipe title")
      return
    }

    if (ingredients.length === 0 || ingredients.some((i) => !i.name || i.amount <= 0)) {
      alert("Please add at least one ingredient with name and amount")
      return
    }

    if (steps.length === 0 || steps.some((s) => !s.instruction)) {
      alert("Please add at least one step with instructions")
      return
    }

    setIsLoading(true)

    try {
      setTimeout(() => {
        setIsLoading(false)
        alert("Recipe saved successfully!")
        router.push("/my-recipes")
      }, 1500)
    } catch (error) {
      console.error("Error saving recipe:", error)
      setIsLoading(false)
      alert("Error saving recipe. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <header>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/home" className="flex items-center space-x-2">
                <span className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Create Recipe</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="hidden md:flex" onClick={() => handleSave()} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button
                className="bg-gradient-to-r from-orange-400 to-orange-600 hover:bg-orange-600"
                onClick={() => handleSave()}
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
        <div className="space-y-6">
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle className="text-[#64A67E]">Recipe Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Recipe Title *</label>
                <Input
                  placeholder="Enter recipe title..."
                  value={recipe.title}
                  onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  placeholder="Describe your recipe..."
                  value={recipe.description}
                  className="focus:outline-none focus:ring-2 focus:ring-orange-400"
                  onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Servings *</label>
                  <Input
                    type="number"
                    min="1"
                    value={recipe.servings}
                    onChange={(e) => setRecipe({ ...recipe, servings: Number.parseInt(e.target.value) || 1 })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cook Time</label>
                  <Input
                    placeholder="e.g., 30 minutes"
                    value={recipe.cookTime}
                    className="focus:ring-orange-400"
                    onChange={(e) => setRecipe({ ...recipe, cookTime: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags (e.g., &quot;Vegan&quot;, &quot;Gluten-Free&quot;)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                 
                </div>
                <Button type="button" className="w-full bg-gradient-to-r from-orange-400 to-orange-600" onClick={addTag}>
                    Add
                  </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-[#64A67E]">Ingredients (Auto-scaling enabled)</span>
                <Button onClick={addIngredient} className="bg-gradient-to-r from-orange-400 to-orange-600" size="sm">
                  <Plus className="h-4 w-4" />
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
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-[#64A67E]">Step-by-Step Instructions</span>
                <Button onClick={addStep} className="bg-gradient-to-r from-orange-400 to-orange-600" size="sm">
                  <Plus className="h-4 w-4" />
                  Add Step
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Step {index + 1}</label>
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

          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle className="text-[#64A67E]">Collaboration Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Invite Collaborators by Email</label>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter email address..."
                      value={collaboratorEmail}
                      onChange={(e) => setCollaboratorEmail(e.target.value)}
                    />
                    <Button type="button" className="bg-gradient-to-r from-orange-400 to-orange-600" onClick={inviteCollaborator}>
                      <Users className="h-4 w-4 mr-2" />
                      Invite
                    </Button>
                  </div>
                </div>

                {collaborators.length > 0 && (
                  <div className="border rounded-lg p-3">
                    <h3 className="text-sm font-medium mb-2">Invited Collaborators</h3>
                    <ul className="space-y-2">
                      {collaborators.map((collab, index) => (
                        <li key={index} className="flex justify-between items-center text-sm">
                          <span>{collab.email}</span>
                          <Badge variant="outline">{collab.status}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
                  <label htmlFor="isPublic" className="text-sm">
                    Make this recipe public (others can view but not edit)
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
