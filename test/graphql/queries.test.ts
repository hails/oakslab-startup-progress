import test from 'ava'
import supertest from 'supertest'
import { buildFastify } from '~/app'

const TASKS_QUERY = `
  query Tasks($phaseId: Int) {
    tasks(phaseId: $phaseId) {
      id
      phaseId
      title
      status
    }
  }
`

const PHASES_QUERY = `
  query Phases {
    phases {
      id
      name
      status
      tasks {
        id
        title
        status
      }
    }
  }
`

test('tasks', async (t) => {
  const fastify = await buildFastify()
  t.teardown(async () => { await fastify.close() })
  await fastify.ready()

  const response = await supertest(fastify.server)
    .post('/graphql')
    .send({ query: TASKS_QUERY })
    .expect(200)

  t.snapshot(response.body)
})

test('phases', async (t) => {
  const fastify = await buildFastify()
  t.teardown(async () => { await fastify.close() })
  await fastify.ready()

  const response = await supertest(fastify.server)
    .post('/graphql')
    .send({ query: PHASES_QUERY })
    .expect(200)

  t.snapshot(response.body)
})
