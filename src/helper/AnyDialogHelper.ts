import type { App, Component } from 'vue'
import type { IDialogPropsParam, IDialogPropsSelector } from '../interface/IDialogProps'
import { createApp, h } from 'vue'
/**
 * 对话框帮助类
 * @description 用于创建对话框
 * @example
 * ```ts
 * // 创建一个对话框
 * AnyDialogHelper.showModel(HelloWorld, { name: 'world' })
 * ```
 */
export abstract class AnyDialogHelper {
  /**
   * 创建一个对话框
   * @param view 对话框内组件
   * @param param 对话框内组件的参数
   * @returns 对话框的Promise
   */
  private static build<RES>(view: Component, param: Record<string, any>): Promise<RES> {
    const parentNode = document.createElement('div')
    const domId = `any_dialog_${Math.random()}`
    parentNode.setAttribute('id', domId)
    let app: App<Element> | undefined
    // 卸载dom的方法
    function unmount() {
      if (app) {
        app.unmount()
        document.body.removeChild(parentNode)
        app = undefined
      }
    }
    return new Promise<RES>((resolve, reject) => {
      try {
        if (app) {
          return
        }
        const dialogParam = {
          onConfirm: async (p: RES) => resolve(p),
          onClosed: () => unmount(),
          ...param,
        }

        // 创建App实例
        const renderApp = {
          render: () => h(view, dialogParam),
        }
        app = createApp(renderApp, dialogParam)

        document.body.appendChild(parentNode)
        app.mount(parentNode)
      }
      catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 显示一个对话框
   * @param view 对话框内组件
   * @param param 对话框内组件的参数
   * @returns 对话框的异步结果
   */
  static showModel<T, RES>(view: Component, param?: Omit<IDialogPropsParam<T, RES>, 'onConfirm' | 'onClosed'>): Promise<RES> {
    return this.build(view, param || {})
  }

  /**
   * # 显示一个选择器
   * T 选择器组件的返回类型
   * @param view 选择器组件
   * @param param 选择器组件的参数
   * @returns 选择器的异步结果（数组）
   */
  static showSelector<T>(view: Component, param?: Omit<IDialogPropsSelector<T>, 'onConfirm' | 'onClosed'>): Promise<T[]> {
    return this.build(view, param || {})
  }
}
