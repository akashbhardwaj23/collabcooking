"use client";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  Heart,
  ChefHat,
  Home,
  Settings,
  Download,
  SquareChevronLeft,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br font-roboto from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header exactly as in screenshot */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 flex items-center justify-center mr-1">
          <SquareChevronLeft className="text-neutral-600" />
          </div>
          <h1 className="text-2xl font-bold text-orange-500">My account</h1>
        </div>

        {/* Profile Card exactly as in screenshot */}
        <Card className="bg-white rounded-2xl shadow-xl mb-20">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                <img
                  src="/images/naruto-avatar.png"
                  alt="Profile"
                  className="w-full h-full shadow-md shadow-orange-400 object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {user?.name}
                </h2>
              <p className="text-gray-500 text-sm">
                {user?.email}
              </p>
            </div>
          </CardContent>
          <Link href="/profile/edit">
            <CardContent className="p-4">
              <div className="flex items-center justify-between rounded-2xl p-4 bg-[#FFF8F4] hover:bg-[#FFE9DC]">
                <span className="text-gray-900">Edit Account Information</span>
                <ChevronRight className="h-5 w-5 text-black" />
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* Subscription section exactly as in screenshot */}
        <div className="mb-40">
        <div className="flex items-center justify-between mb-2 font-bold">
          <span className="text-[#64A67E]">Subscription model</span>
          <span className="text-green-600 font-medium">FREE</span>
        </div>

        <Link href="/subscription">
          <Button className="w-full h-12 bg-gradient-to-r from-orange-400 to-orange-600 hover:bg-orange-600 rounded-lg text-white font-medium mb-6">
            Subscribe Now
          </Button>
        </Link>
        </div>

        {/* Menu items exactly as in screenshot */}
        <Link href="/notifications">
          <Card className="bg-white rounded-2xl p-4 shadow-sm mb-4 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <span className="text-gray-900 text-sm">Notification</span>
                <div className="flex items-center">
                  <Label className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/about">
          <Card className="bg-white rounded-2xl p-4 shadow-sm mb-4 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-900">About us</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/terms">
          <Card className="bg-white rounded-2xl p-4 shadow-sm mb-6 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-900">Terms and Conditions</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Logout button exactly as in screenshot */}
        <Button
          variant="outline"
          className="w-full h-12 bg-transparent cursor-pointer border-orange-500 text-orange-500 hover:bg-orange-50 rounded-xl font-medium"
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
