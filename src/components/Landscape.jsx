import { useEffect, useMemo } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

/* A world that wakes up as the story moves: night → dawn → sunrise → day.
   Everything is driven by one `sky` value (0..1) so it all moves together.
   Drawn in a 390×844 portrait space and sliced to cover the screen. */

const clamp = (t) => Math.min(1, Math.max(0, t))
const rnd = (a, b) => a + Math.random() * (b - a)

/* ---- colour helpers ---- */
const hexToRgb = (h) => {
  h = h.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}
const toHex = (n) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0')
const lerpHex = (a, b, t) => {
  const A = hexToRgb(a)
  const B = hexToRgb(b)
  return '#' + toHex(A[0] + (B[0] - A[0]) * t) + toHex(A[1] + (B[1] - A[1]) * t) + toHex(A[2] + (B[2] - A[2]) * t)
}

/* keyframed sky palette: [top, middle, horizon] at each stop */
const SKY = [
  { at: 0.0, c: ['#070617', '#0e0c2e', '#1b1542'] }, // deep night
  { at: 0.22, c: ['#141233', '#34204f', '#6a2f55'] }, // pre-dawn
  { at: 0.42, c: ['#2a3568', '#7c4570', '#e8895a'] }, // dawn, warm horizon
  { at: 0.62, c: ['#3f6fae', '#9aa6cd', '#ffc488'] }, // sunrise
  { at: 0.82, c: ['#4b8fcc', '#9ccbeb', '#dCEBF2'] }, // morning
  { at: 1.0, c: ['#3f8bd6', '#8ccdf2', '#eef9ff'] }, // bright day
]

const skyAt = (v, i) => {
  let a = SKY[0]
  let b = SKY[SKY.length - 1]
  for (let k = 0; k < SKY.length - 1; k++) {
    if (v >= SKY[k].at && v <= SKY[k + 1].at) {
      a = SKY[k]
      b = SKY[k + 1]
      break
    }
  }
  const t = a.at === b.at ? 0 : (v - a.at) / (b.at - a.at)
  return lerpHex(a.c[i], b.c[i], clamp(t))
}

