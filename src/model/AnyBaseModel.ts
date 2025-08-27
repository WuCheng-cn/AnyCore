import type { ClassFieldNames } from '@/types'
import { getCustomClassConfig } from '../decorator/CustomClass'
import { getCustomFieldDictionaryArray, getCustomFieldName } from '../decorator/CustomField'
import { getFormFieldConfigObj, getFormFieldList } from '../decorator/FormField'
import { getSearchFieldList, getSearchFiledConfigObj } from '../decorator/SearchField'
import { getTableFieldConfigObj, getTableFieldList } from '../decorator/TableField'

/**
 * # 基础模型，包含一些通用操作
 */
export class AnyBaseModel {
  /**
   * # 获取表单字段的label
   * 优先返回``@FormField``配置的label，其次返回``@CustomField``配置的值，否则返回字段key
   * @param field 当前字段key
   */
  getFormFieldLabel(field: ClassFieldNames<this>) {
    const fieldStr = field as string
    const formFiledConfig = this.getFormFieldConfigObj()[fieldStr]
    return formFiledConfig?.label || getCustomFieldName(this, fieldStr) || fieldStr
  }

  /**
   * # 获取表单字段的label
   * 优先返回``@FormField``配置的label，其次返回``@CustomField``配置的值，否则返回字段key
   * @param field 当前字段key
   * @returns 静态方法调用，返回实例方法调用
   */
  static getFormFieldLabel<T extends AnyBaseModel>(this: new () => T, field: ClassFieldNames<T>) {
    return new this().getFormFieldLabel(field)
  }

  /**
   * # 获取表格字段的label
   * 优先返回``@TableField``配置的label，其次返回``@CustomField``配置的值，否则返回字段key
   * @param field 当前字段key
   */
  getTableFieldLabel(field: ClassFieldNames<this>) {
    const fieldStr = field as string
    const tableFieldConfig = this.getTableFieldConfigObj()[fieldStr]
    return tableFieldConfig?.label || getCustomFieldName(this, fieldStr) || fieldStr
  }

  /**
   * # 获取表格字段的label
   * 优先返回``@TableField``配置的label，其次返回``@CustomField``配置的值，否则返回字段key
   * @param field 当前字段key
   * @returns 静态方法调用，返回实例方法调用
   */
  static getTableFieldLabel<T extends AnyBaseModel>(this: new () => T, field: ClassFieldNames<T>) {
    return new this().getTableFieldLabel(field)
  }

  /**
   * # 获取搜索字段的label
   * 优先返回``@SearchField``配置的label，其次返回``@CustomField``配置的值，否则返回字段key
   * @param field 当前字段key
   */
  getSearchFieldLabel(field: ClassFieldNames<this>) {
    const fieldStr = field as string
    const searchFieldConfig = this.getSearchFiledConfigObj()[fieldStr]
    return searchFieldConfig?.label || getCustomFieldName(this, fieldStr) || fieldStr
  }

  /**
   * # 获取搜索字段的label
   * 优先返回``@SearchField``配置的label，其次返回``@CustomField``配置的值，否则返回字段key
   * @param field 当前字段key
   * @returns 静态方法调用，返回实例方法调用
   */
  static getSearchFieldLabel<T extends AnyBaseModel>(this: new () => T, field: ClassFieldNames<T>) {
    return new this().getSearchFieldLabel(field)
  }

  /**
   * # 获取表格字段列表
   */
  getTableFieldList() {
    return getTableFieldList(this)
  }

  /**
   * # 获取表格字段列表
   * @returns 静态方法调用，返回实例方法调用
   */
  static getTableFieldList() {
    return new this().getTableFieldList()
  }

  /**
   * # 获取表格字段配置对象
   * 不传入字段列表，则获取所有标记了``@TableField``的属性的配置
   * @param fieldList 字段列表
   */
  getTableFieldConfigObj(...fieldList: ClassFieldNames<this>[]) {
    return getTableFieldConfigObj(this, fieldList as string[])
  }

  /**
   * # 获取表格字段配置对象
   * @param fieldList 字段列表
   * @returns 静态方法调用，返回实例方法调用
   */
  static getTableFieldConfigObj<T extends AnyBaseModel>(this: new () => T, ...fieldList: ClassFieldNames<T>[]) {
    return new this().getTableFieldConfigObj(...fieldList)
  }

  /**
   * # 获取搜索字段列表
   */
  getSearchFieldList() {
    return getSearchFieldList(this)
  }

  /**
   * # 获取搜索字段列表
   * @returns 静态方法调用，返回实例方法调用
   */
  static getSearchFieldList() {
    return new this().getSearchFieldList()
  }

  /**
   * # 获取搜索字段配置对象
   * 不传入字段列表，则获取所有标记了``@SearchField``的属性的配置
   * @param fieldList 字段列表
   */
  getSearchFiledConfigObj(...fieldList: ClassFieldNames<this>[]) {
    return getSearchFiledConfigObj(this, fieldList as string[])
  }

  /**
   * # 获取搜索字段配置对象
   * @param fieldList 字段列表
   * @returns 静态方法调用，返回实例方法调用
   */
  static getSearchFiledConfigObj<T extends AnyBaseModel>(this: new () => T, ...fieldList: ClassFieldNames<T>[]) {
    return new this().getSearchFiledConfigObj(...fieldList)
  }

