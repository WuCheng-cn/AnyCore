import { log } from 'node:console'
import { expectTypeOf } from 'vitest'
import { AnyDataBaseEntity } from '../entity'
import { TableField } from './TableField'

class TestClass extends AnyDataBaseEntity {
  @TableField()
  testField?: string
}

const instance = new TestClass()

const a = TestClass.getTableFieldConfigObj('testField')
const b = instance.getTableFieldConfigObj('testField')

const aList = TestClass.getTableFieldList()
const bList = instance.getTableFieldList()

expectTypeOf(aList).toEqualTypeOf<string[]>()
expectTypeOf(bList).toEqualTypeOf<string[]>()

// @ts-expect-error a上不存在unexitField
log(a.unexitField)
// @ts-expect-error b上不存在unexitField
log(b.unexitField)

// 合法调用
log(a.testField)
log(b.testField)
