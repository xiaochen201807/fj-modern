import { defaultLocale, messages } from './messages'
import type { AppLocale, MessageKey, MessageValues } from './types'

function interpolate(template: string, values: MessageValues = {}) {
  return template.replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? `{${name}}`))
}

export function createTranslator(locale: AppLocale) {
  return (key: MessageKey, values?: MessageValues) => {
    const template = messages[locale][key] ?? messages[defaultLocale][key] ?? key
    return interpolate(template, values)
  }
}
