import { AnyDataBaseEntity } from '@/entity'
import { AnyDictionaryHelper } from '@/helper'
import { CustomField } from './CustomField'

enum TestEnum {
  A = 'a',
  B = 'b',
}

// 使用枚举创建字典数组
const enumDict = AnyDictionaryHelper.createDictionaryArray([
  { label: 'a', value: TestEnum.A },
  { label: 'b', value: TestEnum.B },
])

// 使用as const创建字典数组
const dict = AnyDictionaryHelper.createDictionaryArray([
  { label: 'a', value: 'a' },
  { label: 'b', value: 'b' },
] as const)

// 使用泛型参数明确指定类型的装饰器
class TestClass extends AnyDataBaseEntity {
  @CustomField('测试字段', enumDict)
  testField: TestEnum = TestEnum.A

  @CustomField<'a' | 'b'>('测试字段', dict)
  testField2: 'a' | 'b' = 'a'
}

// 从类中获取枚举字典
const enumDictByClass = TestClass.getFieldDictionaryArray('testField')
// @ts-expect-error: 类型“"x"”的参数不能赋给类型“TestEnum”的参数。
enumDictByClass?.getLabelByValue('x')
// @ts-expect-error: 类型“"x"”的参数不能赋给类型“TestEnum”的参数。
enumDict?.getLabelByValue('x')

// 从类中获取字面量类型字典
const dictByClass = TestClass.getFieldDictionaryArray('testField2')
// @ts-expect-error: 类型“"x"”的参数不能赋给类型“"a" | "b"”的参数。
dictByClass?.getLabelByValue('x')
// @ts-expect-error: 类型“"x"”的参数不能赋给类型“"a" | "b"”的参数。
dict?.getLabelByValue('x')

// 合法调用
enumDictByClass?.getLabelByValue(TestEnum.A)
enumDict?.getLabelByValue(TestEnum.A)
dictByClass?.getLabelByValue('a')
dict?.getLabelByValue('a')
