"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Plus } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function MyRecipesPage() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-red-50 px-4">
      <Navbar />
      {/* Recipe cards exactly as in screenshot */}
      <div className="space-y-4">
        {/* <Card className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <Link href="/recipe/1">
            <div className="relative">
              <div className="absolute top-3 right-3 bg-white rounded-full p-2">
                <Heart className="h-4 w-4 text-gray-400" />
              </div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-white text-gray-900 text-sm px-2 py-1">1263</Badge>
              </div>
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                <span className="text-white text-sm font-medium">North Indian</span>
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-gray-900 text-sm">Mac & Cheese Fusion Bowls</h3>
            </CardContent>
          </Link>
        </Card> */}
        <MyRecipeCard
          src="/images/croissant.png"
          likes="1263"
          title="Mac & Cheese Fusion Bowls"
          cuisine="North Indian"
        />

          <MyRecipeCard
          src="/images/croissant.png"
          likes="1263"
          title="Mac & Cheese Fusion Bowls"
          cuisine=" North Indian"
          />
        {/* <Card className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <Link href="/recipe/2">
            <div className="relative">
              <img
                src="/images/croissant.png"
                alt="Mac & Cheese Fusion Bowls"
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white rounded-full p-2">
                <Heart className="h-4 w-4 text-gray-400" />
              </div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-white text-gray-900 text-sm px-2 py-1">
                  1263
                </Badge>
              </div>
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                <span className="text-white text-sm font-medium">
                  North Indian
                </span>
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-gray-900 text-sm">
                Mac & Cheese Fusion Bowls
              </h3>
            </CardContent>
          </Link>
        </Card> */}
      </div>
    </div>
  );
}

export function MyRecipeCard({
  src,
  alt,
  likes,
  cuisine,
  title,
}: {
  src: string;
  alt ? : string
  likes: string | number;
  cuisine: string;
  title: string;
}) {
  return (
    <div className="relative">
      <Card className="bg-transparent max-w-xl mx-auto  h-[40rem] p-0 rounded-xl shadow-none transition-shadow">
        <Link href="/recipe/1" className="flex flex-col justify-between h-full">
          <div className="flex justify-between gap-2 p-4">
            <div className="">
              <span className="text-black text-sm font-medium">{cuisine}</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Heart className="h-4 w-4 text-gray-400" />
              <span>{likes}</span>
            </div>
          </div>
          <CardContent className="p-3">
            <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
          </CardContent>
        </Link>
      </Card>
      <img
        src={src}
        alt={alt ?? "Mac & Cheese Fusion Bowls"}
        className="w-[40rem] h-[40rem] absolute top-[54%] left-1/2 transform -translate-1/2"
      />
    </div>
  );
}
