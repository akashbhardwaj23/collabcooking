"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Eye, EyeOff } from "lucide-react"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
    general?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateForm = (formData: FormData) => {
    const newErrors: typeof errors = {}

    if (isSignUp) {
      const name = formData.get("name") as string
      if (!name || name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters long"
      }
    }

    const email = formData.get("email") as string
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    const password = formData.get("password") as string
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long"
    }

    if (isSignUp) {
      const confirmPassword = formData.get("confirmPassword") as string
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)

    // console.log("form ", form);
    console.log("Form data ", data.getAll('email'))
    setErrors({})

    const validationErrors = validateForm(data)
    if (Object.keys(validationErrors).length > 0) {
      console.log("Error validation ", validationErrors)
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)

    try {
      const email = data.get("email") as string
      const password = data.get("password") as string

      if (isSignUp) {
        const name = data.get("name") as string

        // Sign up with Supabase
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        })

        if (authError) {
          console.log("Auth error ", authError)
          throw new Error(authError.message)
        }

        if (authData.user) {
          // Create user profile
          const { error: profileError } = await supabase.from("users").insert({
            id: authData.user.id,
            email,
            name,
          })

          console.log("profile created");
          console.log("supabase error ", profileError)

          if (profileError) {
            throw new Error(profileError.message)
          }

          // Show success message for email confirmation
          setErrors({
            general: "Success! Please check your email to confirm your account.",
          })
        }
      } else {
        // Sign in with Supabase
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (authError) {
          throw new Error(authError.message)
        }

        if (authData.user) {
          // Redirect to home page on successful sign in
          router.push("/")
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
      setErrors({
        general: error instanceof Error ? error.message : "An error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex relative">
      {/* Left Side - Food Images exactly as in screenshot */}
      <div className="absolute flex w-full h-full">
        <div className="w-full h-[60%] imgdiv">
          <img src="/images/food-collage.png" alt="Food Collage" className="w-full h-full object-cover" />
        </div>
      </div>
      

      {/* Right Side - Auth Form exactly as in screenshot */}
      <div className="absolute flex items-center justify-center font-roboto inset-8">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-4xl shadow-xl px-4 py-6 font-medium">
            <h2 className="text-2xl font-bold text-[#64A67E] mb-6">
              {isSignUp ? "Let's Sign Up" : "Let's Sign In"}
            </h2>

            {errors.general && (
              <div
                className={`mb-4 p-3 border rounded-xl text-sm ${
                  errors.general.includes("Success")
                    ? "bg-green-50 border-green-200 text-green-600"
                    : "bg-red-50 border-red-200 text-red-600"
                }`}
              >
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Username"
                    className={`h-12 border-0 rounded-md bg-[#FFF8F4] focus-visible:border-orange-400 focus-visible:border-3 ${errors.name ? "border-red-300" : ""}`}
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
              )}

              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={`h-12 border-0 rounded-md bg-[#FFF8F4] focus-visible:border-orange-400 focus-visible:border-3 ${errors.email ? "border-red-300" : ""}`}
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="relative">
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={`h-12 border-0 rounded-md bg-[#FFF8F4] focus-visible:border-orange-400 focus-visible:border-3 ${errors.password ? "border-red-300" : ""}`}
                  required
                />
                <div className="absolute top-3 right-3 cursor-pointer">
                <Eye />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {isSignUp && (
                <div className="relative">
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className={`h-12 border-0 rounded-md bg-[#FFF8F4] focus-visible:border-orange-400 focus-visible:border-3 ${errors.confirmPassword ? "border-red-300" : ""}`}
                    required
                  />
                   <div className="absolute top-3 right-3 cursor-pointer">
                   <EyeOff />
                </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              )}

              {!isSignUp && (
                <div className="text-right">
                  <button type="button" className="text-sm text-gray-500 hover:text-orange-500">
                    Forgot your password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-orange-400 to-orange-600 hover:bg-orange-600 rounded-xl text-white font-bold cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </form>

           
          </div>

           <div className="mt-6 text-center">
              <p className="text-gray-500 mb-4 line w-full">Or</p>
              <Button variant="outline" className="w-full h-12 rounded-xl border-0 justify-start text-black/60 font-bold cursor-pointer border-gray-200 hover:text-black/70">
                <svg className="w-10 h-10" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isSignUp ? "Sign up" : "Sign in"} with Google
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-500">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setErrors({})
                  }}
                  className="text-orange-400 hover:text-orange-600 font-bold cursor-pointer"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>{" "}
                now
              </p>
            </div>
        </div>
      </div>
    </div>
  )
}
