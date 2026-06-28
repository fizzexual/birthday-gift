import { useMemo } from 'react'

/* Bees — a gentle, watching-over presence (in memory of grandpa).
   They drift in once the world warms and wander softly near the rose. */

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
      {/* wings */}
      <g className="bee-wing">
        <ellipse cx="12" cy="5" rx="5.6" ry="3.4" fill="rgba(255,255,255,0.72)" stroke="rgba(120,120,150,0.4)" strokeWidth="0.4" />
        <ellipse cx="18" cy="5.6" rx="4.6" ry="2.8" fill="rgba(255,255,255,0.6)" stroke="rgba(120,120,150,0.4)" strokeWidth="0.4" />
      </g>
      {/* body */}
      <ellipse cx="15" cy="12" rx="8.5" ry="6" fill="#f6c333" stroke="#5a3d10" strokeWidth="0.7" />
      <g clipPath={`url(#${cid})`}>
        <rect x="10" y="5" width="2.6" height="14" fill="#23201c" />
        <rect x="14.5" y="5" width="2.6" height="14" fill="#23201c" />
        <rect x="19" y="5" width="2.6" height="14" fill="#23201c" />
      </g>
      {/* head + antennae */}
      <circle cx="23.6" cy="12" r="3.2" fill="#2a2622" />
      <path d="M25 9.4 Q27 6.4 28 6.6" fill="none" stroke="#2a2622" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M25.4 10.6 Q27.4 9 28.4 9.4" fill="none" stroke="#2a2622" strokeWidth="0.7" strokeLinecap="round" />
    </svg>
  )
}

export default function Bees({ sky = 1, count = 3 }) {
  const bees = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: rnd(15, 78),
        top: rnd(24, 60),
        size: rnd(20, 30),
        dur: rnd(11, 18),
        delay: rnd(-12, 0),
        flip: Math.random() < 0.5,
      })),
    [count],
  )

  return (
    <div className="bees" aria-hidden="true" style={{ opacity: sky > 0.4 ? 1 : 0 }}>
      {bees.map((b, i) => (
        <div
          key={i}
          className="bee"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            animation: `beeWander ${b.dur}s ease-in-out ${b.delay}s infinite`,
          }}
        >
          <Bee i={i} flip={b.flip} />
        </div>
      ))}
    </div>
  )
}
