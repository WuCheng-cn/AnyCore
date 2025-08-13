import type { IFormFieldConfig } from '../interface/IFormFieldConfig'
import type { AnyBaseModel } from '../model/AnyBaseModel'
import { AppConfig } from '../config/AppConfig'
import { EFormItemType } from '../enum/EFormItemType'

export interface Rule {
  required?: boolean
  message?: string
  trigger?: 'change' | 'blur'
}
/**
 * # 表单验证规则辅助类
 */
export class AnyValidatorHelper {
  /**
   * # 获取表单验证规则
   * @param target 目标类
   * @param customValidatorList 自定义验证规则
   * @param isOptional 传入后，必填验证取消
   * @returns Record<string, Rule[]>
   */
  static getValidateRules<T extends AnyBaseModel>(target: T, customValidatorList?: Record<string, Rule[]>, isOptional?: boolean) {
    const formFieldList = target.getFormFieldList()
    const formFieldConfigObj = target.getFormFieldConfigObj()
    return formFieldList.reduce((acc, cur) => {
      const config = formFieldConfigObj[cur] as IFormFieldConfig
      if (isOptional && config) {
        config.required = false
      }
      return {
        ...acc,
        [cur]: [...this.createValidator(target.getFormFieldLabel(cur), config), ...(customValidatorList?.[cur] || [])],
      }
    }, {}) as Record<string, Rule[]>
  }

  /**
   * # 创建表单验证规则
   * @param field 当前字段名
   * @param config 当前字段表单配置
   * @returns Rule[]
   */
  private static createValidator(field: string, config: IFormFieldConfig): Rule[] {
    switch (config.formType) {
      case EFormItemType.CHECKBOX:
      case EFormItemType.RADIO:
      case EFormItemType.SWITCH:
      case EFormItemType.SELECT:
      case EFormItemType.DATE:
      case EFormItemType.TIME:
      case EFormItemType.UPLOAD:
        return [
          ...(config?.required ? [{ required: true, message: `请选择${field}`, trigger: config.trigger ?? 'blur' }] : []),
        ] as Rule[]
      case EFormItemType.DATE_RANGE:
      case EFormItemType.TIME_RANGE:
      case EFormItemType.INPUT_SELECTOR:
        return [
          ...(config?.required ? [{ required: true, message: `请选择${field}`, trigger: config.trigger ?? 'blur' }] : []),
        ] as Rule[]
      case EFormItemType.INPUT:
        return [
          { validator: this.isLengthGreaterThan(config.maxLength || AppConfig.MAX_LENGTH_INPUT), trigger: config.trigger ?? 'blur' },
          ...(config?.required ? [{ required: true, message: `请输入${field}`, trigger: config.trigger ?? 'blur' }] : []),
          ...((config?.minLength || config?.minLength === 0) ? [{ validator: this.isLengthLessThan(config.minLength), trigger: config.trigger ?? 'blur' }] : []),
        ] as Rule[]
      case EFormItemType.TEXTAREA:
        return [
          { validator: this.isLengthGreaterThan(config.maxLength || AppConfig.MAX_LENGTH_AREA), trigger: config.trigger ?? 'blur' },
          ...(config?.required ? [{ required: true, message: `请输入${field}`, trigger: config.trigger ?? 'blur' }] : []),
          ...((config?.minLength || config?.minLength === 0) ? [{ validator: this.isLengthLessThan(config.minLength), trigger: config.trigger ?? 'blur' }] : []),
        ] as Rule[]
      case EFormItemType.INPUT_NUMBER:
        return [
          { validator: this.isGreaterThan(config.max || AppConfig.MAX_NUMBER), trigger: config.trigger ?? 'blur' },
          ...(config?.required ? [{ required: true, message: `请输入${field}`, trigger: config.trigger ?? 'blur' }] : []),
          ...((config?.min || config?.min === 0) ? [{ validator: this.isLessThan(config.min), trigger: config.trigger ?? 'blur' }] : []),
        ] as Rule[]
      default:
        return []
    }
  }

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
