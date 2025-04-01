import type { App } from 'vue'
import { permission } from './permission'

/**
 * # 批量注册指令
 */
export const directivePlugin = {
  install(app: App<Element>) {
    app.directive('permission', permission)
  },
}
