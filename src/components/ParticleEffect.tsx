'use client'

import { useEffect, useState } from 'react'
import { generateParticles } from '@/lib/utils'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export default function ParticleEffect() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(generateParticles(30))
  }, [])

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
} 