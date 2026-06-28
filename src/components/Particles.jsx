import { useMemo } from 'react'

/* Ambient life drifting over the scene:
   warm pollen rising, a few rose petals falling, and floating hearts.
   Pure CSS animation (see App.css) so it stays smooth on a phone. */

const rnd = (a, b) => a + Math.random() * (b - a)

export default function Particles({ count = 12 }) {
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
      Array.from({ length: 5 }, () => ({
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

  const hearts = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        left: rnd(4, 96),
        size: rnd(11, 22),
        dur: rnd(12, 22),
        delay: rnd(-22, 0),
        sway: rnd(-34, 34),
        opacity: rnd(0.3, 0.6),
        hue: rnd(-14, 10),
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
            animation: `rise ${m.dur}s linear ${m.delay}s infinite`,
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
            animation: `fall ${p.dur}s linear ${p.delay}s infinite`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
            filter: `hue-rotate(${p.hue}deg)`,
          }}
        >
          <path d="M10 0 C4 5 4 14 10 20 C16 14 16 5 10 0 Z" fill="rgba(231,90,120,0.55)" />
        </svg>
      ))}

      {hearts.map((h, i) => (
        <svg
          key={`h${i}`}
          className="heart"
          viewBox="0 0 20 20"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            animation: `floatHeart ${h.dur}s ease-in-out ${h.delay}s infinite`,
            '--sway': `${h.sway}px`,
            '--o': h.opacity,
            filter: `hue-rotate(${h.hue}deg)`,
          }}
        >
          <path
            d="M10 17.5 C2 11.8 3 4.5 8 4.5 C9.6 4.5 10 6 10 6 C10 6 10.4 4.5 12 4.5 C17 4.5 18 11.8 10 17.5 Z"
            fill="rgba(244,108,138,0.75)"
          />
        </svg>
      ))}
    </div>
  )
}
