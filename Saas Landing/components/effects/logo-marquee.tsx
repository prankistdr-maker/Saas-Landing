"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const companyLogos = [
  { name: "Vercel", svg: "/logos/vercel.svg" },
  { name: "Stripe", svg: "/logos/stripe.svg" },
  { name: "Notion", svg: "/logos/notion.svg" },
  { name: "Linear", svg: "/logos/linear.svg" },
  { name: "Figma", svg: "/logos/figma.svg" },
  { name: "Slack", svg: "/logos/slack.svg" },
  { name: "Discord", svg: "/logos/discord.svg" },
  { name: "GitHub", svg: "/logos/github.svg" },
]

export function LogoMarquee() {
  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      {/* Marquee container */}
      <div className="flex gap-16 marquee">
        {/* First set of logos */}
        {[...companyLogos, ...companyLogos].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex items-center justify-center min-w-[120px] h-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <LogoPlaceholder name={logo.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

function LogoPlaceholder({ name }: { name: string }) {
  // Using text-based logos for now - replace with actual SVG logos
  return (
    <div className="flex items-center gap-2 px-4">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-border">
        <span className="text-sm font-bold text-primary/60">{name[0]}</span>
      </div>
      <span className="text-lg font-semibold text-muted-foreground whitespace-nowrap">{name}</span>
    </div>
  )
}
