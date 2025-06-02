"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChefHat, Home, Heart, Download, Settings } from "lucide-react"

export function SidebarNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
      <div className="flex flex-col items-center space-y-6 py-4">
        <Link href="/">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              isActive("/") ? "bg-orange-500" : "hover:bg-gray-100"
            }`}
          >
            <Home className={`h-5 w-5 ${isActive("/") ? "text-white" : "text-gray-500"}`} />
          </div>
        </Link>
        <Link href="/generator">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              isActive("/generator") ? "bg-orange-500" : "hover:bg-gray-100"
            }`}
          >
            <ChefHat className={`h-5 w-5 ${isActive("/generator") ? "text-white" : "text-gray-500"}`} />
          </div>
        </Link>
        <Link href="/favourites">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              isActive("/favourites") ? "bg-orange-500" : "hover:bg-gray-100"
            }`}
          >
            <Heart className={`h-5 w-5 ${isActive("/favourites") ? "text-white" : "text-gray-500"}`} />
          </div>
        </Link>
        <Link href="/my-recipes">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              isActive("/my-recipes") ? "bg-orange-500" : "hover:bg-gray-100"
            }`}
          >
            <Download className={`h-5 w-5 ${isActive("/my-recipes") ? "text-white" : "text-gray-500"}`} />
          </div>
        </Link>
        <Link href="/profile">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              isActive("/profile") ? "bg-orange-500" : "hover:bg-gray-100"
            }`}
          >
            <Settings className={`h-5 w-5 ${isActive("/profile") ? "text-white" : "text-gray-500"}`} />
          </div>
        </Link>
      </div>
    </div>
  )
}
