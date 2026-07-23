# Hi there! 👋

I'm Sebastian Guevara, a Full Stack Developer based in Corrientes, Argentina. Welcome to my portfolio!

Here, you'll find a showcase of my projects and skills. Feel free to explore and reach out if you'd like to connect or collaborate.

Let's build something amazing together!

## Tech stack

- [Astro](https://astro.build) 7 (static output)
- [Tailwind CSS](https://tailwindcss.com) 4 — CSS-first config, monochromatic dark theme with a single amber accent
- [Bun](https://bun.sh) as package manager & runtime
- Docker + nginx for deployment

Mobile-first UI: floating bottom dock navigation on mobile, side rail on
desktop, capped content width. All content is driven by `cv.json`.

## i18n (EN/ES)

The site ships in English (`/`) and Spanish (`/es/`). Translatable fields in
`cv.json` are `{ "en": "...", "es": "..." }` objects; UI strings live in
`src/consts/copy.ts`. An inline script picks the visitor's language: stored
choice → browser language → timezone (Spanish-speaking zones → `/es/`).
A manual EN/ES toggle lives in the side rail and mobile header.

## Dark / light theme

Dark is the default; a light palette is defined in `src/styles/tokens.css`
under `[data-theme="light"]`. The toggle stores the choice and the inline
head script applies it before first paint (system preference as fallback).

## SEO

Canonical + `hreflang` alternates, Open Graph / Twitter cards, JSON-LD
(`Person`), sitemap (`@astrojs/sitemap`), dynamic `robots.txt`, and a
generated `public/og.png` (`bun run og` after editing `cv.json`).

## CV download

Drop `public/cv-en.pdf` and `public/cv-es.pdf`; the hero "Download CV"
button renders per-locale only when the matching file exists.

## Development

```bash
bun install
bun run dev
```

## Build

```bash
bun run build   # astro check + astro build → dist/
```

## Docker

```bash
docker compose up --build
# → http://localhost:8080
```
