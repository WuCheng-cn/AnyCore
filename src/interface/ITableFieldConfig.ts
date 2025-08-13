import type { EDateFormatType } from '../enum/EDateFormatType'
import type { IFieldBaseConfig } from './IFieldBaseConfig'

export interface ITableFieldConfig extends IFieldBaseConfig {
  width?: string | number
  ellipsis?: boolean
  sorter?: boolean
  fixed?: 'left' | 'right'
  align?: 'left' | 'center' | 'right'
  customRender?: (params: any) => any

  /**
   * # 日期格式(传入后会在渲染时时自动转换)
   */
  dateFormat?: EDateFormatType

  /**
   * # 是否常驻在表格中（不受自定义列影响）
   */
  isAlways?: boolean
}
