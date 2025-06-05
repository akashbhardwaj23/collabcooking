"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ChevronLeft, SquareChevronLeft } from "lucide-react"
import Link from "next/link"

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("monthly")

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/profile">
          <div className="w-10 h-10 flex items-center justify-center mr-1">
          <SquareChevronLeft className="text-neutral-600" />
          </div>
          </Link>
          <h1 className="text-2xl font-bold text-[#FC8801]">Subscription plans</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:h-[40rem]">
          <div className="md:col-span-2 h-full">
            <Card className="bg-white rounded-xl border-none shadow-xl overflow-hidden h-full">
              <CardContent className="p-0 h-full">
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 text-center">Feature explanation graphic here</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-white border-none rounded-xl shadow-xl h-full">
              <CardContent className="p-6 flex flex-col h-full justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Premium Features</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Unlimited recipes</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Advanced filters</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Nutritional analysis</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Meal planning</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Ad-free experience</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            <div
              className={`h-2 w-8 rounded-full ${selectedPlan === "monthly" ? "bg-orange-500" : "bg-gray-300"}`}
            ></div>
            <div
              className={`h-2 w-2 rounded-full ${selectedPlan === "yearly" ? "bg-orange-500" : "bg-gray-300"}`}
            ></div>
            <div className={`h-2 w-2 rounded-full bg-gray-300`}></div>
          </div>
        </div>

        <p className="text-[#64A67E] font-bold mb-4">Pick a plan</p>

        <div className="grid grid-cols-2 mb-6 items-center">
          <Card
            className={`bg-white relative w-40 md:w-52 h-32 rounded-4xl shadow-sm cursor-pointer ${
              selectedPlan === "monthly" ? "bg-orange-500" : ""
            }`}
            onClick={() => setSelectedPlan("monthly")}
          >
            <CardContent>
              <div className="absolute right-1 -top-2 bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full inline-block mb-2">
                Save 50%
              </div>
              <div className="flex flex-col items-baseline">
                <span className={`text-sm line-through mr-1 ${selectedPlan === "monthly" ? "text-white/70" : "text-gray-400 "}`}>₹99.00</span>
                <span className={`text-2xl font-bold  ${selectedPlan === "monthly" ? "text-white" : "text-gray-900"}`}>₹ 49.00</span>
              </div>
              <p className={`text-sm ${selectedPlan === "monthly" ? "text-white/80" : "text-gray-500 "}`}>per month</p>
            </CardContent>
          </Card>

          <Card
            className={`bg-white relative w-40 md:w-52 h-32 rounded-4xl shadow-sm cursor-pointer ${
              selectedPlan === "yearly" ? "bg-orange-500" : ""
            }`}
            onClick={() => setSelectedPlan("yearly")}
          >
            <CardContent>
              <div className="absolute right-1 -top-2 bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full inline-block mb-2">
                Save 25%
              </div>
              <div className="flex flex-col items-baseline">
                <span className={`text-sm line-through mr-1 ${selectedPlan === "yearly" ? "text-white/70" : "text-gray-400 "}`}>₹599.00</span>
                <span className={`text-2xl font-bold ${selectedPlan === "yearly" ? "text-white" : "text-gray-900"}`}>₹ 499.00</span>
              </div>
              <p className={`text-sm ${selectedPlan === "yearly" ? "text-white/80" : "text-gray-500 "}`}>per year</p>
            </CardContent>
          </Card>
        </div>

        {/* Subscribe button exactly as in screenshot */}
        <Button className="w-full h-14 bg-gradient-to-r from-orange-400 to-orange-600 hover:bg-orange-600 text-white font-semibold rounded-2xl text-lg">
          Subscribe Now
        </Button>
      </div>
    </div>
  )
}
