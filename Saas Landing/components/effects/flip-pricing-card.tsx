"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

interface FlipPricingCardProps {
  plan: PricingPlan
  index: number
}

export function FlipPricingCard({ plan, index }: FlipPricingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative h-[520px] perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl p-6 flex flex-col",
            "glass-card border border-border",
            plan.highlighted && "border-primary/40 glow-purple",
            "backface-hidden"
          )}
        >
          {plan.highlighted && (
            <>
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Popular
                </span>
              </div>
            </>
          )}
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold gradient-text">{plan.price}</span>
              <span className="text-muted-foreground">/{plan.period}</span>
            </div>
          </div>
          
          <Button
            className={cn(
              "w-full mb-6 h-11",
              plan.highlighted 
                ? "bg-primary hover:bg-primary/90 text-primary-foreground btn-glow" 
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            {plan.cta}
          </Button>
          
          <div className="flex-1 space-y-3">
            {plan.features.slice(0, 5).map((feature, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
            {plan.features.length > 5 && (
              <p className="text-xs text-muted-foreground/60 pt-2">
                + {plan.features.length - 5} more features...
              </p>
            )}
          </div>
          
          <p className="text-xs text-center text-muted-foreground/60 mt-4">
            Hover to see all features
          </p>
        </div>
        
        {/* Back of card */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl p-6 flex flex-col",
            "glass-strong border border-border",
            plan.highlighted && "border-primary/40 glow-purple",
            "backface-hidden"
          )}
          style={{ transform: "rotateY(180deg)" }}
        >
          <h3 className="text-xl font-semibold mb-2 gradient-text">{plan.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">All features included:</p>
          
          <div className="flex-1 overflow-auto space-y-2.5 pr-2 custom-scrollbar">
            {plan.features.map((feature, i) => (
              <motion.div 
                key={i} 
                className="flex items-start gap-3 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -10 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
          
          <Button
            className={cn(
              "w-full mt-4 h-11",
              plan.highlighted 
                ? "bg-primary hover:bg-primary/90 text-primary-foreground btn-glow" 
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            Get Started
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
