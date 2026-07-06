import { getGatewayContext } from './context'
import type { GatewayContext, GatewayHeaders } from './types'
import { validateGatewayContext } from './validate'

function setHeader(headers: GatewayHeaders, name: string, value?: string) {
  if (value) {
    headers[name] = value
  }
}

export function createGatewayHeaders(context: GatewayContext | null = getGatewayContext()): GatewayHeaders {
  const validation = validateGatewayContext(context)
  if (!validation.valid || !context) {
    return {}
  }

  const headers: GatewayHeaders = {}

  setHeader(headers, 'x-fj-gateway-token', context.gatewayToken)
  setHeader(headers, 'x-fj-tenant-id', context.tenantId)
  setHeader(headers, 'x-fj-org-id', context.orgId)
  setHeader(headers, 'x-fj-user-id', context.userId)
  setHeader(headers, 'x-fj-module-key', context.moduleKey)
  setHeader(headers, 'x-fj-instance-id', context.instanceId)
  setHeader(headers, 'x-fj-from-id', context.fromId)
  setHeader(headers, 'x-fj-tab-key', context.tabKey)
  headers['x-fj-subapp'] = context.isSubapp ? 'true' : 'false'

  return headers
}
