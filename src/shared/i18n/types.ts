import type { MessageKey } from './locales/zh-CN'

export type AppLocale = 'zh-CN' | 'en-US'

export type { MessageKey }

export type MessageValues = Record<string, string | number>

export interface I18nContextValue {
  locale: AppLocale
  setLocale: (locale: AppLocale) => void
  t: (key: MessageKey, values?: MessageValues) => string
}
