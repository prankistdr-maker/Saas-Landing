"use client"

import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  magneticStrength?: number
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ className, variant = "primary", size = "md", magneticStrength = 0.3, children, ...props }, ref) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      setPosition({ x: x * magneticStrength, y: y * magneticStrength })
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group"
    
    const variants = {
      primary: cn(
        "bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 text-white",
        "shadow-[0_0_30px_rgba(139,92,246,0.3)]",
        "hover:shadow-[0_0_50px_rgba(139,92,246,0.5)]"
      ),
      secondary: cn(
        "bg-white/5 text-white border border-white/10",
        "hover:bg-white/10 hover:border-white/20"
      ),
      outline: cn(
        "bg-transparent text-white",
        "border-2 border-purple-500/50",
        "hover:border-purple-500 hover:bg-purple-500/10"
      ),
      ghost: cn(
        "bg-transparent text-white",
        "hover:bg-white/5"
      )
    }
    
    const sizes = {
      sm: "h-10 px-5 text-sm",
      md: "h-12 px-7 text-sm",
      lg: "h-14 px-10 text-base"
    }
    
    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        {...props}
      >
        {/* Shine effect */}
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </span>
        
        {/* Inner glow on hover */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/5 to-transparent rounded-xl" />
        
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </motion.button>
    )
  }
)

MagneticButton.displayName = "MagneticButton"

// Animated border button
interface BorderAnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
}

export const BorderAnimatedButton = forwardRef<HTMLButtonElement, BorderAnimatedButtonProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    const sizes = {
      sm: "h-10 px-5 text-sm",
      md: "h-12 px-7 text-sm",
      lg: "h-14 px-10 text-base"
    }
    
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-medium rounded-xl bg-background text-foreground overflow-hidden group",
          sizes[size],
          className
        )}
        {...props}
      >
        {/* Animated gradient border */}
        <span className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-[length:200%_auto] animate-[gradient-shift_3s_linear_infinite]">
          <span className="absolute inset-[2px] rounded-[10px] bg-background" />
        </span>
        
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    )
  }
)

BorderAnimatedButton.displayName = "BorderAnimatedButton"

// Ripple effect button
interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ className, variant = "primary", size = "md", children, onClick, ...props }, ref) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      
      setRipples(prev => [...prev, { x, y, id }])
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id))
      }, 600)
      
      onClick?.(e)
    }

    const variants = {
      primary: "bg-gradient-to-r from-purple-600 to-blue-600 text-white",
      secondary: "bg-white/5 text-white border border-white/10"
    }
    
    const sizes = {
      sm: "h-10 px-5 text-sm",
      md: "h-12 px-7 text-sm",
      lg: "h-14 px-10 text-base"
    }
    
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 overflow-hidden",
          variants[variant],
          sizes[size],
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-[ripple_0.6s_ease-out_forwards] pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    )
  }
)

RippleButton.displayName = "RippleButton"
