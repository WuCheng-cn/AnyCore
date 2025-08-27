import { AnyBaseModel } from './AnyBaseModel'

// 定义一个测试模型子类
class TestModel extends AnyBaseModel {
  // 定义一些字段
  username: string = ''

  age: number = 0

  email: string = ''

  // 方法不会被包含在字段列表中
  getFullName(): string {
    return this.username
  }
}

// 创建实例
const testInstance = new TestModel()

// 验证实例方法的字段类型提示
// 这些应该只能接受 username, age, email 作为参数
// 不应接受 getFullName 或其他非字段属性
// @ts-expect-error: 不应接受不存在的字段
testInstance.getFormFieldLabel('nonExistentField')
// @ts-expect-error: 不应接受方法名作为字段
testInstance.getFormFieldLabel('getFullName')

// 这些应该是合法的
testInstance.getFormFieldLabel('username')
testInstance.getFormFieldLabel('age')
testInstance.getFormFieldLabel('email')

// 验证静态方法的字段类型提示
// 注意：使用@ts-expect-error来验证类型检查
// @ts-expect-error: 不应接受不存在的字段
TestModel.getFormFieldLabel('nonExistentField')
// @ts-expect-error: 不应接受方法名作为字段
TestModel.getFormFieldLabel('getFullName')

// 这些应该是合法的
TestModel.getFormFieldLabel('username')
TestModel.getFormFieldLabel('age')
TestModel.getFormFieldLabel('email')

// 验证其他方法的类型提示
// @ts-expect-error - 不应接受非字段属性
testInstance.getOptions('nonExistentField')

// 这些应该是合法的
testInstance.getOptions('username')
TestModel.getOptions('age')

// 验证数组参数
// @ts-expect-error - 不应接受非字段属性
testInstance.getFormFieldConfigObj('nonExistentField')

// 这些应该是合法的
testInstance.getFormFieldConfigObj('username', 'age')
TestModel.getFormFieldConfigObj('email')
