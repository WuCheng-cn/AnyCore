import type { AnyBaseModel } from '../model/AnyBaseModel'
import type { ClassConstructorWithBaseModel, ClassFieldNames } from '@/types'

/**
 * 表单属性接口，用于定义表单组件的配置参数
 * @template T - 继承自AnyBaseModel的模型类类型
 */
export interface IFormProps<T extends AnyBaseModel = AnyBaseModel> {
  /** # 配置实体 */
  entity: ClassConstructorWithBaseModel<T>

  /**  # 列数 */
  cols?: number

  /** # 初始数据  */
  initData?: T

  /** # 要展示的字段列表 - 只提示字段名，不包含方法名 */
  fieldList?: (ClassFieldNames<T>)[]

  /** # 字段排序参考 - 只提示字段名，不包含方法名 */
  fieldOrder?: (ClassFieldNames<T>)[]

  /** 额外的验证规则（会与实体的配置合并） */
  mixinRules?: Partial<Record<ClassFieldNames<T>, any[]>>

  /** # 表单label布局 */
  labelCol?: object

  /** # 是否显示复选框(开启后可手动获取一组选中字段) */
  showCheckbox?: boolean

  /** # 是否可选(开启后，无效化表单项的必填验证) */
  isOptional?: boolean

  /** # 是否禁用表单 */
  disabled?: boolean
}
