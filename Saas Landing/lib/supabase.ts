import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface GenerationRecord {
  id: string
  idea: string
  startup_name: string
  tagline: string
  target_audience: string
  landing_copy: string
  features: string[]
  pricing_plans: PricingPlan[]
  mvp_roadmap: RoadmapPhase[]
  created_at: string
}

export interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

export interface RoadmapPhase {
  phase: string
  duration: string
  tasks: string[]
}

export interface GenerationResult {
  startup_name: string
  tagline: string
  target_audience: string
  landing_copy: string
  features: string[]
  pricing_plans: PricingPlan[]
  mvp_roadmap: RoadmapPhase[]
}
