import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import { useEffect, type PropsWithChildren } from 'react'
import type { AppLocale } from '@shared/i18n'
import { fjAntdTheme } from './antdTheme'
import { applyFjCssVariables } from './cssVariables'

export function ThemeProvider({ children, locale }: PropsWithChildren<{ locale: AppLocale }>) {
  const antdLocale = locale === 'en-US' ? enUS : zhCN

  useEffect(() => {
    applyFjCssVariables()
  }, [])

  return (
    <ConfigProvider locale={antdLocale} theme={fjAntdTheme}>
      {children}
    </ConfigProvider>
  )
}
