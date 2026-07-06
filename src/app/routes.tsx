import type { RouteObject } from 'react-router'
import { Navigate } from 'react-router'
import { lazy, Suspense, type ReactNode } from 'react'
import { Layout } from './Layout'

const MigrationHome = lazy(() => import('@features/MigrationHome').then(module => ({ default: module.MigrationHome })))
const DkjdcxPage = lazy(() => import('@features/dk/DkjdcxPage').then(module => ({ default: module.DkjdcxPage })))
const SqqrPage = lazy(() => import('@features/sqqr/SqqrPage').then(module => ({ default: module.SqqrPage })))
const DxslglEntryPage = lazy(() => import('@features/dxslgl/DxslglEntryPage').then(module => ({ default: module.DxslglEntryPage })))

function lazyElement(element: ReactNode) {
  return <Suspense fallback={null}>{element}</Suspense>
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: lazyElement(<MigrationHome />) },
      { path: 'sqqr', element: lazyElement(<SqqrPage />) },
      { path: 'dkjdcx', element: lazyElement(<DkjdcxPage />) },
      { path: 'dxslglComp/dxslglfq/index', element: lazyElement(<DxslglEntryPage flow="fq" />) },
      { path: 'dxslglComp/dxslglsp/index', element: lazyElement(<DxslglEntryPage flow="sp" />) },
      { path: 'dxslglComp/dxslglth/index', element: lazyElement(<DxslglEntryPage flow="th" />) },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]
