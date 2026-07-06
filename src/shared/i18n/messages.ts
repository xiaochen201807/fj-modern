import { enUSMessages } from './locales/en-US'
import { zhCNMessages } from './locales/zh-CN'
import type { AppLocale, MessageKey } from './types'

export const defaultLocale: AppLocale = 'zh-CN'

export const messages: Record<AppLocale, Record<MessageKey, string>> = {
  'zh-CN': zhCNMessages,
  'en-US': enUSMessages
}
