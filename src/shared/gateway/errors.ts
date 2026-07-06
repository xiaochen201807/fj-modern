export type GatewayErrorCode = 'MISSING_GATEWAY_CONTEXT' | 'INVALID_GATEWAY_CONTEXT'

export class GatewayError extends Error {
  constructor(
    message: string,
    public readonly code: GatewayErrorCode,
    public readonly cause?: unknown
  ) {
    super(message)
    this.name = 'GatewayError'
  }
}