export default function Landscape({ sky, final }) {
  const v = useMotionValue(sky)
  useEffect(() => {
    const controls = animate(v, sky, { duration: 1.8, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [sky, v])

  // sky gradient stops
  const top = useTransform(v, (x) => skyAt(x, 0))
  const mid = useTransform(v, (x) => skyAt(x, 1))
  const low = useTransform(v, (x) => skyAt(x, 2))

  // celestial bodies
  const starOp = useTransform(v, (x) => clamp((0.34 - x) / 0.34))
  const moonOp = useTransform(v, (x) => clamp((0.22 - x) / 0.18))
  const sunOp = useTransform(v, (x) => clamp((x - 0.34) / 0.12))
  const sunY = useTransform(v, (x) => 690 - clamp((x - 0.34) / 0.66) * 520)
  const sunFill = useTransform(v, (x) => lerpHex('#ff8a4d', '#fff3c4', clamp((x - 0.4) / 0.5)))
  const sunGlowOp = useTransform(v, (x) => clamp((x - 0.34) / 0.2) * 0.85)

  // weather + ground
  const cloudOp = useTransform(v, (x) => clamp((x - 0.4) / 0.25) * 0.95)
  const birdOp = useTransform(v, (x) => clamp((x - 0.52) / 0.18))
  const hazeOp = useTransform(v, (x) => clamp((x - 0.55) / 0.3) * 0.5)
  const backHill = useTransform(v, (x) => lerpHex('#141231', '#7bb673', x))
  const midHill = useTransform(v, (x) => lerpHex('#100e28', '#57a058', x))
  const frontHill = useTransform(v, (x) => lerpHex('#0a0820', '#3c8043', x))
  const backGrass = useTransform(v, (x) => lerpHex('#0c0c1d', '#327d3a', x))
  const frontGrass = useTransform(v, (x) => lerpHex('#070713', '#46a04e', x))
  const rayOp = useTransform(v, (x) => clamp((x - 0.9) / 0.1) * (final ? 0.5 : 0))

  const stars = useMemo(
    () =>
      Array.from({ length: 54 }, () => ({
        x: rnd(6, 384),
        y: rnd(14, 470),
        r: rnd(0.5, 1.7),
        d: rnd(0, 4),
        dur: rnd(2.4, 5),
      })),
    [],
  )

  const clouds = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        y: rnd(70, 380),
        s: rnd(0.7, 1.5),
        dur: rnd(46, 92),
        delay: rnd(-60, 0),
        o: rnd(0.55, 0.92),
      })),
    [],
  )

  const birds = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        y: rnd(90, 340),
        s: rnd(0.9, 1.5),
        dur: rnd(16, 30),
        delay: rnd(-26, 0),
        flap: rnd(0.42, 0.62),
      })),
    [],
  )

  // blades of grass, combined into one path per layer for performance
  const grass = useMemo(() => {
    const blade = (x, h, lean, w) =>
      `M ${x - w} 844 Q ${x + lean * 0.4} ${844 - h * 0.55} ${x + lean} ${844 - h} Q ${x + lean * 0.6} ${844 - h * 0.5} ${x + w} 844 Z`
    let back = ''
    for (let x = -8; x < 402; x += 11) back += blade(x + rnd(-3, 3), rnd(24, 50), rnd(-10, 10), 2.6)
    let front = ''
    for (let x = -8; x < 402; x += 16) front += blade(x + rnd(-4, 4), rnd(46, 88), rnd(-18, 18), 3.3)
    return { back, front }
  }, [])

  return (
    <svg
      className="landscape"
      viewBox="0 0 390 844"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <motion.stop offset="0%" stopColor={top} />
          <motion.stop offset="55%" stopColor={mid} />
          <motion.stop offset="100%" stopColor={low} />
        </linearGradient>
        <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(255,236,180,0.95)" />
          <stop offset="40%" stopColor="rgba(255,205,130,0.45)" />
          <stop offset="100%" stopColor="rgba(255,200,120,0)" />
        </radialGradient>
        <radialGradient id="moonGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(225,228,255,0.6)" />
          <stop offset="100%" stopColor="rgba(225,228,255,0)" />
        </radialGradient>
      </defs>

      {/* sky */}
      <rect x="0" y="0" width="390" height="844" fill="url(#skyGrad)" />

      {/* stars */}
      <motion.g style={{ opacity: starOp }}>
        {stars.map((s, i) => (
          <circle
            key={i}
            className="star"
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#fdf6ff"
            style={{ animation: `twinkle ${s.dur}s ease-in-out ${s.d}s infinite` }}
          />
        ))}
      </motion.g>

      {/* moon */}
      <motion.g style={{ opacity: moonOp }}>
        <circle cx="296" cy="150" r="58" fill="url(#moonGlow)" />
        <circle cx="296" cy="150" r="26" fill="#eef0ff" />
        <circle cx="286" cy="142" r="6" fill="#dfe2f4" opacity="0.6" />
        <circle cx="305" cy="158" r="4" fill="#dfe2f4" opacity="0.5" />
      </motion.g>

      {/* sun (rises from the horizon) — group is translated to the sun's position */}
      <motion.g style={{ x: 250, y: sunY, opacity: sunOp }}>
        <motion.circle cx="0" cy="0" r="120" fill="url(#sunGlow)" style={{ opacity: sunGlowOp }} />
        {/* rotating rays — only on the celebratory finale */}
        <motion.g style={{ opacity: rayOp }}>
          <g className="sunrays">
            {Array.from({ length: 12 }, (_, i) => (
              <rect key={i} x="-2" y="-208" width="4" height="138" rx="2" fill="rgba(255,240,190,0.5)" transform={`rotate(${i * 30})`} />
            ))}
          </g>
        </motion.g>
        <motion.circle cx="0" cy="0" r="34" fill={sunFill} />
      </motion.g>

      {/* clouds */}
      <motion.g style={{ opacity: cloudOp }}>
        {clouds.map((c, i) => (
          <g
            key={i}
            className="cloud"
            style={{ animation: `drift ${c.dur}s linear ${c.delay}s infinite` }}
          >
            <g transform={`translate(0 ${c.y}) scale(${c.s})`} opacity={c.o}>
              <ellipse cx="0" cy="0" rx="34" ry="16" fill="#fff" />
              <ellipse cx="26" cy="6" rx="30" ry="15" fill="#fff" />
              <ellipse cx="-24" cy="7" rx="26" ry="13" fill="#fff" />
              <ellipse cx="6" cy="-9" rx="22" ry="14" fill="#fff" />
            </g>
          </g>
        ))}
      </motion.g>

      {/* birds */}
      <motion.g style={{ opacity: birdOp }} fill="none" stroke="#2c2c38" strokeWidth="2" strokeLinecap="round">
        {birds.map((b, i) => (
          <g
            key={i}
            className="bird"
            style={{ '--y': `${b.y}px`, animation: `fly ${b.dur}s linear ${b.delay}s infinite` }}
          >
            <g transform={`scale(${b.s})`}>
              <path
                className="bird-wings"
                d="M-9 0 Q-4 -7 0 -1 Q4 -7 9 0"
                style={{ animation: `flap ${b.flap}s ease-in-out infinite alternate` }}
              />
            </g>
          </g>
        ))}
      </motion.g>

      {/* horizon haze as day breaks */}
      <motion.rect x="0" y="545" width="390" height="120" fill="#ffe6c4" style={{ opacity: hazeOp }} />

      {/* hills */}
      <motion.path d="M0 612 Q120 548 250 590 Q330 614 390 588 L390 844 L0 844 Z" fill={backHill} />
      <motion.path d="M0 678 Q140 620 270 668 Q340 694 390 666 L390 844 L0 844 Z" fill={midHill} />
      <motion.path d="M0 742 Q120 700 230 738 Q320 770 390 738 L390 844 L0 844 Z" fill={frontHill} />

      {/* grass, swaying in the breeze */}
      <motion.path className="grass grass--back" d={grass.back} fill={backGrass} />
      <motion.path className="grass grass--front" d={grass.front} fill={frontGrass} />
    </svg>
  )
}
