

# any-core

any-core is a foundational library that provides automated component rendering capabilities. By using decorators to mark and configure properties of entity classes, it enables automated integration with components. It is suitable for rapidly building common UI components such as forms, tables, and search interfaces.

## Key Features

- **Decorator Support**: Provides various decorators for marking property configurations, including:
  - `@CustomField`: Custom field marker.
  - `@FormField`: Used for form field configurations (supports types such as input and checkbox).
  - `@SearchField`: Used for search field configurations.
  - `@TableField`: Used for table field configurations.

- **Data Model Support**: Offers base model classes (e.g., `AnyBaseModel`) and dictionary model classes to facilitate the construction of structured data.

- **Utility Classes**: Includes practical tools for date handling, file operations, data conversion, validators, and more.

## Installation

Install using pnpm:

```bash
pnpm install any-core
```

## Usage Examples

### Using `@FormField` to Build Form Fields

```ts
import { FormField } from 'any-core';
import { EFormItemType } from 'any-core';

class TestClass extends AnyBaseModel {
  @FormField({
    formType: EFormItemType.INPUT,
    label: 'Test Field',
    required: true,
  })
  test?: string;

  @FormField({
    formType: EFormItemType.CHECKBOX,
    label: 'Test Checkbox',
    required: true,
  })
  test2?: string;
}
```

### Using `@TableField` to Build Table Fields

```ts
import { TableField } from 'any-core';

class TestClass {
  @TableField({ label: 'Test Field' })
  test?: string;

  @TableField({ label: 'Test Field 2' })
  test2?: string;
}
```

## Contributions

Pull Requests and Issues are welcome. Please follow the project's coding conventions and provide clear commit messages.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.