'use client'

import Image from 'next/image'
import { useRef, useCallback } from 'react'

// Positions spread evenly across left 28% and right 28% of viewport
// top values distribute cards from ~5% to ~80% vertically
export const CARD_DATA = [
  // ── LEFT COLUMN ──────────────────────────────────────────────
  {
    id: 'c1',
    src: 'Graduate1.jpg',
    alt: 'Code on dark screen',
    style: { top: '13%', left: '2%', width: 190, height: 230 },
    rotate: -4,
    exitX: -160,
    exitY: -100,
    side: 'left' as const,
  },
  {
    id: 'c2',
    src: 'CNT Cloudspace.jpg',
    alt: 'Developer coding',
    style: { top: '45%', left: '20%', width: 165, height: 190 },
    rotate: 3,
    exitX: -150,
    exitY: 50,
    side: 'left' as const,
  },
  {
    id: 'c3',
    src: 'KidsPhonics.jpg',
    alt: 'MacBook with code',
    style: { top: '60%', left: '5%', width: 195, height: 145 },
    rotate: -2,
    exitX: -130,
    exitY: 130,
    side: 'left' as const,
  },
  {
    id: 'c4',
    src: 'Prism.jpg',
    alt: 'Dark code editor',
    style: { top: '80%', left: '22%', width: 175, height: 130 },
    rotate: 5,
    exitX: -80,
    exitY: 170,
    side: 'left' as const,
  },
  {
    id: 'c5',
    src: "Domino's Self-Order Kiosk.jpg",
    alt: 'Laptop programming',
    style: { top: '13%', left: '22%', width: 140, height: 160 },
    rotate: -6,
    exitX: -100,
    exitY: -60,
    side: 'left' as const,
  },
  // ── RIGHT COLUMN ─────────────────────────────────────────────
  {
    id: 'c6',
    src: 'Egov_hackathon.jpg',
    alt: 'Laptop setup workspace',
    style: { top: '10%', right: '3%', width: 205, height: 140 },
    rotate: 3,
    exitX: 160,
    exitY: -100,
    side: 'right' as const,
  },
  {
    id: 'c7',
    src: 'Graduate2.jpg',
    alt: 'Programming on screen',
    style: { top: '35%', right: '2%', width: 185, height: 170 },
    rotate: -5,
    exitX: 155,
    exitY: 30,
    side: 'right' as const,
  },
  {
    id: 'c8',
    src: 'BMIS.jpg',
    alt: 'Server and cloud setup',
    style: { top: '65%', right: '5%', width: 165, height: 140 },
    rotate: 4,
    exitX: 140,
    exitY: 100,
    side: 'right' as const,
  },
  {
    id: 'c9',
    src: 'Laksikap.jpg',
    alt: 'Code review',
    style: { top: '68%', right: '20%', width: 200, height: 155 },
    rotate: -3,
    exitX: 130,
    exitY: 150,
    side: 'right' as const,
  },
  {
    id: 'c10',
    src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=80',
    alt: 'Tech workspace',
    style: { top: '34%', right: '20%', width: 150, height: 130 },
    rotate: 6,
    exitX: 90,
    exitY: 60,
    side: 'right' as const,
    external: true,
  },
]

// Max tilt angle in degrees
const MAX_TILT = 14

function TiltCard({
  card,
}: {
  card: (typeof CARD_DATA)[number]
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current
      if (!el) return

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)

      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width  // 0 → 1
        const y = (e.clientY - rect.top) / rect.height   // 0 → 1

        const tiltX = (y - 0.5) * -MAX_TILT  // tilt up/down
        const tiltY = (x - 0.5) * MAX_TILT   // tilt left/right

        el.style.transform = `rotate(${card.rotate}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.06)`
        el.style.transition = 'transform 0.05s linear'
      })
    },
    [card.rotate],
  )

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    el.style.transform = `rotate(${card.rotate}deg) rotateX(0deg) rotateY(0deg) scale(1)`
    el.style.transition = 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)'
  }, [card.rotate])

  return (
    <div
      ref={cardRef}
      data-hero-card
      className="hero-card"
      style={{
        ...card.style,
        transform: `rotate(${card.rotate}deg)`,
        transformStyle: 'preserve-3d',
        pointerEvents: 'auto',
        willChange: 'transform',
        boxShadow: card.side === 'left'
          ? '-40px 6px 110px rgba(0,0,0,0.45)'
          : '40px 6px 110px rgba(0,0,0,0.45)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={card.external ? card.src : `/${card.src}`}
        alt={card.alt}
        width={card.style.width}
        height={card.style.height}
        className="hero-card__img"
        style={{ objectFit: 'cover' }}
        priority={!card.external}
        unoptimized={!!card.external}
      />
    </div>
  )
}

export default function HeroCards() {
  return (
    <div className="hero-cards-layer" aria-hidden="true">
      {CARD_DATA.map((card) => (
        <TiltCard key={card.id} card={card} />
      ))}
    </div>
  )
}
