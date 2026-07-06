import { createContext } from 'react'
import type { GatewayContext, GatewayValidationResult } from './types'

export interface GatewayContextValue {
  context: GatewayContext
  validation: GatewayValidationResult
}

export const GatewayReactContext = createContext<GatewayContextValue | null>(null)
