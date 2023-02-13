import test from 'ava'
import { getInitialApplicationState } from 'test/setup'
import { type Phase, PhaseStatus } from '~/phase/phase.model'
import { PhaseService } from '~/phase/phase.service'

test('#create - creates a new phase with "OPEN" status', async (t) => {
  const state = getInitialApplicationState()
  const phaseService = new PhaseService(state)
  const phase: Phase = {
    name: 'A new phase',
    status: PhaseStatus.OPEN
  }

  const newPhase = phaseService.create(phase)
  t.deepEqual(newPhase, { id: 3, ...phase })
  t.deepEqual(state.phases[3], phase)
})
