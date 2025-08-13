import { describe, expect, it } from 'vitest'
import { AnyDecoratorHelper } from '../../helper/AnyDecoratorHelper'

// 注*该文件主要测时装饰器助手类
// 装饰器助手类主要用来处理类装饰器、属性装饰器、方法装饰器等，
// 类装饰器target是类的构造函数。
// 属性装饰器、方法装饰器target是类的原型对象。
describe('anyDecoratorHelper', () => {
  describe('setClassConfig', () => {
    it('should set a class configuration', () => {
      class TestClass {}
      AnyDecoratorHelper.setClassConfig(TestClass, 'testConfigKey', 'testValue')
      expect(Reflect.get(TestClass.prototype, 'testConfigKey')).toBe('testValue')
    })
  })

  describe('getClassConfig', () => {
    it('should get a class configuration', () => {
      class TestClass {}
      AnyDecoratorHelper.setClassConfig(TestClass, 'testConfigKey', 'testValue')
      expect(AnyDecoratorHelper.getClassConfig(new TestClass(), 'testConfigKey')).toBe('testValue')
    })

    it('should get a default value if not found', () => {
      class TestClass {}
      expect(AnyDecoratorHelper.getClassConfig(new TestClass(), 'nonExistentKey', 'defaultValue')).toBe('defaultValue')
    })

    it('should merge configurations from super classes', () => {
      class SuperTestClass {}
      class SubTestClass extends SuperTestClass {}

      AnyDecoratorHelper.setClassConfig(SuperTestClass, 'testConfigKey', { a: 1 })
      AnyDecoratorHelper.setClassConfig(SubTestClass, 'testConfigKey', { b: 2 })

      expect(AnyDecoratorHelper.getClassConfig(new SubTestClass(), 'testConfigKey')).toEqual({ b: 2 })
    })
  })

  describe('setFieldConfig', () => {
    it('should set a field configuration', () => {
      class TestClass {}
      AnyDecoratorHelper.setFieldConfig(TestClass, 'testField', 'testFieldConfigKey', 'testValue')
      expect(Reflect.get(TestClass, 'testFieldConfigKey[testField]')).toBe('testValue')
    })
  })

  describe('getFieldConfig', () => {
    it('should get a field configuration', () => {
      class TestClass {}
      AnyDecoratorHelper.setFieldConfig(TestClass.prototype, 'testField', 'testFieldConfigKey', 'testValue')
      expect(AnyDecoratorHelper.getFieldConfig(new TestClass(), 'testField', 'testFieldConfigKey')).toBe('testValue')
    })

    it('should get a default value if not found', () => {
      class TestClass {}
      expect(AnyDecoratorHelper.getFieldConfig(new TestClass(), 'nonExistentField', 'testFieldConfigKey')).toBeUndefined()
    })

    it('should merge configurations from super classes', () => {
      class SuperTestClass {}
      class SubTestClass extends SuperTestClass {}

      AnyDecoratorHelper.setFieldConfig(SuperTestClass.prototype, 'testField', 'testFieldConfigKey', { a: 1 })
      AnyDecoratorHelper.setFieldConfig(SubTestClass.prototype, 'testField', 'testFieldConfigKey', { b: 2 })

      expect(AnyDecoratorHelper.getFieldConfig(SubTestClass, 'testField', 'testFieldConfigKey')).toEqual({ b: 2 })
    })
  })

  describe('getFieldList', () => {
    it('should get a list of fields with decorators', () => {
      class TestClass {}
      AnyDecoratorHelper.setFieldConfig(TestClass.prototype, 'field1', 'testFieldConfigKey', 'value1')
      AnyDecoratorHelper.setFieldConfig(TestClass.prototype, 'field2', 'testFieldConfigKey', 'value2')

      expect(AnyDecoratorHelper.getFieldList(new TestClass(), 'testFieldConfigKey')).toEqual(['field1', 'field2'])
    })

    it('should include fields from super classes', () => {
      class SuperTestClass {}
      class SubTestClass extends SuperTestClass {}

      AnyDecoratorHelper.setFieldConfig(SuperTestClass.prototype, 'field1', 'testFieldConfigKey', 'value1')
      AnyDecoratorHelper.setFieldConfig(SubTestClass.prototype, 'field2', 'testFieldConfigKey', 'value2')

      expect(AnyDecoratorHelper.getFieldList(new SubTestClass(), 'testFieldConfigKey')).toEqual(['field1', 'field2'])
    })
  })

  describe('getFieldConfigList', () => {
    it('should get a list of field configurations', () => {
      class TestClass {}
      AnyDecoratorHelper.setFieldConfig(TestClass.prototype, 'field1', 'testFieldConfigKey', 'value1')
      AnyDecoratorHelper.setFieldConfig(TestClass.prototype, 'field2', 'testFieldConfigKey', 'value2')

      const result = AnyDecoratorHelper.getFieldConfigList<string>(new TestClass(), 'testFieldConfigKey')
      expect(result).toEqual({ field1: 'value1', field2: 'value2' })
    })
  })

  describe('getFieldConfigValue', () => {
    it('should get a specific field configuration value', () => {
      class TestClass {}
      AnyDecoratorHelper.setFieldConfig(TestClass.prototype, 'testField', 'testFieldConfigKey', { a: 1, b: 2 })

      expect(AnyDecoratorHelper.getFieldConfigValue(new TestClass(), 'testFieldConfigKey', 'testField', 'a')).toBe(1)
    })

    it('should get a value from super classes', () => {
      class SuperTestClass {}
      class SubTestClass extends SuperTestClass {}

      AnyDecoratorHelper.setFieldConfig(SuperTestClass, 'testField', 'testFieldConfigKey', { a: 1 })
      AnyDecoratorHelper.setFieldConfig(SubTestClass, 'testField', 'testFieldConfigKey', { b: 2 })

      expect(AnyDecoratorHelper.getFieldConfigValue(SubTestClass, 'testFieldConfigKey', 'testField', 'a')).toBe(1)
    })
  })
})
