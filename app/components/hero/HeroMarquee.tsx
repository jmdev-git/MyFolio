'use client'

import { motion } from 'framer-motion'

const ITEMS = ['Full-Stack & AI Developer', 'Web Developer', 'Open for Full-Time & Freelance', 'Full-Stack & AI Developer', 'Web Developer', 'Open for Full-Time & Freelance']

const Sep = () => (
  <span className="marquee-sep" aria-hidden="true">✦</span>
)

export default function HeroMarquee() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
      className="marquee-wrapper"
      aria-hidden="true"
    >
      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-text">{item}</span>
            <Sep />
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}
