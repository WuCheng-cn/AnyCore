# anyThing食用指南

<font style="color: red">首先，位于anyThing目录下的文件一定不要乱动！！！</font>

## 一、装饰器 <font size="2">(通过数据反射（reflect）给 entity class 的属性标记配置，后续将 entity class 传入对应组件，实现自动化组件渲染)</font>

注*：装饰其可传入的具体配置请自行查看

### 1. [@CustomField](./decorator/CustomField.ts)

- 用于标记属性字段中文名称和字段的枚举字典。
- 在组件渲染时会将此属性作为自定义字段渲染。
- 取值优先级：组件类型装饰器配置的label > @CustomField配置的中文名 > 字段名
- 配置了字典属性后，在组件（表单、搜索表单、表格）渲染时会用字典值渲染。

### 2. [@FormField](./decorator/FormField.ts)（[查看配置](./interface/IFormFieldConfig.ts)）

- 用于标记属性字段是否为表单字段。

### 3. [@SearchField](./decorator/SearchField.ts)（[查看配置](./interface/ISearchFieldConfig.ts)）

- 用于标记属性字段是否为搜索字段。
- 注*：实际的渲染配置依赖@FormField的配置。

### 4. [@TableField](./decorator/TableField.ts)（[查看配置](./interface/ITableFieldConfig.ts)）

- 用于标记属性字段是否为表格字段。
