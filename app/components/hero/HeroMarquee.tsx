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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.8 }}
      className="marquee-wrapper"
      aria-hidden="true"
    >
      {/* White spotlight sweeps left → right, slow and smooth */}
      <motion.div
        aria-hidden="true"
        initial={{ left: '-30%' }}
        animate={{ left: '115%' }}
        transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1], delay: 1.0 }}
        style={{
          position: 'absolute',
          top: 0,
          width: '30%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.7) 55%, rgba(255,255,255,0.55) 70%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
          filter: 'blur(6px)',
        }}
      />

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
