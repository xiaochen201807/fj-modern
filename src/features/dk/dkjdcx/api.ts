import type { LoanProgressQuery, LoanProgressSnapshot } from './model'

const legacyProgressSnapshot: LoanProgressSnapshot = {
  currentProgress: 'accepted',
  source: 'legacy-static'
}

export async function getLoanProgress(_query: LoanProgressQuery = {}) {
  void _query

  return legacyProgressSnapshot
}
