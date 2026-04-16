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
- Keep existing header image and tagline unchanged
- Add badge row beneath the tagline:
  - Live Demo → https://tabban.lol
  - Built with Nuxt (shields.io)
  - Deployed on Cloudflare Pages (shields.io)
  - License: MIT (shields.io)

### 2. Table of Contents
Add a ToC after the intro paragraph linking to: Features, Quick Start, API Reference, Tech Stack, Deployment, Docker, Contributing.

### 3. Features
Add a new bullet: **OG Image Generation** — auto-generates a shareable meme image for any phrase.

### 4. API Reference
- **Remove** the `/api/roast` section entirely (endpoint does not exist in codebase)
- **Add** `/api/og` section documenting the dynamic OG image generation endpoint
- Keep `/api/tabban` and `/api/health` sections unchanged

### 5. Contributing
- Fix typo: "Recive" → "Receive"
- Preserve the joke: "Open a PR → Receive a Taban"

### 6. All Other Sections
Quick Start, Tech Stack, Deployment, Docker — minor wording cleanup for consistency only. No structural changes.

## Out of Scope
- New screenshots or animated GIFs
- Changing the project description or tagline
- Adding a CONTRIBUTING.md file
- Any code changes
