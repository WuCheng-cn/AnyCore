<template>
  <van-field>
    <template #input>
      <van-switch
        v-model="value"
        v-bind="$attrs"
        size="20px"
        :active-value="formFieldConfig.checkedValue"
        :inactive-value="formFieldConfig.unCheckedValue"
        @change="onChange"
      />
    </template>
  </van-field>
</template>

<script lang="ts" setup>
import type { IFormFieldConfig } from '../../../interface/IFormFieldConfig'
import { computed } from 'vue'

type ValueType = number | string | boolean | undefined

const props = defineProps<{
  modelValue: ValueType
  /** # 表单配置 */
  formFieldConfig: IFormFieldConfig
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: ValueType): void
  (event: 'change', value: Omit<ValueType, 'undefined'>): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

function onChange(e: string | number | boolean) {
  emits('change', e)
}
</script>
