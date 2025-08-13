import type { IFieldBaseConfig } from './IFieldBaseConfig'
import type { IInputSelectorConfig } from './IInputSelectorConfig'

export interface ISearchFieldConfig extends IFieldBaseConfig {
  /** # 是否为高级搜索字段（配置后会在高级搜索中显示） */
  isAdvanced?: boolean

  /** # 宽度 */
  width?: string

  /** # 是否隐藏 */
  isHidden?: boolean

  /**
   * # 选择器输入框的混入配置（会与@FormField中的配置混合，以当前优先，用以应对在搜索表单时需要特殊配置的情况）
   * 适用{@link EFormItemType.INPUT_SELECTOR}
   */
  selectorConfigMixin?: Partial<IInputSelectorConfig>
}
