<template>
  <component
    :is="componentsMobileMap[formFieldConfig.formType || EFormItemType.INPUT]"
    v-if="visible"
    v-bind="$attrs"
    allow-clear
    :name="field"
    :model-value="value"
    :disabled="disabled"
    :placeholder="placeholder"
    :form-field-config="formFieldConfig"
    :selector-config="formFieldConfig.selectorConfig"
    :options="configInstance.getOptions(field)"
    @update:model-value="value = $event"
    @change="(e:any) => emits('change', e)"
  />
</template>

<script lang="ts" setup>
import type { IFormFieldConfig } from '../../../interface/IFormFieldConfig'
import type { AnyBaseModel } from '../../../model/AnyBaseModel'
import type { ClassConstructor } from '../../../types/ClassConstructor'
import { computed, ref, withDefaults } from 'vue'
import { componentsMobileMap } from '.'
import { EFormItemType } from '../../../enum/EFormItemType'
import { AnyDateTimeHelper } from '../../../helper/AnyDateTimeHelper'

const props = withDefaults(defineProps<{
  /** # 双向数据绑定 */
  modelValue: any
  /** # 配置实体 */
  entity: ClassConstructor<AnyBaseModel>
  /** # 表单项关联字段 */
  field: string
  /** # 占位符 */
  placeholder?: string
  /** # 禁用 */
  disabled?: boolean
  /** # 可见性 */
  visible?: boolean
}>(), {
  visible: true,
})

const emits = defineEmits<{
  (event: 'update:modelValue', value: unknown): void
  (event: 'change', value: string): void
}>()

/** 配置实例 */
const configInstance = ref(new props.entity!())

/** 表单字段配置 */
const formFieldConfig = computed(() => {
  return configInstance.value.getFormFieldConfigObj(props.field)?.[props.field] || {} as IFormFieldConfig
})

const value = computed({
  get: () => {
    switch (formFieldConfig.value?.formType) {
      case EFormItemType.DATE:{
        const formatData = AnyDateTimeHelper.format(props.modelValue, formFieldConfig.value.dateFormat)
          ?.replace(/[:\-/\s]/g, '-')
          ?.split('-')
          ?.filter(Boolean)
        if (formatData?.length) {
          return formatData
        }
        return []
      }
      case EFormItemType.TIME:{
        const formatData = props.modelValue
          ?.replace(/[:\-/\s]/g, '-')
          ?.split('-')
          ?.filter(Boolean)
        if (formatData?.length) {
          return formatData
        }
        return []
      }
      case EFormItemType.DATE_RANGE:
        if (props.modelValue?.length === 2) {
          const transformDate: string[] = []
          transformDate[0] = AnyDateTimeHelper.format(props.modelValue?.[0], formFieldConfig.value.dateFormat)
          transformDate[1] = AnyDateTimeHelper.format(props.modelValue?.[1], formFieldConfig.value.dateFormat)
          return transformDate
        }
        return []
      case EFormItemType.TIME_RANGE:
        if (props.modelValue?.length === 2) {
          const transformDate: string[] = []
          transformDate[0] = props.modelValue?.[0]?.split(':')
          transformDate[1] = props.modelValue?.[1]?.split(':')
          return transformDate
        }
        return []
      default:
        return props.modelValue
    }
  },
  set: (value: any) => {
    switch (formFieldConfig.value.formType) {
      case EFormItemType.DATE:
        if (value?.length) {
          emits('update:modelValue', AnyDateTimeHelper.format(
            new Date(value[0], value[1] - 1, value[2], value?.[3] || 0, value?.[4] || 0),
            formFieldConfig.value.dateFormat,
          ))
        }
        else {
          emits('update:modelValue', '')
        }
        return
      case EFormItemType.TIME:
        emits('update:modelValue', value?.join(':'))
        return
      case EFormItemType.DATE_RANGE:
        if (value?.length === 2) {
          const transformDate: string[] = []
          transformDate[0] = AnyDateTimeHelper.format(
            new Date(value[0][0], value[0][1] - 1, value[0][2], value[0]?.[3] || 0, value[0]?.[4] || 0),
            formFieldConfig.value.dateFormat,
          )
          transformDate[1] = AnyDateTimeHelper.format(
            new Date(value[1][0], value[1][1] - 1, value[1][2], value[1]?.[3] || 0, value[1]?.[4] || 0),
            formFieldConfig.value.dateFormat,
          )
          emits('update:modelValue', transformDate)
        }
        else {
          emits('update:modelValue', undefined)
        }
        return
      case EFormItemType.TIME_RANGE:
        if (value?.length === 2) {
          const transformDate: string[] = []
          transformDate[0] = value?.[0]?.join(':')
          transformDate[1] = value?.[1]?.join(':')
          emits('update:modelValue', transformDate)
        }
        else {
          emits('update:modelValue', [])
        }
        return
      default:
        emits('update:modelValue', value)
    }
  },
})

/** 占位符 */
const placeholder = computed(() => {
  if (props.disabled && !props.modelValue) {
    return ''
  }
  const label = configInstance.value.getFormFieldLabel(props.field)
  if (props.placeholder) {
    return props.placeholder
  }
  if (formFieldConfig.value.placeholder) {
    return formFieldConfig.value.placeholder
  }

  switch (formFieldConfig.value.formType) {
    case EFormItemType.INPUT:
    case EFormItemType.INPUT_NUMBER:
    case EFormItemType.TEXTAREA:
      return `请输入${label}`
    case EFormItemType.SELECT:
    case EFormItemType.DATE:
    case EFormItemType.TIME:
    case EFormItemType.INPUT_SELECTOR:
      return `请选择${label}`
    case EFormItemType.DATE_RANGE:
    case EFormItemType.TIME_RANGE:
      return `${label}开始-${label}结束`
    default:
      return '请输入...'
  }
})
</script>
