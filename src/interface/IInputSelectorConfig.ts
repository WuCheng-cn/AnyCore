import type { AnyBaseModel } from '../model/AnyBaseModel'
import type { ClassConstructor } from '../types/ClassConstructor'

/**
 * # 选择器输入框 配置
 */
export interface IInputSelectorConfig {
  /**
   * # 选择器视图组件
   * - 采用[AnyDialogHelper](../helper/AnyDialogHelper.ts)标准编写，具体参照[弹窗demo](../../views/demo/DialogDemo.vue)
   * - 适用{@link EFormItemType.INPUT_SELECTOR}
   */
  selectorView: any

  /** # 值字段名（默认id） */
  valueKey?: string

  /** # 展示字段名（默认name） */
  labelKey?: string

  /** # 选择器弹窗标题 */
  title?: string

  /** # 是否多选 */
  multiple?: boolean

  /**
   * # 回显选中的数据
   * - 参数1：表单数据
   */
  checkedRows?: (formData: any) => Promise<any[]>

  /** # 是否缓存选中数据 */
  isCacheSelect?: boolean

  /** # 初始化查询条件 （如需常驻条件请使用payload） */
  initData?: InstanceType<ClassConstructor<AnyBaseModel>>

  /** # 查询时额外携带的参数 （如仅为初始化条件，请使用initData） */
  payload?: (formData: any) => Promise<Record<string, any>>

  /**
   * # 选择器选中值后的回调函数
   * - 参数1：选中的数据列表
   * - 参数2：表单数据
   */
  onSelect?: (value: any[], formData: any) => void
}
