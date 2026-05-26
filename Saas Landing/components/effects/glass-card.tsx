"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function GlassCard({ 
  children, 
  className = "",
  hover = true,
  glow = false
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white/[0.02] backdrop-blur-xl",
        "border border-white/[0.08]",
        hover && "transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.04]",
        glow && "glow-purple",
        className
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
}

interface GlassCardHighlightedProps extends GlassCardProps {
  accentColor?: "purple" | "blue" | "gradient"
}

export function GlassCardHighlighted({ 
  children, 
  className = "",
  accentColor = "gradient"
}: GlassCardHighlightedProps) {
  const accentStyles = {
    purple: "from-primary via-primary to-primary",
    blue: "from-accent via-accent to-accent",
    gradient: "from-primary via-accent to-primary"
  }
  
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white/[0.03] backdrop-blur-xl",
        "border border-primary/20",
        "glow-purple",
        className
      )}
    >
      {/* Top accent line */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-px",
        "bg-gradient-to-r from-transparent",
        accentStyles[accentColor],
        "to-transparent"
      )} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-accent/[0.02] pointer-events-none" />
      
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
}
