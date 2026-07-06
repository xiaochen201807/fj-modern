import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { I18nProvider } from '@shared/i18n'
import { routes } from './routes'

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

describe('routes', () => {
  it('renders /dkjdcx through the route table', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/dkjdcx'] })

    render(
      <I18nProvider initialLocale="zh-CN">
        <RouterProvider router={router} />
      </I18nProvider>
    )

    expect(await screen.findByText('旧路由静态进度')).toBeInTheDocument()
    expect(await screen.findAllByText('受理')).toHaveLength(2)
  })
})
