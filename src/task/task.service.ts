import type { ApplicationState } from '~/app.model'
import { PhaseStatus } from '~/phase/phase.model'
import { type Task, TaskStatus } from './task.model'

export class TaskService {
  state: ApplicationState

  constructor (state: ApplicationState) {
    this.state = state
  }

  create (task: Task) {
    if (this.state.phases.at(task.phaseId) === undefined) {
      throw new Error('Phase not found', { cause: { code: 'PHASE_NOT_FOUND', phaseId: task.phaseId } })
    }

    const id = this.state.tasks.push({ ...task, status: TaskStatus.OPEN }) - 1

    return {
      id,
      ...task
    }
  }

  markAsCompleted (id: number) {
    const task = this.state.tasks.at(id)
    if (task === null || task === undefined) {
      throw new Error('Task not found', { cause: { code: 'TASK_NOT_FOUND', taskId: id } })
    }

    if (!this.tasksPreviousPhaseAreCompleted(task.phaseId)) {
      throw new Error('Tasks cannot be marked as completed unless all tasks in the previous phase are completed', { cause: { code: 'PREVIOUS_PHASE_NOT_COMPLETED', taskId: id } })
    }

    this.state.tasks.at(id)!.status = TaskStatus.COMPLETED

    if (this.otherTasksSamePhaseAreCompleted(task)) {
      this.state.phases.at(task.phaseId)!.status = PhaseStatus.COMPLETED
    }

    return true
  }

  markAsOpen (id: number) {
    const task = this.state.tasks.at(id)

    if (task === null || task === undefined) {
      throw new Error('Task not found', { cause: { code: 'TASK_NOT_FOUND', taskId: id } })
    }

    if (this.state.phases.at(task.phaseId)?.status === PhaseStatus.COMPLETED) {
      this.state.phases[task.phaseId]!.status = PhaseStatus.OPEN
    }

    this.state.tasks.at(id)!.status = TaskStatus.OPEN

    return true
  }

  private tasksPreviousPhaseAreCompleted (currentPhaseId: number): boolean {
    if (currentPhaseId === 0) {
      return true
    }

    return this.hasStatusByPhaseId(this.state.tasks, currentPhaseId - 1, TaskStatus.COMPLETED)
  }

  private otherTasksSamePhaseAreCompleted (task: Task): boolean {
    return this.hasStatusByPhaseId(this.state.tasks, task.phaseId, TaskStatus.COMPLETED)
  }

  private hasStatusByPhaseId (tasks: Task[], phaseId: number, status: TaskStatus): boolean {
    return tasks
      .filter(t => t.phaseId === phaseId)
      .every(t => t.status === status)
  }
}
