'use client'

import { motion } from 'framer-motion'

export default function HeroHeadline() {
  return (
    <div className="hero-headline">
      <p className="hero-eyebrow font-bold">Hi, I am John Mark</p>

      <div className="hero-words-stack">
        <h1 className="hero-word text-shadow-md">Fullstack</h1>
        <h1 className="hero-word text-shadow-md">Software</h1>

        <h1
          className="hero-word hero-word--highlight"
          style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}
        >
          {/* Black background sweeps left → right */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--black)',
              transformOrigin: 'left center',
              borderRadius: 10,
              zIndex: 0,
            }}
          />

          {/* Text starts black, turns white at the same moment the sweep begins */}
          <motion.span
            initial={{ color: '#000000' }}
            animate={{ color: '#ffffff' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            Solutions
          </motion.span>
        </h1>
      </div>

      <p className="hero-sub font-bold">
        I design, code, and deploy
        <br />
        full-stack digital solutions.
      </p>

      <a href="#projects" className="hero-cta">
        Explore the Project &rarr;
      </a>
    </div>
  )
}
