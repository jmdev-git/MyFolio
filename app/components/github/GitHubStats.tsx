'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface ContributionDay {
  contributionCount: number
  date: string
  color: string
}

interface Week {
  contributionDays: ContributionDay[]
}

interface Repo {
  name: string
  description: string | null
  stargazerCount: number
  forkCount: number
  primaryLanguage: { name: string; color: string } | null
  url: string
}

interface GitHubData {
  year: number
  totalContributions: number
  totalCommits: number
  totalPRs: number
  totalIssues: number
  weeks: Week[]
  repos: Repo[]
}

function fadeUp(delay = 0, inView: boolean) {
  return {
    initial: { opacity: 0, y: 32 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  }
}

// Render contribution heatmap from real data
function ContributionGraph({ weeks }: { weeks: Week[] }) {
  return (
    <div className="gh-heatmap">
      {weeks.map((week, wi) => (
        <div key={wi} className="gh-heatmap__col">
          {week.contributionDays.map((day, di) => (
            <div
              key={di}
              className="gh-heatmap__cell"
              title={`${day.date}: ${day.contributionCount} contributions`}
              style={{
                backgroundColor: day.contributionCount === 0
                  ? 'rgba(255,255,255,0.06)'
                  : day.color,
                opacity: day.contributionCount === 0 ? 1 : 0.85 + (day.contributionCount / 20) * 0.15,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function GitHubStats() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/github')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return (
    <section className="gh-section" id="github" ref={ref}>

      {loading && (
        <div className="gh-loading">
          <div className="gh-spinner" />
          <p>Loading GitHub data...</p>
        </div>
      )}

      {error && (
        <div className="gh-error">
          <p>Unable to load GitHub data. Please check your token configuration.</p>
        </div>
      )}

      {data && !loading && (
        <>

          {/* Contribution heatmap */}
          <motion.div className="gh-graph-wrap" {...fadeUp(0.18, inView)}>
            <div className="gh-graph-header">
              <p className="gh-graph-label">
                {data.totalContributions} contributions in {data.year}
              </p>
            </div>
            {/* Month labels */}
            <div className="gh-month-labels">
              {MONTH_LABELS.map(m => (
                <span key={m} className="gh-month-label">{m}</span>
              ))}
            </div>
            <ContributionGraph weeks={data.weeks} />
            <div className="gh-legend">
              <span className="gh-legend__label">Less</span>
              {['rgba(255,255,255,0.06)', '#0e4429', '#006d32', '#26a641', '#39d353'].map((c, i) => (
                <div key={i} className="gh-heatmap__cell" style={{ backgroundColor: c }} />
              ))}
              <span className="gh-legend__label">More</span>
            </div>
          </motion.div>

        
        </>
      )}

    </section>
  )
}
