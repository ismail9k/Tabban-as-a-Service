---
title: README Enhancement Design
date: 2026-04-16
topic: readme-enhancement
status: approved
---

# README Enhancement Design

## Goal

Improve the existing README.md for TaaS (Tabban as a Service) to better showcase the project publicly, attract contributors, and serve as accurate API documentation — while preserving the project's playful, humorous tone.

**Live URL:** https://tabban.lol

## Approach

Option A — Glow-Up: Elevate each existing section without restructuring. Fix factual errors, fill gaps, and sharpen the humor.

## Changes by Section

### 1. Header & Badges

Keep existing header image and tagline unchanged. Add badge row beneath the tagline:
- Live Demo → https://tabban.lol (shields.io static badge)
- Built with Nuxt (shields.io)
- Deployed on Cloudflare Pages (shields.io)
- No license badge — the project has no LICENSE file and no `"license"` field in `package.json`; adding one would be a false claim

### 2. Table of Contents

Add a ToC after the intro paragraph with these links:
Features → Quick Start → API Reference → Tech Stack → Deployment → Docker Support → Contributing

(Use "Docker Support" — the exact heading in the current README.)

### 3. Intro Paragraph Fix

The current intro says "built with Nuxt 3 (nitro)" — this is inaccurate. Fix to "Nuxt 4 (nitro)" to match the Tech Stack section and the actual dependency in `package.json`.

### 4. Features

Add a new bullet:
- **Shareable OG Images:** Auto-generates a meme image you can slap on any social post.

### 5. API Reference

Renumber all endpoints cleanly (1, 2, 3) after changes.

**Remove** the `/api/roast` section entirely — this endpoint does not exist.

**Add** a new `GET /api/og` section:

> Generates a 900×472 PNG meme image suitable for social sharing (OG image).
>
> **Query Parameters (all optional):**
> - `phrase` — Arabic phrase text to overlay (defaults to a random phrase)
> - `translation` — English translation to overlay (defaults to match the random phrase)
> - `meme` — filename of a specific meme image from the collection (defaults to random)
>
> **Returns:** `image/png` (not JSON)
>
> **Example:**
> `GET /api/og?phrase=تبًّا لك&translation=Damn you`

Keep `/api/tabban` and `/api/health` sections unchanged.

### 6. Contributing

- Fix typo: "Recive" → "Receive"
- Fix stale instruction: current README says to add "meme URL to `server/data/memes.json`" but memes are local image files (not URLs). Update to: add your meme image file to `public/memes/` and add the filename to `server/data/memes.json`.
- Preserve the joke tone

### 7. All Other Sections

Quick Start, Tech Stack, Deployment, Docker Support — minor wording cleanup only, no structural changes.

## Out of Scope

- New screenshots or animated GIFs
- Changing the project tagline
- Adding a separate CONTRIBUTING.md file
- Any code changes
