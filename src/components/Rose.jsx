import { motion } from 'framer-motion'

/* A rose petal, base at the origin (0,0), tip pointing up (-y).
   Rounded top, gently tapered base — looks right when layered in rings. */
function petalPath(L, W) {
  return `M 0 0
    C ${-W} ${-L * 0.28}, ${-W} ${-L * 0.96}, 0 ${-L}
    C ${W} ${-L * 0.96}, ${W} ${-L * 0.28}, 0 0 Z`
}

const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const clamp = (t) => Math.min(1, Math.max(0, t))

/* Each ring opens across its own slice of the global bloom (0..1),
   so the flower unfurls from the core outward. */
const RINGS = [
  { count: 5, L: 26, W: 18, rot: 20, from: 0.06, to: 0.34, fill: 'url(#petalIn)' },
  { count: 6, L: 44, W: 25, rot: 0, from: 0.2, to: 0.56, fill: 'url(#petalIn)' },
  { count: 7, L: 62, W: 30, rot: 26, from: 0.38, to: 0.74, fill: 'url(#petalMid)' },
  { count: 9, L: 80, W: 34, rot: 12, from: 0.54, to: 0.9, fill: 'url(#petalOut)' },
  { count: 10, L: 96, W: 37, rot: 30, from: 0.7, to: 1.0, fill: 'url(#petalOut)' },
]

function Petal({ L, W, angle, fill }) {
  return (
    <g transform={`rotate(${angle})`}>
      <path d={petalPath(L, W)} fill={fill} stroke="rgba(58,5,18,0.32)" strokeWidth="0.6" />
      {/* centre crease */}
      <path
        d={`M 0 ${-L * 0.04} C ${-W * 0.12} ${-L * 0.4}, ${-W * 0.1} ${-L * 0.78}, 0 ${-L * 0.92}`}
        fill="none"
        stroke="rgba(72,8,26,0.28)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      {/* soft sheen on one side */}
      <path
        d={`M 0 ${-L * 0.12} C ${W * 0.46} ${-L * 0.32}, ${W * 0.6} ${-L * 0.68}, ${W * 0.16} ${-L * 0.9}`}
        fill="none"
        stroke="rgba(255,214,214,0.12)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </g>
  )
}

function Ring({ count, L, W, rot, from, to, fill, bloom }) {
  const t = easeOut(clamp((bloom - from) / (to - from)))
  const scale = 0.12 + 0.88 * t
  const twist = (1 - t) * -26
  const opacity = clamp(t * 1.5)

  return (
    <motion.g
      style={{ originX: '0px', originY: '0px' }}
      animate={{ scale, rotate: twist, opacity }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {Array.from({ length: count }, (_, i) => {
        // a touch of asymmetry so it doesn't read as a perfect wheel
        const wobble = 1 + 0.05 * Math.sin(i * 2.3 + count)
        const angle = rot + (360 / count) * i + 2.4 * Math.sin(i * 1.7)
        return <Petal key={i} L={L * wobble} W={W} angle={angle} fill={fill} />
      })}
    </motion.g>
  )
}

/* the tightly rolled middle of the rose */
function Spiral({ bloom }) {
  const t = easeOut(clamp(bloom / 0.3))
  return (
    <motion.g
      style={{ originX: '0px', originY: '0px' }}
      animate={{ scale: 0.4 + 0.6 * t, opacity: clamp(t * 1.4) }}
      transition={{ duration: 1.3, ease: 'easeOut' }}
    >
      <path d="M 0 11 C 11 11 13 -3 1 -5 C -9 -6 -9 8 0 8" fill="none" stroke="#7a1232" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M 0 8 C 7 8 8 -2 1 -3 C -5 -4 -5 5 0 5" fill="none" stroke="#a31f43" strokeWidth="3" strokeLinecap="round" />
      <path d="M -7 2 C -9 -5 -2 -9 3 -6" fill="#9a1a3c" />
      <path d="M 7 1 C 10 -5 3 -10 -2 -7" fill="#b52548" />
      <circle cx="0" cy="0" r="3.2" fill="#ffd9a8" />
    </motion.g>
  )
}

export default function Rose({ bloom = 0, final = false }) {
  const stemT = easeOut(clamp(bloom / 0.32))

  return (
    <svg viewBox="-115 -115 230 285" width="100%" height="100%" role="img" aria-label="Роза" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="petalIn" cx="0" cy="0" r="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#86142f" />
          <stop offset="45%" stopColor="#c12a4e" />
          <stop offset="100%" stopColor="#f18199" />
        </radialGradient>
        <radialGradient id="petalMid" cx="0" cy="0" r="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#76112a" />
          <stop offset="44%" stopColor="#b42345" />
          <stop offset="100%" stopColor="#ef7990" />
        </radialGradient>
        <radialGradient id="petalOut" cx="0" cy="0" r="98" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#660e26" />
          <stop offset="40%" stopColor="#a51f42" />
          <stop offset="78%" stopColor="#de5070" />
          <stop offset="100%" stopColor="#f8acbd" />
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
          <feGaussianBlur stdDeviation="0.9" />
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
        <Spiral bloom={bloom} />
      </g>

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
