'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ease = 'easeOut' as const

function fadeUpProps(delay = 0, inView: boolean) {
  return {
    initial: { opacity: 0, y: 36 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 },
    transition: { duration: 0.6, delay, ease },
  }
}

function MarqueeText({ reverse = false, atBottom = false }: { reverse?: boolean; atBottom?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [reverse])

  return (
    <div className="ct-marquee" aria-hidden="true" style={atBottom ? { top: 'auto', bottom: 0 } : undefined}>
      <div ref={trackRef} className="ct-marquee__track">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="ct-marquee__word">JMDEV</span>
        ))}
      </div>
    </div>
  )
}

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="ct-section" id="contact">

      <MarqueeText reverse={false} atBottom={false} />

      {/* Blurred glow circle at center */}
      <div className="ct-glow" aria-hidden="true" />

      <div className="ct-card" ref={ref}>

        <motion.p className="ct-quote" {...fadeUpProps(0, inView)}>
          &ldquo;Ready to improve the way your business works? Let’s turn your challenges into simple, effective digital solutions.&rdquo;
        </motion.p>

        <motion.div className="ct-avatar-wrap" {...fadeUpProps(0.1, inView)}>
          <Image src="/Profile.jpg" alt="John Mark" fill className="ct-avatar-img" sizes="120px" />
        </motion.div>

        <motion.h2 className="ct-title" {...fadeUpProps(0.18, inView)}>
          Let&apos;s work together.
        </motion.h2>

        <motion.p className="ct-name" {...fadeUpProps(0.26, inView)}>
          John Mark A. Depaclayon
        </motion.p>

        <motion.p className="ct-role" {...fadeUpProps(0.32, inView)}>
          Fullstack Web Developer
        </motion.p>

        <motion.div className="ct-socials" {...fadeUpProps(0.4, inView)}>
          <a href="https://www.linkedin.com/in/john-mark-depaclayon-129a61260/?locale=en" target="_blank" rel="noopener noreferrer" className="ct-social" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452H17.21v-5.569c0-1.328-.024-3.037-1.85-3.037-1.851 0-2.134 1.445-2.134 2.939v5.667H9.99V9h3.114v1.561h.044c.433-.82 1.491-1.685 3.069-1.685 3.283 0 3.888 2.16 3.888 4.968v6.608zM5.337 7.433a1.81 1.81 0 1 1 0-3.62 1.81 1.81 0 0 1 0 3.62zM6.956 20.452H3.718V9h3.238v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            LinkedIn
          </a>
          <a href="https://github.com/jmdev-git" target="_blank" rel="noopener noreferrer" className="ct-social" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
            GitHub
          </a>
          <a href="https://www.tiktok.com/@jmdiv10/" target="_blank" rel="noopener noreferrer" className="ct-social" aria-label="TikTok">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z" /></svg>
            TikTok
          </a>
          <a href="https://www.facebook.com/depaclayon.jm" target="_blank" rel="noopener noreferrer" className="ct-social" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg>
            Facebook
          </a>
        </motion.div>

        <motion.a href="mailto:johnmarkdepaclayon10@gmail.com" className="ct-cta" {...fadeUpProps(0.48, inView)}>
          Get in touch &rarr;
        </motion.a>

      </div>

      <MarqueeText reverse={true} atBottom={true} />

    </section>
  )
}
