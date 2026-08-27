'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '@/app/data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' })

  useEffect(() => {
    const grid = gridRef.current
    const section = sectionRef.current
    if (!grid || !section) return

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 1024px)').matches

      // Skip 3D effect entirely on mobile — Framer Motion handles card animations
      if (isMobile) {
        gsap.set(grid, { rotateX: 0, scale: 1, opacity: 1 })
        return
      }

      // 3D tilt unwind on the grid wrapper — desktop only
      gsap.fromTo(
        grid,
        { rotateX: 28, scale: 0.82, opacity: 0.25, transformOrigin: 'center top' },
        {
          rotateX: 0, scale: 1, opacity: 1,
          transformOrigin: 'center top',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'center 50%',
            scrub: 2.5,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      {/* Heading */}
      <div ref={headingRef} className="projects-heading">
        <motion.h2
          className="projects-title text-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Featured Projects
        </motion.h2>
        <motion.p
          className="projects-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          Explore software solutions designed to streamline workflows, improve operations, and solve real business challenges.
        </motion.p>
      </div>

      {/* 3D perspective wrapper */}
      <div className="projects-perspective">
        <div ref={gridRef} className="projects-list">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Coming soon footer */}
      <motion.div
        className="projects-coming-soon"
        initial={{ opacity: 0, y: 24 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>✦</span>
        <span>More Projects Coming Soon</span>
        <span>✦</span>
      </motion.div>
    </section>
  )
}
