/**
 * 上传文件接口
 */
export interface IUploadFile {
  /** # 文件名 */
  name: string
  /** # 文件url */
  url: string
  /** # 文件大小 */
  size: number
  /** # 文件类型 */
  type: string
  /** # 文件最后修改时间 */
  lastModified: number
  /** # 文件最后修改日期 */
  lastModifiedDate: number
}
