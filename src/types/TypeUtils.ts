import type { AnyBaseModel } from '@/model'

/**
 * # 类包装
 */
export type ClassConstructor<T> = new (...args: any[]) => T

/**
 * # 带静态方法的类构造函数类型
 * @template T - 继承自AnyBaseModel的模型类类型
 * 该类型既包含构造函数签名，又包含AnyBaseModel的所有静态方法
 */
export type ClassConstructorWithBaseModel<T extends AnyBaseModel = AnyBaseModel> = ClassConstructor<T> & (typeof AnyBaseModel)

/**
 * # 获取类型T中的字段名称（排除方法）
 * @template T - 目标类型
 * 该类型使用条件类型和索引类型来区分字段和方法
 * - 如果T[K]是函数类型，则过滤掉
 * - 否则保留字段名称
 */
export type ClassFieldNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K
}[keyof T]

/**
 * # 获取类型T中的方法名称（排除字段）
 * @template T - 目标类型
 * 该类型使用条件类型和索引类型来区分字段和方法
 * - 如果T[K]是函数类型，则保留方法名称
 * - 否则过滤掉
 */
export type ClassMethodNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T]
