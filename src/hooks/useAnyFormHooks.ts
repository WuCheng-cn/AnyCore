import type { FormExpose } from 'vant/lib/form/types'
// 引入FormExpose类型，用于表单引用
import type { IDictionary } from '../interface/IDictionary'
import type { IFormFieldConfig } from '../interface/IFormFieldConfig'
import type { IFormProps } from '../interface/IFormProps'
import type { AnyBaseModel } from '../model/AnyBaseModel'
import type { ClassConstructor } from '../types/ClassConstructor'
import { computed, ref, watch, watchEffect } from 'vue'
import { EFormItemType } from '../enum/EFormItemType'
import { AnyDataTransformHelper } from '../helper/AnyDataTransformHelper'
import { AnyValidatorHelper } from '../helper/AnyValidatorHelper'

export function useAnyFormHooks(props: IFormProps & {
  /** # 是否卡片模式 */
  isCard?: boolean
  /** # 表单label显示方式 */
  labelAlign?: 'top' | 'left' | 'right' | 'center'
  /** # 是否隐藏表单label */
  hideLabel?: boolean
}) {
  const formRef = ref<FormExpose>()

  const formState = ref((props.entity as any).fromJSON(props.initData || {}) as InstanceType<ClassConstructor<AnyBaseModel>>)

  watch(() => props.initData, (newVal) => {
    if (newVal) {
      formState.value = (props.entity as any).fromJSON(newVal) as InstanceType<ClassConstructor<AnyBaseModel>>
    }
  }, { deep: true })

  const checkedFormKeys = ref<string[]>([])

  const formFieldList = computed(() => {
    const list = formState.value.getFormFieldList()
    if (!props.fieldList?.length) {
      return AnyDataTransformHelper.sortByArray(list, props.fieldOrder || [])
    }
    const filteredList = list.filter(item => props.fieldList?.includes(item))
    return AnyDataTransformHelper.sortByArray(filteredList, props.fieldOrder || [])
  })

  const formFieldConfigObj = computed(() => {
    return formState.value.getFormFieldConfigObj()
  })

  const rules = computed(() => {
    return AnyValidatorHelper.getValidateRules(formState.value, props.mixinRules, props.isOptional)
  })

  // 用于缓存每个字段的可见性状态
  const fieldVisibility = ref<Record<string, boolean>>({})
  // 用于缓存每个字段的禁用状态
  const fieldDisabled = ref<Record<string, boolean>>({})
  // 用于缓存选择字段的选项
  const selectFieldsOptions = ref<Record<string, IDictionary[]>>({})

  // 监听表单状态变化，更新字段可见性和禁用状态
  watchEffect(() => {
    formFieldList.value.forEach(async (field) => {
      // 更新可见性
      const fn = getFieldConfig<'visible'>(field, 'visible')
      if (fn && typeof fn === 'function') {
        const result = await fn(formState.value).catch(() => {
          fieldVisibility.value[field] = true
        })
        fieldVisibility.value[field] = Boolean(result)
      }
      else {
        fieldVisibility.value[field] = true
      }

      // 更新禁用状态
      const disableFn = getFieldConfig<'disabled'>(field, 'disabled')
      if (disableFn) {
        if (typeof disableFn === 'function') {
          const result = await disableFn(formState.value).catch(() => {
            fieldDisabled.value[field] = false
          })
          fieldDisabled.value[field] = Boolean(result)
        }
        else if (typeof disableFn === 'boolean') {
          fieldDisabled.value[field] = disableFn
        }
        else {
          fieldDisabled.value[field] = false
        }
      }
      else {
        fieldDisabled.value[field] = false
      }
    })
  })

  // 监听表单变化返回选项
  watchEffect(() => {
    const selectFields = formFieldList.value.filter(field => getFieldConfig(field, 'formType') === EFormItemType.SELECT)
    selectFields.forEach((field) => {
      const fn = getFieldConfig<'options'>(field, 'options')
      if (fn && typeof fn === 'function') {
        fn(formState.value).then((res) => {
          selectFieldsOptions.value[field] = res
        })
      }
    })
  })

  /**
   * 获取字段可见性
   * @param field 字段名
   * @returns 是否可见
   */
  function visible(field: string): boolean {
    // 如果字段可见性尚未计算，则默认为true
    return fieldVisibility.value[field] ?? true
  }

  /**
   * 计算属性：为每个字段生成输入组件的属性
   * @param field 字段名
   * @returns 输入组件的属性对象
   */
  const getInputProps = computed(() => (field: string) => ({
    key: field,
    class: 'w-full',
    isLink: !props.disabled
      && !getFieldConfig(field, 'disabled')
      && !getFieldConfig(field, 'canInput')
      && [EFormItemType.SELECT, EFormItemType.INPUT_SELECTOR, EFormItemType.TIME, EFormItemType.TIME_RANGE, EFormItemType.DATE, EFormItemType.DATE_RANGE].includes(getFieldConfig(field, 'formType')),
    label: props.hideLabel ? '' : formState.value.getFormFieldLabel(field),
    labelAlign: props.labelAlign,
    entity: props.entity,
    field,
    required: !props.isOptional && getFieldConfig(field, 'required'),
    rules: rules.value[field],
    formData: formState.value,
    selectorConfig: getFieldConfig(field, 'selectorConfig'),
    disabled: props.disabled || fieldDisabled.value[field],
    options: selectFieldsOptions.value[field] || formState.value.getOptions(field),
    checkedValue: getFieldConfig(field, 'checkedValue'),
    unCheckedValue: getFieldConfig(field, 'unCheckedValue'),
    visible: visible(field),
    canInput: getFieldConfig(field, 'canInput'),
    cachefield: getFieldConfig(field, 'cachefield'),
  }))

  /**
   * 获取字段配置
   * @param field 字段名
   * @param configKey 配置键名
   * @returns 配置值
   */
  function getFieldConfig<key extends keyof IFormFieldConfig>(field: string, configKey: key) {
    return formFieldConfigObj.value?.[field]?.[configKey] as IFormFieldConfig[key]
  }

  return {
    rules,
    formRef,
    formState,
    formFieldList,
    checkedFormKeys,
    getFieldConfig,
    fieldVisibility,
    fieldDisabled,
    selectFieldsOptions,
    getInputProps,
    visible,
  }
}
