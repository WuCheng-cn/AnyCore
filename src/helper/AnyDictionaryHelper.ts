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
   * @description 该方法会将传入的数据转换为字典对象
   * @example
   * ```ts
   * const dictionary = AnyDictionaryHelper.createDictionary(data);
   * ```
   */
  private static createDictionary<T, P>(data: IDictionary<T, P>) {
    const dictionary = new AnyDictionaryModel<T, P>()
    dictionary.value = data.value
    dictionary.label = data.label
    dictionary.payload = data.payload
    return dictionary
  }

  /**
   * # 根据传入数据创建字典数组
   * @param data
   * @description 该方法会将传入的数据转换为字典数组
   * @example
   * ```ts
   * const dictionaryArray = AnyDictionaryHelper.createDictionaryArray(data);
   * ```
   */
  static createDictionaryArray<T, P>(data: IDictionary<T, P>[]): AnyDictionaryArrayModel<AnyDictionaryModel<T, P>> {
    const dictionaryArray = new AnyDictionaryArrayModel<AnyDictionaryModel<T, P>>()
    for (const item of data) {
      dictionaryArray.push(this.createDictionary(item))
    }
    return dictionaryArray
  }
}
