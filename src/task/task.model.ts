export enum TaskStatus {
  OPEN = 'OPEN',
  COMPLETED = 'COMPLETED'
}

export interface Task {
  title: string
  phaseId: number
  status: TaskStatus
}
