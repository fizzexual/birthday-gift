# За теб, мамо 🌹

A small interactive birthday gift — a tap-through story that blooms a rose while the world wakes from night into day, and ends in confetti. Built for Mom's 51st, in Bulgarian, mobile-first.

**🌷 Live:** https://fizzexual.github.io/birthday-gift/

## How it works

Tap anywhere to move through the scenes. With each tap the rose opens a little more and the world brightens — from a starlit night, through sunrise, into a bright day with drifting clouds and birds — until it bursts into confetti.

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

- **The words** live in [`src/story.js`](src/story.js) — one object per scene (`text`, optional `subtitle`, `bloom` 0→1, and `sky` 0→1 for night→day).
- **The rose** is in [`src/components/Rose.jsx`](src/components/Rose.jsx) (petal rings, colors, glow).
- **The world** (sky palette, sun, stars, clouds, birds, hills) is in [`src/components/Landscape.jsx`](src/components/Landscape.jsx).
- **The finale colors** are in [`src/confetti.js`](src/confetti.js).

## Deploy

Pushing to `main` auto-builds and publishes to **GitHub Pages** via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The build (`dist/`) is fully static with relative paths (`base: './'`), so it also works on any other static host.

Made with love. ❤️
