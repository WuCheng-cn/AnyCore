import { log } from 'node:console'
import { AnyDataBaseEntity } from '../entity'
import { FormField } from './FormField'

class TestClass extends AnyDataBaseEntity {
  @FormField()
  testField?: string
}

const instance = new TestClass()

const a = TestClass.getFormFieldConfigObj('testField')
const b = instance.getFormFieldConfigObj('testField')

// @ts-expect-error a上不存在unexitField
log(a.unexitField)
// @ts-expect-error b上不存在unexitField
log(b.unexitField)

// 合法调用
log(a.testField)
log(b.testField)
