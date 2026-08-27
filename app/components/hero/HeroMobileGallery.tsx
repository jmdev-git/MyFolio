'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CARD_DATA } from './HeroCards'

const SRCS = CARD_DATA.map((c) => ({ src: c.src, alt: c.alt }))

const INTERVAL = 5500 // ms each image stays visible before changing

// Each slot has its own staggered first-change delay so they never all flip together
const SLOTS: { startIdx: number; delay: number }[] = [
  { startIdx: 0, delay: 0 },
  { startIdx: 3, delay: 2.2 },
  { startIdx: 7, delay: 4.0 },
  { startIdx: 1, delay: 1.1 },
  { startIdx: 5, delay: 3.3 },
  { startIdx: 9, delay: 0.6 },
]

function GallerySlot({ startIdx, delay }: { startIdx: number; delay: number }) {
  const [idx, setIdx] = useState(startIdx % SRCS.length)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setIdx((prev) => (prev + 1) % SRCS.length)
      }, INTERVAL)
      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  const img = SRCS[idx]

  return (
    <div className="hmg-slot">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="hmg-slot__inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="hmg-slot__img"
            unoptimized
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function HeroMobileGallery() {
  return (
    <div className="hmg-grid" aria-hidden="true">
      {SLOTS.map((slot, i) => (
        <GallerySlot key={i} startIdx={slot.startIdx} delay={slot.delay} />
      ))}
    </div>
  )
}
