import type { EDateFormatType } from '../enum/EDateFormatType'
import type { EFormItemType } from '../enum/EFormItemType'
import type { EUploadType } from '../enum/EUploadType'
import type { IDictionary } from './IDictionary'
import type { IFieldBaseConfig } from './IFieldBaseConfig'
import type { IInputSelectorConfig } from './IInputSelectorConfig'

/**
 * # 表单字段配置接口
 */
export interface IFormFieldConfig extends IFieldBaseConfig {
  /**
   * # 表单类型
   * @see {@link EFormItemType}
   */
  formType: EFormItemType

  /**
   * # 是否仅用于搜索字段
   */
  isOnlySearch?: boolean

  /**
   * # 校验触发方式
   */
  trigger?: 'change' | 'blur'

  /**
   * # 允许的最小值
   * 适用{@link EFormItemType.INPUT_NUMBER}
   */
  min?: number

  /**
   * # 允许的最大值
   * 适用{@link EFormItemType.INPUT_NUMBER}
   */
  max?: number

  /**
   * # 允许的最大长度
   * 适用{@link EFormItemType.INPUT}
   */
  maxLength?: number

  /**
   * # 允许的最小长度
   * 适用{@link EFormItemType.INPUT}
   */
  minLength?: number

  /**
   * # 是否必填
   */
  required?: boolean

  /**
   * # 占位符
   */
  placeholder?: string

  /**
   * # 日期格式(传入后会在提交时自动转换)
   */
  dateFormat?: EDateFormatType

  /**
   * # 是否去除两端空格（还没开发相关应用，传了无效）
   */
  trim?: boolean

  /**
   * # 默认值
   */
  defaultValue?: () => any

  /**
   * # 选中值
   * 适用{@link EFormItemType.SWITCH}
   */
  checkedValue?: any

  /**
   * # 未选中值
   * 适用{@link EFormItemType.SWITCH}
   */
  unCheckedValue?: any

  /**
   * # 是否禁用（仅对表单组件生效）
   *
   */
  disabled?: ((formData: any) => Promise<boolean>) | boolean

  /**
   * # 选择器输入框的配置
   * 适用{@link EFormItemType.INPUT_SELECTOR}
   */
  selectorConfig?: IInputSelectorConfig

  /**
   * # 上传文件类型（默认不限）
   * 适用{@link EFormItemType.UPLOAD}
   */
  accept?: string[]

  /**
   * # 上传文件大小限制（单位b,系统默认50M(50*1024*1024)）
   * 适用{@link EFormItemType.UPLOAD}
   */
  maxSize?: number

  /**
   * # 上传文件数量限制
   * 适用{@link EFormItemType.UPLOAD}
   */
  maxCount?: number

  /**
   * # 是否离线上传
   * - 注*:开启后将文件存在本地,需在保存时手动执行附件信息保存🤪
   * - 适用{@link EFormItemType.UPLOAD}
   */
  isUploadOffline?: boolean

  /**
   * # 上传类型(仅文件/仅拍照/文件和拍照)
   * - 移动端有效
   */
  uploadType?: EUploadType

  /**
   * # 是否可选可输
   * - 适用{@link EFormItemType.SELECT}
   */
  canInput?: boolean

  /**
   * # 配置选项（可动态可静态）🤪
   * - 适用{@link EFormItemType.SELECT}
   */
  options?: ((formData: any) => Promise<IDictionary<any>[]>) | IDictionary<any>[]

  /**
   * # 缓存字段
   * - 适用{@link EFormItemType.SELECT}
   */
  cachefield?: string

  /**
   * # 可见性🤪
   * - 需要根据formData动态判断是否显示
   */
  visible?: ((formData: any) => Promise<boolean>) | boolean

  /**
   * # 自定义渲染函数
   * - 适用{@link EFormItemType.CUSTOM_RENDER}
   */
  customRender?: (params: any) => any

  /** # 自定义携带的组件属性 */
  props?: any
}
