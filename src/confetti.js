import confetti from 'canvas-confetti'

const ROSE = ['#e75a78', '#b81f44', '#f7aabb', '#ffd6a0', '#ffe6b0', '#fff4e0']

/* A warm, celebratory burst sequence — rose + gold.
   Returns a stop() so we can cancel if the user replays. */
export function celebrate() {
  let cancelled = false

  // opening pop from the centre
  confetti({
    particleCount: 90,
    spread: 95,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.55 },
    colors: ROSE,
    scalar: 1.05,
    ticks: 260,
  })

  // two side cannons
  const cannon = (x, angle) =>
    confetti({
      particleCount: 60,
      angle,
      spread: 70,
      startVelocity: 55,
      origin: { x, y: 0.7 },
      colors: ROSE,
      ticks: 280,
    })
  setTimeout(() => !cancelled && cannon(0.08, 60), 220)
  setTimeout(() => !cancelled && cannon(0.92, 120), 360)

  // a gentle, lasting drift from the top
  const end = Date.now() + 2600
  const drift = () => {
    if (cancelled || Date.now() > end) return
    confetti({
      particleCount: 4,
      startVelocity: 0,
      gravity: 0.5,
      spread: 70,
      origin: { x: Math.random(), y: -0.05 },
      colors: ROSE,
      scalar: Math.random() * 0.5 + 0.7,
      ticks: 320,
    })
    requestAnimationFrame(drift)
  }
  drift()

  return () => {
    cancelled = true
  }
}
