import type { GatewayContext, GatewayValidationResult } from './types'

export function validateGatewayContext(context: GatewayContext | null | undefined): GatewayValidationResult {
  if (!context) {
    return {
      valid: false,
      reason: 'INVALID_GATEWAY_CONTEXT',
      message: 'Gateway context was not initialized.'
    }
  }

  if (!context.gatewayToken) {
    return {
      valid: false,
      reason: 'MISSING_GATEWAY_TOKEN',
      message: 'Gateway token is required before sending protected requests.'
    }
  }

  return { valid: true }
}
