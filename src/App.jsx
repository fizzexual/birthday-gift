import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { scenes } from './story'
import Rose from './components/Rose'
import Particles from './components/Particles'
import { celebrate } from './confetti'
import './App.css'

const clamp = (t) => Math.min(1, Math.max(0, t))
const LAST = scenes.length - 1

const lines = (text) => text.split('\n')

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.2 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.5, ease: 'easeIn' },
  },
}

const line = {
  hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function App() {
  const [index, setIndex] = useState(0)
  const stopConfetti = useRef(null)
  const scene = scenes[index]
  const { bloom } = scene
  const isFinal = !!scene.final

  const next = useCallback(() => {
    setIndex((i) => Math.min(LAST, i + 1))
  }, [])

  const prev = useCallback((e) => {
    e?.stopPropagation()
    setIndex((i) => Math.max(0, i - 1))
  }, [])

  const replay = useCallback((e) => {
    e?.stopPropagation()
    stopConfetti.current?.()
    setIndex(0)
  }, [])

  // confetti when we land on the final scene
  useEffect(() => {
    if (!isFinal) return
    stopConfetti.current = celebrate()
    return () => stopConfetti.current?.()
  }, [isFinal])

  // keyboard support (nice for previewing on a laptop)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        prev()
      } else if (e.key === 'r' || e.key === 'R') {
        replay()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, replay])

  return (
    <main
      className="stage"
      onClick={isFinal ? undefined : next}
      role="application"
      aria-label="Рожден ден"
    >
      <div className="bg" />
      <motion.div
        className="glow glow--rose"
        animate={{ opacity: 0.28 + 0.34 * bloom, scale: 0.8 + 0.4 * bloom }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />
      <motion.div
        className="glow glow--gold"
        animate={{
          opacity: clamp((bloom - 0.7) / 0.3) * 0.6,
          scale: 0.85 + 0.35 * bloom,
        }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />

      <Particles count={16} />

      <div className="rose-wrap">
        <motion.div
          className="rose"
          animate={{ scale: isFinal ? 1.06 : 1, y: isFinal ? -6 : 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          <Rose bloom={bloom} final={isFinal} />
        </motion.div>
      </div>

      <div className="text-area">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={`message ${isFinal ? 'message--final' : ''}`}
            variants={container}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {lines(scene.text).map((l, i) => (
              <motion.p key={i} className="line" variants={line}>
                {l}
              </motion.p>
            ))}
            {scene.subtitle && (
              <motion.p
                className="subtitle"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
              >
                {scene.subtitle}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* progress dots */}
      {!isFinal && (
        <div className="dots" aria-hidden="true">
          {scenes.map((_, i) => (
            <span key={i} className={`dot ${i === index ? 'on' : ''} ${i < index ? 'past' : ''}`} />
          ))}
        </div>
      )}

      {/* tap hint, only on the opening scene */}
      <AnimatePresence>
        {scene.hint && (
          <motion.div
            className="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.4, duration: 1.2 }}
          >
            докосни, за да продължиш
          </motion.div>
        )}
      </AnimatePresence>

      {/* back, appears after the first beat */}
      {index > 0 && (
        <button className="nav back" onClick={prev} aria-label="Назад">
          ‹
        </button>
      )}

      {/* replay on the final scene */}
      {isFinal && (
        <motion.button
          className="replay"
          onClick={replay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          ↻ отначало
        </motion.button>
      )}
    </main>
  )
}
