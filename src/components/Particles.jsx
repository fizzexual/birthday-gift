import { useMemo } from 'react'

/* Soft warm dust drifting up + a few rose petals drifting down.
   Pure CSS animation (see App.css) so it stays smooth on a phone. */

const rnd = (a, b) => a + Math.random() * (b - a)

export default function Particles({ count = 16 }) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: rnd(0, 100),
        size: rnd(2, 5),
        dur: rnd(9, 20),
        delay: rnd(-20, 0),
        drift: rnd(-40, 40),
        opacity: rnd(0.15, 0.5),
      })),
    [count],
  )

  const petals = useMemo(
    () =>
      Array.from({ length: 7 }, () => ({
        left: rnd(0, 100),
        size: rnd(10, 18),
        dur: rnd(11, 20),
        delay: rnd(-18, 0),
        drift: rnd(-60, 60),
        spin: rnd(-220, 220),
        hue: rnd(-12, 12),
      })),
    [],
  )

  return (
    <div className="particles" aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={`m${i}`}
          className="mote"
          style={{
            left: `${m.left}%`,
            width: m.size,
            height: m.size,
            opacity: m.opacity,
            '--dur': `${m.dur}s`,
            '--delay': `${m.delay}s`,
            '--drift': `${m.drift}px`,
          }}
        />
      ))}
      {petals.map((p, i) => (
        <svg
          key={`p${i}`}
          className="fpetal"
          viewBox="0 0 20 20"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
            filter: `hue-rotate(${p.hue}deg)`,
          }}
        >
          <path
            d="M10 0 C4 5 4 14 10 20 C16 14 16 5 10 0 Z"
            fill="rgba(231,90,120,0.55)"
          />
        </svg>
      ))}
    </div>
  )
}
