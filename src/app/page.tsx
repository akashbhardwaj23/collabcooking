"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { motion } from "motion/react"

export default function SplashPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    // Wait for animation to complete before checking auth
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 3000) // 3 second animation

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    //check if the loading is happening
    console.log("loading ", loading)
    // Only redirect after animation completes and auth is checked
    if (animationComplete && !loading) {
      const redirectTimer = setTimeout(() => {
        if (user) {
          router.push("/home")
        } else {
          router.push("/auth")
        }
      }, 500) // Small delay after animation

      return () => clearTimeout(redirectTimer)
    }
  }, [animationComplete, loading, user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center relative overflow-hidden">
      {/* Geometric background shapes */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-24 h-24 bg-orange-200/30 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-10 w-16 h-16 bg-red-200/20 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-20 h-20 bg-yellow-200/25 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Logo with animation */}
      <div className="text-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1,
          }}
          className="mb-4"
        >
          <motion.div
            className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <span className="text-white text-3xl">🔥</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl"
          >
            👨‍🍳
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Cuisine<span className="text-orange-500">Quest</span>
        </motion.h1>

        <motion.p
          className="text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Discover the secrets of great cuisine
        </motion.p>
      </div>
    </div>
  )
}
