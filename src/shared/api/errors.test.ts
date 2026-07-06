import { describe, expect, it } from 'vitest'
import { ApiError, toApiError } from './errors'

describe('toApiError', () => {
  it('keeps existing ApiError instances', () => {
    const error = new ApiError('failed', 'UNKNOWN_ERROR')

    expect(toApiError(error)).toBe(error)
  })

  it('maps response errors to HTTP_ERROR', () => {
    const error = toApiError({ response: { status: 500, statusText: 'Server Error' } })

    expect(error.code).toBe('HTTP_ERROR')
    expect(error.status).toBe(500)
    expect(error.message).toBe('Server Error')
  })
})
