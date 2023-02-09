export enum PhaseStatus {
  OPEN = 'OPEN',
  COMPLETED = 'COMPLETED'
}

export interface Phase {
  name: string
  status: PhaseStatus
}
