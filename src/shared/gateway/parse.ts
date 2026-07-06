import { isQiankunRuntime, type NormalizedQiankunProps } from '@shared/qiankun/runtime'
import type { GatewayContext, GatewayParseOptions } from './types'

const tokenKeys = ['gatewayToken', 'gwToken', 'accessToken', 'token']
const tenantKeys = ['tenantId', 'zxbh']
const orgKeys = ['orgId', 'jgbh', 'organizationId']
const userKeys = ['userId', 'userid', 'operatorId']

function firstString(source: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = source[key]
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }

  return undefined
}

function readUrlParams(url: string) {
  try {
    const parsed = new URL(url, window.location.origin)
    const hashQuery = parsed.hash.includes('?') ? parsed.hash.split('?')[1] : ''
    return Object.fromEntries(new URLSearchParams(hashQuery || parsed.search))
  } catch {
    return Object.fromEntries(new URLSearchParams(window.location.search))
  }
}

function createRawContext(qiankun?: NormalizedQiankunProps, urlParams: Record<string, unknown> = {}) {
  return {
    ...urlParams,
    ...(qiankun?.customParams ?? {}),
    ...(qiankun?.baseInfo ?? {})
  }
}

export function createDevGatewayContext(): GatewayContext {
  return {
    source: 'dev-mock',
    isSubapp: false,
    gatewayToken: 'dev-gateway-token',
    tenantId: 'dev-tenant',
    orgId: 'dev-org',
    userId: 'dev-user',
    moduleKey: 'fj-modern',
    raw: {}
  }
}

export function parseGatewayContext(qiankun = window.SY_QIANKUN, options: GatewayParseOptions = {}): GatewayContext {
  const url = options.url ?? qiankun?.baseInfo.url ?? window.location.href
  const urlParams = readUrlParams(url)
  const raw = createRawContext(qiankun, urlParams)
  const source = qiankun?.baseInfo.isSubapp || isQiankunRuntime() ? 'qiankun' : 'url'
  const context: GatewayContext = {
    source,
    isSubapp: Boolean(qiankun?.baseInfo.isSubapp || isQiankunRuntime()),
    gatewayToken: firstString(raw, tokenKeys),
    tenantId: firstString(raw, tenantKeys),
    orgId: firstString(raw, orgKeys),
    userId: firstString(raw, userKeys),
    moduleKey: typeof raw.moduleKey === 'string' ? raw.moduleKey : undefined,
    instanceId: typeof raw.instanceId === 'string' ? raw.instanceId : undefined,
    fromId: typeof raw.fromId === 'string' ? raw.fromId : undefined,
    tabKey: typeof raw.tabKey === 'string' ? raw.tabKey : undefined,
    raw
  }

  if (!context.gatewayToken && options.allowDevMock && !context.isSubapp) {
    return createDevGatewayContext()
  }

  return context
}
