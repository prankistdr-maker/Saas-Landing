"use client"

import dynamic from "next/dynamic"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  Sparkles, Zap, Map, DollarSign, Users, FileText,
  ArrowRight, CheckCircle2, Star, TrendingUp, Play,
  Brain, Rocket, Menu, X, ChevronRight, MousePointer2
} from "lucide-react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ParticleBackground } from "@/components/effects/particle-background"
import { AnimatedCounter } from "@/components/effects/animated-counter"
import { LogoMarquee } from "@/components/effects/logo-marquee"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/scroll-reveal"
import { FlipPricingCard } from "@/components/effects/flip-pricing-card"
import { GlassCard, GlassCardHighlighted } from "@/components/effects/glass-card"
import { MagneticButton, BorderAnimatedButton } from "@/components/effects/magnetic-button"
import { MorphingText, TypewriterText, SplitText } from "@/components/effects/text-animations"
import { CursorGlow } from "@/components/effects/cursor-glow"

// Dynamic imports for 3D components
const FloatingShapes = dynamic(
  () => import("@/components/three/floating-shapes").then(mod => mod.FloatingShapes),
  { ssr: false }
)

const MiniGlobe = dynamic(
  () => import("@/components/three/globe-3d").then(mod => mod.MiniGlobe),
  { ssr: false }
)

const features = [
  {
    icon: Brain,
    title: "AI Startup Name Generator",
    description: "Get a brandable, memorable startup name tailored to your niche and market positioning in seconds.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: FileText,
    title: "Landing Page Copy",
    description: "Full conversion-optimized landing page copy including hero, value props, and CTAs — ready to deploy.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: DollarSign,
    title: "Pricing Strategy",
    description: "Three-tier pricing plans with feature breakdown, optimized for your target market and revenue goals.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Users,
    title: "Target Audience Profile",
    description: "Detailed ICP definition including demographics, psychographics, pain points, and buying behavior.",
    gradient: "from-orange-500 to-yellow-500"
  },
  {
    icon: Map,
    title: "MVP Roadmap",
    description: "Week-by-week product development roadmap from zero to launch with prioritized feature milestones.",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: Zap,
    title: "Feature Blueprint",
    description: "Comprehensive feature list organized by priority to help you scope your product and impress investors.",
    gradient: "from-violet-500 to-purple-500"
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder @ NeuralCart",
    avatar: "SC",
    content: "StartupForge AI gave me a complete go-to-market strategy in 2 minutes. I used it to pitch to VCs and closed a $500K seed round.",
    rating: 5,
  },
  {
    name: "Marcus Williams",
    role: "CEO @ DevFlow",
    avatar: "MW",
    content: "I was stuck for weeks trying to name my startup. This tool generated 'DevFlow AI' and a perfect tagline instantly. Mind blown.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Product Lead @ TechStack",
    avatar: "PS",
    content: "The MVP roadmap feature alone is worth it. It saved me weeks of planning and gave our team a clear direction from day one.",
    rating: 5,
  },
]

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring ideas",
    features: [
      "5 generations per month",
      "Basic startup name + tagline",
      "Feature list generation",
      "Export as text",
    ],
    highlighted: false,
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "$29",
    period: "month",
    description: "For serious founders",
    features: [
      "Unlimited generations",
      "Full landing page copy",
      "3-tier pricing strategy",
      "MVP roadmap",
      "Target audience profile",
      "Export as PDF + Markdown",
      "Save & organize history",
      "Priority AI model",
    ],
    highlighted: true,
    cta: "Get Started",
  },
  {
    name: "Team",
    price: "$79",
    period: "month",
    description: "For startup teams",
    features: [
      "Everything in Pro",
      "5 team members",
      "Shared workspace",
      "Version history",
      "API access",
      "Custom AI training",
      "Slack integration",
      "Dedicated support",
    ],
    highlighted: false,
    cta: "Get Started",
  },
]

const stats = [
  { value: 50000, label: "Startups Generated", suffix: "+" },
  { value: 2.1, label: "Funding Raised", prefix: "$", suffix: "B", decimals: 1 },
  { value: 94, label: "Founder Satisfaction", suffix: "%" },
  { value: 2, label: "Avg. Generation Time", suffix: " min" },
]

