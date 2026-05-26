"use client"

import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  glow?: boolean
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "primary", size = "md", glow = true, children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
    
    const variants = {
      primary: cn(
        "bg-gradient-to-r from-primary to-accent text-primary-foreground",
        "hover:shadow-lg hover:shadow-primary/25",
        glow && "btn-glow"
      ),
      secondary: cn(
        "bg-secondary text-secondary-foreground",
        "hover:bg-secondary/80",
        "border border-border"
      ),
      outline: cn(
        "bg-transparent text-foreground",
        "border border-border hover:border-primary/50",
        "hover:bg-primary/5"
      )
    }
    
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-sm",
      lg: "h-13 px-8 text-base"
    }
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {/* Glow effect pseudo-element handled via CSS */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    )
  }
)

GlowButton.displayName = "GlowButton"
