import type { PropsWithChildren } from 'react'
import { AppProviders } from './providers'
import type { NormalizedQiankunProps } from '@shared/qiankun/runtime'

type AppProps = PropsWithChildren<{
  qiankun: NormalizedQiankunProps
}>

export function App({ children, qiankun }: AppProps) {
  return <AppProviders qiankun={qiankun}>{children}</AppProviders>
}
