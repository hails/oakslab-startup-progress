import Fastify from 'fastify'
import mercurius from 'mercurius'
import { mercuriusConfig } from './graphql'
import { type Phase, PhaseStatus } from './phase/phase.model'
import { type Task, TaskStatus } from './task/task.model'

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
      title: 'Release marketing website',
      status: TaskStatus.OPEN
    },
    {
      phaseId: 2,
      title: 'Release MVP',
      status: TaskStatus.OPEN
    }
  ]
}

export const buildFastify = async (opts = {}) => {
  const app = Fastify(opts)

  await app.register(mercurius, mercuriusConfig)

  // eslint-disable-next-line @typescript-eslint/return-await
  return app
}
