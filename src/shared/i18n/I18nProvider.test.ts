import { describe, expect, it } from 'vitest'
import { createTranslator } from './translator'

describe('createTranslator', () => {
  it('reads zh-CN messages by key', () => {
    const t = createTranslator('zh-CN')

    expect(t('app.menu.overview')).toBe('迁移概览')
  })

  it('reads en-US messages by key', () => {
    const t = createTranslator('en-US')

    expect(t('app.menu.overview')).toBe('Migration Overview')
  })

  it('interpolates named values', () => {
    const t = createTranslator('en-US')

    expect(t('dxslgl.placeholder.title', { flowName: 'Approval' })).toBe('Approval Migration Placeholder')
  })
})
