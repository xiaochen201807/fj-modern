import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { I18nProvider } from '@shared/i18n'
import { DkjdcxPage } from './DkjdcxPage'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })
})

describe('DkjdcxPage', () => {
  it('renders the migrated legacy progress in zh-CN', async () => {
    render(
      <I18nProvider initialLocale="zh-CN">
        <DkjdcxPage />
      </I18nProvider>
    )

    expect(await screen.findByText('贷款进度查询')).toBeInTheDocument()
    expect(screen.getAllByText('受理')).toHaveLength(2)
    expect(screen.getByText('旧路由静态进度')).toBeInTheDocument()
  })

  it('renders English resources without falling back to Chinese text', async () => {
    render(
      <I18nProvider initialLocale="en-US">
        <DkjdcxPage />
      </I18nProvider>
    )

    expect(await screen.findByText('Loan Progress Query')).toBeInTheDocument()
    expect(screen.getAllByText('Accepted')).toHaveLength(2)
    expect(screen.getByText('Legacy static progress')).toBeInTheDocument()
  })
})
