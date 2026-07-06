import { useState, type PropsWithChildren } from 'react'
import { I18nContext } from './context'
import { defaultLocale } from './messages'
import { createTranslator } from './translator'
import type { AppLocale, I18nContextValue } from './types'

export function I18nProvider({ children, initialLocale = defaultLocale }: PropsWithChildren<{ initialLocale?: AppLocale }>) {
  const [locale, setLocale] = useState<AppLocale>(initialLocale)
  const value: I18nContextValue = {
    locale,
    setLocale,
    t: createTranslator(locale)
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
