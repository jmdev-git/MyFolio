'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contacts', href: '#contacts' },
  { label: 'FAQs', href: '#FAQs' },
]

// Text-loop hover: label slides up on hover, clone slides in from below
function LoopLink({
  href,
  label,
  dark,
}: {
  href: string
  label: string
  dark: boolean
}) {
  return (
    <Link
      href={href}
      className={`nav-loop-link ${dark ? 'nav-loop-link--dark' : 'nav-loop-link--light'}`}
      aria-label={label}
    >
      <span className="nav-loop-link__inner" aria-hidden="true">
        <span className="nav-loop-link__top">{label}</span>
        <span className="nav-loop-link__bottom">{label}</span>
      </span>
      {/* accessible text */}
      <span className="sr-only">{label}</span>
    </Link>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [atTop, setAtTop] = useState(true)
  const [mounted, setMounted] = useState(false)
  const lastY = useRef(0)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setAtTop(currentY < 20)
      if (currentY < 60) {
        setVisible(true)
      } else {
        setVisible(currentY < lastY.current)
      }
      lastY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            className="site-header"
            key="header"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.nav
              className={`site-nav ${atTop ? 'site-nav--top' : 'site-nav--scrolled'}`}
              aria-label="Main navigation"
              initial={{ width: '48px', opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Logo */}
              <Link href="/" className="site-logo" aria-label="Home">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Image
                    src="/Logo.png"
                    alt="Logo"
                    width={130}
                    height={36}
                    className="site-logo__img"
                    priority
                  />
                </motion.div>
              </Link>

              {/* Desktop links — centered */}
              <motion.ul
                className="site-nav__links"
                role="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.55 }}
              >
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <LoopLink href={link.href} label={link.label} dark={atTop} />
                  </li>
                ))}
              </motion.ul>

              {/* CTA */}
              <motion.div
                className="site-nav__actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Link
                  href="#contact"
                  className={`site-nav__cta ${atTop ? 'site-nav__cta--dark' : 'site-nav__cta--light'}`}
                >
                  Get In Touch &rarr;
                </Link>
              </motion.div>

              {/* Hamburger / Close */}
              <button
                className="site-nav__hamburger"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? (
                  /* X icon */
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <line x1="2" y1="2" x2="18" y2="18" stroke={atTop ? 'black' : 'white'} strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="18" y1="2" x2="2" y2="18" stroke={atTop ? 'black' : 'white'} strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                ) : (
                  /* 2-line minimal hamburger — top line shorter, right-aligned */
                  <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <line x1="6" y1="2" x2="22" y2="2" stroke={atTop ? 'black' : 'white'} strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="0" y1="12" x2="22" y2="12" stroke={atTop ? 'black' : 'white'} strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </motion.nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile drawer — rendered via portal at body level so it escapes header stacking context */}
      {mounted && createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="site-nav__mobile"
              role="dialog"
              aria-label="Mobile navigation"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="site-nav__mobile-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="#contact" className="site-nav__cta site-nav__cta--light" onClick={() => setMenuOpen(false)}>
                    Get In Touch
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
