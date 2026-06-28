# За теб, мамо 🌹

A small interactive birthday gift — a tap-through story that blooms a rose and ends in confetti. Built for Mom's 51st, in Bulgarian, mobile-first.

## How it works

Tap anywhere to move through ten scenes. With each tap the rose opens a little more, the glow warms, and the words build toward the finale — where it bursts into confetti.

- **Tap / click** — next scene
- **‹** (top-left) or **←** — go back
- **↻ отначало** / **R** — replay from the start

## Stack

- **React 19** + **Vite**
- **Framer Motion** — scene transitions and the blooming rose (an SVG of layered petal rings, each unfurling across its own slice of the story's `bloom` value)
- **canvas-confetti** — the finale

Everything is hand-drawn SVG and CSS — no images, so it's tiny and sharp on any screen.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Make it yours

- **The words** live in [`src/story.js`](src/story.js) — one object per scene (`text`, optional `subtitle`, and `bloom` 0→1).
- **The rose** is in [`src/components/Rose.jsx`](src/components/Rose.jsx) (petal rings, colors, glow).
- **The finale colors** are in [`src/confetti.js`](src/confetti.js).

The build (`dist/`) is fully static — drop it on any host (Cloudflare Pages, GitHub Pages, Netlify…).

Made with love. ❤️
