/**
 * Simple in-memory rate limiter for Cloudflare-compatible environments.
 * Uses Map to track requests per IP within a time window.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

const WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS = 30     // 30 req/min per IP. Be kind to the server 🙏

/**
 * Returns whether a given IP has exceeded the rate limit.
 * Also cleans up expired entries (we're not a garbage collector, but here we are).
 */
export function checkRateLimit(ip: string): { limited: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    // Fresh start 🌅
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { limited: false, remaining: MAX_REQUESTS - 1, resetAt: now + WINDOW_MS }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { limited: true, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { limited: false, remaining: MAX_REQUESTS - entry.count, resetAt: entry.resetAt }
}