  /**
   * # 获取表单字段列表
   */
  getFormFieldList() {
    return getFormFieldList(this)
  }

  /**
   * # 获取表单字段列表
   * @returns 静态方法调用，返回实例方法调用
   */
  static getFormFieldList() {
    return new this().getFormFieldList()
  }

  /**
   * # 获取表单字段配置对象
   * 不传入字段列表，则获取所有标记了``@FormField``的属性的配置
   * @param fieldList 字段列表
   */
  getFormFieldConfigObj(...fieldList: ClassFieldNames<this>[]) {
    return getFormFieldConfigObj(this, fieldList as string[])
  }

  /**
   * # 获取表单字段配置对象
   * @param fieldList 字段列表
   * @returns 静态方法调用，返回实例方法调用
   */
  static getFormFieldConfigObj<T extends AnyBaseModel>(this: new () => T, ...fieldList: ClassFieldNames<T>[]) {
    return new this().getFormFieldConfigObj(...fieldList)
  }

  /**
   * # 获取字段自定义字典数组
   * @param field 字段
   */
  getFieldDictionaryArray(field: ClassFieldNames<this>) {
    return getCustomFieldDictionaryArray(this, field as string)
  }

  /**
   * # 获取字段自定义字典数组
   * @param field 字段
   * @returns 静态方法调用，返回实例方法调用
   */
  static getFieldDictionaryArray<T extends AnyBaseModel>(this: new () => T, field: ClassFieldNames<T>) {
    return new this().getFieldDictionaryArray(field)
  }

  /**
   * # 获取字段option配置选项（适用antd select、radio、checkbox等）
   * @param field
   */
  getOptions(field: ClassFieldNames<this>) {
    return this.getFieldDictionaryArray(field)?.map((item) => {
      return {
        label: item.label,
        value: item.value,
      }
    }) || []
  }

  /**
   * # 获取字段option配置选项（适用antd select、radio、checkbox等）
   * @param field
   * @returns 静态方法调用，返回实例方法调用
   */
  static getOptions<T extends AnyBaseModel>(this: new () => T, field: ClassFieldNames<T>) {
    return new this().getOptions(field)
  }

  /**
   * # 获取类的配置名称
   */
  getCustomClassName() {
    return getCustomClassConfig(this)?.name || ''
  }

  /**
   * # 获取类的配置名称
   * @returns 静态方法调用，返回实例方法调用
   */
  static getCustomClassName() {
    return new this().getCustomClassName()
  }

  /**
   * # 获取类的配置
   */
  getCustomClassConfig() {
    return getCustomClassConfig(this)
  }

  /**
   * # 获取类的配置
   * @returns 静态方法调用，返回实例方法调用
   */
  static getCustomClassConfig() {
    return new this().getCustomClassConfig()
  }

  /**
   * # 从json数据中解析出实体对象(实例调用)
   * @param json
   */
  fromJSON(json: Record<string, any>) {
    return AnyBaseModel.parse(this, json)
  }

  /**
   * # 从json数据中解析出实体对象(静态调用)
   * @param this
   * @param json
   */
  static fromJSON<T extends AnyBaseModel>(this: new () => T, json: Record<string, any>): T {
    if (typeof json !== 'object') {
      throw new TypeError('fromJSON参数类型错误')
    }
    const instance = new this() as T
    return AnyBaseModel.parse(instance, json)
  }

  /**
   * # 从json数组中解析出实体对象数组(静态调用)
   * @param this
   * @param jsonArray
   */
  static fromJsonArray<T extends AnyBaseModel>(this: new () => T, jsonArray: Record<string, any>[] | Record<string, any>): T[] {
    if (!Array.isArray(jsonArray) && typeof jsonArray !== 'object') {
      throw new TypeError('fromJsonArray参数类型错误')
    }
    const instanceList: T[] = []

    const parseItem = (item: Record<string, any>): T => {
      const instance: T = new this()
      try {
        return AnyBaseModel.parse(instance, item)
      }
      catch (error) {
        console.error('Error parsing item:', error)
        return instance // 返回空实例，避免中断整个过程
      }
    }

    if (Array.isArray(jsonArray)) {
      jsonArray.forEach((item) => {
        instanceList.push(parseItem(item))
      })
    }
    else {
      instanceList.push(parseItem(jsonArray))
    }

    return instanceList
  }

  /**
   * # 解析JSON对象为实例对象
   * @param instance
   * @param json
   */
  private static parse<T extends AnyBaseModel>(instance: T, json: Record<string, any>) {
    const fieldList = Object.keys(instance)
    fieldList.forEach((field) => {
      const value = json[field]
      if (value !== undefined) {
        (instance as Record<string, any>)[field] = value
      }
    })
    return instance
  }

  /**
   * # 将实例转为普通对象
   */
  toJSON() {
    const json = {} as Record<keyof this, any>
    const fieldList = Object.keys(this) as (keyof this)[]
    fieldList.forEach((field) => {
      if (typeof this[field] === 'function') {
        return
      }
      json[field] = this[field]
      const fieldData = this[field]
      if (Array.isArray(fieldData)) {
        json[field] = fieldData.map((item) => {
          if (item instanceof AnyBaseModel) {
            return item.toJSON()
          }
          return item
        })
      }
      if (fieldData instanceof AnyBaseModel) {
        json[field] = fieldData.toJSON()
      }
    })
    return json
  }
}
