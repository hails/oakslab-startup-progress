import test from 'ava'
import { getInitialApplicationState } from 'test/setup'
import { PhaseStatus } from '~/phase/phase.model'
import { type Task, TaskStatus } from '~/task/task.model'
import { TaskService } from '~/task/task.service'

test('#create - creates a new task with "OPEN" status', async (t) => {
  const state = getInitialApplicationState()
  const taskService = new TaskService(state)
  const task: Task = {
    phaseId: 0,
    title: 'A new task',
    status: TaskStatus.OPEN
  }

  const newTask = taskService.create(task)
  t.deepEqual(newTask, { id: 8, ...task })
  t.deepEqual(state.tasks[8], task)
})

test('#create - throws an error when phaseId does not exist', async (t) => {
  const state = getInitialApplicationState()
  const taskService = new TaskService(state)
  const task: Task = {
    phaseId: 123456,
    title: 'A new task',
    status: TaskStatus.OPEN
  }

  const error = t.throws(() => taskService.create(task))
  t.deepEqual(error?.cause, { code: 'TASK_NOT_FOUND', phaseId: 123456 })
})

test('#markAsCompleted', async (t) => {
  const state = getInitialApplicationState()
  const taskService = new TaskService(state)

  taskService.markAsCompleted(4)

  t.is(state.tasks[4]!.status, TaskStatus.COMPLETED)
})

test('#markAsCompleted - set phase as completed if the other tasks are also completed', async (t) => {
  const state = getInitialApplicationState()
  const taskService = new TaskService(state)

  taskService.markAsCompleted(5)

  t.is(state.phases[1]!.status, PhaseStatus.COMPLETED)
})

test('#markAsCompleted - throws an error when the previous phase are not completed', async (t) => {
  const state = getInitialApplicationState()
  const taskService = new TaskService(state)

  const error = t.throws(() => taskService.markAsCompleted(6))
  t.deepEqual(error?.cause, { code: 'PREVIOUS_PHASE_NOT_COMPLETED', taskId: 6 })
})
