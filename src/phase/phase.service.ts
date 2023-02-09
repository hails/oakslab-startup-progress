import type { ApplicationState } from '~/app.model'
import { type Phase, PhaseStatus } from './phase.model'

export class PhaseService {
  state: ApplicationState

  constructor (state: ApplicationState) {
    this.state = state
  }

  create (phase: Phase) {
    const id = this.state.phases.push({ ...phase, status: PhaseStatus.OPEN }) - 1
    return {
      id,
      ...phase
    }
  }
}
