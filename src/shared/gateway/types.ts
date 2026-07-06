export type GatewayContextSource = 'qiankun' | 'url' | 'dev-mock'

export interface GatewayContext {
  source: GatewayContextSource
  isSubapp: boolean
  gatewayToken?: string
  tenantId?: string
  orgId?: string
  userId?: string
  moduleKey?: string
  instanceId?: string
  fromId?: string
  tabKey?: string
  raw: Record<string, unknown>
}

export interface GatewayValidationResult {
  valid: boolean
  reason?: 'MISSING_GATEWAY_TOKEN' | 'INVALID_GATEWAY_CONTEXT'
  message?: string
}

export type GatewayHeaders = Record<string, string>

export interface GatewayParseOptions {
  allowDevMock?: boolean
  url?: string
}
