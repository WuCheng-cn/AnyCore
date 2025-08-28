import type { IFormFieldConfig } from './IFormFieldConfig'

export interface ISearchFieldConfig extends Partial<IFormFieldConfig> {
  /** # 是否为高级搜索字段（配置后会在高级搜索中显示） */
  isAdvanced?: boolean
}
