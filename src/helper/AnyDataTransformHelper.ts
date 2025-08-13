import type { IDictionary } from '../interface/IDictionary'

export abstract class AnyDataTransformHelper {
  /**
   * # 把数组a按b的顺序排序
   * @param a 要排序的数组
   * @param b 排序参考数组
   * @returns 排序后的数组
   */
  static sortByArray(a: string[], b: string[]) {
    // 创建一个映射，用于快速查找b中元素的位置
    const map = new Map(b.map((value, index) => [value, index]))

    // 自定义排序函数
    a.sort((x, y) => {
      const xIndex = map.get(x)
      const yIndex = map.get(y)

      // 如果x和y都在b中，则按b中的顺序排序
      if (xIndex !== undefined && yIndex !== undefined) {
        return xIndex - yIndex
      }
      // 如果x在b中，y不在b中，x排在前面
      if (xIndex !== undefined) {
        return -1
      }
      // 如果y在b中，x不在b中，y排在前面
      if (yIndex !== undefined) {
        return 1
      }
      // 如果x和y都不在b中，保持原顺序
      return 0
    })

    return a
  }

  /**
   * # 将对象数组按指定key转换为IOption[]
   * - data 对象数组
   * - [labelKey, valueKey]
   */
  static recordListToOptions(data: Record<string, any>[], [labelKey, valueKey]: [string, string]): IDictionary[] {
    return data?.map((item) => {
      return {
        label: item?.[labelKey],
        value: item?.[valueKey],
      }
    })
  }
}
