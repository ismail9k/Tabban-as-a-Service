# TaaS – Tabban as a Service

<img src="/public/header.png" alt="tabban" />

Because sometimes English just doesn't capture the _exact_ level of disappointment.

[![Live Demo](https://img.shields.io/badge/Live_Demo-tabban.lol-blue?style=flat-square)](https://tabban.lol)
[![Built with Nuxt](https://img.shields.io/badge/Built_with-Nuxt-00DC82?style=flat-square&logo=nuxt.js)](https://nuxt.com)
[![Deployed on Cloudflare Pages](https://img.shields.io/badge/Deployed_on-Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com)

TaaS is a fun, open-source REST API that returns random Arabic rage phrases, sarcasm, and dramatic expressions along with meme images. It's built with Nuxt 4 (nitro) and designed to be hosted on Cloudflare Pages for free.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start-local-development)
- [API Reference](#-api-reference)
- [Tech Stack](#tech-stack)
- [Deployment](#deployment-cloudflare-pages)
- [Docker Support](#docker-support)
- [Contributing](#contributing)

## Features

- **Random Phrase Generator:** Get your daily dose of "تباً".
- **Intensity Levels:** Ranging from `mild` to `savage`.
- **Rate Limited:** Because anger should be paced (30 req/min per IP).
- **Shareable OG Images:** Auto-generates a meme image you can slap on any social post.

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the animated playground and API documentation.

## API Reference

Base URL: `http://tabban.lol` (or your deployed URL)

### 1. `GET /api/tabban`

Returns a random phrase + meme.

**Query Parameters:**

- `level` (optional): `mild` | `medium` | `savage`

**Example Response:**

```json
{
  "phrase": "تبًّا لك",
  "translation": "Damn you",
  "level": "medium",
  "meme_url": "/memes/petter-beat-kid.gif"
}
```

### 2. `GET /api/og`

Generates a 900×472 PNG meme image suitable for social sharing (OG image).

**Query Parameters (all optional):**

- `phrase` — Arabic phrase text to overlay (defaults to a random phrase)
- `translation` — English translation to overlay (defaults to match the random phrase)
- `meme` — filename of a specific meme image from the collection (defaults to random)

**Returns:** `image/png` (not JSON)

**Example:**

```
GET /api/og?phrase=تبًّا لك&translation=Damn you
```

### 3. `GET /api/health`

Check if the server is alive.

## Tech Stack

- **Framework:** Nuxt 4 (compatibility mode)
- **Deployment:** Cloudflare Pages (nitro preset)
- **Data Source:** Local JSON files (No DB needed!)
- **Styling:** Custom Vanilla CSS with CSS Variables and Animations

## Deployment (Cloudflare Pages)

This project is configured out-of-the-box for Cloudflare Pages.

1. Push your code to GitHub.
2. Log in to Cloudflare Dashboard > Pages.
3. Connect your repository.
4. Framework preset: **Nuxt.js** (or build command `npm run build` and output directory `.output/public`).
5. Deploy!

### If you deploy from CLI

Cloudflare Pages must use `wrangler pages deploy`, not `wrangler deploy`, or you'll get:

- `Missing entry-point to Worker script or to assets directory`

Use:

```bash
npm run build
npm run deploy
```

Or explicitly:

```bash
npx wrangler pages deploy ./dist --project-name=ismail9k-tabban-as-a-service --branch=main
```

## Docker Support

If you prefer to run this via Docker:

```bash
docker build -t taas-api .
docker run -p 3000:3000 taas-api
```

## Contributing

Got a better insult? A funnier meme? Pull requests are welcome!

1. Add your phrase to `server/data/phrases.json`
2. Add your meme image file to `public/memes/` and add the filename to `server/data/memes.json`
3. Open a PR! -> Receive a Taban

---

_No feelings were permanently harmed in the making of this API. Probably._
