import type { IDictionary } from '../interface/IDictionary'

/**
 * # 字典数组模型
 * @description 该模型用于存储字典数组，提供基于value的操作方法，保持类型安全
 */
export class AnyDictionaryArrayModel<T extends IDictionary<any>> extends Array<T> {
  /**
   * # 根据传入字典的键获取label
   * @param key 字典的value值
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
   * @param key 字典的value值
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
   * @param keyArr 要保留的value数组
   * @description 该方法会根据传入的键数组获取对应的字典数组
   * @example
   * ```ts
   * const exposedArray = dictionaryArray.expose([key1, key2]);
   * ```
   */
  expose(keyArr: T['value'][]) {
    return this.filter(item => keyArr.includes(item.value)) as AnyDictionaryArrayModel<T>
  }

  /**
   * # 根据传入字典的键数组获取排除后的字典数组
   * @param keyArr 要排除的value数组
   * @description 该方法会根据传入的键数组获取排除后的字典数组
   * @example
   * ```ts
   * const filteredArray = dictionaryArray.exclude([key1, key2]);
   * ```
   */
  exclude(keyArr: T['value'][]) {
    return this.filter(item => !keyArr.includes(item.value)) as AnyDictionaryArrayModel<T>
  }

  /**
   * # 根据传入字典的键获取payload
   * @param key 字典的value值
   * @description 该方法会根据传入的键获取对应的payload信息
   * @example
   * ```ts
   * const payload = dictionaryArray.getPayloadByValue(key);
   * ```
   */
  getPayloadByValue(key: T['value']): T['payload'] | undefined {
    const dictionary = this.find(item => item.value === key)
    return dictionary?.payload
  }
}
