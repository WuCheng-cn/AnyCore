import { getSearchFileldConfigObj, getSearchFileldList, SearchField } from '@/anyThing/decorator/SearchField'
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
  it('getSearchFileldList', () => {
    expect(getSearchFileldList(new TestClass())).toEqual(['test', 'test2'])
  })

  it('getSearchFileldConfigObj', () => {
    expect(getSearchFileldConfigObj(new TestClass())).toEqual({
      test: {
        label: 'test',
      },
      test2: {
        label: 'test2',
      },
    })
  })
})
