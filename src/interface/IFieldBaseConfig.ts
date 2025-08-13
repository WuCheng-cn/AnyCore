// import { IFormFieldConfig } from './IFormFieldConfig'
// import { ISearchFieldConfig } from './ISearchFieldConfig'
// import { ITableFieldConfig } from './ITableFieldConfig'
/**
 * # 字段配置基础接口
 * @description 目前以下4个配置继承了该接口
 * {@link IFormFieldConfig}，{@link ISearchFieldConfig}，{@link ITableFieldConfig}
 */
export interface IFieldBaseConfig {
  key?: string
  label?: string
}
