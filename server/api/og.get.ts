// server/api/og.get.ts
// In dev (Node.js) this resolves to @cf-wasm/resvg (node-compatible).
// In production (Cloudflare Workers) nuxt.config aliasing swaps it to /workerd.
import { Resvg } from '@cf-wasm/resvg'
import { getPhrases, getRandomMeme, randomPick } from '../utils/phrases'

function getExtension(path: string): string {
  return path.split('.').pop()?.toLowerCase() ?? ''
}

// Chunked base64 encoding — avoids call stack overflow for large images
function uint8ToBase64(buf: Uint8Array): string {
  let binary = ''
  const chunkSize = 32768
  for (let i = 0; i < buf.length; i += chunkSize) {
    binary += String.fromCharCode(...buf.subarray(i, i + chunkSize))
  }
  return btoa(binary)
}

function buildSvg(params: {
  phrase: string
  translation: string
  memeDataUrl: string
}): string {
  const { phrase, translation, memeDataUrl } = params
  const escapeXml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  // 900×472 keeps the 1.91:1 OG aspect ratio at 75% of 1200×630,
  // bringing the PNG under 600 KB for WhatsApp compatibility.
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="900" height="472">
  <image href="${memeDataUrl}" x="0" y="0" width="900" height="472" preserveAspectRatio="xMidYMid slice"/>
  <defs>
    <linearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%"   stop-color="#0a0a0f" stop-opacity="0.97"/>
      <stop offset="30%"  stop-color="#0a0a0f" stop-opacity="0.7"/>
      <stop offset="60%"  stop-color="#0a0a0f" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0a0a0f" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="900" height="472" fill="url(#grad)"/>
  <text x="882" y="27" font-family="Cairo" font-size="11" fill="white" fill-opacity="0.35" text-anchor="end" letter-spacing="2">tabban.lol</text>
  <text x="450" y="398" font-family="Cairo" font-weight="700" font-size="54" fill="#ff3860" text-anchor="middle" direction="rtl" unicode-bidi="embed">${escapeXml(phrase)}</text>
  <text x="450" y="435" font-family="Cairo" font-size="20" fill="white" fill-opacity="0.65" text-anchor="middle" font-style="italic">&quot;${escapeXml(translation)}&quot;</text>
</svg>`
}

// Resolve a meme path that is guaranteed non-GIF
function resolveMemePath(requested: string): string {
  let path = requested || getRandomMeme()
  let attempts = 0
  while (getExtension(path) === 'gif' && attempts < 20) {
    path = getRandomMeme()
    attempts++
  }
  if (getExtension(path) === 'gif') {
    throw createError({ statusCode: 500, message: 'No non-GIF meme available' })
  }
  return path
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // 1. Resolve phrase + translation
  let phrase = (query.phrase as string) || ''
  let translation = (query.translation as string) || ''
  if (!phrase || !translation) {
    const random = randomPick(getPhrases())
    phrase = phrase || random.text
    translation = translation || random.translation
  }

  // 2. Resolve meme — ensure non-GIF
  const memePath = resolveMemePath(query.meme as string)

  // 3. Fetch meme image
  // In Cloudflare Workers, self-HTTP-fetch to own origin is not supported.
  // Use env.ASSETS binding when available (production), fall back to HTTP fetch (local dev).
  const cloudflare = (event.context as any).cloudflare
  let mimeType: string
  let memeBuffer: ArrayBuffer

  if (!import.meta.dev && cloudflare?.env?.ASSETS) {
    // Production Cloudflare Pages: read static asset via ASSETS binding
    const assetRes = await cloudflare.env.ASSETS.fetch(new URL(memePath, 'https://assets.local'))
    if (!assetRes.ok) {
      throw createError({ statusCode: 502, message: `Failed to read meme asset: ${assetRes.status}` })
    }
    mimeType = assetRes.headers.get('content-type') ?? 'image/png'
    memeBuffer = await assetRes.arrayBuffer()
  } else {
    // Local dev: use HTTP self-fetch
    const requestUrl = getRequestURL(event)
    const memeUrl = `${requestUrl.protocol}//${requestUrl.host}${memePath}`
    const memeRes = await fetch(memeUrl)
    if (!memeRes.ok) {
      throw createError({ statusCode: 502, message: `Failed to fetch meme: ${memeRes.status}` })
    }
    mimeType = memeRes.headers.get('content-type') ?? 'image/png'
    memeBuffer = await memeRes.arrayBuffer()
  }

  const memeBase64 = uint8ToBase64(new Uint8Array(memeBuffer))
  const memeDataUrl = `data:${mimeType};base64,${memeBase64}`

  // 4. Load font from server assets
  const raw = await useStorage('assets:server').getItemRaw('fonts/Cairo-Bold.ttf')
  if (!raw) {
    throw createError({ statusCode: 500, message: 'Cairo font not found in server assets' })
  }
  const fontData = raw instanceof Uint8Array ? raw : new Uint8Array(raw as ArrayBuffer)

  // 5. Build SVG
  const svg = buildSvg({ phrase, translation, memeDataUrl })

  // 6. Render SVG → PNG (must use Resvg.async — WASM init is async on cold starts)
  const resvg = await Resvg.async(svg, {
    font: { fontBuffers: [fontData] },
  })
  const pngData = resvg.render().asPng()

  // 7. Return PNG
  setHeader(event, 'Content-Type', 'image/png')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=86400')
  return pngData
})
