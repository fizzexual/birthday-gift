import { motion } from 'framer-motion'

/* A single rose petal, base at the origin (0,0), tip pointing up (-y).
   Rounded top, gently tapered base — looks right when layered in rings. */
function petalPath(L, W) {
  return `M 0 0
    C ${-W} ${-L * 0.28}, ${-W} ${-L * 0.96}, 0 ${-L}
    C ${W} ${-L * 0.96}, ${W} ${-L * 0.28}, 0 0 Z`
}

/* easeOutCubic — petals decelerate as they finish opening */
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const clamp = (t) => Math.min(1, Math.max(0, t))

/* Each ring opens across its own slice of the global bloom (0..1),
   so the flower unfurls from the core outward. */
const RINGS = [
  { count: 3, L: 15, W: 12, rot: 0, from: 0.0, to: 0.18, fill: 'url(#coreGrad)' },
  { count: 5, L: 31, W: 21, rot: 36, from: 0.08, to: 0.4, fill: 'url(#petalIn)' },
  { count: 6, L: 50, W: 28, rot: 12, from: 0.26, to: 0.62, fill: 'url(#petalIn)' },
  { count: 8, L: 71, W: 33, rot: 30, from: 0.46, to: 0.84, fill: 'url(#petalOut)' },
  { count: 9, L: 91, W: 37, rot: 8, from: 0.64, to: 1.0, fill: 'url(#petalOut)' },
]

function Ring({ count, L, W, rot, from, to, fill, bloom }) {
  const t = easeOut(clamp((bloom - from) / (to - from)))
  const scale = 0.12 + 0.88 * t
  const twist = (1 - t) * -26 // petals swirl open
  const opacity = clamp(t * 1.5)

  const petals = Array.from({ length: count }, (_, i) => {
    const angle = rot + (360 / count) * i
    return (
      <path
        key={i}
        d={petalPath(L, W)}
        transform={`rotate(${angle})`}
        fill={fill}
        stroke="rgba(60,5,18,0.28)"
        strokeWidth="0.6"
      />
    )
  })

  return (
    <motion.g
      style={{ originX: '0px', originY: '0px' }}
      animate={{ scale, rotate: twist, opacity }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {petals}
    </motion.g>
  )
}

export default function Rose({ bloom = 0, final = false }) {
  // stem + leaves draw in over the first third of the story
  const stemT = easeOut(clamp(bloom / 0.32))

  return (
    <svg
      viewBox="-115 -115 230 285"
      width="100%"
      height="100%"
      role="img"
      aria-label="Роза"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="coreGrad" cx="0" cy="0" r="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffd9a8" />
          <stop offset="60%" stopColor="#f06a8a" />
          <stop offset="100%" stopColor="#b81f44" />
        </radialGradient>

        <radialGradient id="petalIn" cx="0" cy="0" r="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7d1230" />
          <stop offset="45%" stopColor="#c32a4e" />
          <stop offset="100%" stopColor="#f17e98" />
        </radialGradient>

        <radialGradient id="petalOut" cx="0" cy="0" r="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6a0f28" />
          <stop offset="40%" stopColor="#a81f42" />
          <stop offset="78%" stopColor="#df5070" />
          <stop offset="100%" stopColor="#f7aabb" />
        </radialGradient>

        <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f7d3a" />
          <stop offset="100%" stopColor="#22501f" />
        </linearGradient>

        <radialGradient id="goldHalo" cx="0" cy="0" r="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,214,150,0.55)" />
          <stop offset="45%" stopColor="rgba(255,176,120,0.22)" />
          <stop offset="100%" stopColor="rgba(255,176,120,0)" />
        </radialGradient>

        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      {/* golden glow behind the rose, blooms in at the very end */}
      <motion.circle
        cx="0"
        cy="0"
        r="150"
        fill="url(#goldHalo)"
        initial={false}
        animate={{ opacity: final ? 1 : 0, scale: final ? 1 : 0.6 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />

      {/* stem + leaves (behind the bloom) */}
      <g style={{ opacity: stemT }}>
        <motion.path
          d="M 4 78 C 10 110, -4 135, 0 168"
          fill="none"
          stroke="url(#stemGrad)"
          strokeWidth="6.5"
          strokeLinecap="round"
          animate={{ pathLength: stemT }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        <motion.path
          d="M 6 116 C 34 104, 50 116, 44 138 C 24 142, 8 134, 6 116 Z"
          fill="url(#stemGrad)"
          style={{ originX: '6px', originY: '120px' }}
          animate={{ scale: clamp((bloom - 0.12) / 0.2), opacity: clamp((bloom - 0.12) / 0.2) }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <motion.path
          d="M -2 138 C -30 128, -48 140, -42 162 C -20 166, -4 156, -2 138 Z"
          fill="url(#stemGrad)"
          style={{ originX: '-2px', originY: '142px' }}
          animate={{ scale: clamp((bloom - 0.18) / 0.2), opacity: clamp((bloom - 0.18) / 0.2) }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </g>

      {/* the bloom */}
      <g filter="url(#soft)">
        {RINGS.map((r, i) => (
          <Ring key={i} {...r} bloom={bloom} />
        ))}
      </g>

      {/* sparkles on the final scene */}
      {final && <Sparkles />}
    </svg>
  )
}

function Sparkles() {
  const pts = [
    [-78, -42, 0],
    [70, -60, 0.4],
    [92, 18, 0.8],
    [-92, 22, 1.1],
    [44, 78, 0.6],
    [-52, 76, 1.3],
    [0, -98, 0.2],
  ]
  return (
    <g>
      {pts.map(([x, y, delay], i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0.2, 1], scale: [0, 1, 0.7, 1] }}
          transition={{ duration: 2.4, delay, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
          style={{ originX: `${x}px`, originY: `${y}px` }}
        >
          <path
            d={`M ${x} ${y - 6} L ${x + 1.6} ${y - 1.6} L ${x + 6} ${y} L ${x + 1.6} ${y + 1.6} L ${x} ${y + 6} L ${x - 1.6} ${y + 1.6} L ${x - 6} ${y} L ${x - 1.6} ${y - 1.6} Z`}
            fill="#ffe6b0"
          />
        </motion.g>
      ))}
    </g>
  )
}
