<template>
  <a-input-number
    v-model:value.trim="value"
    v-bind="$attrs"
    style="width: 100%;"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import type { ValueType } from 'ant-design-vue/es/input-number/src/utils/MiniDecimal'
import type { IFormFieldConfig } from '../../../interface/IFormFieldConfig'

const props = defineProps<{
  modelValue: number | undefined
  formFieldConfig: IFormFieldConfig
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: number | undefined): void
  (event: 'change', value: ValueType): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  },
})

function onChange(value: ValueType) {
  emits('change', value)
}
</script>
