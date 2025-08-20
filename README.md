# any-core

any-core 是一个提供自动化组件渲染能力的基础库，通过装饰器对 entity class 的属性进行标记配置，实现与组件的自动化集成。适用于快速构建表单、表格、搜索等常见 UI 组件。

## 主要功能

- **装饰器支持**：提供多种装饰器用于标记属性配置，包括：
  - `@CustomField`：自定义字段标记。
  - `@FormField`：用于表单字段配置（支持输入、复选框等类型）。
  - `@SearchField`：用于搜索字段配置。
  - `@TableField`：用于表格字段配置。

- **数据模型支持**：提供基础模型类（如 `AnyBaseModel`）和字典模型类，便于构建结构化数据。

- **辅助工具类**：包含日期处理、文件操作、数据转换、验证器等实用工具。

## 安装

使用 pnpm 安装：

```bash
pnpm install any-core
```

## 使用示例

### 使用 `@FormField` 构建表单字段

```ts
import { FormField } from 'any-core';
import { EFormItemType } from 'any-core';

class TestClass extends AnyBaseModel {
  @FormField({
    formType: EFormItemType.INPUT,
    label: '测试字段',
    required: true,
  })
  test?: string;

  @FormField({
    formType: EFormItemType.CHECKBOX,
    label: '测试复选框',
    required: true,
  })
  test2?: string;
}
```

### 使用 `@TableField` 构建表格字段

```ts
import { TableField } from 'any-core';

class TestClass {
  @TableField({ label: '测试字段' })
  test?: string;

  @TableField({ label: '测试字段2' })
  test2?: string;
}
```

## 贡献

欢迎提交 Pull Request 或 Issue。请遵循项目代码规范并编写清晰的提交信息。

## 许可证

该项目基于 MIT 许可证。详见 [LICENSE](LICENSE) 文件。