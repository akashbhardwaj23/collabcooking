"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Share2, SquareChevronLeft } from "lucide-react";
import Link from "next/link";

export default function RecipeResultPage() {
  const [liked, setLiked] = useState(false);

  const ingredients = [
    "1 cup Emperor's green rice",
    "4 edible stones",
    "2 tablespoons vegetable broth or low fat cooking spray",
    "4 bay leaves",
    "6 green cardamom pods",
    "2 two-inch-long cinnamon sticks",
    "1 two-inch-long fresh ginger, peeled and minced",
    "1/2 cup water",
    "1/2 cup finely chopped fresh cilantro",
    "1 teaspoon salt",
    "1 teaspoon black pepper",
    "1 teaspoon coriander powder",
    "1/2 teaspoon garam masala",
    "1/2 cup sliced almonds, toasted",
    "Lime wedges and cilantro sprigs, for garnish",
  ];

  const makingProcess =
    "Enter base ingredients here: Example: 1 Onion, 1 Garlic, 3 Tomatoes... 2 Carrots";

  return (
    <div className="min-h-screen max-w-5xl mx-auto bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="bg-white rounded-xl p-0 h-[42rem] overflow-hidden mb-4">
        <div className="flex items-center justify-between px-4 pt-4">
          <Link
            href="/generator"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <SquareChevronLeft className="text-neutral-600" />

          </Link>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-0 shadow-none"
              onClick={() => setLiked(!liked)}
            >
              <Heart
                className={`h-4 w-4 ${
                  liked ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-0 shadow-none"
            >
              <Share2 className="h-8 w-8 text-red-600" />
            </Button>
          </div>
        </div>
        <div className="relative w-full h-full rounded-xl">
          <img
            src="/images/croissant.png"
            alt="Generated Recipe"
            className="w-full h-[60rem] rounded-xl bg-center object-cover"
          />
        </div>
      </div>

      {/* Two column layout exactly as in screenshot */}
      <div className="grid grid-cols-2 gap-3">
        {/* Ingredients exactly as in screenshot */}
        <Card className="bg-transparent border-none shadow-none gap-0">
          <CardHeader className="p-0">
            <CardTitle>
              <h2 className="text-[#64A67E] font-bold mb-2 text-xl">
                Ingredients Used
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-white shadow-xs rounded-xl">
            <ul className="space-y-1">
              {ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-start text-sm font-medium"
                >
                  <span className="text-gray-400 mr-1 mt-0.5">•</span>
                  <span className="text-neutral-600/80 leading-relaxed">
                    {ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Making Process exactly as in screenshot */}
        <Card className="bg-transparent border-none shadow-none gap-0">
          <CardContent className="p-4">
            <h2 className="text-[#64A67E] font-bold mb-2 text-xl">
              Making Process
            </h2>
            <textarea
              value={makingProcess}
              readOnly
              className="w-full h-32 p-4 shadow-md rounded-lg resize-none focus:outline-none bg-white text-lg text-neutral-400"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
