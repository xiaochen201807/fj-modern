import { useContext } from 'react'
import { GatewayError } from './errors'
import { GatewayReactContext } from './reactContext'

export function useGateway() {
  const value = useContext(GatewayReactContext)

  if (!value) {
    throw new GatewayError('GatewayProvider is missing.', 'MISSING_GATEWAY_CONTEXT')
  }

  return value
}
