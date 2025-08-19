import type { IFormFieldConfig } from '../interface/IFormFieldConfig'
import { EFormItemType } from '../enum/EFormItemType'
import { AnyDecoratorHelper } from '../helper/AnyDecoratorHelper'

export const FORM_FIELD_PROPERTY_KEY = 'FormField'

/**
 * # 字段表单配置装饰器
 * 表单类型默认为input类型
 * @param config 字段配置
 */
export function FormField(config?: IFormFieldConfig) {
  if (!config) {
    config = { formType: EFormItemType.INPUT }
  }
  if (config && !config.formType) {
    config.formType = EFormItemType.INPUT
  }

  // 支持新旧两种装饰器语法
  return function (target: any, keyOrContext: string | ClassFieldDecoratorContext) {
    if (typeof keyOrContext === 'object' && keyOrContext.kind !== 'field') {
      throw new Error(`【${keyOrContext.name?.toString()}】FormField装饰器只能用于类的字段`)
    }
    AnyDecoratorHelper.setFieldConfig(target, keyOrContext, FORM_FIELD_PROPERTY_KEY, config)
  }
}

/**
 * # 获取实例中配置了FormField装饰器的字段列表
 * @param target
 */
export function getFormFieldList(target: any) {
  const formFieldList = AnyDecoratorHelper.getFieldList(target, FORM_FIELD_PROPERTY_KEY)
  const config = getFormFieldConfigObj(target, formFieldList)
  // 过滤配置中isOnlySearch为true的字段
  const keys = Object.keys(config).filter(i => !config[i]?.isOnlySearch)
  return keys
}

/**
 * # 获取实例中配置了FormField装饰器的字段配置对象
 * @param target
 * @param fieldList 字段列表，不传时获取所有标记了``@FormField``的属性的配置
 */
export function getFormFieldConfigObj(target: any, fieldList: string[] = []) {
  return AnyDecoratorHelper.getFieldConfigObject<IFormFieldConfig>(target, FORM_FIELD_PROPERTY_KEY, fieldList)
}
