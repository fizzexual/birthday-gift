import { useMemo } from 'react'
import { motion } from 'framer-motion'

/* Bees — a gentle, watching-over presence (in memory of grandpa).
   They appear only at the end and fly randomly around the whole screen. */

const rnd = (a, b) => a + Math.random() * (b - a)

function Bee({ i, flip }) {
  const cid = `beeclip${i}`
  return (
    <svg className="bee-svg" viewBox="0 0 28 20" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <defs>
        <clipPath id={cid}>
          <ellipse cx="15" cy="12" rx="8.5" ry="6" />
        </clipPath>
      </defs>
      <g className="bee-wing">
        <ellipse cx="12" cy="5" rx="5.6" ry="3.4" fill="rgba(255,255,255,0.72)" stroke="rgba(120,120,150,0.4)" strokeWidth="0.4" />
        <ellipse cx="18" cy="5.6" rx="4.6" ry="2.8" fill="rgba(255,255,255,0.6)" stroke="rgba(120,120,150,0.4)" strokeWidth="0.4" />
      </g>
      <ellipse cx="15" cy="12" rx="8.5" ry="6" fill="#f6c333" stroke="#5a3d10" strokeWidth="0.7" />
      <g clipPath={`url(#${cid})`}>
        <rect x="10" y="5" width="2.6" height="14" fill="#23201c" />
        <rect x="14.5" y="5" width="2.6" height="14" fill="#23201c" />
        <rect x="19" y="5" width="2.6" height="14" fill="#23201c" />
      </g>
      <circle cx="23.6" cy="12" r="3.2" fill="#2a2622" />
      <path d="M25 9.4 Q27 6.4 28 6.6" fill="none" stroke="#2a2622" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M25.4 10.6 Q27.4 9 28.4 9.4" fill="none" stroke="#2a2622" strokeWidth="0.7" strokeLinecap="round" />
    </svg>
  )
}

export default function Bees({ active, count = 3 }) {
  const bees = useMemo(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 390
    const h = typeof window !== 'undefined' ? window.innerHeight : 800
    return Array.from({ length: count }, () => {
      const steps = 6 + Math.floor(rnd(0, 3))
      const xs = []
      const ys = []
      const rs = []
      for (let k = 0; k < steps; k++) {
        xs.push(Math.round(rnd(0.05, 0.88) * w))
        ys.push(Math.round(rnd(0.07, 0.74) * h))
        rs.push(rnd(-14, 14))
      }
      // close the loop so it repeats seamlessly
      xs.push(xs[0])
      ys.push(ys[0])
      rs.push(rs[0])
      return { xs, ys, rs, size: rnd(22, 32), dur: rnd(13, 22), delay: rnd(0, 2), flip: Math.random() < 0.5 }
    })
  }, [count])

  if (!active) return null

  return (
    <div className="bees" aria-hidden="true">
      {bees.map((b, i) => (
        <motion.div
          key={i}
          className="bee"
          style={{ width: b.size, left: 0, top: 0 }}
          initial={{ x: b.xs[0], y: b.ys[0], opacity: 0 }}
          animate={{ x: b.xs, y: b.ys, rotate: b.rs, opacity: 1 }}
          transition={{
            x: { duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay },
            y: { duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay },
            rotate: { duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay },
            opacity: { duration: 1.4 },
          }}
        >
          <Bee i={i} flip={b.flip} />
        </motion.div>
      ))}
    </div>
  )
}
