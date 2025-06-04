"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ChefHat, Home, Settings, Download } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { MyRecipeCard } from "../my-recipes/page"

const favoriteRecipes = [
  {
    id: 1,
    title: "Mac & Cheese Fusion Bowls",
    image: "/images/macandcheese.png",
    category: "North Indian",
    likes: 1263,
  },
  {
    id: 2,
    title: "Mac & Cheese Fusion Bowls",
    image: "/images/soup-bowl-1.png",
    category: "North Indian",
    likes: 1263,
  },
]

export default function FavouritesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-lg">🔥</span>
          </div>
          <h1 className="text-2xl font-bold text-orange-500">Favourites</h1>
        </div> */}

          <Navbar />
        {/* Recipe cards exactly as in screenshot */}
        <div className="space-y-6">
          {favoriteRecipes.map((recipe) => (
            // <Card
            //   key={recipe.id}
            //   className="overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            // >
            //   <Link href={`/recipe/${recipe.id}`}>
            //     <div className="relative">
            //       <img
            //         src={recipe.image || "/placeholder.svg"}
            //         alt={recipe.title}
            //         className="w-full h-64 object-cover"
            //       />
            //       <div className="absolute top-4 right-4 bg-white rounded-full p-2">
            //         <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            //       </div>
            //       <div className="absolute top-4 left-4">
            //         <Badge className="bg-white text-gray-900">{recipe.likes}</Badge>
            //       </div>
            //     </div>
            //     <CardContent className="p-4">
            //       <p className="text-sm text-gray-500 mb-1">{recipe.category}</p>
            //       <h3 className="font-semibold text-gray-900">{recipe.title}</h3>
            //     </CardContent>
            //   </Link>
            // </Card>

            <MyRecipeCard src={recipe.image} alt={recipe.title} likes={recipe.likes} title={recipe.title} cuisine={recipe.category} />
          ))}
        </div>
      </div>
    </div>
  )
}
