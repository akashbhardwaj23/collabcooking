"use client";


import Navbar from "@/components/navbar";
import { MyRecipeCard } from "@/components/reciepecard";

export default function MyRecipesPage() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-red-50 px-4">
      <Navbar />
      <div className="space-y-4 ml-12 md:ml-0">
        <MyRecipeCard
          src="/images/croissant.png"
          likes="1263"
          title="Mac & Cheese Fusion Bowls"
          cuisine="North Indian"
        />

          <MyRecipeCard
          src="/images/croissant.png"
          likes="1263"
          title="Mac & Cheese Bowls"
          cuisine=" North Indian"
          />
      </div>
    </div>
  );
}
