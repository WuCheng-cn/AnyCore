import { describe, expect, it } from 'vitest'
import { EDateFormatType } from '../../enum/EDateFormatType'
import { AnyDateTimeHelper } from '../../helper/AnyDateTimeHelper'

/**
 * 补零函数
 */
function padZero(num: number) {
  return num < 10 ? `0${num}` : num
}

describe('anyDateTimeHelper', () => {
  it('format - should handle a Date object YYYY_MM_DD_HH_MM_SS', () => {
    const date = new Date('2023-01-01T00:00:00')
    const formatted = AnyDateTimeHelper.format(date, EDateFormatType.YYYY_MM_DD_HH_MM_SS)
    expect(formatted).toBe('2023-01-01 00:00:00')
  })

  it('format - should handle a Date object HH_MM_CN', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.HH_MM_CN)
    expect(formatted).toBe('00时00分')
  })

  it('format - should handle a Date object HH_MM_SS_CN', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.HH_MM_SS_CN)
    expect(formatted).toBe('00时00分00秒')
  })

  it('format - should handle a Date object MM_DD_CN', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.MM_DD_CN)
    expect(formatted).toBe('01月01日')
  })

  it('format - should handle a Date object YYYY', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.YYYY)
    expect(formatted).toBe('2023')
  })

  it('format - should handle a Date object YYYY_CN', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.YYYY_CN)
    expect(formatted).toBe('2023年')
  })

  it('format - should handle a Date object YYYY_MM', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.YYYY_MM)
    expect(formatted).toBe('2023-01')
  })

  it('format - should handle a Date object YYYY_MM_CN', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.YYYY_MM_CN)
    expect(formatted).toBe('2023年01月')
  })

  it('format - should handle a Date object YYYY_MM_DD', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.YYYY_MM_DD)
    expect(formatted).toBe('2023-01-01')
  })

  it('format - should handle a Date object YYYY_MM_DD_CN', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.YYYY_MM_DD_CN)
    expect(formatted).toBe('2023年01月01日')
  })

  it('format - should handle a Date object YYYY_MM_DD_HH_MM', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.YYYY_MM_DD_HH_MM)
    expect(formatted).toBe('2023-01-01 00:00')
  })

  it('format - should handle a Date object YYYY_MM_DD_HH_MM_CN', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.YYYY_MM_DD_HH_MM_CN)
    expect(formatted).toBe('2023年01月01日 00时00分')
  })

  it('format - should handle a Date object YYYY_MM_DD_HH_MM_SLASH', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.YYYY_MM_DD_HH_MM_SLASH)
    expect(formatted).toBe('2023/01/01 00:00')
  })

  it('format - should handle a Date object YYYY_MM_DD_SLASH', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.YYYY_MM_DD_SLASH)
    expect(formatted).toBe('2023/01/01')
  })

  it('format - should handle a Date object YYYY_MM_SLASH', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.YYYY_MM_SLASH)
    expect(formatted).toBe('2023/01')
  })

  it('format - should handle time stamps YYYY_MM_DD_HH_MM_SS', () => {
    const timestamp = 1677609822000 // in milliseconds
    const date = new Date(timestamp)
    const formatted = AnyDateTimeHelper.format(timestamp, EDateFormatType.YYYY_MM_DD_HH_MM_SS)
    expect(formatted).toBe(`${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`)
  })

  it('format - should handle time stamps HH_MM_CN', () => {
    const timestamp = 1677609822000 // in milliseconds
    const date = new Date(timestamp)
    const formatted = AnyDateTimeHelper.format(timestamp, EDateFormatType.HH_MM_CN)
    expect(formatted).toBe(`${padZero(date.getHours())}时${padZero(date.getMinutes())}分`)
  })

  it('format - should handle time strings', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.YYYY_MM_DD_HH_MM_SS)
    expect(formatted).toBe('2023-01-01 00:00:00')
  })

  it('format - should handle time strings HH_MM_CN', () => {
    const dateString = '2023-01-01T00:00:00'
    const formatted = AnyDateTimeHelper.format(dateString, EDateFormatType.HH_MM_CN)
    expect(formatted).toBe('00时00分')
  })

  it('getTime - should return timestamp from Date object', () => {
    const date = new Date()
    const timestamp = AnyDateTimeHelper.getTime(date)
    expect(timestamp).toBe(date.getTime())
  })

  it('getTime - should return timestamp from time string', () => {
    const dateString = '2023-01-01T00:00:00'
    const date = new Date(dateString)
    const timestamp = AnyDateTimeHelper.getTime(dateString)
    expect(timestamp).toBe(date.getTime())
  })

  it('getTime - should return timestamp from timestamp', () => {
    const timestamp = 1677609822000 // in milliseconds
    const date = new Date(timestamp)
    const timestamp2 = AnyDateTimeHelper.getTime(timestamp)
    expect(timestamp2).toBe(date.getTime())
  })
})
