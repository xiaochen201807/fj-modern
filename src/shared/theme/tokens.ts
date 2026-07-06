export const fjThemeTokens = {
  color: {
    brandPrimary: '#2454ff',
    brandPrimaryHover: '#4169ff',
    textPrimary: '#182033',
    textSecondary: 'rgba(24, 32, 51, 0.72)',
    pageBackground: '#eef2f7',
    cardBackground: '#ffffff',
    borderSubtle: 'rgba(24, 32, 51, 0.08)',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626'
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 20
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  font: {
    family: '"Alibaba PuHuiTi", "Microsoft YaHei", sans-serif'
  }
} as const

export type FjThemeTokens = typeof fjThemeTokens
