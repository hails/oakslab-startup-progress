import Fastify from 'fastify'
import mercurius from 'mercurius'
import type { PinoLoggerOptions } from 'fastify/types/logger'
import { type Phase, PhaseStatus } from './phase/phase.model'
import { type Task, TaskStatus } from './task/task.model'
import { mercuriusConfig } from './graphql'

export const state: {
  phases: Phase[]
  tasks: Task[]
} = {
  phases: [
    {
      name: 'Foundation',
      status: PhaseStatus.COMPLETED
    },
    {
      name: 'Discovery',
      status: PhaseStatus.OPEN
    },
    {
      name: 'Delivery',
      status: PhaseStatus.OPEN
    }
  ],
  tasks: [
    {
      phaseId: 0,
      title: 'Setup virtual office',
      status: TaskStatus.COMPLETED
    },
    {
      phaseId: 0,
      title: 'Setup mission & vision',
      status: TaskStatus.COMPLETED
    },
    {
      phaseId: 0,
      title: 'Select business name',
      status: TaskStatus.COMPLETED
    },
    {
      phaseId: 0,
      title: 'Buy domains',
      status: TaskStatus.COMPLETED
    },
    {
      phaseId: 1,
      title: 'Create roadmap',
      status: TaskStatus.COMPLETED
    },
    {
      phaseId: 1,
      title: 'Competitor analysis',
      status: TaskStatus.OPEN
    },
    {
      phaseId: 2,
      title: 'Release mkarting website',
      status: TaskStatus.OPEN
    },
    {
      phaseId: 2,
      title: 'Release MVP',
      status: TaskStatus.OPEN
    }
  ]
}

const app = Fastify({
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  } as PinoLoggerOptions
})

const start = async () => {
  try {
    await app.register(mercurius, mercuriusConfig)

    await app.listen({ port: 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

void start()
