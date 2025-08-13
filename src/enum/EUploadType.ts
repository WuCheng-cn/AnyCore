/**
 * # 上传类型(仅文件/仅拍照/文件和拍照)
 * - 移动端有效
 */
export enum EUploadType {
  /** # 仅文件 */
  FILE = 'file',
  /** # 仅拍照 */
  CAMERA = 'camera',
  /** # 文件和拍照 */
  FILE_AND_CAMERA = 'file_and_camera',
}
