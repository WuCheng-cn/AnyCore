/**
 * # 表单类型
 */
export enum EFormItemType {
  /** # 输入框 */
  INPUT,
  /** # 数字输入框 */
  INPUT_NUMBER,
  /** # 分段输入框 */
  INPUT_SEGMENTED,
  /** # 选择框 */
  SELECT,
  /** # 日期选择框 */
  DATE,
  /** # 日期范围选择框 */
  DATE_RANGE,
  /** # 单选框 */
  RADIO,
  /** # 多选框 */
  CHECKBOX,
  /** # 文本框 */
  TEXTAREA,
  /** # 开关 */
  SWITCH,
  /** # 颜色选择器 */
  COLOR_PICKER,
  /** # 上传组件 */
  UPLOAD,
  /** # 签名组件 */
  SIGN,
  /** # 自定义渲染组件 */
  CUSTOM_RENDER,
}
