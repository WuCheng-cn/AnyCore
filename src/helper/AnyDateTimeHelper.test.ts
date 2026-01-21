import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { EDateFormatType } from '../enum/EDateFormatType'
import { AnyDateTimeHelper } from './AnyDateTimeHelper'

describe('anyDateTimeHelper', () => {
  // 保存原始 Date 构造函数
  let OriginalDate: typeof Date

  beforeEach(() => {
    OriginalDate = globalThis.Date
  })

  afterEach(() => {
    globalThis.Date = OriginalDate
    vi.restoreAllMocks()
  })

  describe('format', () => {
    it('应该正确格式化 Date 对象为默认格式', () => {
      const date = new Date('2024-01-15T12:30:45')
      const result = AnyDateTimeHelper.format(date)
      expect(result).toBe('2024-01-15 12:30:45')
    })

    it('应该支持不同的日期格式', () => {
      const date = new Date('2024-01-15T12:30:45')

      expect(AnyDateTimeHelper.format(date, EDateFormatType.YYYY_MM_DD)).toBe('2024-01-15')
      expect(AnyDateTimeHelper.format(date, EDateFormatType.YYYY_MM)).toBe('2024-01')
      expect(AnyDateTimeHelper.format(date, EDateFormatType.YYYY)).toBe('2024')
      expect(AnyDateTimeHelper.format(date, EDateFormatType.HH_MM_SS)).toBe('12:30:45')
      expect(AnyDateTimeHelper.format(date, EDateFormatType.HH_MM)).toBe('12:30')
    })

    it('应该支持中文日期格式', () => {
      const date = new Date('2024-01-15T12:30:45')

      expect(AnyDateTimeHelper.format(date, EDateFormatType.YYYY_MM_DD_HH_MM_SS_CN)).toBe('2024年01月15日 12时30分45秒')
      expect(AnyDateTimeHelper.format(date, EDateFormatType.YYYY_MM_DD_CN)).toBe('2024年01月15日')
      expect(AnyDateTimeHelper.format(date, EDateFormatType.HH_MM_SS_CN)).toBe('12时30分45秒')
    })

    it('应该支持斜杠日期格式', () => {
      const date = new Date('2024-01-15T12:30:45')

      expect(AnyDateTimeHelper.format(date, EDateFormatType.YYYY_MM_DD_SLASH)).toBe('2024/01/15')
      expect(AnyDateTimeHelper.format(date, EDateFormatType.YYYY_MM_DD_HH_MM_SS_SLASH)).toBe('2024/01/15 12:30:45')
    })

    it('应该支持时间戳输入', () => {
      const timestamp = new Date('2024-01-15T12:30:45').getTime()
      const result = AnyDateTimeHelper.format(timestamp, EDateFormatType.YYYY_MM_DD)
      expect(result).toBe('2024-01-15')
    })

    it('应该支持字符串输入', () => {
      expect(AnyDateTimeHelper.format('2024-01-15T12:30:45', EDateFormatType.YYYY_MM_DD)).toBe('2024-01-15')
      expect(AnyDateTimeHelper.format('2024-01-15 12:30:45', EDateFormatType.YYYY_MM_DD)).toBe('2024-01-15')
      expect(AnyDateTimeHelper.format('2024-01-15T12:30:45', EDateFormatType.HH_MM_SS)).toBe('12:30:45')
    })

    it('应该处理无效输入', () => {
      expect(AnyDateTimeHelper.format('')).toBe('')
      expect(AnyDateTimeHelper.format('invalid-date')).toBe('')
      // @ts-expect-error - 测试边界情况
      expect(AnyDateTimeHelper.format(null)).toBe('')
      // @ts-expect-error - 测试边界情况
      expect(AnyDateTimeHelper.format(undefined)).toBe('')
    })

    it('应该正确处理月份和日期的补零', () => {
      const date = new Date('2024-09-05T08:07:06')
      const result = AnyDateTimeHelper.format(date, EDateFormatType.YYYY_MM_DD_HH_MM_SS)
      expect(result).toBe('2024-09-05 08:07:06')
    })
  })

  describe('getTime', () => {
    it('应该从 Date 对象获取时间戳', () => {
      const date = new Date('2024-01-15T12:30:45')
      const result = AnyDateTimeHelper.getTime(date)
      expect(result).toBe(date.getTime())
    })

    it('应该从时间戳获取时间戳', () => {
      const timestamp = 1705314645000
      const result = AnyDateTimeHelper.getTime(timestamp)
      expect(result).toBe(timestamp)
    })

    it('应该从字符串获取时间戳', () => {
      const dateStr = '2024-01-15T12:30:45'
      const expected = new Date(dateStr).getTime()
      const result = AnyDateTimeHelper.getTime(dateStr)
      expect(result).toBe(expected)
    })

    it('应该处理无效输入', () => {
      expect(AnyDateTimeHelper.getTime('invalid-date')).toBeNaN()
      expect(AnyDateTimeHelper.getTime('')).toBeNaN()
      // @ts-expect-error - 测试边界情况
      expect(AnyDateTimeHelper.getTime(null)).toBeNaN()
      // @ts-expect-error - 测试边界情况
      expect(AnyDateTimeHelper.getTime(undefined)).toBeNaN()
    })
  })

  describe('getTimeText', () => {
    beforeEach(() => {
      // 固定当前时间为 2024-01-15T12:30:45
      const fixedDate = new Date('2024-01-15T12:30:45')
      vi.useFakeTimers()
      vi.setSystemTime(fixedDate)
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('应该返回"刚刚"对于1秒内的时间', () => {
      const date = new Date('2024-01-15T12:30:44.500') // 500毫秒前
      const result = AnyDateTimeHelper.getTimeText(date)
      expect(result).toBe('刚刚')
    })

    it('应该返回秒级相对时间', () => {
      const date = new Date('2024-01-15T12:30:40') // 5秒前
      const result = AnyDateTimeHelper.getTimeText(date)
      expect(result).toBe('5秒前')
    })

    it('应该返回分钟级相对时间', () => {
      const date = new Date('2024-01-15T12:25:45') // 5分钟前
      const result = AnyDateTimeHelper.getTimeText(date)
      expect(result).toBe('5分钟前')
    })

    it('应该返回小时级相对时间', () => {
      const date = new Date('2024-01-15T10:30:45') // 2小时前
      const result = AnyDateTimeHelper.getTimeText(date)
      expect(result).toBe('2小时前')
    })

    it('应该返回天级相对时间', () => {
      const date = new Date('2024-01-13T12:30:45') // 2天前
      const result = AnyDateTimeHelper.getTimeText(date)
      expect(result).toBe('2天前')
    })

    it('应该返回周级相对时间', () => {
      const date = new Date('2024-01-08T12:30:45') // 7天前（1周）
      const result = AnyDateTimeHelper.getTimeText(date)
      expect(result).toBe('1周前')
    })

    it('应该返回月级相对时间', () => {
      const date = new Date('2023-12-15T12:30:45') // 1月前
      const result = AnyDateTimeHelper.getTimeText(date)
      expect(result).toBe('1月前')
    })

    it('应该返回年级相对时间', () => {
      const date = new Date('2023-01-15T12:30:45') // 1年前
      const result = AnyDateTimeHelper.getTimeText(date)
      expect(result).toBe('1年前')
    })

    it('应该处理未来时间', () => {
      const date = new Date('2024-01-15T12:30:46') // 1秒后
      const result = AnyDateTimeHelper.getTimeText(date)
      expect(result).toBe('未来时间')
    })

    it('应该处理无效时间', () => {
      expect(AnyDateTimeHelper.getTimeText('invalid-date')).toBe('无效时间')
      expect(AnyDateTimeHelper.getTimeText('')).toBe('无效时间')
    })

    it('应该支持不同的输入格式', () => {
      const timestamp = new Date('2024-01-15T12:25:45').getTime()
      const dateStr = '2024-01-15T12:25:45'

      expect(AnyDateTimeHelper.getTimeText(timestamp)).toBe('5分钟前')
      expect(AnyDateTimeHelper.getTimeText(dateStr)).toBe('5分钟前')
    })
  })

  describe('边界情况处理', () => {
    it('应该处理边界月份和日期', () => {
      const date1 = new Date('2024-01-01T00:00:00')
      const date2 = new Date('2024-12-31T23:59:59')

      expect(AnyDateTimeHelper.format(date1, EDateFormatType.YYYY_MM_DD)).toBe('2024-01-01')
      expect(AnyDateTimeHelper.format(date2, EDateFormatType.YYYY_MM_DD)).toBe('2024-12-31')
    })

    it('应该处理闰年日期', () => {
      const date = new Date('2024-02-29T12:30:45') // 闰年
      const result = AnyDateTimeHelper.format(date, EDateFormatType.YYYY_MM_DD)
      expect(result).toBe('2024-02-29')
    })

    it('应该处理不同时区的时间字符串', () => {
      const dateStr = '2024-01-15T12:30:45Z' // UTC时间
      const result = AnyDateTimeHelper.format(dateStr, EDateFormatType.YYYY_MM_DD)
      expect(result).toBe('2024-01-15')
    })

    it('应该处理纯时间格式', () => {
      const timeStr = '12:30:45'
      const result = AnyDateTimeHelper.format(timeStr, EDateFormatType.HH_MM_SS)
      // 纯时间格式应该返回正确的时间部分
      expect(result).toBe('12:30:45')
    })

    it('应该处理带空格的输入', () => {
      const dateStr = ' 2024-01-15T12:30:45 '
      const result = AnyDateTimeHelper.format(dateStr, EDateFormatType.YYYY_MM_DD)
      expect(result).toBe('2024-01-15')
    })
  })

  describe('错误处理', () => {
    it('应该在日期解析失败时返回空字符串', () => {
      // 测试各种无效输入
      expect(AnyDateTimeHelper.format('invalid-date-string')).toBe('')
      expect(AnyDateTimeHelper.format('')).toBe('')
      // @ts-expect-error - 测试边界情况
      expect(AnyDateTimeHelper.format(null)).toBe('')
      // @ts-expect-error - 测试边界情况
      expect(AnyDateTimeHelper.format(undefined)).toBe('')
    })

    it('应该在时间戳获取失败时返回NaN', () => {
      expect(AnyDateTimeHelper.getTime('invalid-date')).toBeNaN()
      expect(AnyDateTimeHelper.getTime('')).toBeNaN()
      // @ts-expect-error - 测试边界情况
      expect(AnyDateTimeHelper.getTime(null)).toBeNaN()
      // @ts-expect-error - 测试边界情况
      expect(AnyDateTimeHelper.getTime(undefined)).toBeNaN()
    })

    it('应该在相对时间计算失败时返回"无效时间"', () => {
      expect(AnyDateTimeHelper.getTimeText('invalid-date')).toBe('无效时间')
      expect(AnyDateTimeHelper.getTimeText('')).toBe('无效时间')
      // @ts-expect-error - 测试边界情况
      expect(AnyDateTimeHelper.getTimeText(null)).toBe('无效时间')
      // @ts-expect-error - 测试边界情况
      expect(AnyDateTimeHelper.getTimeText(undefined)).toBe('无效时间')
    })
  })

  describe('性能测试', () => {
    it('应该快速处理大量日期格式化', () => {
      const dates = Array.from({ length: 1000 }, (_, i) =>
        new Date(2024, 0, 1 + Math.floor(i / 24), i % 24, i % 60, i % 60))

      const start = performance.now()
      dates.forEach((date) => {
        AnyDateTimeHelper.format(date, EDateFormatType.YYYY_MM_DD_HH_MM_SS)
      })
      const end = performance.now()

      // 确保1000次格式化在合理时间内完成
      expect(end - start).toBeLessThan(100) // 100毫秒内完成
    })
  })
})
