"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Image from "next/image";

const chefs = [
  { name: "Shivra Khanna", avatar: "/images/female-chef.png", selected: false },
  { name: "Gordon Ramsay", avatar: "/images/gordon.png", selected: true },
  { name: "Vikas Khanna", avatar: "/images/vikas.png", selected: false },
  { name: "Alan Passard", avatar: "/images/male-chef.png", selected: false },
];

const dishCategories = [
  { name: "Breakfast", selected: true },
  { name: "Lunch", selected: false },
  { name: "Dinner", selected: false },
];

const cuisineTypes = [
  { name: "Indian", selected: true },
  { name: "Mexican", selected: false },
  { name: "Asian", selected: false },
  { name: "Vegetarian", selected: false },
];

const cookingMethods = [
  { name: "Baking", selected: true },
  { name: "Grilling", selected: false },
  { name: "Frying", selected: false },
  { name: "Roasting", selected: false },
];

export default function RecipeGeneratorPage() {
  const [ingredients, setIngredients] = useState(
    "Enter base ingredients here: Example: 1 Onion, 1 Garlic, 3 Tomatoes... 2 Carrots"
  );
  const [applyChefStyle, setApplyChefStyle] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedChef, setSelectedChef] = useState("Gordon Ramsay");
  const [michelinRecipe, setMichelinRecipe] = useState(true);
  const [selectedDishCategory, setSelectedDishCategory] = useState<string>(
    dishCategories[0].name
  );
  const [selectedCuisineType, setSelectedCuisineType] = useState<string>(
    cuisineTypes[0].name
  );
  const [selectedCookingMethod, setSelectedCookingMethod] = useState<string>(
    cookingMethods[0].name
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const router = useRouter();

  const handleLetsCook = async () => {
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      router.push("/recipe-result");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <Navbar />
        <div className="ml-12 md:ml-0">
          <Card className="bg-transparent border-none rounded-none shadow-none gap-0 p-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#64A67E]">
                Main Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full h-40 p-3 bg-white rounded-xl resize-none placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter base ingredients here..."
              />
            </CardContent>
          </Card>

          {/* Chef Style exactly as in screenshot */}
          <div className="px-6 py-4">
            <Card className="bg-white rounded-4xl border-none shadow-none md:w-[30rem]">
              <CardContent className="px-6 py-4">
                <p className="text-gray-900 font-medium mb-4 text-xs md:text-base">
                  Would you like to apply the style of popular chef ?
                </p>
                <div className="grid grid-cols-2 gap-2 md:gap-4 w-full">
                  <Button
                    onClick={() => setApplyChefStyle(true)}
                    className={`md:px-8 py-2 rounded-md ${
                      applyChefStyle
                        ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                        : "bg-[#F6E3D7] text-[#FC8801] w-full hover:bg-gray-200"
                    }`}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => setApplyChefStyle(false)}
                    className={`md:px-8 px-2 py-2 rounded-md ${
                      !applyChefStyle
                        ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                        : "bg-[#F6E3D7] text-[#FC8801] w-full hover:bg-gray-200"
                    }`}
                  >
                    No
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Country Selection exactly as in screenshot */}
          <Card className="bg-transparent border-none shadow-none mb-1 p-0">
            <CardContent className="px-6 py-4">
              <p className="text-[#64A67E] font-bold mb-4">
                Select the country of your chef
              </p>
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
                <SelectTrigger className="w-full h-12 rounded-sm bg-white border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="Italy">Italy</SelectItem>
                  <SelectItem value="Japan">Japan</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Chef Selection exactly as in screenshot */}
          <Card className="bg-transparent border-none shadow-none mb-1 p-0">
            <CardContent className="px-6 py-4 shadow-none">
              <p className="text-[#64A67E] font-bold mb-4">Pick your Chef</p>
              <div className="grid grid-cols-5 gap-4">
                {chefs.map((chef, index) => (
                  <div
                    key={index}
                    className={`text-center cursor-pointer p-3 rounded-xl transition-all ${
                      selectedChef === chef.name
                        ? "bg-orange-500 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedChef(chef.name)}
                  >
                    <div className="mb-8">
                      <Image
                        src={chef.avatar}
                        alt={chef.name}
                        width={800}
                        height={800}
                        className="w-30 h-30 rounded-xl shadow-2xs object-cover"
                      />
                    </div>
                    <p
                      className={`text-sm font-medium ${
                        selectedChef === chef.name
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {chef.name}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* All other sections exactly as in screenshot */}
          <Card className="bg-transparent border-none shadow-none mb-1 p-0">
            <CardContent className="px-6 py-4">
              <p className="text-[#64A67E] font-bold mb-4">
                Pick a Dish Category
              </p>
              <div className="flex space-x-3">
                {dishCategories.map((category, index) => (
                  <Badge
                    key={index}
                    className={`px-4 py-2 rounded-md shadow-md cursor-pointer ${
                      selectedDishCategory === category.name
                        ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                        : "text-[#FC8801] bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedDishCategory(category.name)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-none shadow-none mb-1 p-0">
            <CardContent className="px-6 py-4">
              <p className="text-[#64A67E] font-bold mb-4">Pick a Cuisine</p>
              <div className="flex flex-wrap gap-3">
                {cuisineTypes.map((cuisine, index) => (
                  <Badge
                    key={index}
                    className={`px-4 py-2 rounded-md shadow-sm cursor-pointer ${
                      selectedCuisineType === cuisine.name
                        ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                        : "bg-white text-[#FC8801] hover:bg-neutral-50"
                    }`}
                    onClick={() => setSelectedCuisineType(cuisine.name)}
                  >
                    {cuisine.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-none shadow-none mb-1 p-0">
            <CardContent className="px-6 py-4">
              <p className="text-[#64A67E] font-bold mb-4">Cooking Method</p>
              <div className="flex flex-wrap gap-3">
                {cookingMethods.map((method, index) => (
                  <Badge
                    key={index}
                    className={`px-4 py-2 rounded-md shadow-sm cursor-pointer ${
                      selectedCookingMethod === method.name
                        ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                        : "bg-white text-[#FC8801] hover:bg-neutral-50"
                    }`}
                    onClick={() => setSelectedCookingMethod(method.name)}
                  >
                    {method.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-none shadow-none mb-20 p-0">
            <CardContent className="px-6 py-4">
              <p className="text-[#64A67E] font-bold mb-4">
                Would you a Michelin Recipe ?
              </p>
              <div className="flex space-x-4">
                <Button
                  onClick={() => setMichelinRecipe(true)}
                  className={`px-8 py-2 rounded-md shadow-sm ${
                    michelinRecipe
                      ? "bg-gradient-to-r from-orange-400   to-orange-600 text-white"
                      : "bg-white text-[#FC8801] hover:bg-neutral-50"
                  }`}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setMichelinRecipe(false)}
                  className={`px-8 py-2 rounded-md shadow-sm ${
                    !michelinRecipe
                      ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                      : "bg-white text-[#FC8801] hover:bg-neutral-50"
                  }`}
                >
                  No
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button exactly as in screenshot */}
          <div className="px-6">
          <Button
            onClick={handleLetsCook}
            disabled={isGenerating}
            className="w-full h-14 bg-gradient-to-r from-orange-400    to-orange-600 cursor-pointer shadow-xl shadow-orange-200 hover:bg-orange-600 text-white font-semibold rounded-2xl text-lg"
          >
            {isGenerating ? "Generating Recipe..." : "Let's Cook"}
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
