/**
 * # 海特额外字段
 */
interface IDataBaseHitke {
  createName: string
  updateName: string
}

/**
 * # 数据库基类实现接口
 */
export interface IDataBase extends IDataBaseHitke {
  id: string
  createBy: string
  createDate: Date
  updateBy: string
  updateDate: Date
}
