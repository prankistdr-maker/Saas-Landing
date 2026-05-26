import type { GenerationResult } from "./supabase"

const mockGenerations: GenerationResult[] = [
  {
    startup_name: "NeuralCart",
    tagline: "AI-powered shopping that knows what you want before you do.",
    target_audience: "Online shoppers aged 25-45 who value personalized experiences and spend $500+ monthly on e-commerce platforms. Early adopters comfortable with AI recommendations.",
    landing_copy: "Stop wasting hours browsing endless product pages. NeuralCart's deep learning engine analyzes your purchase history, browsing patterns, and even mood signals to surface exactly what you need — often before you know you need it. Join 50,000 shoppers already saving 3 hours a week.",
    features: [
      "Predictive shopping engine with 94% accuracy",
      "Real-time price drop alerts across 200+ retailers",
      "Smart wishlist with purchase timing recommendations",
      "Visual search: snap a photo, find the product",
      "Budget optimizer with monthly spend insights",
      "One-click checkout across all integrated stores",
      "AI stylist for fashion recommendations",
    ],
    pricing_plans: [
      {
        name: "Free",
        price: "$0",
        description: "Perfect for casual shoppers",
        features: ["Up to 50 product recommendations/mo", "3 retailer integrations", "Basic price alerts", "Email support"],
        highlighted: false,
      },
      {
        name: "Pro",
        price: "$12",
        description: "For serious shoppers",
        features: ["Unlimited recommendations", "200+ retailer integrations", "Real-time price alerts", "Visual search", "Budget optimizer", "Priority support"],
        highlighted: true,
      },
      {
        name: "Family",
        price: "$29",
        description: "For the whole household",
        features: ["Everything in Pro", "Up to 6 profiles", "Shared wishlists", "Group budget tracking", "Dedicated account manager"],
        highlighted: false,
      },
    ],
    mvp_roadmap: [
      {
        phase: "Phase 1 — Foundation",
        duration: "Weeks 1-4",
        tasks: ["User authentication & onboarding flow", "Basic recommendation engine (collaborative filtering)", "Integration with top 5 retailers via API", "Product database with 1M+ SKUs"],
      },
      {
        phase: "Phase 2 — Intelligence",
        duration: "Weeks 5-10",
        tasks: ["Deep learning model training on user behavior", "Price tracking infrastructure", "Visual search MVP using CLIP embeddings", "Mobile app (React Native)"],
      },
      {
        phase: "Phase 3 — Scale",
        duration: "Weeks 11-16",
        tasks: ["200+ retailer integrations", "Budget optimizer feature", "Referral program launch", "B2B API for retailer partnerships", "Series A preparation"],
      },
    ],
  },
  {
    startup_name: "DevFlow AI",
    tagline: "Ship 10x faster. Debug in seconds. Code like a senior engineer.",
    target_audience: "Individual developers and small engineering teams (2-20 people) at startups and agencies. Primarily mid-level engineers who want to level up without years of experience.",
    landing_copy: "DevFlow AI is your always-on senior engineer. Get instant code reviews, catch bugs before they hit production, auto-generate documentation, and receive architecture recommendations tailored to your stack. Stop googling — start shipping.",
    features: [
      "AI code review with security vulnerability detection",
      "Automated PR descriptions and changelog generation",
      "Smart debugging: paste error, get fix in seconds",
      "Architecture diagram generation from codebase",
      "Tech debt scoring and prioritization",
      "Auto-generated unit tests with 85%+ coverage",
      "Stack-specific best practice enforcement",
    ],
    pricing_plans: [
      {
        name: "Solo",
        price: "$19",
        description: "For individual developers",
        features: ["1 developer seat", "Unlimited code reviews", "Bug detection & fixes", "Basic documentation gen", "Community support"],
        highlighted: false,
      },
      {
        name: "Team",
        price: "$49",
        description: "For growing teams",
        features: ["Up to 10 seats", "Everything in Solo", "PR automation", "Architecture diagrams", "Custom rules engine", "Slack integration"],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "$199",
        description: "For scaling organizations",
        features: ["Unlimited seats", "Everything in Team", "SOC2 compliance", "On-premise deployment", "Custom model fine-tuning", "SLA guarantee"],
        highlighted: false,
      },
    ],
    mvp_roadmap: [
      {
        phase: "Phase 1 — Core Product",
        duration: "Weeks 1-6",
        tasks: ["VS Code & GitHub integration", "Basic code review engine", "Error explanation feature", "Documentation generator v1"],
      },
      {
        phase: "Phase 2 — Intelligence Layer",
        duration: "Weeks 7-12",
        tasks: ["Fine-tune model on 10M+ code samples", "Auto-test generation", "Security scanner", "JetBrains IDE plugin"],
      },
      {
        phase: "Phase 3 — Platform",
        duration: "Weeks 13-20",
        tasks: ["Team collaboration features", "CI/CD pipeline integrations", "Enterprise SSO", "Analytics dashboard", "Public API launch"],
      },
    ],
  },
]

export function getMockGeneration(idea: string): GenerationResult {
  const seed = idea.length % mockGenerations.length
  const base = mockGenerations[seed]
  return base
}

export const sampleIdeas = [
  "An AI tool that generates personalized workout plans based on your body metrics and goals",
  "A marketplace for freelance AI prompt engineers",
  "An app that turns your meeting notes into structured action items automatically",
  "A SaaS tool that helps small restaurants compete with DoorDash using their own ordering system",
]
