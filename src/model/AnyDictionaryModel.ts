import type { IDictionary } from '../interface/IDictionary'

/**
 * # 字典模型
 * @description 该模型用于表示单个字典项
 */
export class AnyDictionaryModel<T = any> implements IDictionary<T> {
  value!: string | number | symbol | boolean
  label!: any
  payload?: T
}
