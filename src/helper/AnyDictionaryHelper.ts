import type { IDictionary } from '../interface/IDictionary'
import { AnyDictionaryArrayModel } from '../model/AnyDictionaryArrayModel'
import { AnyDictionaryModel } from '../model/AnyDictionaryModel'

/**
 * # 字典助手类
 * 提供字典和字典数组的创建功能，保持类型安全
 */
export class AnyDictionaryHelper {
  /**
   * # 根据传入数据创建字典
   * @description 该方法会将传入的数据转换为字典对象，并保留value和payload的类型信息
   * @example
   * ```ts
   * const dictionary = AnyDictionaryHelper.createDictionary(data);
   * ```
   */
  private static createDictionary<V extends string | number | symbol | boolean, L = any, P = any>(data: { value: V, label: L, payload?: P }): AnyDictionaryModel<P> {
    const dictionary = new AnyDictionaryModel<P>()
    // 使用Object.entries避免类型问题
    Object.entries(data).forEach(([k, v]) => {
      (dictionary as any)[k] = v
    })
    return dictionary
  }

  /**
   * # 根据传入数据创建字典数组
   * @param data 字典数据数组
   * @description 该方法会将传入的数据转换为字典数组，并保留value和payload的类型信息
   * @example
   * ```ts
   * // 方式1: 通过泛型参数明确指定payload类型
   * const dictionaryArray = AnyDictionaryHelper.createDictionaryArray<UserRolePayload>([
   *   { label: '管理员', value: 'admin', payload: { permissions: ['read', 'write'], description: '系统管理员' } },
   *   { label: '用户', value: 'user', payload: { permissions: ['read'], description: '普通用户' } }
   * ]);
   * // 方式2: 使用as const自动推断所有类型(含payload)
   * const dictionaryArray = AnyDictionaryHelper.createDictionaryArray([
   *   { label: '管理员', value: 'admin', payload: { permissions: ['read', 'write'] } },
   *   { label: '用户', value: 'user' }
   * ] as const);
   * ```
   */
  static createDictionaryArray<P = any, T extends IDictionary<P> = IDictionary<P>>(data: readonly T[]): AnyDictionaryArrayModel<T> {
    const dictionaryArray = new AnyDictionaryArrayModel<T>()
    for (const item of data) {
      const dictionary = new AnyDictionaryModel<P>()
      // 使用Object.entries避免类型问题
      Object.entries(item).forEach(([k, v]) => {
        (dictionary as any)[k] = v
      })
      dictionaryArray.push(dictionary as T)
    }
    return dictionaryArray
  }
}
