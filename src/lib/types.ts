export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Recipe {
  id: string
  title: string
  description?: string
  servings: number
  cook_time?: string
  image_url?: string
  is_public: boolean
  created_by: string
  created_at: string
  updated_at: string
  author?: User
  collaborators?: RecipeCollaborator[]
  tags?: RecipeTag[]
  ingredients?: Ingredient[]
  steps?: RecipeStep[]
  ratings?: RecipeRating[]
  average_rating?: number
}

export interface Ingredient {
  id: string
  recipe_id: string
  name: string
  amount: number
  unit: string
  order_index: number
  created_at: string
}

export interface RecipeStep {
  id: string
  recipe_id: string
  instruction: string
  timer_minutes?: number
  order_index: number
  created_at: string
}

export interface RecipeTag {
  id: string
  recipe_id: string
  tag: string
  created_at: string
}

export interface RecipeCollaborator {
  id: string
  recipe_id: string
  user_id: string
  role: "owner" | "collaborator"
  invited_by?: string
  invited_at: string
  accepted_at?: string
  user?: User
}

export interface RecipeRating {
  id: string
  recipe_id: string
  user_id: string
  rating: number
  review?: string
  created_at: string
  user?: User
}

export interface CreateRecipeData {
  title: string
  description?: string
  servings: number
  cook_time?: string
  image_url?: string
  is_public: boolean
  tags: string[]
  ingredients: Omit<Ingredient, "id" | "recipe_id" | "created_at">[]
  steps: Omit<RecipeStep, "id" | "recipe_id" | "created_at">[]
}
