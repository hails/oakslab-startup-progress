import type { PinoLoggerOptions } from 'fastify/types/logger'
import { buildFastify } from './app'

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
    await app.listen({ port: port as number })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

void start()
