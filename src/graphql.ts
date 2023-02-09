import { createPhase, resolvePhases } from '~/phase/phase.resolver'
import { createTask, markTaskAsCompleted, resolvePhaseTasks, resolveTasks } from '~/task/task.resolver'

const schema = `
  enum TaskStatus {
    OPEN
    COMPLETED
  }

  type Task {
    id: Int!
    phaseId: Int!
    title: String!
    status: TaskStatus!
  }

  input TaskInput {
    phaseId: Int!
    title: String!
  }

  enum PhaseStatus {
    OPEN
    COMPLETED
  }

  type Phase {
    id: Int!
    name: String!
    status: PhaseStatus!
    tasks(pagination: PaginationInput): [Task]
  }

  input PhaseInput {
    name: String!
  }

  input PaginationInput {
    first: Int!
    offset: Int
  }

  type Query {
    tasks(phaseId: Int, pagination: PaginationInput): [Task]!
    phases(pagination: PaginationInput): [Phase]!
  }

  type Mutation {
    createPhase(phase: PhaseInput!): Phase
    createTask(task: TaskInput!): Task
    markTaskAsCompleted(taskId: Int!): Boolean
  }
`

const resolvers = {
  Phase: {
    tasks: resolvePhaseTasks

  },
  Query: {
    phases: resolvePhases,
    tasks: resolveTasks
  },
  Mutation: {
    createPhase,
    createTask,
    markTaskAsCompleted
  }
}

export const mercuriusConfig = {
  schema,
  resolvers,
  graphiql: true
}
