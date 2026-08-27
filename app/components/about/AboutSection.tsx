'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const PRINCIPLES = [
  { num: '01', text: 'Software built with the sole purpose to grow your business' },
  { num: '02', text: 'Full ownership to make a real impact on your company' },
  { num: '03', text: 'Solid, reliable results that help your business succeed' },
]

const IMAGES = [
  { src: '/Profile1.png', alt: 'John Mark 1' },
  { src: '/profile2.png', alt: 'John Mark 2' },
  { src: '/Profile3.png', alt: 'John Mark 3' },
]

const ease = [0.16, 1, 0.3, 1] as const

function fadeUp(delay = 0, inView: boolean) {
  return {
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.65, delay, ease },
  }
}

// Returns the index offset relative to center: -1 = left, 0 = center, 1 = right
function getSlotIndex(i: number, active: number, total: number) {
  const diff = (i - active + total) % total
  if (diff === 0) return 0        // center
  if (diff === 1) return 1        // right
  if (diff === total - 1) return -1 // left
  return null                     // hidden
}

function ProfileCarousel() {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const total = IMAGES.length

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Auto-advance every 2.8s
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % total), 2800)
    return () => clearInterval(t)
  }, [total])

  return (
    <>
      <div className="about-carousel">
        {IMAGES.map((img, i) => {
          const slot = getSlotIndex(i, active, total)
          if (slot === null) return null

          const isCenter = slot === 0
          const offset = isMobile ? 42 : 52
          const x = slot * offset

          return (
            <motion.div
              key={img.src}
              className="about-carousel__wrapper"
              animate={{
                x: `${x}%`,
                scale: isCenter ? 1 : 0.78,
                opacity: isCenter ? 1 : 0.35,
                zIndex: isCenter ? 2 : 1,
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="about-carousel__item">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="about-carousel__img"
                  sizes="320px"
                  priority
                />
              </div>
              {isCenter && (
                <div className="about-carousel__shadow" aria-hidden="true" />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Dots outside carousel — not clipped by overflow:hidden */}
      <div className="about-carousel__dots">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            className={`about-carousel__dot${i === active ? ' about-carousel__dot--active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </>
  )
}

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="about-section" id="about" ref={ref}>
      {/* Left — purple content panel */}
      <div className="about-left">

        <motion.h2 className="about-title" {...fadeUp(0, inView)}>
          Software built to solve real problems,{' '}
          <span className="about-title--accent">not just look pretty.</span>
        </motion.h2>

        <motion.div className="about-body-group" {...fadeUp(0.1, inView)}>
          <p className="about-label">Who I Am</p>
          <p className="about-body">
            Think of me like a house builder. I do the hidden work underneath, like the plumbing. I also do the visible work, like painting the walls. I keep things simple and focus purely on what solves your specific problems.
          </p>
        </motion.div>

        <motion.div className="about-principles" {...fadeUp(0.26, inView)}>
          <ul className="about-list">
            {PRINCIPLES.map((p, i) => (
              <motion.li
                key={p.num}
                className="about-list__item"
                {...fadeUp(0.32 + i * 0.08, inView)}
              >
                <span className="about-list__num">{p.num}</span>
                <span className="about-list__text">{p.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp(0.56, inView)}>
          <a
            href="/John Mark Depaclayon.pdf"
            download="John Mark Depaclayon.pdf"
            className="about-cta"
          >
            Download Resume &rarr;
          </a>
        </motion.div>

      </div>

      {/* Right — profile image carousel */}
      <div className="about-right">
        <div className="about-carousel-wrap">
          <ProfileCarousel />
        </div>
      </div>
    </section>
  )
}
