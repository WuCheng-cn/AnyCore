# UI组件API

AnyCore框架提供了一系列UI交互组件，用于处理DOM元素的交互控制。本章节将详细介绍各个UI组件的使用方法和参数说明。

## AnyElementResizer

`AnyElementResizer`是元素缩放控制器，用于为HTML元素添加8个方向的拖拽缩放功能。

### 功能特性

- **8方向缩放**：支持4个边和4个角的拖拽缩放
- **边界限制**：支持最小尺寸和边界距离限制
- **平滑过渡**：缩放过程中禁用过渡效果，缩放完成后恢复
- **事件处理**：完整的鼠标事件处理机制

### 构造函数

```typescript
constructor(element: HTMLElement)
```

**说明**：创建元素缩放控制器实例。

**参数**：
- `element`：需要添加缩放控制的HTML元素

**示例**：

```typescript
const element = document.getElementById('myElement')
const resizer = new AnyElementResizer(element)
```

### 配置参数

`AnyElementResizer`支持以下配置参数：

```typescript
config = {
  minWidth: 400,           // 最小宽度（像素）
  minHeight: 270,          // 最小高度（像素）
  minDistanceToClient: 10  // 最小边界距离（像素）
}
```

**说明**：可以通过修改实例的config属性来自定义配置。

**示例**：

```typescript
const resizer = new AnyElementResizer(element)
resizer.config.minWidth = 300
resizer.config.minHeight = 200
```

### 缩放控制点

`AnyElementResizer`会自动为目标元素添加8个控制点：

- **左侧中点** (`w-resize`) - 水平缩放
- **右侧中点** (`e-resize`) - 水平缩放
- **顶部中点** (`n-resize`) - 垂直缩放
- **底部中点** (`s-resize`) - 垂直缩放
- **左上角** (`nw-resize`) - 对角缩放
- **右上角** (`ne-resize`) - 对角缩放
- **左下角** (`sw-resize`) - 对角缩放
- **右下角** (`se-resize`) - 对角缩放

### 使用示例

#### 基本用法

```typescript
// 获取目标元素
const element = document.getElementById('resizable-element')

// 创建缩放控制器
const resizer = new AnyElementResizer(element)

// 自定义配置
resizer.config.minWidth = 300
resizer.config.minHeight = 200
```

#### 动态启用/禁用

```typescript
// 临时移除所有控制点（禁用缩放）
function disableResize() {
  const controllers = element.querySelectorAll('div')
  controllers.forEach(controller => controller.remove())
}

// 重新创建控制点（启用缩放）
function enableResize() {
  // 需要重新创建实例
  const resizer = new AnyElementResizer(element)
}
```

### 注意事项

1. **元素定位**：目标元素需要使用相对定位或绝对定位
2. **过渡效果**：缩放过程中会禁用过渡效果，缩放完成后恢复
3. **边界约束**：缩放会受到浏览器窗口边界的限制
4. **性能考虑**：频繁的缩放操作可能会影响性能，建议合理使用

### 兼容性

- **浏览器支持**：支持所有现代浏览器（Chrome、Firefox、Safari、Edge）
- **移动端**：目前主要针对桌面端设计，移动端支持有限

### 相关方法

#### 私有方法（内部使用）

- `createController(cssText: string, listener: EventListener)`：创建控制点元素
- `startResize(e: MouseEvent)`：开始缩放操作
- `mousemove(e: MouseEvent)`：处理鼠标移动
- `mouseup()`：结束缩放操作

这些方法主要用于内部实现，通常不需要直接调用。