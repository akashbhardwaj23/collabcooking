"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Heart,
  ChefHat,
  Home,
  Settings,
  Download,
  PanelRightOpen,
  PanelRightClose,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { motion } from "motion/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { MyRecipeCard } from "../my-recipes/page";

const cuisineTags = [
  { name: "Ramen", color: "bg-orange-500" },
  { name: "Soup", color: "bg-green-500" },
  { name: "Sea food", color: "bg-blue-500" },
  { name: "Sushi", color: "bg-red-500" },
  { name: "Ramen", color: "bg-orange-500" },
  { name: "Soup", color: "bg-yellow-500" },
];

const topChefs = [
  { name: "Shivra Khanna", avatar: "/images/female-chef.png" },
  { name: "Gordon Ramsay", avatar: "/images/gordon.png" },
  { name: "Vikas Khanna", avatar: "/images/vikas-khanna.png" },
  { name: "Alan Passard", avatar: "/images/male-chef.png" },
];

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
];

export default function HomePage() {
  const { user, loading } = useAuth();

  console.log("use is ", user);

  // Show auth screen if user is not logged in
  if (!user && !loading) {
    redirect("/auth");
  }

  // Main dashboard matching the exact screenshot design
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50"> 
      <div className="max-w-6xl mx-auto px-4 pb-8">
      <Navbar />

        {/* Greeting exactly as in screenshot */}
        <div className="mb-6 font-roboto">
          <h1 className="text-2xl font-semibold text-[#64A67E] mb-1">
            Hello <span className="text-orange-500">{user?.name}</span>,
          </h1>
          <p className="text-xl text-[#64A67E]">
            what do you want to cook today?
          </p>
        </div>

        {/* Cuisine Tags exactly as in screenshot */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {cuisineTags.map((tag, index) => (
              <Badge
                key={index}
                className={`${tag.color} shadow-sm border-none text-orange-500 font-semibold text-base bg-white px-4 py-2 rounded-md hover:opacity-90 cursor-pointer`}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Top Chefs exactly as in screenshot */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#64A67E]">Top Chefs</h2>
            <Link
              href="/chefs"
              className="text-orange-500 text-sm hover:text-orange-600"
            >
              View all
            </Link>
          </div>
          <div className="flex space-x-6">
            {topChefs.map((chef, index) => (
              <div
                key={index}
                className="text-center p-4 bg-background rounded-3xl shadow-md cursor-pointer"
              >
                <Avatar className="h-30 w-30 p-0 border-0">
                  <AvatarImage
                    src={chef.avatar || "/placeholder.svg"}
                    alt={chef.name}
                    className="p-0 h-full w-full object-cover"
                  />
                  <AvatarFallback>
                    {chef.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium text-gray-900/70">
                  {chef.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Recipes exactly as in screenshot */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#64A67E] mb-4">
            Trending Recipes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingRecipes.map((recipe) => (
              <div>
                {/* <Card
                  key={recipe.id}
                  className="h-[600px] relative flex items-center bg-transparent border-none shadow-none"
                >
                  <Link href={`/recipe/${recipe.id}`}>
                    <CardContent className="py-2 h-[30rem] w-[30rem] font-semibold bg-white rounded-xl shadow-sm border-none hover:shadow-md transition-shadow">
                      <div className="flex flex-col justify-between h-full">
                        <div className="absolute left-1/2 top-1/2 transform -translate-1/2 w-full h-full">
                        <Image
                          src={recipe.image || "/placeholder.svg"}
                          alt={recipe.title}
                          width={400}
                          height={400}
                          className="h-[32rem] w-[32rem] object-cover"
                        />
                        </div>
                        <div className="bg-white flex justify-between items-center rounded-full p-2">
                          <p className="text-neutral-900 mb-1">
                            {recipe.category}
                          </p>

                          <div className="flex justify-center items-center space-x-1">
                            <Heart className="h-4 w-4 text-neutral-900" />
                            <span>{recipe.likes}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900">
                          {recipe.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Link>
                </Card> */}
                <MyRecipeCard src={recipe.image} alt={recipe.title} title={recipe.title} likes={recipe.likes} cuisine={recipe.category} />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Programs exactly as in screenshot */}
        <div className="space-y-4 relative">
          <Card className="bg-[url(/images/soup-bowl-1.png)] bg-no-repeat bg-red-700 bg-contain bg-center text-white rounded-4xl overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Healthful Meal Program
                </h3>
                <Button className="bg-white bg-gradient-to-r from-orange-400 to-orange-600 hover:bg-gray-100 rounded-xl px-6">
                  Learn more
                </Button>
              </div>
              <div className="w-30 h-30 right-0 -top-6 absolute rounded-full flex items-center justify-center">
                <img src="/images/green-soup.png" alt="green-soup" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[url(/images/grilled-chicken.png)] bg-no-repeat bg-top-right bg-contain bg-teal-200/20 text-white rounded-4xl overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="ml-52">
                <h3 className="text-xl text-[#64A67E] font-semibold mb-4">
                  Michelin-level Cuisine
                </h3>
                <Button className="bg-gradient-to-r from-orange-400 to-orange-600 hover:bg-gray-100 rounded-xl px-6">
                  Learn more
                </Button>
              </div>
              <div className="w-60 h-60 left-0 top-44 absolute rounded-full flex items-center justify-center">
                <img src="/images/grilled-meat-plate.png" alt="grilled-meat" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
