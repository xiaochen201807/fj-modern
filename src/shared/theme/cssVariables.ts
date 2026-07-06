import { fjThemeTokens } from './tokens'

export function applyFjCssVariables(target: HTMLElement = document.documentElement) {
  target.style.setProperty('--fj-color-brand-primary', fjThemeTokens.color.brandPrimary)
  target.style.setProperty('--fj-color-text-primary', fjThemeTokens.color.textPrimary)
  target.style.setProperty('--fj-color-text-secondary', fjThemeTokens.color.textSecondary)
  target.style.setProperty('--fj-color-page-background', fjThemeTokens.color.pageBackground)
  target.style.setProperty('--fj-color-card-background', fjThemeTokens.color.cardBackground)
  target.style.setProperty('--fj-color-border-subtle', fjThemeTokens.color.borderSubtle)
  target.style.setProperty('--fj-radius-md', `${fjThemeTokens.radius.md}px`)
  target.style.setProperty('--fj-radius-lg', `${fjThemeTokens.radius.lg}px`)
  target.style.setProperty('--fj-spacing-md', `${fjThemeTokens.spacing.md}px`)
  target.style.setProperty('--fj-spacing-lg', `${fjThemeTokens.spacing.lg}px`)
  target.style.setProperty('--fj-spacing-xl', `${fjThemeTokens.spacing.xl}px`)
  target.style.setProperty('--fj-font-family', fjThemeTokens.font.family)
}
