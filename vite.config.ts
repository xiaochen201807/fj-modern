import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const nodeModulePath = String.raw`[\\/]node_modules[\\/](?:\.pnpm[\\/][^\\/]+[\\/]node_modules[\\/])?`

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/fj-modern/' : './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@shared': path.resolve(__dirname, 'src/shared')
    }
  },
  server: {
    port: 5174,
    strictPort: false,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
        codeSplitting: {
          groups: [
            { name: 'vendor-react', test: new RegExp(`${nodeModulePath}(react|react-dom|react-router|scheduler)[\\/]`) },
            { name: 'vendor-antd-core', test: new RegExp(`${nodeModulePath}antd[\\/]`) },
            { name: 'vendor-antd-icons', test: new RegExp(`${nodeModulePath}(@ant-design[\\/]icons|@ant-design[\\/]icons-svg)[\\/]`) },
            { name: 'vendor-antd-style', test: new RegExp(`${nodeModulePath}@ant-design[\\/]`) },
            { name: 'vendor-rc', test: new RegExp(`${nodeModulePath}(@rc-component[\\/]|rc-)`) },
            { name: 'vendor-runtime', test: new RegExp(`${nodeModulePath}(@babel[\\/]runtime|@emotion[\\/]|classnames|clsx|rc-util|stylis)[\\/]`) },
            { name: 'vendor-utils', test: new RegExp(`${nodeModulePath}(axios|dayjs|qiankun)[\\/]`) },
            { name: 'vendor-misc', test: /[\\/]node_modules[\\/]/ }
          ]
        }
      }
    }
  }
})
