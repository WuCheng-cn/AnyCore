/**
 * # 类构造函数包装
 */
export type ClassConstructor<T> = T extends {
  new(...args: any[]): any
} ? T : never
