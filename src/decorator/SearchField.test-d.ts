import type { ClassFieldNames } from '@/types'
import { log } from 'node:console'
import { expectTypeOf } from 'vitest'
import { AnyDataBaseEntity } from '../entity'
import { SearchField } from './SearchField'

class TestClass extends AnyDataBaseEntity {
  @SearchField()
  testField?: string
}

const instance = new TestClass()

const a = TestClass.getSearchFieldConfigObj('testField')
const b = instance.getSearchFieldConfigObj('testField')

const aList = TestClass.getSearchFieldList()
const bList = instance.getSearchFieldList()

expectTypeOf(aList).toEqualTypeOf<ClassFieldNames<TestClass>[]>()
expectTypeOf(bList).toEqualTypeOf<ClassFieldNames<TestClass>[]>()

// @ts-expect-error a上不存在unexitField
log(a.unexitField)
// @ts-expect-error b上不存在unexitField
log(b.unexitField)

// 合法调用
log(a.testField)
log(b.testField)
