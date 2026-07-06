import type { ThemeConfig } from 'antd'
import { fjThemeTokens } from './tokens'

export const fjAntdTheme: ThemeConfig = {
  token: {
    colorPrimary: fjThemeTokens.color.brandPrimary,
    colorSuccess: fjThemeTokens.color.success,
    colorWarning: fjThemeTokens.color.warning,
    colorError: fjThemeTokens.color.error,
    colorText: fjThemeTokens.color.textPrimary,
    colorTextSecondary: fjThemeTokens.color.textSecondary,
    borderRadius: fjThemeTokens.radius.md,
    fontFamily: fjThemeTokens.font.family
  },
  components: {
    Card: {
      borderRadiusLG: fjThemeTokens.radius.lg
    },
    Layout: {
      bodyBg: 'transparent',
      siderBg: 'rgba(255, 255, 255, 0.84)'
    }
  }
}
