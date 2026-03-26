/**
 * Logging utility – because printf debugging is a time-honored tradition.
 */

type LogLevel = 'info' | 'warn' | 'error'

function formatLog(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
  const timestamp = new Date().toISOString()
  const emoji = level === 'info' ? '📡' : level === 'warn' ? '⚠️' : '💥'
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : ''
  console[level === 'info' ? 'log' : level](`${emoji} [TaaS] [${timestamp}] ${message}${metaStr}`)
}

export const logger = {
  info: (msg: string, meta?: Record<string, unknown>) => formatLog('info', msg, meta),
  warn: (msg: string, meta?: Record<string, unknown>) => formatLog('warn', msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => formatLog('error', msg, meta),
}
