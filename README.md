# 💥 TaaS – Tabban as a Service

Because sometimes English just doesn't capture the _exact_ level of disappointment.

TaaS is a fun, open-source REST API that returns random Arabic rage phrases, sarcasm, and dramatic expressions along with meme images. It's built with Nuxt 3 (nitro) and designed to be hosted on Cloudflare Pages for free.

## ✨ Features

- **Random Phrase Generator:** Get your daily dose of "تباً".
- **Intensity Levels:** Ranging from `mild` to `savage`.
- **Rate Limited:** Because anger should be paced (30 req/min per IP).

## 🚀 Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the animated playground and API documentation.

## 📡 API Reference

Base URL: `http://localhost:3000` (or your deployed URL)

### 1. `GET /api/tabban`

Returns a random phrase + meme.

**Query Parameters:**

- `level` (optional): `mild` | `medium` | `savage`

**Example Response:**

```json
{
  "phrase": "ما شاء الله، ذكاء نادر",
  "translation": "Mashallah, a rare intelligence... in reverse.",
  "level": "savage",
  "meme_url": "https://i.imgflip.com/4fhsz6.png"
}
```

### 2. `GET /api/roast`

Get roasted. Default level is `savage`.

**Query Parameters:**

- `level` (optional): `mild` | `medium` | `savage`

### 4. `GET /api/health`

Check if the server is alive.

## 🛠️ Tech Stack

- **Framework:** Nuxt 4 (compatibility mode)
- **Deployment:** Cloudflare Pages (nitro preset)
- **Data Source:** Local JSON files (No DB needed!)
- **Styling:** Custom Vanilla CSS with CSS Variables and Animations

## ☁️ Deployment (Cloudflare Pages)

This project is configured out-of-the-box for Cloudflare Pages.

1. Push your code to GitHub.
2. Log in to Cloudflare Dashboard > Pages.
3. Connect your repository.
4. Framework preset: **Nuxt.js** (or build command `npm run build` and output directory `.output/public`).
5. Deploy!

## 🐋 Docker Support

If you prefer to run this via Docker:

```bash
docker build -t taas-api .
docker run -p 3000:3000 taas-api
```

## 🤝 Contributing

Got a better insult? A funnier meme? Pull requests are welcome!

1. Add your phrase to `server/data/phrases.json`
2. Add your meme URL to `server/data/memes.json`
3. Open a PR!

---

_No feelings were permanently harmed in the making of this API. Probably._
