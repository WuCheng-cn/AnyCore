import type { ITableFieldConfig } from '../interface/ITableFieldConfig'
import { AnyDecoratorHelper } from '../helper/AnyDecoratorHelper'

export const TABLE_FIELD_PROPERTY_KEY = 'TableField'

/**
 * # 字段表格配置装饰器
 * @param config 字段配置
 */
export function TableField(config?: ITableFieldConfig) {
  return function (target: any, keyOrContext: string | ClassFieldDecoratorContext) {
    if (typeof keyOrContext === 'object' && keyOrContext.kind !== 'field') {
      throw new Error(`【${keyOrContext.name?.toString()}】TableField装饰器只能用于类的字段`)
    }
    AnyDecoratorHelper.setFieldConfig(target, keyOrContext, TABLE_FIELD_PROPERTY_KEY, config || {})
  }
}

/**
 * # 获取实例中配置了TableField装饰器的字段列表
 * @param target
 */
export function getTableFieldList(target: any) {
  return AnyDecoratorHelper.getFieldList(target, TABLE_FIELD_PROPERTY_KEY)
}

/**
 * # 获取实例中配置了TableField装饰器的字段配置对象
 * @param target
 * @param fieldList 字段列表，不传时获取所有标记了``@TableField``的属性的配置
 */
export function getTableFieldConfigObj(target: any, fieldList: string[] = []) {
  return AnyDecoratorHelper.getFieldConfigObject<ITableFieldConfig>(target, TABLE_FIELD_PROPERTY_KEY, fieldList)
}
