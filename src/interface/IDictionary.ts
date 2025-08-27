/**
 * # 字典接口
 */
export interface IDictionary<T = any, P = any> {
  /** # 字典传递值（通常对应枚举值） */
  value: T

  /** # 字典展示（通常对应枚举描述翻译） */
  label: any

  /** # 字典其他属性 */
  payload?: P
}
