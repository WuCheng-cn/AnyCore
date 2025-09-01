/**
 * # 元素缩放控制器
 * 对传入元素添加缩放控制器，支持8个方向的拖拽缩放
 *
 * @description
 * 该类为HTML元素添加8个方向的缩放控制点（4个边和4个角），
 * 通过鼠标拖拽实现元素的动态缩放，并包含边界限制功能
 *
 * @example
 * ```typescript
 * const element = document.getElementById('myElement')
 * const resizeController = new AnyResizeControllerHelper(element)
 * ```
 */
export class AnyResizeControllerHelper {
  /** 目标元素 */
  element: HTMLElement

  /** 初始化状态，记录鼠标起始位置和元素尺寸信息 */
  initStatus = {
    mouseStartX: 0,
    mouseStartY: 0,
    elementWidth: 0,
    elementHeight: 0,
    elementLeft: 0,
    elementTop: 0,
    elementRight: 0,
    elementBottom: 0,
    transition: '',
  }

  /** 配置参数，包含最小尺寸和边界距离限制 */
  config = {
    minWidth: 400,
    minHeight: 270,
    minDistanceToClient: 10,
  }

  /** 当前正在拖拽的控制器元素 */
  currentController: HTMLElement | null = null

  /**
   * 构造函数
   * @param element - 需要添加缩放控制的HTML元素
   */
  constructor(element: HTMLElement) {
    this.element = element

    // 定义8个控制点的样式和对应的拖拽处理函数
    const controllers = [
      // 左侧中点 - 水平缩放
      { cssText: `position: absolute; width: 10px; height: 100%; left: -5px; top: 0; cursor: w-resize;`, listener: this.startResize },
      // 右侧中点 - 水平缩放
      { cssText: `position: absolute; width: 10px; height: 100%; right: -5px; top: 0; cursor: e-resize;`, listener: this.startResize },
      // 顶部中点 - 垂直缩放
      { cssText: `position: absolute; width: 100%; height: 10px; left: 0; top: -5px; cursor: n-resize;`, listener: this.startResize },
      // 底部中点 - 垂直缩放
      { cssText: `position: absolute; width: 100%; height: 10px; left: 0; bottom: -5px; cursor: s-resize;`, listener: this.startResize },
      // 左上角 - 对角缩放
      { cssText: `position: absolute; width: 10px; height: 10px; left: -5px; top: -5px; cursor: nw-resize;`, listener: this.startResize },
      // 右上角 - 对角缩放
      { cssText: `position: absolute; width: 10px; height: 10px; right: -5px; top: -5px; cursor: ne-resize;`, listener: this.startResize },
      // 左下角 - 对角缩放
      { cssText: `position: absolute; width: 10px; height: 10px; left: -5px; bottom: -5px; cursor: sw-resize;`, listener: this.startResize },
      // 右下角 - 对角缩放
      { cssText: `position: absolute; width: 10px; height: 10px; right: -5px; bottom: -5px; cursor: se-resize;`, listener: this.startResize },
    ]

    // 创建所有控制点并添加到目标元素
    for (const controller of controllers) {
      this.createController(controller.cssText, controller.listener as EventListener)
    }
  }

  private createController(cssText: string, listener: EventListener) {
    const controller = document.createElement('div')
    controller.style.cssText = cssText
    controller.addEventListener('mousedown', listener)
    this.element.appendChild(controller)
  }

  private startResize = (e: MouseEvent) => {
    e.preventDefault()
    this.currentController = e.target as HTMLElement

    const { clientX, clientY } = e
    const { offsetWidth, offsetHeight } = this.element
    const { left, top } = this.element.getBoundingClientRect()
    const elementRight = document.documentElement.clientWidth - left - offsetWidth
    const elementBottom = document.documentElement.clientHeight - top - offsetHeight
    const transition = this.element.style.transition

    Object.assign(this.initStatus, {
      mouseStartX: clientX,
      mouseStartY: clientY,
      elementWidth: offsetWidth,
      elementHeight: offsetHeight,
      elementLeft: left,
      elementTop: top,
      elementRight,
      elementBottom,
      transition,
    })

    this.element.style.transition = 'unset'
    document.addEventListener('mousemove', this.mousemove)
    document.addEventListener('mouseup', this.mouseup)
  }

  private mousemove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    const {
      mouseStartX,
      mouseStartY,
      elementWidth,
      elementHeight,
      elementTop,
      elementLeft,
      elementRight,
      elementBottom,
    } = this.initStatus
    const moveX = clientX - mouseStartX
    const moveY = clientY - mouseStartY
    const documentWidth = document.documentElement.clientWidth
    const documentHeight = document.documentElement.clientHeight

    const getClampedWidth = (width: number, distanceToClient: number) => {
      const minWidth = this.config.minWidth
      const maxWidth = documentWidth - distanceToClient - this.config.minDistanceToClient
      return Math.min(Math.max(width, minWidth), maxWidth)
    }

