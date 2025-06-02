"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("monthly")

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header exactly as in screenshot */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-lg">🔥</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription plans</h1>
        </div>

        <div className="mb-6">
          <Link href="/profile" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Link>
        </div>

        {/* Layout exactly as in screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <Card className="bg-white rounded-2xl shadow-sm overflow-hidden h-full">
              <CardContent className="p-0 h-full">
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 text-center">Feature explanation graphic here</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-white rounded-2xl shadow-sm h-full">
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

        {/* Progress dots exactly as in screenshot */}
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

        <p className="text-gray-700 mb-4">Pick a plan</p>

        {/* Plan cards exactly as in screenshot */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card
            className={`bg-white rounded-2xl shadow-sm cursor-pointer ${
              selectedPlan === "monthly" ? "border-2 border-orange-500" : ""
            }`}
            onClick={() => setSelectedPlan("monthly")}
          >
            <CardContent className="p-4">
              <div className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full inline-block mb-2">
                Save 50%
              </div>
              <div className="flex items-baseline">
                <span className="text-gray-400 text-sm line-through mr-1">₹99.00</span>
                <span className="text-2xl font-bold text-gray-900">₹ 49.00</span>
              </div>
              <p className="text-gray-500 text-sm">per month</p>
            </CardContent>
          </Card>

          <Card
            className={`bg-white rounded-2xl shadow-sm cursor-pointer ${
              selectedPlan === "yearly" ? "border-2 border-orange-500" : ""
            }`}
            onClick={() => setSelectedPlan("yearly")}
          >
            <CardContent className="p-4">
              <div className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full inline-block mb-2">
                Save 25%
              </div>
              <div className="flex items-baseline">
                <span className="text-gray-400 text-sm line-through mr-1">₹599.00</span>
                <span className="text-2xl font-bold text-gray-900">₹ 499.00</span>
              </div>
              <p className="text-gray-500 text-sm">per year</p>
            </CardContent>
          </Card>
        </div>

        {/* Subscribe button exactly as in screenshot */}
        <Button className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl text-lg">
          Subscribe Now
        </Button>
      </div>
    </div>
  )
}
