import type { AppLocale } from './types'

export function formatDate(value: Date | string | number, locale: AppLocale) {
  return new Intl.DateTimeFormat(locale).format(new Date(value))
}

export function formatNumber(value: number, locale: AppLocale) {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatCurrency(value: number, locale: AppLocale, currency = 'CNY') {
  return new Intl.NumberFormat(locale, { currency, style: 'currency' }).format(value)
}
