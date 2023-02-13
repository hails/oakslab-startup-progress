import type { PinoLoggerOptions } from 'fastify/types/logger'
import { buildFastify } from './app'

const start = async () => {
  try {
    const app = await buildFastify({
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      logger: {
        transport: {
          target: 'pino-pretty'
        }
      } as PinoLoggerOptions
    })

    await app.listen({ port: 3000 })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

void start()
