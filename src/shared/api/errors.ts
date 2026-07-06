export type ApiErrorCode = 'NETWORK_ERROR' | 'HTTP_ERROR' | 'UNKNOWN_ERROR'

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: ApiErrorCode,
    public readonly status?: number,
    public readonly cause?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error
  }

  if (typeof error === 'object' && error && 'response' in error) {
    const response = (error as { response?: { status?: number; statusText?: string } }).response
    return new ApiError(response?.statusText || 'HTTP request failed', 'HTTP_ERROR', response?.status, error)
  }

  if (typeof error === 'object' && error && 'request' in error) {
    return new ApiError('Network request failed', 'NETWORK_ERROR', undefined, error)
  }

  return new ApiError('Unknown API error', 'UNKNOWN_ERROR', undefined, error)
}
