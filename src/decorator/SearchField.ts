import type { ISearchFieldConfig } from '../interface/ISearchFieldConfig'
import { AnyDecoratorHelper } from '../helper/AnyDecoratorHelper'

export const SEARCH_FIELD_PROPERTY_KEY = 'SearchField'

/**
 * # 字段搜索配置装饰器
 * @param config 字段配置
 */
export function SearchField(config?: ISearchFieldConfig) {
  return function (target: any, keyOrContext: string | ClassFieldDecoratorContext) {
    if (typeof keyOrContext === 'object' && keyOrContext.kind !== 'field') {
      throw new Error(`【${keyOrContext.name?.toString()}】SearchField装饰器只能用于类的字段`)
    }
    AnyDecoratorHelper.setFieldConfig(target, keyOrContext, SEARCH_FIELD_PROPERTY_KEY, config || {})
  }
}

/**
 * # 获取实例中配置了SearchField装饰器的字段列表
 * @param target
 */
export function getSearchFieldList(target: any) {
  return AnyDecoratorHelper.getFieldList(target, SEARCH_FIELD_PROPERTY_KEY)
}

/**
 * # 获取实例中配置了SearchField装饰器的字段配置对象
 * @param target
 * @param fieldList 字段列表，不传时获取所有标记了``@SearchField``的属性的配置
 */
export function getSearchFiledConfigObj(target: any, fieldList: string[] = []) {
  return AnyDecoratorHelper.getFieldConfigObject<ISearchFieldConfig>(target, SEARCH_FIELD_PROPERTY_KEY, fieldList)
}
