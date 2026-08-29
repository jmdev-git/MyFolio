'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import type { Project } from '@/app/data/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        className="pc-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        <motion.div
          className="pc-modal-img-wrap"
          initial={{ opacity: 0, scale: 0.82, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="pc-modal-img"
            unoptimized
          />
          <button className="pc-modal-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <line x1="2" y1="2" x2="18" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="18" y1="2" x2="2" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <motion.div
        ref={ref}
        className="project-card"
        style={{ '--accent': project.accent } as React.CSSProperties}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
        transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Image — click to open modal */}
        <div
          className="project-card__img-wrap"
          onClick={() => setModalOpen(true)}
          style={{ cursor: 'zoom-in' }}
        >
          <Image
            src={`/${project.image}`}
            alt={project.title}
            fill
            className="project-card__img"
            priority
          />
          {/* Hover overlay hint */}
          <div className="project-card__img-overlay">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="project-card__body">
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__desc line-clamp-3">{project.description}</p>

          <div className="project-card__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-card__tag">{tag}</span>
            ))}
          </div>

          <div className="project-card__links">
            {project.private ? (
              <span className="project-card__private">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                Private Repository
              </span>
            ) : (
              <>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card__link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live Demo
                </a>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card__link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  Code
                </a>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Image modal */}
      {modalOpen && (
        <ImageModal
          src={`/${project.image}`}
          alt={project.title}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
