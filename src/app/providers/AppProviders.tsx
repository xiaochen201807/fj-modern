import type { PropsWithChildren } from 'react'
import { I18nProvider, useI18n } from '@shared/i18n'
import { ThemeProvider } from '@shared/theme'
import type { NormalizedQiankunProps } from '@shared/qiankun/runtime'

type AppProvidersProps = PropsWithChildren<{
  qiankun: NormalizedQiankunProps
}>

export function AppProviders({ children, qiankun }: AppProvidersProps) {
  return (
    <I18nProvider>
      <ThemedAppFrame qiankun={qiankun}>{children}</ThemedAppFrame>
    </I18nProvider>
  )
}

function ThemedAppFrame({ children, qiankun }: AppProvidersProps) {
  const { locale } = useI18n()

  return (
    <ThemeProvider locale={locale}>
      <div className="app-shell" data-subapp={qiankun.baseInfo.isSubapp ? 'true' : 'false'}>
        {children}
      </div>
    </ThemeProvider>
  )
}
