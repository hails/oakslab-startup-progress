import { paginate, type PaginationInput } from '~/pagination'
import { state } from '~/app'
import type { Phase } from './phase.model'
import { PhaseService } from './phase.service'

export const resolvePhases = (_: any, { pagination }: { pagination: PaginationInput }) => {
  const phases = state.phases
    .map((phase, index) => ({ id: index, ...phase }))

  return paginate(phases, pagination)
}

export const createPhase = (_: any, { phase }: { phase: Phase }) => {
  const phaseService = new PhaseService(state)
  return phaseService.create(phase)
}
