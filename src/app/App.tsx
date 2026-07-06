import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import type { PropsWithChildren } from 'react'
import type { NormalizedQiankunProps } from '@shared/qiankun/runtime'

type AppProps = PropsWithChildren<{
  qiankun: NormalizedQiankunProps
}>

export function App({ children, qiankun }: AppProps) {
  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#2454ff', borderRadius: 8 } }}>
      <div className="app-shell" data-subapp={qiankun.baseInfo.isSubapp ? 'true' : 'false'}>
        {children}
      </div>
    </ConfigProvider>
  )
}
