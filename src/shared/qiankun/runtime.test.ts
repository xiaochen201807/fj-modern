import { afterEach, describe, expect, it } from 'vitest'
import { getInitialPath, normalizeQiankunProps } from './runtime'

afterEach(() => {
  window.__POWERED_BY_QIANKUN__ = undefined
  window.IS_SY_QIANKUN = undefined
  window.SY_QIANKUN = undefined
})

describe('qiankun runtime', () => {
  it('normalizes qiankun props for the migrated /dkjdcx route', () => {
    window.__POWERED_BY_QIANKUN__ = true

    const props = normalizeQiankunProps({
      baseInfo: {
        url: 'http://localhost/dkjdcx',
        moduleKey: 'fj-modern'
      }
    })

    expect(props.baseInfo.isSubapp).toBe(true)
    expect(props.baseInfo.moduleKey).toBe('fj-modern')
    expect(getInitialPath(props)).toBe('/dkjdcx')
  })
})
