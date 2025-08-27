// 类型测试文件
import { AnyDataBaseEntity } from '@/entity'
import { AnyDictionaryHelper } from './AnyDictionaryHelper'

class PayloadTest extends AnyDataBaseEntity {}

const payloadTestIns = new PayloadTest()

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

// 枚举字典
const dict = AnyDictionaryHelper.createDictionaryArray([
  { label: '管理员', value: UserRole.ADMIN, payload: payloadTestIns },
  { label: '用户', value: UserRole.USER },
  { label: '访客', value: UserRole.GUEST },
])

// 测试
dict.getDictByValue(UserRole.ADMIN) // 正常
dict.getLabelByValue(UserRole.ADMIN) // 正常
dict.expose([UserRole.ADMIN]) // 正常
dict.exclude([UserRole.ADMIN]) // 正常

// @ts-expect-error 期望'UserRole.ADMIN'提示类型报错
dict.getDictByValue('UserRole.ADMIN')
// @ts-expect-error 期望'UserRole.ADMIN'提示类型报错
dict.getLabelByValue('UserRole.ADMIN')
// @ts-expect-error 期望'UserRole.ADMIN'提示类型报错
dict.expose(['UserRole.ADMIN'])
// @ts-expect-error 期望'UserRole.ADMIN'提示类型报错
dict.exclude(['UserRole.ADMIN'])

// 普通字典(通过 as const 固定字面量)
const dict2 = AnyDictionaryHelper.createDictionaryArray([
  { label: '管理员', value: 'admin', payload: payloadTestIns },
  { label: '用户', value: 'user' },
  { label: '访客', value: 'guest' },
] as const)

// 测试
dict2.getDictByValue('admin') // 正常
dict2.getLabelByValue('admin') // 正常
dict2.expose(['admin']) // 正常
dict2.exclude(['admin']) // 正常

// @ts-expect-error 期望'admin1'提示类型报错
dict2.getDictByValue('admin1')
// @ts-expect-error 期望'admin1'提示类型报错
dict2.getLabelByValue('admin1')
// @ts-expect-error 期望'admin1'提示类型报错
dict2.expose(['admin1'])
// @ts-expect-error 期望'admin1'提示类型报错
dict2.exclude(['admin1'])
