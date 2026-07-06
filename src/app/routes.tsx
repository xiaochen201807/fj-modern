import type { RouteObject } from 'react-router'
import { Navigate } from 'react-router'
import { Layout } from './Layout'
import { MigrationHome } from '@features/MigrationHome'
import { DkjdcxPage } from '@features/dk/DkjdcxPage'
import { SqqrPage } from '@features/sqqr/SqqrPage'
import { DxslglEntryPage } from '@features/dxslgl/DxslglEntryPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MigrationHome /> },
      { path: 'sqqr', element: <SqqrPage /> },
      { path: 'dkjdcx', element: <DkjdcxPage /> },
      { path: 'dxslglComp/dxslglfq/index', element: <DxslglEntryPage flow="fq" /> },
      { path: 'dxslglComp/dxslglsp/index', element: <DxslglEntryPage flow="sp" /> },
      { path: 'dxslglComp/dxslglth/index', element: <DxslglEntryPage flow="th" /> },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]
