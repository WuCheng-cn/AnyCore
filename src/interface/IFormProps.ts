import type { AnyBaseModel } from '../model/AnyBaseModel'
import type { ClassConstructor } from '../types/ClassConstructor'

export interface IFormProps {
  /** # 配置实体 */
  entity: ClassConstructor<typeof AnyBaseModel>

  /**  # 列数 */
  cols?: number

  /** # 初始数据  */
  initData?: InstanceType<ClassConstructor<typeof AnyBaseModel>>

  /** # 要展示的字段列表 */
  fieldList?: string[]

  /** # 字段排序参考 */
  fieldOrder?: string[]

  /** 额外的验证规则（会与实体的配置合并） */
  mixinRules?: Record<string, any[]>

  /** # 表单label布局 */
  labelCol?: object

  /** # 是否显示复选框(开启后可手动获取一组选中字段) */
  showCheckbox?: boolean

  /** # 是否可选(开启后，无效化表单项的必填验证) */
  isOptional?: boolean

  /** # 是否禁用表单 */
  disabled?: boolean
}
