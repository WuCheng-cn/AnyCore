import type { IDictionary } from '../interface/IDictionary'

/**
 * 字典模型
 */
export class AnyDictionaryModel<T = any, P = any> implements IDictionary<T, P> {
  value!: T
  label!: any
  payload?: P
}
