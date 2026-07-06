import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'axios',
              message: 'Use src/shared/api instead of importing axios directly.'
            }
          ],
          patterns: [
            {
              group: ['@features/*', '../features/*', '../../features/*'],
              message: 'Feature modules must not import other features directly. Extract domain-neutral code to shared first.'
            }
          ]
        }
      ]
    }
  },
  {
    files: ['src/shared/api/**/*.{ts,tsx}', 'src/app/routes.tsx'],
    rules: {
      'no-restricted-imports': 'off',
      'react-refresh/only-export-components': 'off'
    }
  }
)
