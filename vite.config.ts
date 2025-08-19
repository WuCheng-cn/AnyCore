import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // 指定库的入口文件
      entry: resolve(__dirname, 'src/index.ts'),
      // 库的全局变量名（在 UMD 格式中使用）
      name: 'MyLibrary',
      // 输出的文件名格式
      fileName: format => `index.${format}.js`,
      // 指定输出格式，可以是 'es' | 'cjs' | 'umd' | 'iife' 的数组
      formats: ['es'],
    },
    // 配置 Rollup 选项
    rollupOptions: {
      // 声明外部依赖，避免将它们打包进库中
      external: ['vue', 'react'], // 例如排除 Vue 或 React
      // 全局变量映射（UMD 构建时使用）
      output: {
        globals: {
          vue: 'Vue',
          react: 'React',
        },
      },
    },
  },
})
