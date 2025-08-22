/**
 * # 类包装
 */
export interface ClassConstructor<T> {
  new(...args: any[]): T
}

/**
 * # 类原型方法提取工具
 * 提取类的原型方法，用于在声明变量时能够提示出类上的所有方法
 * @template T 类类型
 */
export type ClassPrototype<T> = T extends {
  new(...args: any[]): infer Instance
} ? Instance : never
