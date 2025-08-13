import type { IDictionary } from '../interface/IDictionary'

export class AnyDictionaryModel implements IDictionary {
  value!: string | number | symbol | boolean
  label!: any
  [key: string]: any
}
