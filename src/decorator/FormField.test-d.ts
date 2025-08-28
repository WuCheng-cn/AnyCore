import { log } from 'node:console'
import { expectTypeOf } from 'vitest'
import { AnyDataBaseEntity } from '../entity'
import { FormField } from './FormField'

class TestClass extends AnyDataBaseEntity {
  @FormField()
  testField?: string
}

const instance = new TestClass()

const a = TestClass.getFormFieldConfigObj('testField')
const b = instance.getFormFieldConfigObj('testField')

const aList = TestClass.getFormFieldList()
const bList = instance.getFormFieldList()

expectTypeOf(aList).toEqualTypeOf<string[]>()
expectTypeOf(bList).toEqualTypeOf<string[]>()

log(a.testField)
// @ts-expect-error b上不存在unexitField
log(b.unexitField)

// 合法调用
log(a.testField)
log(b.testField)
