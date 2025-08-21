/**
 * # 类包装
 */
export interface ClassConstructor<T> {
  new(...args: any[]): T
}
