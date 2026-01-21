import { EDateFormatType } from '../enum/EDateFormatType'

/**
 * # 日期时间处理工具类
 *
 * @description
 * 提供日期时间的格式化、解析、时间戳获取和相对时间文本生成等功能
 * 支持多种输入格式（Date对象、时间戳、字符串）和丰富的输出格式
 *
 * @example
 * ```typescript
 * // 格式化当前时间
 * const formatted = AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM_DD_HH_MM_SS)
 *
 * // 获取相对时间文本
 * const timeText = AnyDateTimeHelper.getTimeText('2024-01-01')
 *
 * // 获取时间戳
 * const timestamp = AnyDateTimeHelper.getTime('2024-01-01 12:00:00')
 * ```
 */
export class AnyDateTimeHelper {
  /** ISO 8601 格式日期正则表达式：YYYY-MM-DDTHH:MM:SS */
  private static readonly ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/

  /** 本地日期格式正则表达式：YYYY-MM-DD HH:MM:SS */
  private static readonly LOCAL_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/

  /** 时间格式正则表达式：HH:MM 或 HH:MM:SS */
  private static readonly TIME_ONLY_REGEX = /^(\d{2})[:\-](\d{2})(?:[:\-](\d{2}))?$/

  /**
   * 格式化日期时间为指定格式字符串
   * @param date - 需要格式化的日期时间，支持 Date 对象、时间戳、字符串
   * @param fmt - 目标格式，默认为 YYYY-MM-DD HH:MM:SS
   * @returns 格式化后的日期时间字符串，输入无效时返回空字符串
   *
   * @example
   * ```typescript
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM_DD) // '2024-01-01'
   * AnyDateTimeHelper.format(1704067200000, EDateFormatType.HH_MM_SS) // '12:00:00'
   * ```
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

    // 替换年份占位符（支持 YYYY 格式）
    if (/Y+/.test(str)) {
      str = str.replace('YYYY', `${parsedDate.getFullYear()}`)
    }

    // 替换其他占位符（月、日、时、分、秒）
    const replacements: Record<string, () => string> = {
      'M+': () => this.padZero(parsedDate.getMonth() + 1), // 月份从0开始，需要+1
      'D+': () => this.padZero(parsedDate.getDate()),
      'H+': () => this.padZero(parsedDate.getHours()),
      'm+': () => this.padZero(parsedDate.getMinutes()),
      's+': () => this.padZero(parsedDate.getSeconds()),
    }

    // 应用所有占位符替换
    for (const key in replacements) {
      const reg = new RegExp(`(${key})`)
      if (reg.test(str)) {
        str = str.replace(reg, replacements[key]())
      }
    }

    return str
  }

  /**
   * 解析各种格式的日期时间输入为 Date 对象
   * @param input - 需要解析的日期时间输入
   * @returns 解析后的 Date 对象，解析失败时返回 null
   *
   * @description
   * 支持多种输入格式：
   * - Date 对象：直接返回
   * - 时间戳：转换为 Date
   * - ISO 格式：2024-01-01T12:00:00
   * - 本地格式：2024-01-01 12:00:00
   * - 时间格式：12:00 或 12:00:00（使用当前日期）
   * - 其他字符串：尝试标准解析
   */
  private static parseDate(input: Date | number | string): Date | null {
    try {
      if (typeof input === 'number') {
        // 时间戳直接转换为 Date
        return new Date(input)
      }
      else if (typeof input === 'string') {
        input = input.trim()
        // ISO 8601 格式
        if (this.ISO_DATE_REGEX.test(input)) {
          return new Date(input)
        }
        // 本地日期时间格式
        else if (this.LOCAL_DATE_REGEX.test(input)) {
          return new Date(input.replace(/-/g, '/'))
        }
        // 纯时间格式
        else if (this.TIME_ONLY_REGEX.test(input)) {
          const now = new Date()
          const dateString = `${now.getFullYear()}-${this.padZero(now.getMonth() + 1)}-${this.padZero(now.getDate())}`
          return new Date(`${dateString} ${input}`)
        }
        // 其他格式尝试标准解析
        else {
          const parsed = new Date(input)
          return Number.isNaN(parsed.getTime()) ? null : parsed // 检查是否为有效日期
        }
      }
      else if (input instanceof Date) {
        // Date 对象直接返回
        return input
      }
      return null
    }
    catch (error) {
      console.error('Error parsing date:', error)
      return null
    }
  }

  /**
   * 数字补零处理，确保个位数前面有0
   * @param value - 需要补零的数字
   * @returns 补零后的字符串（如 1 → '01'，12 → '12'）
   */
  private static padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`
  }

  /**
   * 获取日期时间的时间戳（毫秒）
   * @param date - 需要获取时间戳的日期时间
   * @returns 时间戳（毫秒），输入无效时返回 NaN
   *
   * @example
   * ```typescript
   * AnyDateTimeHelper.getTime(new Date()) // 1704067200000
   * AnyDateTimeHelper.getTime('2024-01-01') // 1704067200000
   * ```
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
   * 根据当前时间生成相对时间文本描述
   * @param date - 需要计算相对时间的日期时间
   * @returns 友好的相对时间文本（如 '2小时前'、'刚刚'、'未来时间'）
   *
   * @description
   * 计算输入时间与当前时间的差值，返回人性化的文本描述：
   * - 小于1秒：刚刚
   * - 小于1分钟：X秒前
   * - 小于1小时：X分钟前
   * - 小于1天：X小时前
   * - 小于1周：X天前
   * - 小于1月：X周前
   * - 小于1年：X月前
   * - 大于1年：X年前
   * - 未来时间：未来时间
   *
   * @example
   * ```typescript
   * AnyDateTimeHelper.getTimeText('2024-01-01') // '30天前'
   * AnyDateTimeHelper.getTimeText(Date.now() - 60000) // '1分钟前'
   * ```
   */
  static getTimeText(date: Date | number | string): string {
    const time = this.getTime(date)
    if (Number.isNaN(time)) {
      return '无效时间'
    }

    const now = new Date().getTime()
    const diff = now - time

    // 计算各种时间单位的差值
    const day = Math.abs(diff / (24 * 60 * 60 * 1000))
    const hour = Math.abs(diff / (60 * 60 * 1000))
    const minute = Math.abs(diff / (60 * 1000))
    const second = Math.abs(diff / 1000)

    // 处理未来时间
    if (diff < 0) {
      return '未来时间'
    }

    // 根据时间差值返回相应的文本描述
    if (day >= 365) {
      return `${Math.floor(day / 365)}年前`
    }
    else if (day >= 30) {
      return `${Math.floor(day / 30)}月前`
    }
    else if (day >= 7) {
      return `${Math.floor(day / 7)}周前`
    }
    else if (day >= 1) {
      return `${Math.floor(day)}天前`
    }
    else if (hour >= 1) {
      return `${Math.floor(hour)}小时前`
    }
    else if (minute >= 1) {
      return `${Math.floor(minute)}分钟前`
    }
    else if (second >= 1) {
      return `${Math.floor(second)}秒前`
    }
    else {
      return '刚刚'
    }
  }
}
