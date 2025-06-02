"use server"

import { createServerClient } from "./supabase"
import { redirect } from "next/navigation"

const supabase = createServerClient()

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    throw new Error(authError.message)
  }

  if (authData.user) {
    // Create user profile
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email,
      name,
    })

    if (profileError) {
      throw new Error(profileError.message)
    }
  }

  redirect("/auth?message=Check your email to confirm your account")
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  if (data.user) {
    redirect("/")
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }

  redirect("/auth")
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  return profile
}
