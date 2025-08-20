# 快速开始

本指南将帮助你快速上手AnyCore框架，了解其基本概念和使用方法。

## 安装

使用npm、yarn或pnpm安装AnyCore：

```bash
# 使用npm
npm install any-core

# 使用yarn
yarn add any-core

# 使用pnpm
pnpm add any-core
```

## 基础概念

AnyCore是一个基于装饰器语法的快速开发框架核心包，主要通过装饰器对实体类的属性进行标记配置，实现与组件的自动化集成。

主要功能模块包括：

- **装饰器模块**：提供各种装饰器用于标记和配置类和字段
- **辅助函数模块**：提供各种工具函数用于数据处理和转换
- **模型模块**：提供基础模型类，包含通用操作方法
- **接口和枚举**：定义框架中使用的各种接口和枚举类型

## 创建第一个实体类

下面是一个简单的示例，展示如何创建一个带有装饰器的实体类：

```typescript
import { AnyBaseModel } from 'any-core'
import { CustomField, FormField, TableField } from 'any-core/decorator'
import { EFormItemType } from 'any-core/enum'

class User extends AnyBaseModel {
  @FormField({ formType: EFormItemType.INPUT, label: '用户名' })
  @TableField({ label: '用户名', width: 120 })
  username: string

  @FormField({ formType: EFormItemType.PASSWORD, label: '密码' })
  password: string

  @FormField({ formType: EFormItemType.SELECT, label: '用户角色', options: [{ label: '管理员', value: 'admin' }, { label: '普通用户', value: 'user' }] })
  @TableField({ label: '用户角色', width: 100 })
  @CustomField('用户角色')
  role: string

  @FormField({ formType: EFormItemType.DATE_PICKER, label: '创建时间' })
  @TableField({ label: '创建时间', width: 180 })
  createTime: string
}
```

## 使用实体类

创建实体类后，你可以使用AnyCore提供的方法获取配置信息并用于组件渲染：

```typescript
// 获取表单字段配置
const user = new User()
const formConfig = user.getFormFieldConfigObj()
const formLabels = Object.keys(formConfig).map(field => user.getFormFieldLabel(field))

// 获取表格字段配置
const tableConfig = user.getTableFieldConfigObj()
const tableLabels = Object.keys(tableConfig).map(field => user.getTableFieldLabel(field))
```

## 下一步

- 查看[API文档](/api/)了解更多详细信息
- 查看[使用示例](/examples/basic-usage)了解实际应用场景
