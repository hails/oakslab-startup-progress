import { paginate, type PaginationInput } from '~/pagination'
import type { Phase } from '~/phase/phase.model'
import { state } from '~/app'
import type { Task } from './task.model'
import { TaskService } from './task.service'

export interface TasksResolverParams { phaseId: number, pagination?: PaginationInput }

export const resolveTasks = (_: any, { phaseId, pagination }: TasksResolverParams) => {
  const tasks = state.tasks
    .map((task, index) => ({ id: index, ...task }))
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    .filter(t => Number.isInteger(phaseId) ? t.phaseId === phaseId : true)

  return paginate(tasks, pagination)
}

type ParentPhaseTaskResolverInput = Phase & { id: number }

export const resolvePhaseTasks = (parent: ParentPhaseTaskResolverInput, { pagination }: { pagination: PaginationInput }) => {
  const tasks = state.tasks
    .map((t, id) => ({ ...t, id }))
    .filter(t => t.phaseId === parent.id)

  return paginate(tasks, pagination)
}

export const createTask = (_: any, { task }: { task: Task }) => {
  const taskService = new TaskService(state)
  return taskService.create(task)
}

export const markTaskAsCompleted = (_: any, { taskId }: { taskId: number }) => {
  const taskService = new TaskService(state)
  return taskService.markAsCompleted(taskId)
}
