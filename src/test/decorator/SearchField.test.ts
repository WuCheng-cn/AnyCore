import { getSearchFieldList, getSearchFiledConfigObj, SearchField } from '@/decorator/SearchField'
import { describe, expect, it } from 'vitest'

class TestClass {
  @SearchField({
    label: 'test',
  })
  test?: string

  @SearchField({
    label: 'test2',
  })
  test2?: string

  test3?: string
}
describe('searchField', () => {
  it('getSearchFieldList', () => {
    expect(getSearchFieldList(new TestClass())).toEqual(['test', 'test2'])
  })

  it('getSearchFiledConfigObj', () => {
    expect(getSearchFiledConfigObj(new TestClass())).toEqual({
      test: {
        label: 'test',
      },
      test2: {
        label: 'test2',
      },
    })
  })
})
