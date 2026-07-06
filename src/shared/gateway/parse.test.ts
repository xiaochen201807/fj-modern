import { afterEach, describe, expect, it } from 'vitest'
import { clearGatewayContext, setGatewayContext } from './context'
import { createGatewayHeaders } from './headers'
import { createDevGatewayContext, parseGatewayContext } from './parse'
import { validateGatewayContext } from './validate'

afterEach(() => {
  clearGatewayContext()
  window.__POWERED_BY_QIANKUN__ = undefined
  window.IS_SY_QIANKUN = undefined
  window.SY_QIANKUN = undefined
})

describe('gateway context', () => {
  it('parses gateway context from qiankun props and custom params', () => {
    window.__POWERED_BY_QIANKUN__ = true

    const context = parseGatewayContext({
      baseInfo: {
        isSubapp: true,
        moduleKey: 'fj-modern',
        instanceId: 'instance-1',
        url: 'http://localhost/dkjdcx'
      },
      customParams: {
        gatewayToken: 'token-1',
        jgbh: 'org-1',
        userid: 'user-1',
        zxbh: 'tenant-1'
      }
    })

    expect(context.source).toBe('qiankun')
    expect(context.gatewayToken).toBe('token-1')
    expect(context.orgId).toBe('org-1')
    expect(context.userId).toBe('user-1')
    expect(context.tenantId).toBe('tenant-1')
    expect(context.moduleKey).toBe('fj-modern')
    expect(context.instanceId).toBe('instance-1')
  })

  it('parses gateway context from URL query for standalone integration testing', () => {
    const context = parseGatewayContext(undefined, {
      url: 'http://localhost/dkjdcx?gatewayToken=token-2&orgId=org-2&userId=user-2&tenantId=tenant-2'
    })

    expect(context.source).toBe('url')
    expect(context.gatewayToken).toBe('token-2')
    expect(context.orgId).toBe('org-2')
    expect(context.userId).toBe('user-2')
    expect(context.tenantId).toBe('tenant-2')
  })

  it('uses dev mock context only when explicitly allowed outside qiankun', () => {
    expect(parseGatewayContext(undefined, { allowDevMock: true }).source).toBe('dev-mock')
    expect(createDevGatewayContext().gatewayToken).toBe('dev-gateway-token')
  })

  it('validates missing gateway token as invalid', () => {
    const context = parseGatewayContext(undefined, { url: 'http://localhost/dkjdcx' })

    expect(validateGatewayContext(context)).toEqual({
      valid: false,
      reason: 'MISSING_GATEWAY_TOKEN',
      message: 'Gateway token is required before sending protected requests.'
    })
  })

  it('creates gateway headers from current context', () => {
    setGatewayContext({
      source: 'qiankun',
      isSubapp: true,
      gatewayToken: 'token-3',
      tenantId: 'tenant-3',
      orgId: 'org-3',
      userId: 'user-3',
      moduleKey: 'module-3',
      instanceId: 'instance-3',
      raw: {}
    })

    expect(createGatewayHeaders()).toMatchObject({
      'x-fj-gateway-token': 'token-3',
      'x-fj-tenant-id': 'tenant-3',
      'x-fj-org-id': 'org-3',
      'x-fj-user-id': 'user-3',
      'x-fj-module-key': 'module-3',
      'x-fj-instance-id': 'instance-3',
      'x-fj-subapp': 'true'
    })
  })
})
