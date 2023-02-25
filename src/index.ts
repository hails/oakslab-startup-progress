import type { PinoLoggerOptions } from 'fastify/types/logger'
import { buildFastify } from './app'
import * as Sentry from '@sentry/node'
import '@sentry/tracing'
import { ProfilingIntegration } from '@sentry/profiling-node'

Sentry.init({
  dsn: process.env['SENTRY_DSN'] as string,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  integrations: [
    new ProfilingIntegration()
  ]
})

const start = async () => {
  try {
    const logger = process.env['NODE_ENV'] === 'production'
      ? true
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      : {
          transport: {
            target: 'pino-pretty'
          }
        } as PinoLoggerOptions

    const app = await buildFastify({
      logger
    })

    const port = process.env['PORT'] ?? 3000

    await app.listen({ host: '0.0.0.0', port: port as number })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

void start()
