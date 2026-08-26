'use client'

import Image from 'next/image'

// Positions spread evenly across left 28% and right 28% of viewport
// top values distribute cards from ~5% to ~80% vertically
export const CARD_DATA = [
  // ── LEFT COLUMN ──────────────────────────────────────────────
  {
    id: 'c1',
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    alt: 'Abstract gradient art',
    style: { top: '5%', left: '5%', width: 190, height: 230 },
    rotate: -4,
    exitX: -160,
    exitY: -100,
  },
  {
    id: 'c2',
    src: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&q=80',
    alt: 'Portrait photography',
    style: { top: '45%', left: '20%', width: 165, height: 190 },
    rotate: 3,
    exitX: -150,
    exitY: 50,
  },
  {
    id: 'c3',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    alt: 'Design mockup',
    style: { top: '60%', left: '5%', width: 195, height: 145 },
    rotate: -2,
    exitX: -130,
    exitY: 130,
  },
  {
    id: 'c4',
    src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&q=80',
    alt: 'Typography poster',
    style: { top: '80%', left: '22%', width: 175, height: 130 },
    rotate: 5,
    exitX: -80,
    exitY: 170,
  },
  {
    id: 'c5',
    src: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=400&q=80',
    alt: 'Architecture',
    style: { top: '18%', left: '22%', width: 140, height: 160 },
    rotate: -6,
    exitX: -100,
    exitY: -60,
  },
  // ── RIGHT COLUMN ─────────────────────────────────────────────
  {
    id: 'c6',
    src: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?w=400&q=80',
    alt: 'Product render',
    style: { top: '10%', right: '3%', width: 205, height: 140 },
    rotate: 3,
    exitX: 160,
    exitY: -100,
  },
  {
    id: 'c7',
    src: 'https://images.unsplash.com/photo-1569701813229-33284b643e3c?w=400&q=80',
    alt: 'Creative poster',
    style: { top: '35%', right: '2%', width: 185, height: 170 },
    rotate: -5,
    exitX: 155,
    exitY: 30,
  },
  {
    id: 'c8',
    src: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&q=80',
    alt: 'Branding design',
    style: { top: '65%', right: '5%', width: 165, height: 140 },
    rotate: 4,
    exitX: 140,
    exitY: 100,
  },
  {
    id: 'c9',
    src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80',
    alt: 'Motion design still',
    style: { top: '68%', right: '20%', width: 200, height: 155 },
    rotate: -3,
    exitX: 130,
    exitY: 150,
  },
  {
    id: 'c10',
    src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=80',
    alt: 'Tech workspace',
    style: { top: '34%', right: '20%', width: 150, height: 130 },
    rotate: 6,
    exitX: 90,
    exitY: 60,
  },
]

export default function HeroCards() {
  return (
    <div className="hero-cards-layer" aria-hidden="true">
      {CARD_DATA.map((card) => (
        <div
          key={card.id}
          data-hero-card
          className="hero-card"
          style={{
            ...card.style,
            transform: `rotate(${card.rotate}deg)`,
          }}
        >
          <Image
            src={card.src}
            alt={card.alt}
            width={card.style.width}
            height={card.style.height}
            className="hero-card__img"
            unoptimized
          />
        </div>
      ))}
    </div>
  )
}
