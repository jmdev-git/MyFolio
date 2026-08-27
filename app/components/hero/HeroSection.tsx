'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroHeadline from './HeroHeadline'
import HeroCards from './HeroCards'
import HeroMarquee from './HeroMarquee'
import HeroMobileGallery from './HeroMobileGallery'
import { CARD_DATA } from './HeroCards'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Skip scroll animation on tablet/mobile where cards are hidden
    if (window.matchMedia('(max-width: 1024px)').matches) return

    const cards = gsap.utils.toArray<HTMLElement>('[data-hero-card]')

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const data = CARD_DATA[i]
        if (!data) return

        gsap.fromTo(
          card,
          { x: 0, y: 0, opacity: 1, scale: 1 },
          {
            x: data.exitX * 1.8,
            y: data.exitY * 1.8,
            opacity: 0,
            scale: 0.88,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.4,
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hero-section">
      {/* Sticky viewport — everything visible lives here */}
      <div className="hero-viewport">
        {/* Grid texture */}
        <div className="hero-grid" aria-hidden="true" />

        {/* Floating image cards (desktop/tablet) */}
        <HeroCards />

        {/* Center headline */}
        <div className="hero-center">
          <HeroHeadline />
        </div>

        {/* Mobile image gallery — shown only on ≤ 600px, wrapper centers it */}
        <div className="hmg-wrapper">
          <HeroMobileGallery />
        </div>

        {/* Bottom marquee */}
        <HeroMarquee />
      </div>
    </section>
  )
}
