import type { IDictionary } from '../../interface/IDictionary'
import { describe, expect, it } from 'vitest'
import { AnyDictionaryHelper } from '../../helper/AnyDictionaryHelper'
import { AnyDictionaryArrayModel } from '../../model/AnyDictionaryArrayModel'
import { AnyDictionaryModel } from '../../model/AnyDictionaryModel'

describe('anyDictionaryHelper', () => {
  it('should create a dictionary array model from an array of IDictionary', () => {
    const input: IDictionary[] = [
      { value: 'key1', label: 'Label1', description: 'Description1' },
      { value: 'key2', label: 'Label2', description: 'Description2' },
      // ... more items if needed
    ]

    const result = AnyDictionaryHelper.createDictionaryArray(input)

    expect(result).toBeInstanceOf(AnyDictionaryArrayModel)
    expect(result.length).toBe(input.length)
    for (let i = 0; i < input.length; i++) {
      const item = result[i]
      expect(item).toBeInstanceOf(AnyDictionaryModel)
      expect(item.value).toBe(input[i].value)
      expect(item.label).toBe(input[i].label)
      expect(item.description).toBe(input[i].description)
    }
  })

  it('should create a dictionary array model from an empty array', () => {
    const input: IDictionary[] = []

    const result = AnyDictionaryHelper.createDictionaryArray(input)

    expect(result).toBeInstanceOf(AnyDictionaryArrayModel)
    expect(result.length).toBe(input.length)
  })

  it('getLabelByValue should return the correct label for a given value', () => {
    const dict = AnyDictionaryHelper.createDictionaryArray([
      { value: 'key1', label: 'Label1', description: 'Description1' },
      { value: 'key2', label: 'Label2', description: 'Description2' },
      // ... more items if needed
    ])

    expect(dict.getLabelByValue('key1')).toBe('Label1')
    expect(dict.getLabelByValue('key2')).toBe('Label2')
    expect(dict.getLabelByValue('key3')).toBeUndefined()
  })

  it('exclude should remove the specified keys from the dictionary array', () => {
    const dict = AnyDictionaryHelper.createDictionaryArray([
      { value: 'key1', label: 'Label1', description: 'Description1' },
      { value: 'key2', label: 'Label2', description: 'Description2' },
      // ... more items if needed
    ])

    dict.exclude(['key1'])

    expect(dict.exclude(['key1']).length).toBe(1)
    expect(dict.exclude(['key1']).getLabelByValue('key1')).toBeUndefined()
    expect(dict.exclude(['key1']).getLabelByValue('key2')).toBe('Label2')
  })

  it('expose should add the specified keys to the dictionary array', () => {
    const dict = AnyDictionaryHelper.createDictionaryArray([
      { value: 'key1', label: 'Label1', description: 'Description1' },
      { value: 'key2', label: 'Label2', description: 'Description2' },
      // ... more items if needed
    ])

    dict.expose(['key1'])

    expect(dict.expose(['key1']).length).toBe(1)
    expect(dict.expose(['key1']).getLabelByValue('key1')).toBe('Label1')
    expect(dict.expose(['key1']).getLabelByValue('key2')).toBeUndefined()
  })
})
