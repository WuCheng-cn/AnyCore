import { EDateFormatType } from '../enum/EDateFormatType'

/**
 * 时间处理工具类
 */
export class AnyDateTimeHelper {
  private static readonly ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/
  private static readonly LOCAL_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/
  private static readonly TIME_ONLY_REGEX = /^(\d{2})\{:|-\}(\d{2})(?:\{:|-\}(\d{2}))?$/

  /**
   * 格式化时间
   * @param date 时间
   * @param fmt 格式
   * @returns 格式化后的时间
   */
  static format(date: Date | number | string, fmt: EDateFormatType = EDateFormatType.YYYY_MM_DD_HH_MM_SS): string {
    if (!date) {
      return ''
    }

    const parsedDate = this.parseDate(date)
    if (parsedDate === null) {
      return '' // 输入无效时返回空字符串
    }

    let str = fmt.toString()

    // 替换年份占位符
    if (/Y+/.test(str)) {
      str = str.replace('YYYY', `${parsedDate.getFullYear()}`)
    }

    // 替换其他占位符
    const replacements: Record<string, () => string> = {
      'M+': () => this.padZero(parsedDate.getMonth() + 1),
      'D+': () => this.padZero(parsedDate.getDate()),
      'H+': () => this.padZero(parsedDate.getHours()),
      'm+': () => this.padZero(parsedDate.getMinutes()),
      's+': () => this.padZero(parsedDate.getSeconds()),
    }

    for (const key in replacements) {
      const reg = new RegExp(`(${key})`)
      if (reg.test(str)) {
        str = str.replace(reg, replacements[key]())
      }
    }

    return str
  }

  /**
   * # 解析日期
   */
  private static parseDate(input: Date | number | string): Date | null {
    try {
      if (typeof input === 'number') {
        return new Date(input)
      }
      else if (typeof input === 'string') {
        if (this.ISO_DATE_REGEX.test(input)) {
          return new Date(input)
        }
        else if (this.LOCAL_DATE_REGEX.test(input)) {
          return new Date(input.replace(/-/g, '/'))
        }
        else if (this.TIME_ONLY_REGEX.test(input)) {
          return new Date(`${new Date().toLocaleDateString()} ${input}`)
        }
        else {
          const parsed = new Date(input)
          return Number.isNaN(parsed.getTime()) ? null : parsed // 检查是否为有效日期
        }
      }
      else if (input instanceof Date) {
        return input
      }
      return null
    }
    catch (error) {
      console.error('Error parsing date:', error)
      return null
    }
  }

  private static padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`
  }

  /**
   * 获取时间戳
   * @param date 时间
   * @returns 时间戳
   */
  static getTime(date: Date | number | string): number {
    try {
      const parsedDate = this.parseDate(date)
      if (parsedDate === null) {
        return Number.NaN // 输入无效时返回NaN
      }
      return parsedDate.getTime()
    }
    catch (error) {
      console.error('Error getting timestamp:', error)
      return Number.NaN
    }
  }

  /**
   * 根据当前时间返回文本
   * @param date 时间
   * @returns 文本
   */
  static getTimeText(date: Date | number | string): string {
    const time = this.getTime(date)
    if (Number.isNaN(time)) {
      return '无效时间'
    }
    const now = new Date().getTime()
    const diff = now - time
    const day = Math.abs(diff / (24 * 60 * 60 * 1000))
    const hour = Math.abs(diff / (60 * 60 * 1000))
    const minute = Math.abs(diff / (60 * 1000))
    const second = Math.abs(diff / 1000)

    if (diff < 0) {
      return '未来时间'
    }

    if (day > 365) {
      return `${Math.floor(day / 365)}年前`
    }
    else if (day > 30) {
      return `${Math.floor(day / 30)}月前`
    }
    else if (day > 7) {
      return `${Math.floor(day / 7)}周前`
    }
    else if (day > 1) {
      return `${Math.floor(day)}天前`
    }
    else if (hour > 1) {
      return `${Math.floor(hour)}小时前`
    }
    else if (minute > 1) {
      return `${Math.floor(minute)}分钟前`
    }
    else if (second > 1) {
      return `${Math.floor(second)}秒前`
    }
    else {
      return '刚刚'
    }
  }
}