const morphingWords = ["Fundable", "Scalable", "Innovative", "Successful"]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Cursor glow effect - desktop only */}
      <div className="hidden lg:block">
        <CursorGlow />
      </div>
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <div className="max-w-7xl mx-auto glass rounded-2xl border border-white/10">
            <div className="flex items-center justify-between h-16 px-6">
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Rocket className="w-5 h-5 text-white" />
                </motion.div>
                <span className="font-bold text-lg tracking-tight hidden sm:block">StartupForge AI</span>
              </motion.div>
              
              <div className="hidden md:flex items-center gap-1">
                {["Features", "How it Works", "Pricing", "Testimonials"].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                    className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors relative group rounded-lg hover:bg-white/5"
                  >
                    {item}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-1/2 transition-all duration-300" />
                  </motion.a>
                ))}
              </div>
              
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button variant="ghost" size="sm" className="hidden sm:flex text-white/70 hover:text-white hover:bg-white/5">
                  Sign in
                </Button>
                <MagneticButton size="sm">
                  Launch App
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                
                <button
                  className="md:hidden p-2 rounded-lg hover:bg-white/5"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 mt-2"
          >
            <div className="glass rounded-2xl border border-white/10 p-4 space-y-2">
              {["Features", "How it Works", "Pricing", "Testimonials"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-12 px-4 min-h-screen flex flex-col justify-center overflow-hidden">
        {/* 3D Floating shapes */}
        <div className="absolute inset-0 z-0">
          <FloatingShapes />
        </div>
        
        {/* Gradient mesh background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/30 blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-600/20 blur-[200px]" />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-bg opacity-20" />

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-6 px-4 py-2 text-sm bg-white/5 border-white/10 text-white backdrop-blur-sm inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Powered by GPT-4 Turbo
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
              >
                <SplitText text="Turn Your Idea Into" className="block" delay={0.2} />
                <span className="block mt-2">
                  <span className="text-white/90">A </span>
                  <MorphingText words={morphingWords} className="min-w-[200px]" />
                  <span className="text-white/90"> Startup</span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Generate a complete brand identity, landing page copy, pricing strategy, feature roadmap, and investor-ready pitch — 
                <span className="text-white font-medium"> in under 2 minutes.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
              >
                <MagneticButton size="lg" className="w-full sm:w-auto">
                  <Sparkles className="w-5 h-5" />
                  Generate Your Startup
                  <ChevronRight className="w-4 h-4 ml-1" />
                </MagneticButton>
                <BorderAnimatedButton size="lg" className="w-full sm:w-auto">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </BorderAnimatedButton>
              </motion.div>

              {/* Stats inline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-8"
              >
                {stats.slice(0, 3).map((stat, i) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <motion.div 
                      className="text-2xl sm:text-3xl font-bold gradient-text"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                    >
                      <AnimatedCounter 
                        end={stat.value} 
                        prefix={stat.prefix} 
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    </motion.div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right - 3D Globe (smaller, positioned) */}
            <motion.div 
              className="relative hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-[400px] h-[400px]">
                {/* Glow behind globe */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
                <MiniGlobe className="w-full h-full" />
                
                {/* Floating badges around globe */}
                <motion.div 
                  className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 text-xs flex items-center gap-2"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  50K+ Startups
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 text-xs flex items-center gap-2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  4.9 Rating
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 -right-8 glass rounded-xl px-3 py-2 text-xs"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <span className="gradient-text font-semibold">$2.1B</span> Raised
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-xs text-white/40">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <MousePointer2 className="w-4 h-4 text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof - Logo Marquee */}
      <section className="py-16 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5" />
        <ScrollReveal>
          <p className="text-center text-sm text-white/40 mb-8 uppercase tracking-widest">
            Trusted by founders at leading companies
          </p>
          <LogoMarquee />
        </ScrollReveal>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[200px]" />
        
        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10 mb-6"
            >
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/70">Everything You Need</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              From idea to pitch deck
              <br />
              <span className="gradient-text">in seconds, not weeks</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              StartupForge AI generates every piece of your startup foundation — so you can focus on building, not planning.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <StaggerItem key={feature.title}>
                <motion.div
                  className="group relative"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"
                    style={{ background: `linear-gradient(135deg, ${feature.gradient.split(' ')[1]}40, ${feature.gradient.split(' ')[3]}40)` }}
                  />
                  <GlassCard className="p-8 h-full relative overflow-hidden">
                    {/* Animated border on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-20`} />
                    </div>
                    
                    <motion.div 
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 relative`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-50`} />
                    </motion.div>
                    <h3 className="font-semibold text-xl mb-3 text-white">{feature.title}</h3>
                    <p className="text-white/50 leading-relaxed">{feature.description}</p>
                    
                    {/* Learn more link */}
                    <motion.div 
                      className="mt-6 flex items-center gap-2 text-sm text-white/40 group-hover:text-white/70 transition-colors cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </GlassCard>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Launch-ready in
              <span className="gradient-text"> 3 simple steps</span>
            </h2>
          </ScrollReveal>
          
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent -translate-y-1/2" />
            
            <StaggerContainer className="grid md:grid-cols-3 gap-8 relative">
              {[
                { step: "01", title: "Describe Your Idea", desc: "Type your startup concept in plain English — one sentence is enough to spark magic.", icon: FileText, color: "from-purple-500 to-violet-500" },
                { step: "02", title: "AI Generates Everything", desc: "Our GPT-4 powered engine crafts your name, copy, pricing, features, and roadmap.", icon: Brain, color: "from-violet-500 to-blue-500" },
                { step: "03", title: "Ship & Raise", desc: "Export your startup kit and start building — or walk into any VC meeting with confidence.", icon: Rocket, color: "from-blue-500 to-cyan-500" },
              ].map(({ step, title, desc, icon: Icon, color }, i) => (
                <StaggerItem key={step}>
                  <motion.div 
                    className="text-center relative"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Step number */}
                    <motion.div 
                      className="text-8xl font-bold text-white/5 absolute -top-8 left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                    >
                      {step}
                    </motion.div>
                    
                    <motion.div 
                      className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-8 relative`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="w-9 h-9 text-white" />
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${color} blur-2xl opacity-50`} />
                    </motion.div>
                    
                    <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
                    <p className="text-white/50 leading-relaxed max-w-xs mx-auto">{desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 px-4 relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-white/10 mb-6"
            >
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-white/70">Loved by 50,000+ Founders</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Trusted by builders
              <span className="gradient-text"> worldwide</span>
            </h2>
          </ScrollReveal>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <StaggerItem key={t.name}>
                <motion.div
                  whileHover={{ y: -10, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ transformPerspective: 1000 }}
                >
                  <GlassCard className="p-8 h-full relative overflow-hidden">
                    {/* Quote mark */}
                    <div className="absolute top-4 right-4 text-6xl text-white/5 font-serif">&ldquo;</div>
                    
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-white/80 leading-relaxed mb-8">&ldquo;{t.content}&rdquo;</p>
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold text-white"
                        whileHover={{ scale: 1.1 }}
                      >
                        {t.avatar}
                      </motion.div>
                      <div>
                        <div className="font-medium text-white">{t.name}</div>
                        <div className="text-sm text-white/50">{t.role}</div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[150px]" />
        
        <div className="relative max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-white/10 mb-6"
            >
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white/70">Simple, Transparent Pricing</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Invest in your
              <span className="gradient-text"> next big idea</span>
            </h2>
            <p className="text-lg text-white/50">Start free. Upgrade when you&apos;re ready to ship.</p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <FlipPricingCard plan={plan} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <ScrollReveal className="max-w-5xl mx-auto">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 animate-[gradient-shift_4s_ease_infinite] bg-[length:200%_auto]" />
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 grid-bg opacity-20" />
            
            {/* Floating shapes */}
            <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-pulse" />
            <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-white/20 rotate-45 animate-pulse" style={{ animationDelay: "0.5s" }} />
            
            <div className="relative p-12 sm:p-16 lg:p-20 text-center">
              <motion.div 
                className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-8"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Rocket className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to build something
                <br />
                <span className="text-white/80">extraordinary?</span>
              </h2>
              
              <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
                Join 50,000+ founders who have already transformed their ideas into funded startups. Your journey starts with one click.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl text-lg flex items-center gap-2 hover:bg-white/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Your Startup — Free
                </motion.button>
                <motion.button
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl text-lg flex items-center gap-2 border border-white/20 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </div>
              
              <p className="text-white/50 text-sm mt-6">No credit card required</p>
            </div>
          </motion.div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">StartupForge AI</span>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-white/50">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            
            <p className="text-sm text-white/30">
              2024 StartupForge AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
