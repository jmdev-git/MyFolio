'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [visible, setVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const constraintsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Mount a full-viewport constraints ref
    constraintsRef.current = document.body as unknown as HTMLDivElement

    const t = setTimeout(() => {
      setVisible(true)
      const audio = audioRef.current
      if (!audio) return

      // Strategy: autoplay muted (always allowed), then unmute
      // This passes browser autoplay policies on production
      audio.muted = true
      audio.play()
        .then(() => {
          // Successfully started — now unmute for actual sound
          setTimeout(() => {
            audio.muted = false
            setMuted(false)
            setPlaying(true)
          }, 300)
        })
        .catch(() => {
          // Still blocked — show player ready for user interaction
          audio.muted = false
          setPlaying(false)
        })
    }, 3000)

    return () => clearTimeout(t)
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.muted = false
      audio.play()
      setPlaying(true)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !muted
    setMuted(!muted)
  }

  const handleEnded = () => setPlaying(false)

  return (
    <>
      <audio
        ref={audioRef}
        src="/intro.mp3"
        onEnded={handleEnded}
        preload="auto"
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            className="ap-wrap"
            drag
            dragMomentum={false}
            dragElastic={0.1}
            whileDrag={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ cursor: 'grab' }}
          >
            {/* Drag handle hint */}
            <div className="ap-drag-hint" aria-hidden="true">
              <span /><span /><span /><span /><span /><span />
            </div>

            {/* Play / Pause button */}
            <button
              className="ap-play"
              onClick={toggle}
              aria-label={playing ? 'Pause intro' : 'Play intro'}
              style={{ cursor: 'pointer' }}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              )}
            </button>

            {/* Label */}
            <span className="ap-label">
              {playing ? 'Playing...' : 'Who I Am?'}
            </span>

            {/* Sound wave when playing */}
            {playing && !muted && (
              <div className="ap-wave" aria-hidden="true">
                {[1,2,3,4].map(i => (
                  <span key={i} className="ap-wave__bar" style={{ animationDelay: `${i * 0.12}s` }} />
                ))}
              </div>
            )}

            {/* Mute / Unmute */}
            <button
              className="ap-mute"
              onClick={toggleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
              style={{ cursor: 'pointer' }}
            >
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
