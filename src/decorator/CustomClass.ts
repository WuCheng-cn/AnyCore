import type { ICustomClass } from '../interface/ICustomClass'
import { AnyDecoratorHelper } from '../helper/AnyDecoratorHelper'

/** # 自定义类装饰器key */
export const CUSTOM_CLASS_PROPERTY_KEY = 'CustomClass'

/**
 * # 自定义类装饰器
 * @param config 类配置
 */
export function CustomClass(config: ICustomClass) {
  return function (target: any) {
    AnyDecoratorHelper.setClassConfig(target, CUSTOM_CLASS_PROPERTY_KEY, config)
  }
}

/**
 * # 获取自定义类装饰器配置
 * @param target
 */
export function getCustomClassConfig(target: any) {
  return AnyDecoratorHelper.getClassConfig(target, CUSTOM_CLASS_PROPERTY_KEY) as ICustomClass
}
