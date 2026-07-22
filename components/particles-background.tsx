"use client"

import { useEffect, useState } from "react"

type Particle = {
  left: number
  bottom: number
  size: number
  delay: number
  duration: number
  blue: boolean
}

// Deterministic pseudo-random so SSR and client match, generated after mount.
function makeParticles(count: number): Particle[] {
  const out: Particle[] = []
  let seed = 42
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  for (let i = 0; i < count; i++) {
    out.push({
      left: rand() * 100,
      bottom: rand() * 100,
      size: 1 + rand() * 2.5,
      delay: rand() * 12,
      duration: 8 + rand() * 10,
      blue: rand() > 0.5,
    })
  }
  return out
}

export function ParticlesBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(makeParticles(36))
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="cyber-grid absolute inset-0 opacity-40" />
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.blue
              ? "oklch(0.72 0.16 220)"
              : "oklch(0.66 0.22 290)",
            boxShadow: p.blue
              ? "0 0 8px oklch(0.72 0.16 220 / 0.8)"
              : "0 0 8px oklch(0.66 0.22 290 / 0.8)",
            animation: `float-particle ${p.duration}s ${p.delay}s infinite linear`,
          }}
        />
      ))}
    </div>
  )
}
