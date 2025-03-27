"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface StarParticleProps {
  color: string
  size: number
  top: string
  left: string
  duration: number
  delay: number
}

export function StarParticle({ color, size, top, left, duration, delay }: StarParticleProps) {
  const [randomPath, setRandomPath] = useState<number[][]>([])

  useEffect(() => {
    // Generate random path points
    const points = []
    const steps = 5

    for (let i = 0; i <= steps; i++) {
      const xOffset = Math.random() * 100 - 50 // -50 to 50
      points.push([xOffset, (i / steps) * 120]) // Move down the screen with random x offsets
    }

    setRandomPath(points)
  }, [])

  if (randomPath.length === 0) return null

  return (
    <motion.div
      className="absolute"
      style={{
        top,
        left,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        pathOffset: [0, 1],
        y: [0, window.innerHeight],
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <div className="relative">
        <motion.div
          className="absolute"
          animate={{
            x: randomPath.map((p) => p[0]),
            y: randomPath.map((p) => p[1]),
          }}
          transition={{
            duration,
            times: randomPath.map((_, i) => i / (randomPath.length - 1)),
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: `${size}rem`,
              height: `${size}rem`,
              background: `radial-gradient(circle at center, ${color} 0%, rgba(255,255,255,0) 70%)`,
              boxShadow: `0 0 ${size * 5}px ${color}`,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

