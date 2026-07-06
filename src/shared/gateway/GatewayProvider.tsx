import { useEffect, type PropsWithChildren } from 'react'
import type { NormalizedQiankunProps } from '@shared/qiankun/runtime'
import { setGatewayContext } from './context'
import { parseGatewayContext } from './parse'
import { GatewayReactContext } from './reactContext'
import { validateGatewayContext } from './validate'

export function GatewayProvider({ children, qiankun }: PropsWithChildren<{ qiankun: NormalizedQiankunProps }>) {
  const context = parseGatewayContext(qiankun, { allowDevMock: import.meta.env.DEV })
  const validation = validateGatewayContext(context)

  useEffect(() => {
    setGatewayContext(context)
  }, [context])

  return (
    <GatewayReactContext.Provider value={{ context, validation }}>
      {children}
    </GatewayReactContext.Provider>
  )
}
