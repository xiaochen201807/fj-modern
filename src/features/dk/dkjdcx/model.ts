import type { MessageKey } from '@shared/i18n'

export type LoanProgressCode = 'accepted' | 'reviewing' | 'contracting' | 'completed'

export interface LoanProgressStep {
  code: LoanProgressCode
  titleKey: MessageKey
  descriptionKey: MessageKey
}

export interface LoanProgressQuery {
  applicationId?: string
}

export interface LoanProgressSnapshot {
  currentProgress: LoanProgressCode
  source: 'legacy-static'
}

export const loanProgressSteps: LoanProgressStep[] = [
  {
    code: 'accepted',
    titleKey: 'dkjdcx.progress.accepted',
    descriptionKey: 'dkjdcx.progress.accepted.description'
  },
  {
    code: 'reviewing',
    titleKey: 'dkjdcx.progress.reviewing',
    descriptionKey: 'dkjdcx.progress.reviewing.description'
  },
  {
    code: 'contracting',
    titleKey: 'dkjdcx.progress.contracting',
    descriptionKey: 'dkjdcx.progress.contracting.description'
  },
  {
    code: 'completed',
    titleKey: 'dkjdcx.progress.completed',
    descriptionKey: 'dkjdcx.progress.completed.description'
  }
]

export function getProgressStepIndex(code: LoanProgressCode) {
  return Math.max(loanProgressSteps.findIndex(step => step.code === code), 0)
}
