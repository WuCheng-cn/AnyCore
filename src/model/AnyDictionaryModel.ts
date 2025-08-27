import type { IDictionary } from '../interface/IDictionary'

export class AnyDictionaryModel<T = any, P = any> implements IDictionary<T, P> {
  value!: T
  label!: any
  payload?: P
}
