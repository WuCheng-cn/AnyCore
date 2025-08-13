import type { IDataBase } from '../interface/IDataBase'
import { AnyBaseModel } from '../model/AnyBaseModel'

/**
 * # 数据库实体基类
 */
export class AnyDataBaseEntity extends AnyBaseModel implements IDataBase {
  id!: string
  createBy!: string
  createDate!: Date
  updateBy!: string
  updateDate!: Date
  createName!: string
  updateName!: string
}