    const getClampedHeight = (height: number, distanceToClient: number) => {
      const minHeight = this.config.minHeight
      const maxHeight = documentHeight - distanceToClient - this.config.minDistanceToClient
      return Math.min(Math.max(height, minHeight), maxHeight)
    }

    const getClampedDistance = (distance: number, fixedDistance: number) => {
      return Math.max(Math.min(distance, fixedDistance), this.config.minDistanceToClient)
    }

    let cssText = ''
    switch (this.currentController?.style.cursor) {
      case 'w-resize':
        cssText = `
        width: ${getClampedWidth(elementWidth - moveX, elementRight)}px;
        height: ${elementHeight}px;
        top: ${elementTop}px;
        left: ${getClampedDistance(elementLeft + moveX, documentWidth - this.config.minWidth - elementRight)}px;
        right:${elementRight}px;
        bottom:${elementBottom}px;
        transition: unset;
      `
        break
      case 'e-resize':
        cssText = `
        width: ${getClampedWidth(elementWidth + moveX, elementLeft)}px;
        height: ${elementHeight}px;
        top: ${elementTop}px;
        left: ${elementLeft}px;
        right:${getClampedDistance(elementRight - moveX, documentWidth - this.config.minWidth - elementLeft)}px;
        bottom:${elementBottom}px;
        transition: unset;
      `
        break
      case 'n-resize':
        cssText = `
        width: ${elementWidth}px;
        height: ${getClampedHeight(elementHeight - moveY, elementBottom)}px;
        top: ${getClampedDistance(elementTop + moveY, documentHeight - this.config.minHeight - elementBottom)}px;
        left: ${elementLeft}px;
        right:${elementRight}px;
        bottom:${elementBottom}px;
        transition: unset;
      `
        break
      case 's-resize':
        cssText = `
        width: ${elementWidth}px;
        height: ${getClampedHeight(elementHeight + moveY, elementTop)}px;
        top: ${elementTop}px;
        left: ${elementLeft}px;
        right:${elementRight}px;
        bottom:${getClampedDistance(elementBottom - moveY, documentHeight - this.config.minHeight - elementTop)}px;
        transition: unset;
      `
        break
      case 'nw-resize':
        cssText = `
        width: ${getClampedWidth(elementWidth - moveX, elementRight)}px;
        height: ${getClampedHeight(elementHeight - moveY, elementBottom)}px;
        top: ${getClampedDistance(elementTop + moveY, documentHeight - this.config.minHeight - elementBottom)}px;
        left: ${getClampedDistance(elementLeft + moveX, documentWidth - this.config.minWidth - elementRight)}px;
        right:${elementRight}px;
        bottom:${elementBottom}px;
        transition: unset;
      `
        break
      case 'ne-resize':
        cssText = `
        width: ${getClampedWidth(elementWidth + moveX, elementLeft)}px;
        height: ${getClampedHeight(elementHeight - moveY, elementBottom)}px;
        top: ${getClampedDistance(elementTop + moveY, documentHeight - this.config.minHeight - elementBottom)}px;
        left: ${elementLeft}px;
        right:${getClampedDistance(elementRight - moveX, documentWidth - this.config.minWidth - elementLeft)}px;
        bottom:${elementBottom}px;
        transition: unset;
      `
        break
      case 'sw-resize':
        cssText = `
        width: ${getClampedWidth(elementWidth - moveX, elementRight)}px;
        height: ${getClampedHeight(elementHeight + moveY, elementTop)}px;
        top: ${elementTop}px;
        left: ${getClampedDistance(elementLeft + moveX, documentWidth - this.config.minWidth - elementRight)}px;
        right:${elementRight}px;
        bottom:${getClampedDistance(elementBottom - moveY, documentHeight - this.config.minHeight - elementTop)}px;
        transition: unset;
      `
        break
      case 'se-resize':
        cssText = `
        width: ${getClampedWidth(elementWidth + moveX, elementLeft)}px;
        height: ${getClampedHeight(elementHeight + moveY, elementTop)}px;
        top: ${elementTop}px;
        left: ${elementLeft}px;
        right:${getClampedDistance(elementRight - moveX, documentWidth - this.config.minWidth - elementLeft)}px;
        bottom:${getClampedDistance(elementBottom - moveY, documentHeight - this.config.minHeight - elementTop)}px;
        transition: unset;
      `
        break
      default:
        break
    }

    this.element.style.cssText = cssText
  }

  /**
   * 结束缩放操作
   * @description
   * 恢复元素的过渡效果，移除鼠标事件监听器
   */
  private mouseup = () => {
    // 恢复原始过渡效果
    this.element.style.transition = this.initStatus.transition

    // 移除事件监听器
    document.removeEventListener('mousemove', this.mousemove)
    document.removeEventListener('mouseup', this.mouseup)
  }
}
