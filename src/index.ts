import Fastify from 'fastify'
import mercurius from 'mercurius'
import type { PinoLoggerOptions } from 'fastify/types/logger'

const app = Fastify({
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  } as PinoLoggerOptions
})

const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`

const resolvers = {
  Query: {
    add: async (_: any, { x, y }: { x: number, y: number }) => x + y
  }
}

/**
 * Run the server!
 */
const start = async () => {
  try {
    await app.register(mercurius, {
      schema,
      resolvers,
      graphiql: true
    })

    await app.listen({ port: 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
