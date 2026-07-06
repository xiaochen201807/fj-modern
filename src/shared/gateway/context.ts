import type { GatewayContext } from './types'

let currentGatewayContext: GatewayContext | null = null

export function setGatewayContext(context: GatewayContext) {
  currentGatewayContext = context
}

export function getGatewayContext() {
  return currentGatewayContext
}

export function clearGatewayContext() {
  currentGatewayContext = null
}
