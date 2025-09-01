import type { EDateFormatType } from '../enum/EDateFormatType'
import type { IFieldBaseConfig } from './IFieldBaseConfig'

export interface ITableFieldConfig extends IFieldBaseConfig {
  /** # 宽度 */
  width?: string | number
  /** # 标题 */
  title?: string
  /** # 是否省略 */
  ellipsis?: boolean
  /** # 是否排序 */
  sorter?: boolean
  /** # 是否固定 */
  fixed?: 'left' | 'right'
  /** # 对齐方式 */
  align?: 'left' | 'center' | 'right'

  /** # 自定义渲染 */
  customRender?: (params: any) => any

  /** # 日期格式(传入后会在渲染时时自动转换) */
  dateFormat?: EDateFormatType

  /** # 是否常驻在表格中（不受自定义列影响） */
  isAlways?: boolean
}
