/**
 * # 字典接口
 */
export interface IDictionary {
  /** # 字典传递值（通常对应枚举值） */
  value: string | number | symbol | boolean

  /** # 字典展示（通常对应枚举描述翻译） */
  label: any

  /** # 字典其他属性 */
  [key: string]: any
}
