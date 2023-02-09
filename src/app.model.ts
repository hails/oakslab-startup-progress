import type { Phase } from './phase/phase.model'
import type { Task } from './task/task.model'

export interface ApplicationState {
  phases: Phase[]
  tasks: Task[]
}
