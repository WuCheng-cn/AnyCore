/**
 * 配置文件
 */
export const AppConfig = {
  /** # 输入框输入最大长度 */
  MAX_LENGTH_INPUT: 50,

  /** # 文本域输入最大长度 */
  MAX_LENGTH_AREA: 255,

  /** # 数字输入最大值 */
  MAX_NUMBER: 999999999,

  /** # 默认分页尺寸 */
  DEFAULT_PAGE_SIZE: 10,

  /** # 指定每页可以显示多少条['10', '20', '50', '100'] */
  DEFAULT_PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'],

  /** # 默认上传文件最大尺寸（单位b） */
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024,

  /** # 默认上传文件最大数量 */
  MAX_UPLOAD_COUNT: 1,
}
