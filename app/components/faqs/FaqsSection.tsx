'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FAQS = [
  { q: 'What business problems can you help solve?', a: 'I help businesses turn manual, fragmented, or inefficient processes into centralized software solutions. This can include internal communication, employee management, dashboards, workflow automation, information systems, and other business processes that can be improved through software.' },
  { q: "How can software improve a company's operations?", a: "The right software can reduce repetitive work, centralize information, improve communication, and make important processes easier to track. My goal is to build systems that don't just work technically, but create a meaningful improvement in how people work." },
  { q: "Can you build systems specifically for a company's workflow?", a: "Yes. I prefer building around the actual workflow of a business rather than forcing people to adapt to a generic system. I translate business requirements into user flows, features, database structures, and applications that fit the organization's needs." },
  { q: 'Have you built software that created a real business impact?', a: 'Yes. At CNT Promo & Ads Specialists, Inc., I developed a centralized internal communications portal designed to reduce fragmented announcement channels and improve information dissemination. I also developed a digital bulletin board module to make company announcements easier to manage and maintain.' },
  { q: 'How do you approach a new business project?', a: 'I start by understanding the problem, the people who will use the system, and the current workflow. From there, I identify what can be simplified, automated, or centralized before deciding how the software should be designed and built.' },
  { q: 'What makes your approach different?', a: "I don't focus only on writing code. I think about how the software will actually be used by employees, customers, and the business. I combine technical development with an understanding of the workflow behind the problem, with the goal of building practical systems that provide value beyond deployment." },
  { q: 'Are you available to work with companies on new projects?', a: "Yes. I'm open to full-time and freelance opportunities where I can contribute as a developer and help solve real business problems through practical software solutions." },
]

function FaqItem({ faq, open, onToggle }: { faq: (typeof FAQS)[number]; open: boolean; onToggle: () => void }) {
  return (
    <div className="faq-item">
      <button className="faq-item__trigger" onClick={onToggle} aria-expanded={open}>
        <span className="faq-item__q">{faq.q}</span>
        <span className="faq-item__icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-item__body" style={{ maxHeight: open ? '400px' : '0' }} aria-hidden={!open}>
        <p className="faq-item__a">{faq.a}</p>
      </div>
    </div>
  )
}

export default function FaqsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="faqs-section" id="FAQs" ref={ref}>

      <motion.h2
        className="faqs-title"
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Here are the basics.
      </motion.h2>

      <motion.div
        className="faqs-list"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        {FAQS.map((faq, i) => (
          <FaqItem key={i} faq={faq} open={openIndex === i} onToggle={() => toggle(i)} />
        ))}
      </motion.div>

    </section>
  )
}
