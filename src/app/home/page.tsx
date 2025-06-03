"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Heart, ChefHat, Home, Settings, Download, PanelRightOpen, PanelRightClose, Plus } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { motion } from "motion/react"

const cuisineTags = [
  { name: "Ramen", color: "bg-orange-500" },
  { name: "Soup", color: "bg-green-500" },
  { name: "Sea food", color: "bg-blue-500" },
  { name: "Sushi", color: "bg-red-500" },
  { name: "Ramen", color: "bg-orange-500" },
  { name: "Soup", color: "bg-yellow-500" },
]

const topChefs = [
  { name: "Shivra Khanna", avatar: "/images/female-chef.png" },
  { name: "Gordon Ramsay", avatar: "/images/gordon-ramsay.png" },
  { name: "Vikas Khanna", avatar: "/images/vikas-khanna.png" },
  { name: "Alan Passard", avatar: "/images/male-chef.png" },
]

const trendingRecipes = [
  {
    id: 1,
    title: "Croissant",
    image: "/images/croissant.png",
    category: "French",
    likes: 1263,
  },
  {
    id: 2,
    title: "Mac & Cheese",
    image: "/images/macandcheese.png",
    category: "American",
    likes: 1263,
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()
  const [isSidebarClosed, setIsSidebarClosed] = useState(false)

  // Show auth screen if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex">
        {/* Left Side - Food Images Collage */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/food-collage.png" alt="Food Collage" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Let&apos;s Sign In</h2>

              <form className="space-y-4">
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="h-12 border-gray-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="h-12 border-gray-200 rounded-xl"
                    required
                  />
                </div>

                <div className="text-right">
                  <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-orange-500">
                    Forgot your password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-medium"
                >
                  Sign in
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-500 mb-4">Or</p>
                <Button variant="outline" className="w-full h-12 rounded-xl border-gray-200">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-500">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth" className="text-orange-500 hover:text-orange-600 font-medium">
                    Sign Up
                  </Link>{" "}
                  now
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main dashboard matching the exact screenshot design
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header matching screenshot */}
      <header className="bg-transparent p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🔥</span>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-white border-gray-200 rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
          <Link href="/create-recipe">
          <Button className="bg-orange-500 hover:bg-orange-600 h-9 px-3">
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        {/* Greeting exactly as in screenshot */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Hello <span className="text-orange-500">Haruto</span>,
          </h1>
          <p className="text-gray-600">what do you want to cook today?</p>
        </div>

        {/* Cuisine Tags exactly as in screenshot */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {cuisineTags.map((tag, index) => (
              <Badge
                key={index}
                className={`${tag.color} text-orange-500 font-semibold text-base bg-white px-4 py-2 rounded-sm hover:opacity-90 cursor-pointer`}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Top Chefs exactly as in screenshot */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Top Chefs</h2>
            <Link href="/chefs" className="text-orange-500 text-sm hover:text-orange-600">
              View all
            </Link>
          </div>
          <div className="flex space-x-6">
            {topChefs.map((chef, index) => (
              <div key={index} className="text-center p-4 bg-background rounded-3xl shadow-sm">
                <Avatar className="h-30 w-30">
                  <AvatarImage src={chef.avatar || "/placeholder.svg"} alt={chef.name} />
                  <AvatarFallback>
                    {chef.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium text-gray-900">{chef.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Recipes exactly as in screenshot */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-green-500 mb-4">Trending Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="h-[480px] bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={`/recipe/${recipe.id}`}>
                  <div className="relative">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                      <Heart className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white text-gray-900 text-xs">{recipe.likes}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4 font-semibold">
                    <p className="text-sm text-gray-500 mb-1">{recipe.category}</p>
                    <h3 className="font-semibold text-gray-900">{recipe.title}</h3>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Programs exactly as in screenshot */}
        <div className="space-y-4 relative">
          <Card className="bg-[url(/images/soup-bowl-1.png)] bg-no-repeat bg-red-700 bg-contain bg-center text-white rounded-2xl overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-4">Healthful Meal Program</h3>
                <Button className="bg-white bg-gradient-to-r from-orange-400 to-orange-600 hover:bg-gray-100 rounded-md px-6">Learn more</Button>
              </div>
              <div className="w-30 h-30 right-0 -top-6 absolute rounded-full flex items-center justify-center">
                <img src="/images/green-soup.png" alt="green-soup" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[url(/images/grilled-chicken.png)] bg-no-repeat bg-top-right bg-contain bg-teal-200 text-white rounded-2xl overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="ml-52">
                <h3 className="text-xl text-[#64A67E] font-semibold mb-4">Michelin-level Cuisine</h3>
                <Button className="bg-gradient-to-r from-orange-400 to-orange-600 hover:bg-gray-100 rounded-md px-6">Learn more</Button>
              </div>
              <div className="w-60 h-60 left-0 top-44 absolute rounded-full flex items-center justify-center">
                <img src="/images/grilled-meat-plate.png" alt="grilled-meat" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sidebar Navigation exactly as in screenshot */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
        <div className="flex flex-col items-center space-y-30 py-4">
          <motion.div
          initial={{
            display : isSidebarClosed ? "none" : 'flex'
          }}
            animate={{
                display: isSidebarClosed ? "none" : "flex"
            }}
          className="flex flex-col items-center space-y-6 py-4">
          <Link href="/">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500">
              <Home className="h-5 w-5 text-white" />
            </div>
          </Link>
          <Link href="/generator">
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
              <ChefHat className="h-5 w-5 text-gray-500" />
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
          </motion.div>

          <motion.div layoutId="sidebar" className="flex items-center justify-center">
            {isSidebarClosed ?<div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100" onClick={() => setIsSidebarClosed(false)}>
                <PanelRightOpen className="h-5 w-5 text-gray-500 cursor-pointer" />
            </div> : <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100" onClick={() => setIsSidebarClosed(true)}>
                <PanelRightClose className="h-5 w-5 text-gray-500 cursor-pointer" />
            </div>}
          </motion.div>


        </div>
        
      </div>
    </div>
  )
}
