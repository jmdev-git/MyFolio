'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TOOLS = [
  { name: 'JavaScript', bg: '#f7df1e', icon: 'https://cdn.simpleicons.org/javascript/000000' },
  { name: 'TypeScript', bg: '#3178c6', icon: 'https://cdn.simpleicons.org/typescript/ffffff' },
  { name: 'React',      bg: '#20232a', icon: 'https://cdn.simpleicons.org/react/61dafb' },
  { name: 'Next.js',    bg: '#000000', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
  { name: 'Tailwind',   bg: '#0f172a', icon: 'https://cdn.simpleicons.org/tailwindcss/38bdf8' },
  { name: 'HTML/CSS',   bg: '#e34f26', icon: 'https://cdn.simpleicons.org/html5/ffffff' },
  { name: 'Node.js',    bg: '#215732', icon: 'https://cdn.simpleicons.org/nodedotjs/ffffff' },
  { name: 'Express',    bg: '#1a1a1a', icon: 'https://cdn.simpleicons.org/express/ffffff' },
  { name: 'PostgreSQL', bg: '#336791', icon: 'https://cdn.simpleicons.org/postgresql/ffffff' },
  { name: 'MongoDB',    bg: '#13aa52', icon: 'https://cdn.simpleicons.org/mongodb/ffffff' },
  { name: 'Redis',      bg: '#dc382c', icon: 'https://cdn.simpleicons.org/redis/ffffff' },
  { name: 'Drizzle ORM',bg: '#c5f74f', icon: 'https://cdn.simpleicons.org/drizzle/000000' },
  { name: 'WebSockets', bg: '#010101', icon: 'https://cdn.simpleicons.org/socketdotio/ffffff' },
  { name: 'Flutter',    bg: '#0468d7', icon: 'https://cdn.simpleicons.org/flutter/ffffff' },
  { name: 'Dart',       bg: '#0175c2', icon: 'https://cdn.simpleicons.org/dart/ffffff' },
  { name: 'Docker',     bg: '#1d63ed', icon: 'https://cdn.simpleicons.org/docker/ffffff' },
  { name: 'Nginx',      bg: '#009639', icon: 'https://cdn.simpleicons.org/nginx/ffffff' },
  { name: 'Kubernetes', bg: '#326ce5', icon: 'https://cdn.simpleicons.org/kubernetes/ffffff' },
  { name: 'CI/CD',      bg: '#2088ff', icon: 'https://cdn.simpleicons.org/githubactions/ffffff' },
  { name: 'Git',        bg: '#f05032', icon: 'https://cdn.simpleicons.org/git/ffffff' },
  { name: 'GitHub',     bg: '#181717', icon: 'https://cdn.simpleicons.org/github/ffffff' },
  { name: 'Postman',    bg: '#ff6c37', icon: 'https://cdn.simpleicons.org/postman/ffffff' },
]

const COL_A = TOOLS.filter((_, i) => i % 3 === 0)
const COL_B = TOOLS.filter((_, i) => i % 3 === 1)
const COL_C = TOOLS.filter((_, i) => i % 3 === 2)

const ease = 'easeOut' as const

function fadeUpProps(delay = 0, inView: boolean) {
  return {
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.6, delay, ease },
  }
}

function ToolCard({ tool }: { tool: (typeof TOOLS)[number] }) {
  return (
    <div className="sk-tile" style={{ background: tool.bg }} title={tool.name}>
      <Image src={tool.icon} alt={tool.name} width={48} height={48} className="sk-tile__icon" unoptimized />
    </div>
  )
}

function SliderColumn({ tools, direction = 'up', duration = '30s' }: { tools: typeof TOOLS; direction?: 'up' | 'down'; duration?: string }) {
  const items = [...tools, ...tools]
  return (
    <div className="sk-col">
      <div className="sk-track" style={{ animationDuration: duration, animationDirection: direction === 'down' ? 'reverse' : 'normal' }}>
        {items.map((tool, i) => <ToolCard key={`${tool.name}-${i}`} tool={tool} />)}
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="sk-section" id="skills" ref={ref}>

      {/* ── Left copy ── */}
      <div className="sk-left">
        <motion.h2
          className="sk-title"
          {...fadeUpProps(0, inView)}
        >
          Tools I use to build<br />
          great products.
        </motion.h2>

        <motion.p
          className="sk-body"
          {...fadeUpProps(0.12, inView)}
        >
          From front-end design to back-end development—here is the proven technology stack I use to build, launch, and manage complete software solutions for businesses.
        </motion.p>

        <motion.p
          className="sk-body sk-body--gap"
          {...fadeUpProps(0.22, inView)}
        >
          Every tool on this list has been used in production.
          I pick what solves the problem, not what&apos;s trendy.
        </motion.p>

        <motion.a
          href="#contact"
          className="sk-cta"
          {...fadeUpProps(0.32, inView)}
        >
          Let&apos;s work together &rarr;
        </motion.a>
      </div>

      {/* ── Right: three infinite vertical columns ── */}
      <div className="sk-right" aria-hidden="true">
        <SliderColumn tools={COL_A} direction="up"   duration="26s" />
        <SliderColumn tools={COL_B} direction="down" duration="34s" />
        <SliderColumn tools={COL_C} direction="up"   duration="30s" />
        <div className="sk-fade sk-fade--top" />
        <div className="sk-fade sk-fade--bottom" />
      </div>

    </section>
  )
}
