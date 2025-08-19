import { describe, expect, it } from 'vitest'
import { getTableFieldConfigObj, getTableFieldList, TableField } from '../../decorator/TableField'

class TestClass {
  @TableField({ label: 'test' })
  test?: string

  @TableField({ label: 'test2' })
  test2?: string

  test3?: string
}
describe('tableField', () => {
  it('getTableFieldList', () => {
    expect(getTableFieldList(new TestClass())).toEqual(['test', 'test2'])
  })

  it('getTableFieldConfigObj', () => {
    expect(getTableFieldConfigObj(new TestClass())).toEqual({
      test: {
        label: 'test',
      },
      test2: {
        label: 'test2',
      },
    })
  })
})
