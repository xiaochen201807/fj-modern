import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createMemoryRouter, RouterProvider } from 'react-router'
import { App } from './app/App'
import { routes } from './app/routes'
import { getInitialPath, isQiankunRuntime, normalizeQiankunProps, type QiankunMountProps } from './shared/qiankun/runtime'
import './styles/global.css'

let root: ReactDOM.Root | null = null

function render(props: QiankunMountProps = {}) {
  const container = props.container?.querySelector?.('#root') ?? document.getElementById('root')

  if (!container) {
    throw new Error('Root container #root was not found')
  }

  const qiankun = normalizeQiankunProps(props)
  const router = isQiankunRuntime()
    ? createMemoryRouter(routes, { initialEntries: [getInitialPath(qiankun)] })
    : createBrowserRouter(routes)

  root = ReactDOM.createRoot(container)
  root.render(
    <React.StrictMode>
      <App qiankun={qiankun}>
        <RouterProvider router={router} />
      </App>
    </React.StrictMode>
  )
}

if (!isQiankunRuntime()) {
  render()
}

export async function bootstrap() {
  // Reserved for qiankun preloading hooks.
}

export async function mount(props: QiankunMountProps = {}) {
  render(props)
}

export async function unmount() {
  root?.unmount()
  root = null
}
