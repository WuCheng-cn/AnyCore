export interface Rule {
  required?: boolean
  message?: string
  trigger?: 'change' | 'blur'
}
/**
 * # 表单验证辅助类
 */
export abstract class AnyValidatorHelper {
  /**
   * # 字符长度大于给定值
   */
  static isLengthGreaterThan(length: number) {
    return async (_rule: Rule, value: string) => {
      if (value && value.length > length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(`长度不能大于${length}`)
      }
      return Promise.resolve()
    }
  }

  /**
   * # 字符长度小于给定值
   */
  static isLengthLessThan(length: number) {
    return async (_rule: Rule, value: string) => {
      if (value && value.length < length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(`长度不能小于${length}`)
      }
      return Promise.resolve()
    }
  }

  /**
   * # 数字大于给定值
   */
  static isGreaterThan(value: number) {
    return async (_rule: Rule, val: number) => {
      if ((val || val === 0) && val > value) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(`不能大于${value}`)
      }
      return Promise.resolve()
    }
  }

  /**
   * # 数字小于给定值
   */
  static isLessThan(value: number) {
    return async (_rule: Rule, val: number) => {
      if ((val || val === 0) && val < value) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(`不能小于${value}`)
      }
      return Promise.resolve()
    }
  }
}
