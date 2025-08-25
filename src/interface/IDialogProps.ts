import type { AnyBaseModel } from '../model/AnyBaseModel'
import type { ClassConstructor } from '../types/TypeUtils'

/**
 * # 弹窗的基础props定义接口
 * @param T 弹窗onConfirm时返回的参数类型
 */
interface IDialogProps<T> {
  /** # 弹窗的标题 */
  title?: string

  /** # 弹窗的确认按钮被点击事件（通过该事件向外抛出数据） */
  onConfirm: (param: T) => void

  /** # 关闭前的钩子 */
  beforeClose?: () => Promise<void>

  /**  # 弹窗的关闭事件（通过该事件关闭弹窗） */
  onClosed: () => void

  /** # 最小化前的钩子 */
  beforeMinimize?: () => Promise<void>

  /** # 最小化后的钩子 */
  onMinimized?: () => void

  /** # 挂载后的钩子 */
  onMounted?: (q: any) => void
}

/**
 * # 弹窗的props定义接口（一般弹窗）
 * @param T 父窗体弹出当前窗体时传入的参数类型
 * @param P 弹窗onConfirm时返回的参数类型
 */
export interface IDialogPropsParam<T, P> extends IDialogProps<P> {
  /** # 父窗体弹出当前窗体时传入的参数 */
  param?: T
}

/**
 * # 弹窗的props定义接口（选择器）
 * @param T 选择器返回的数据类型
 */
export interface IDialogPropsSelector<T> extends IDialogProps<T[]> {
  /** # 弹窗标题 */
  title?: string

  /** # 值字段名（默认id） */
  valueKey?: string

  /** # 展示字段名（默认name） */
  labelKey?: string

  /** # 是否可以多选 */
  multiple?: boolean

  /** # 已选中的数据列表 */
  checkedRows?: T[]

  /** # 是否缓存选中数据 */
  isCacheSelect?: boolean

  /** # 初始化查询条件 （如需常驻条件请使用payload） */
  initData?: InstanceType<ClassConstructor<typeof AnyBaseModel>>

  /** # 查询时额外携带的参数 （如仅为初始化条件，请使用initData） */
  payload?: Record<string, any>

  /**  # 自定义参数（如果你需要标准选择器参数以外的参数，用这个） */
  customParams?: Record<string, any>
}
