import type { IDictionary } from '../interface/IDictionary'
import { AnyDictionaryArrayModel } from '../model/AnyDictionaryArrayModel'
import { AnyDictionaryModel } from '../model/AnyDictionaryModel'

/**
 * # 字典助手类
 */
export abstract class AnyDictionaryHelper {
  /**
   * # 根据传入数据创建字典
   * @param data
   * @description 该方法会将传入的数据转换为字典对象，并保留精确的类型信息
   * @example
   * ```ts
   * const dictionary = AnyDictionaryHelper.createDictionary(data);
   * ```
   */
  private static createDictionary<T extends IDictionary>(data: T): AnyDictionaryModel<T['value'], T['payload']> {
    const dictionary = new AnyDictionaryModel<T['value'], T['payload']>()
    dictionary.value = data.value
    dictionary.label = data.label
    dictionary.payload = data.payload
    return dictionary
  }

  /**
   * # 根据传入数据创建字典数组
   * @param data
   * @description 该方法会将传入的数据转换为字典数组，并保留精确的类型信息
   * @example
   * ```ts
   * const dictionaryArray = AnyDictionaryHelper.createDictionaryArray(data);
   * ```
   */
  static createDictionaryArray<T extends IDictionary>(data: readonly T[]): AnyDictionaryArrayModel<AnyDictionaryModel<T['value'], T['payload']>> {
    const dictionaryArray = new AnyDictionaryArrayModel<AnyDictionaryModel<T['value'], T['payload']>>()
    for (const item of data) {
      dictionaryArray.push(this.createDictionary(item))
    }
    return dictionaryArray
  }
}
