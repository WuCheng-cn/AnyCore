/// <reference types="vite/client" />
declare const __DEV__: boolean
declare const __PROD__: boolean

interface ImportMetaEnv {
}

interface ImportMeta {
  /**
   * 通过 Vite 环境变量注入的 env 基础路径
   */
  readonly env: ImportMetaEnv
  /**
   * `import.meta.env.BASE_URL` has already been exposed by vite. Therefore, why don't we use it here directly?
   *
   * The `base` config option determines the variable above it has a different purpose. It's about serving the static assets
   * in the development or after the build. In our use cases, we never need to change the assets base url.
   */
}
