"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TypewriterTextProps {
  words: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function TypewriterText({
  words,
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-[3px] h-[1em] ml-1 bg-gradient-to-b from-purple-500 to-blue-500 align-middle"
      />
    </span>
  )
}

interface TextScrambleProps {
  text: string
  className?: string
  duration?: number
  trigger?: boolean
}

const chars = "!<>-_\\/[]{}—=+*^?#________"

export function TextScramble({ 
  text, 
  className = "", 
  duration = 1000,
  trigger = true 
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    if (!trigger) return

    let iteration = 0
    const totalIterations = text.length * 3

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < Math.floor(iteration / 3)) {
              return text[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )

      iteration++
      if (iteration > totalIterations) {
        setDisplayText(text)
        clearInterval(interval)
      }
    }, duration / totalIterations)

    return () => clearInterval(interval)
  }, [text, duration, trigger])

  return <span className={className}>{displayText}</span>
}

interface MorphingTextProps {
  words: string[]
  className?: string
  interval?: number
}

export function MorphingText({ words, className = "", interval = 3000 }: MorphingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ 
            opacity: 0, 
            y: 20, 
            filter: "blur(10px)",
            scale: 0.9
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            scale: 1
          }}
          exit={{ 
            opacity: 0, 
            y: -20, 
            filter: "blur(10px)",
            scale: 0.9
          }}
          transition={{ 
            duration: 0.5, 
            ease: [0.4, 0, 0.2, 1] 
          }}
          className="inline-block gradient-text-animated"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

interface SplitTextProps {
  text: string
  className?: string
  charClassName?: string
  delay?: number
}

export function SplitText({ 
  text, 
  className = "", 
  charClassName = "",
  delay = 0
}: SplitTextProps) {
  return (
    <motion.span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${charClassName}`}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
