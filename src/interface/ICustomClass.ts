export interface ICustomClass {
  /** # 类名称 */
  name: string

  /** # 类描述 */
  description?: string

  /** # 表单列数 */
  formCols?: number

  /** # 表单label采用垂直对齐（默认水平） */
  formLabelVertical?: boolean
}
