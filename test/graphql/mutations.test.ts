import test from 'ava'
import supertest from 'supertest'
import { buildFastify } from '~/app'

const CREATE_PHASE_MUTATION = `
  mutation CreatePhase($phase: PhaseInput!) {
    createPhase(phase: $phase) {
      id
      name
    }
  }
`

const MARK_TASK_AS_COMPLETED_MUTATION = `
  mutation MarkTaskAsCompleted($taskId: Int!) {
    markTaskAsCompleted(taskId: $taskId)
  }
`

const MARK_TASK_AS_OPEN_MUTATION = `
  mutation MarkTaskAsOpen($taskId: Int!) {
    markTaskAsOpen(taskId: $taskId)
  }
`

test('createPhase', async (t) => {
  const fastify = await buildFastify()
  t.teardown(async () => { await fastify.close() })
  await fastify.ready()

  const variables = {
    phase: {
      name: 'A new phase'
    }
  }

  const response = await supertest(fastify.server)
    .post('/graphql')
    .send({ query: CREATE_PHASE_MUTATION, variables })
    .expect(200)

  t.snapshot(response.body)
})

test('markTaskAsCompleted', async (t) => {
  const fastify = await buildFastify()
  t.teardown(async () => { await fastify.close() })
  await fastify.ready()

  const variables = {
    taskId: 4
  }

  const response = await supertest(fastify.server)
    .post('/graphql')
    .send({ query: MARK_TASK_AS_COMPLETED_MUTATION, variables })
    .expect(200)

  t.snapshot(response.body)
})

test('markTaskAsOpen', async (t) => {
  const fastify = await buildFastify()
  t.teardown(async () => { await fastify.close() })
  await fastify.ready()

  const variables = {
    taskId: 0
  }

  const response = await supertest(fastify.server)
    .post('/graphql')
    .send({ query: MARK_TASK_AS_OPEN_MUTATION, variables })
    .expect(200)

  t.snapshot(response.body)
})
