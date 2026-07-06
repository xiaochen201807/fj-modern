import { afterEach, describe, expect, it, vi } from 'vitest'
import { clearGatewayContext, setGatewayContext } from '@shared/gateway'
import { httpClient } from './httpClient'
import { request } from './request'

afterEach(() => {
  clearGatewayContext()
  vi.restoreAllMocks()
})

describe('request', () => {
  it('injects gateway headers before caller headers', async () => {
    setGatewayContext({
      source: 'qiankun',
      isSubapp: true,
      gatewayToken: 'token-1',
      orgId: 'org-1',
      userId: 'user-1',
      raw: {}
    })

    const requestSpy = vi.spyOn(httpClient, 'request').mockResolvedValue({
      data: { ok: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    })

    await request<{ ok: boolean }>({
      url: '/api/check',
      method: 'GET',
      headers: {
        'x-custom': 'custom'
      }
    })

    expect(requestSpy).toHaveBeenCalledWith(expect.objectContaining({
      headers: expect.objectContaining({
        'x-fj-gateway-token': 'token-1',
        'x-fj-org-id': 'org-1',
        'x-fj-user-id': 'user-1',
        'x-fj-subapp': 'true',
        'x-custom': 'custom'
      })
    }))
  })

  it('allows explicit caller headers to override generated gateway headers', async () => {
    setGatewayContext({
      source: 'qiankun',
      isSubapp: true,
      gatewayToken: 'token-1',
      raw: {}
    })

    const requestSpy = vi.spyOn(httpClient, 'request').mockResolvedValue({
      data: { ok: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    })

    await request<{ ok: boolean }>({
      url: '/api/check',
      method: 'GET',
      headers: {
        'x-fj-gateway-token': 'override-token'
      }
    })

    expect(requestSpy).toHaveBeenCalledWith(expect.objectContaining({
      headers: expect.objectContaining({
        'x-fj-gateway-token': 'override-token'
      })
    }))
  })
})
