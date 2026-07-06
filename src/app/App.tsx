import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import type { PropsWithChildren } from 'react'
import { I18nProvider, useI18n } from '@shared/i18n'
import type { NormalizedQiankunProps } from '@shared/qiankun/runtime'

type AppProps = PropsWithChildren<{
  qiankun: NormalizedQiankunProps
}>

export function App({ children, qiankun }: AppProps) {
  return (
    <I18nProvider>
      <AppFrame qiankun={qiankun}>{children}</AppFrame>
    </I18nProvider>
  )
}

function AppFrame({ children, qiankun }: AppProps) {
  const { locale } = useI18n()
  const antdLocale = locale === 'en-US' ? enUS : zhCN

  return (
    <ConfigProvider locale={antdLocale} theme={{ token: { colorPrimary: '#2454ff', borderRadius: 8 } }}>
      <div className="app-shell" data-subapp={qiankun.baseInfo.isSubapp ? 'true' : 'false'}>
        {children}
      </div>
    </ConfigProvider>
  )
}
