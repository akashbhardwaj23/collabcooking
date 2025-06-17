"use client"
import Navbar from "@/components/navbar"
import { MyRecipeCard } from "@/components/reciepecard"

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
          <Navbar />
        <div className="space-y-6 ml-12 md:ml-0">
          {favoriteRecipes.slice(0,1).map((recipe, index) => (
            <MyRecipeCard key={index} src={recipe.image} alt={recipe.title} likes={recipe.likes} title={recipe.title} cuisine={recipe.category} />
          ))}
        </div>
      </div>
    </div>
  )
}
