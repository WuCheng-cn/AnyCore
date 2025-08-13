import { AnyBaseModel } from '../model/AnyBaseModel'

/**
 * # 装饰器助手类
 * - 装饰器助手类主要用来处理类装饰器、属性装饰器、方法装饰器等，
 * - 类装饰器target是类的构造函数。
 * - 属性装饰器、方法装饰器target是类的原型对象。
 */
export class AnyDecoratorHelper {
  /**
   * # 反射添加属性
   * @param target 目标类
   * @param key 配置key
   * @param value 配置值
   */
  private static setProperty(target: any, key: string, value: any) {
    Reflect.defineProperty(target, key, {
      enumerable: false,
      value,
      writable: false,
      configurable: true,
    })
  }

  /**
   * # 设置一个类配置项
   * @param target 目标实体类
   * @param classConfigKey 配置项索引键值
   * @param classConfig 配置的参数
   */
  static setClassConfig(target: any, classConfigKey: string, classConfig: any) {
    this.setProperty(target.prototype, classConfigKey, classConfig)
  }

  /**
   * # 递归获取指定类的配置项
   * @param target 目标类
   * @param classConfigKey 配置项的Key
   * @param defaultValue (可选)类装饰器请传入配置项实例
   * @param isObject (可选)是否是对象配置
   */
  static getClassConfig(target: any, classConfigKey: string, defaultValue: any = undefined, isObject = false): any {
    let classConfig = Reflect.get(target, classConfigKey)
    if (!isObject) {
      // 普通配置
      if (classConfig === undefined) {
        const superClass = Reflect.getPrototypeOf(target)
        if (!superClass || superClass.constructor.name === 'AnyBaseModel') {
          return defaultValue
        }
        return this.getClassConfig(superClass, classConfigKey, defaultValue, isObject)
      }
      return classConfig
    }

    classConfig = classConfig || {}
    // 对象配置
    const superClass = Reflect.getPrototypeOf(target)
    if (!superClass || superClass.constructor.name === 'AnyBaseModel') {
      return defaultValue
    }

    return { ...this.getClassConfig(superClass, classConfigKey, defaultValue, isObject), ...classConfig }
  }

  /**
   * # 设置一个字段配置项
   * @param target 目标类
   * @param key 字段
   * @param fieldConfigKey 配置项索引键值
   * @param fieldConfig 配置的参数
   */
  static setFieldConfig(target: any, key: string, fieldConfigKey: string, fieldConfig: any) {
    this.setProperty(target, `${fieldConfigKey}[${key}]`, fieldConfig)
    this.addFieldDecoratorKey(target, key, fieldConfigKey)
  }

  /**
   * # 添加一个字段配置项的索引键值
   * @param target 目标类
   * @param key 字段
   * @param fieldConfigKey 配置项索引键值
   */
  private static addFieldDecoratorKey(target: any, key: string, fieldConfigKey: string) {
    const list: string[] = Array.from(Reflect.get(target, fieldConfigKey) || [])
    const index = list.indexOf(key)
    if (index !== -1) {
      list.splice(index, 1)
    }
    this.setProperty(target, fieldConfigKey, [...list, key])
  }

  /**
   * # 获取类指定字段的指定类型的配置
   * @param target 目标类
   * @param key 字段
   * @param fieldConfigKey 装饰器的配置项索引键值
   * @param isObject (可选)是否对象配置
   */
  static getFieldConfig(target: any, key: string, fieldConfigKey: string, isObject = false): any {
    if (typeof target !== 'object') {
      target = target.prototype
    }
    let fieldConfig = Reflect.get(target, `${fieldConfigKey}[${key}]`)
    if (!isObject) {
      // 普通配置
      if (fieldConfig !== undefined) {
        return fieldConfig
      }
      // 没有查询到配置
      const superClass = Reflect.getPrototypeOf(target)
      if (!superClass || superClass.constructor.name === 'AnyBaseModel') {
        return undefined
      }
      return this.getFieldConfig(superClass, key, fieldConfigKey)
    }

    // 对象配置
    fieldConfig = fieldConfig || {}
    // 没有查询到配置
    const superClass = Reflect.getPrototypeOf(target)
    if (!superClass || superClass.constructor.name === 'AnyBaseModel') {
      return {}
    }
    return { ...this.getFieldConfig(superClass, key, fieldConfigKey, true), ...fieldConfig }
  }

  /**
   * # 获取类标记了装饰器的字段列表
   * @param target 目标类
   * @param fieldConfigKey 装饰器的配置项索引键值
   * @param list (递归参数)无需传入
   */
  static getFieldList(target: any, fieldConfigKey: string, list: string[] = []): string[] {
    try {
      if (!target) {
        return list
      }

      const fieldListRaw = Reflect.get(target, fieldConfigKey)
      const fieldList = Array.isArray(fieldListRaw) ? fieldListRaw : []

      const uniqueFieldSet = new Set([...new Set(list), ...fieldList.filter(item => !list.includes(item))])

      const superClass = Reflect.getPrototypeOf(target)
      if (superClass && !(superClass instanceof AnyBaseModel)) {
        return this.getFieldList(superClass, fieldConfigKey, [...uniqueFieldSet])
      }

      return [...uniqueFieldSet]
    }
    catch (error) {
      console.error('Error in getFieldList:', error)
      return list
    }
  }

  /**
   * # 获取目标类指定字段列表的配置项对象
   * @param target 目标类
   * @param fieldConfigKey 装饰器的配置项索引键值
   * @param keyList 指定的字段数组
   */
  static getFieldConfigList<T>(target: any, fieldConfigKey: string, keyList: string[] = []) {
    if (keyList.length === 0) {
      keyList = this.getFieldList(target, fieldConfigKey)
    }
    const result: { [key: string]: T } = {}
    for (const fieldName of keyList) {
      const config = this.getFieldConfig(target, fieldName, fieldConfigKey)
      if (config) {
        result[fieldName] = config
      }
    }
    return result
  }

  /**
   * # 获取目标类上指定字段的某个配置的值
   * @param target 目标类
   * @param fieldConfigKey 装饰器的配置项索引键值
   * @param key 字段
   * @param configKey 配置Key
   */
  static getFieldConfigValue(target: any, fieldConfigKey: string, key: string, configKey: string): any {
    const fieldConfig = Reflect.get(target, `${fieldConfigKey}[${key}]`)
    if (fieldConfig && fieldConfig[configKey] !== undefined) {
      return fieldConfig[configKey]
    }
    const superClass = Object.getPrototypeOf(target)
    if (!superClass || superClass.constructor.name === 'AnyBaseModel') {
      return undefined
    }
    return this.getFieldConfigValue(superClass, fieldConfigKey, key, configKey)
  }
}
