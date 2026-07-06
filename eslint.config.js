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
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'axios',
              message: 'Use src/shared/api instead of importing axios directly.'
            },
            {
              name: 'antd',
              importNames: ['ConfigProvider'],
              message: 'Feature code must not configure Ant Design directly. Use app providers and shared/theme.'
            }
          ],
          patterns: [
            {
              group: ['@shared/gateway/*', '../shared/gateway/*', '../../shared/gateway/*'],
              message: 'Feature code must use @shared/gateway public API instead of deep-importing gateway internals.'
            },
            {
              group: ['@features/*', '../features/*', '../../features/*'],
              message: 'Feature modules must not import other features directly. Extract domain-neutral code to shared first.'
            }
          ]
        }
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: "MemberExpression[object.name='window'][property.name='SY_QIANKUN']",
          message: 'Feature code must not read window.SY_QIANKUN directly. Use @shared/gateway or @shared/qiankun public APIs.'
        },
        {
          selector: "MemberExpression[object.name='window'][property.name='IS_SY_QIANKUN']",
          message: 'Feature code must not read qiankun globals directly. Use @shared/gateway or @shared/qiankun public APIs.'
        },
        {
          selector: "MemberExpression[object.name='window'][property.name='__POWERED_BY_QIANKUN__']",
          message: 'Feature code must not read qiankun globals directly. Use @shared/gateway or @shared/qiankun public APIs.'
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
