# Michael Smith — Portfolio

A single-page dark portfolio landing page built with **React + Vite + TypeScript + Tailwind CSS + GSAP + Framer Motion + hls.js**.

## Stack

- **React 18** + **Vite 5** + **TypeScript** — app shell & tooling
- **Tailwind CSS 3** (+ `tailwindcss-animate`) — design system & utilities
- **GSAP** (+ ScrollTrigger) — hero entrance, parallax pinning, marquee
- **Framer Motion** — loading screen, scroll-reveals, page transitions, lightbox
- **hls.js** — HLS background video (Mux stream) with native fallback
- **react-router-dom** — routing + page transitions

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Sections

1. **Loading Screen** — rAF counter `000→100`, rotating words, gradient progress bar
2. **Hero** — HLS background video, floating nav pill, cycling role word, GSAP entrance
3. **Selected Works** — bento grid with halftone overlays & hover labels
4. **Journal** — horizontal pill entries
5. **Explorations** — GSAP ScrollTrigger pinned parallax gallery + lightbox
6. **Stats** — animated counters
7. **Contact / Footer** — flipped HLS video, GSAP marquee, availability status

## Design system

Forced dark theme. Colors are exposed as HSL custom properties in `src/index.css`
and surfaced to Tailwind in `tailwind.config.js`. The signature accent gradient is
`linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)`, available via the
`.accent-gradient` / `.accent-gradient-animated` utilities.
