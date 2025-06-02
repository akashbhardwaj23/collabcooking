"use server"

import { createServerClient } from "./supabase"
import type { CreateRecipeData, Recipe } from "./types"
import { revalidatePath } from "next/cache"

const supabase = createServerClient()

export async function createRecipe(data: CreateRecipeData, userId: string) {
  // Create the recipe
  const { data: recipe, error: recipeError } = await supabase
    .from("recipes")
    .insert({
      title: data.title,
      description: data.description,
      servings: data.servings,
      cook_time: data.cook_time,
      image_url: data.image_url,
      is_public: data.is_public,
      created_by: userId,
    })
    .select()
    .single()

  if (recipeError) {
    throw new Error(recipeError.message)
  }

  // Add ingredients
  if (data.ingredients.length > 0) {
    const ingredients = data.ingredients.map((ingredient, index) => ({
      ...ingredient,
      recipe_id: recipe.id,
      order_index: index,
    }))

    const { error: ingredientsError } = await supabase.from("ingredients").insert(ingredients)

    if (ingredientsError) {
      throw new Error(ingredientsError.message)
    }
  }

  // Add steps
  if (data.steps.length > 0) {
    const steps = data.steps.map((step, index) => ({
      ...step,
      recipe_id: recipe.id,
      order_index: index,
    }))

    const { error: stepsError } = await supabase.from("recipe_steps").insert(steps)

    if (stepsError) {
      throw new Error(stepsError.message)
    }
  }

  // Add tags
  if (data.tags.length > 0) {
    const tags = data.tags.map((tag) => ({
      recipe_id: recipe.id,
      tag,
    }))

    const { error: tagsError } = await supabase.from("recipe_tags").insert(tags)

    if (tagsError) {
      throw new Error(tagsError.message)
    }
  }

  // Add creator as owner collaborator
  const { error: collaboratorError } = await supabase.from("recipe_collaborators").insert({
    recipe_id: recipe.id,
    user_id: userId,
    role: "owner",
    accepted_at: new Date().toISOString(),
  })

  if (collaboratorError) {
    throw new Error(collaboratorError.message)
  }

  revalidatePath("/recipes")
  return recipe
}

export async function getRecipes(limit = 10, offset = 0) {
  const { data, error } = await supabase
    .from("recipes")
    .select(`
      *,
      author:users!recipes_created_by_fkey(id, name, avatar_url),
      tags:recipe_tags(tag),
      collaborators:recipe_collaborators(
        id,
        role,
        user:users(id, name, avatar_url)
      ),
      ratings:recipe_ratings(rating)
    `)
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    throw new Error(error.message)
  }

  // Calculate average ratings
  const recipesWithRatings = data.map((recipe) => ({
    ...recipe,
    average_rating:
      recipe.ratings.length > 0
        ? recipe.ratings.reduce((sum: number, r) => sum + r.rating, 0) / recipe.ratings.length
        : 0,
  }))

  return recipesWithRatings as Recipe[]
}

export async function getRecipeById(id: string) {
  const { data, error } = await supabase
    .from("recipes")
    .select(`
      *,
      author:users!recipes_created_by_fkey(id, name, avatar_url),
      tags:recipe_tags(tag),
      ingredients(*, order_index),
      steps:recipe_steps(*, order_index),
      collaborators:recipe_collaborators(
        id,
        role,
        user:users(id, name, avatar_url)
      ),
      ratings:recipe_ratings(
        rating,
        review,
        created_at,
        user:users(id, name, avatar_url)
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // Sort ingredients and steps by order_index
  data.ingredients = data.ingredients.sort((a, b) => a.order_index - b.order_index)
  data.steps = data.steps.sort((a, b) => a.order_index - b.order_index)

  // Calculate average rating
  const averageRating =
    data.ratings.length > 0 ? data.ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / data.ratings.length : 0

  return { ...data, average_rating: averageRating } as Recipe
}

export async function inviteCollaborator(recipeId: string, email: string, invitedBy: string) {
  // First, find the user by email
  const { data: user, error: userError } = await supabase.from("users").select("id").eq("email", email).single()

  if (userError || !user) {
    throw new Error("User not found")
  }

  // Check if already a collaborator
  const { data: existing } = await supabase
    .from("recipe_collaborators")
    .select("id")
    .eq("recipe_id", recipeId)
    .eq("user_id", user.id)
    .single()

  if (existing) {
    throw new Error("User is already a collaborator")
  }

  // Add as collaborator
  const { error } = await supabase.from("recipe_collaborators").insert({
    recipe_id: recipeId,
    user_id: user.id,
    role: "collaborator",
    invited_by: invitedBy,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath(`/recipes/${recipeId}`)
}

export async function rateRecipe(recipeId: string, userId: string, rating: number, review?: string) {
  const { error } = await supabase.from("recipe_ratings").upsert({
    recipe_id: recipeId,
    user_id: userId,
    rating,
    review,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath(`/recipes/${recipeId}`)
}

export async function searchRecipes(query: string, tags?: string[]) {
  let queryBuilder = supabase
    .from("recipes")
    .select(`
      *,
      author:users!recipes_created_by_fkey(id, name, avatar_url),
      tags:recipe_tags(tag),
      collaborators:recipe_collaborators(
        id,
        role,
        user:users(id, name, avatar_url)
      ),
      ratings:recipe_ratings(rating)
    `)
    .eq("is_public", true)

  if (query) {
    queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`)
  }

  const { data, error } = await queryBuilder.order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  let filteredData = data

  // Filter by tags if provided
  if (tags && tags.length > 0) {
    filteredData = data.filter((recipe) => recipe.tags.some((tag: any) => tags.includes(tag.tag)))
  }

  // Calculate average ratings
  const recipesWithRatings = filteredData.map((recipe) => ({
    ...recipe,
    average_rating:
      recipe.ratings.length > 0
        ? recipe.ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / recipe.ratings.length
        : 0,
  }))

  return recipesWithRatings as Recipe[]
}
