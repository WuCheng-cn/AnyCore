import type { IDictionary } from '../interface/IDictionary'
import type { AnyDictionaryArrayModel } from '../model/AnyDictionaryArrayModel'
import type { AnyDictionaryModel } from '../model/AnyDictionaryModel'
import { AnyDecoratorHelper } from '../helper/AnyDecoratorHelper'
import { AnyDictionaryHelper } from '../helper/AnyDictionaryHelper'

export const CUSTOM_FIELD_PROPERTY_KEY = 'CustomField'

/**
 * # 字段自定义名称配置装饰器
 * @param name 字段名称
 * @param dictionaryArray 字典数组或者字典code(传入字典code自动调用字典接口)
 */
export function CustomField(name: string, dictionaryArray?: AnyDictionaryArrayModel<AnyDictionaryModel> | (() => Promise<IDictionary[]>)): any {
  return async function (target: any, keyOrContext: string | ClassFieldDecoratorContext) {
    if (typeof keyOrContext === 'object' && keyOrContext.kind !== 'field') {
      throw new Error(`【${keyOrContext.name?.toString()}】CustomField装饰器只能用于类的字段`)
    }

    let data: AnyDictionaryArrayModel<AnyDictionaryModel> | undefined
    if (typeof dictionaryArray === 'function') {
      const res = await dictionaryArray()
      data = AnyDictionaryHelper.createDictionaryArray(res)
    }
    else {
      data = dictionaryArray
    }

    AnyDecoratorHelper.setFieldConfig(target, keyOrContext, CUSTOM_FIELD_PROPERTY_KEY, {
      name,
      dictionaryArray: data,
    })
  }
}

/**
 * # 获取字段名称
 * @param target
 * @param field 字段
 */
export function getCustomFieldName(target: any, field: string) {
  return AnyDecoratorHelper.getFieldConfigObject<{ name: string, dictionaryArray?: AnyDictionaryArrayModel<AnyDictionaryModel> }>(target, CUSTOM_FIELD_PROPERTY_KEY, [field])?.[field]?.name
}

/**
 * # 获取字段配置字典数组
 * @param target
 * @param field
 */
export function getCustomFieldDictionaryArray(target: any, field: string) {
  return AnyDecoratorHelper.getFieldConfigObject<{ name: string, dictionaryArray?: AnyDictionaryArrayModel<AnyDictionaryModel> }>(target, CUSTOM_FIELD_PROPERTY_KEY, [field])?.[field]?.dictionaryArray
}
