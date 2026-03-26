// GET /api/middleware - logs all incoming API requests
// This runs before every API route in the /api directory
import { logger } from '~~/server/utils/logger'
import { checkRateLimit } from '~~/server/utils/rateLimit'

export default defineEventHandler((event) => {
  const url = event.path
  const method = event.method
  const ip = getHeader(event, 'x-forwarded-for') || getHeader(event, 'x-real-ip') || 'unknown'

  // Only apply to /api routes
  if (!url?.startsWith('/api')) return

  logger.info(`Incoming ${method} ${url}`, { ip })

  // Rate limiting – the API is free but not THAT free
  const result = checkRateLimit(ip)
  setHeader(event, 'X-RateLimit-Limit', '30')
  setHeader(event, 'X-RateLimit-Remaining', String(result.remaining))
  setHeader(event, 'X-RateLimit-Reset', String(Math.ceil(result.resetAt / 1000)))

  if (result.limited) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests',
      data: {
        error: 'Slow down! Even تباً has limits.',
        message: 'Rate limit exceeded. Try again in a minute.',
        retryAfter: Math.ceil((result.resetAt - Date.now()) / 1000),
      },
    })
  }
})
