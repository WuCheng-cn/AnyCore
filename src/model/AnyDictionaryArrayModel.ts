import type { IDictionary } from '../interface/IDictionary'

/**
 * # 字典数组模型
 * @description 该模型用于存储字典数组
 */
export class AnyDictionaryArrayModel<T extends IDictionary> extends Array<T> {
  /**
   * # 根据传入字典的键获取label
   * @param key
   * @description 该方法会根据传入的键获取对应的label
   * @example
   * ```ts
   * const label = dictionaryArray.getLabelByValue(key);
   * ```
   */
  getLabelByValue(key: T['value']) {
    const dictionary = this.find(item => item.value === key)
    return dictionary?.label
  }

  /**
   * # 根据传入字典的键获取字典
   * @param key
   * @description 该方法会根据传入的键获取对应的字典
   * @example
   * ```ts
   * const dictionary = dictionaryArray.getDictByValue(key);
   * ```
   */
  getDictByValue(key: T['value']) {
    return this.find(item => item.value === key)
  }

  /**
   * # 根据传入字典的键数组获取字典数组
   */
  expose(keyArr: T['value'][]) {
    return this.filter(item => keyArr.includes(item.value)) as AnyDictionaryArrayModel<T>
  }

  /**
   * # 根据传入字典的键数组获取排除后的字典数组
   */
  exclude(keyArr: T['value'][]) {
    return this.filter(item => !keyArr.includes(item.value)) as AnyDictionaryArrayModel<T>
  }
}
