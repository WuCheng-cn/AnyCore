<template>
  <van-field v-bind="$attrs">
    <template #input>
      <van-stepper
        v-model.trim="value"
        v-bind="$attrs"
        default-value=""
        :max="formFieldConfig.max ?? AppConfig.MAX_NUMBER"
        :min="formFieldConfig.min ?? AppConfig.MIN_NUMBER"
        @change="onChange"
      />
    </template>
  </van-field>
</template>

<script lang="ts" setup>
import type { IFormFieldConfig } from '@/interface/IFormFieldConfig'
import { AppConfig } from '@/config/AppConfig'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number | undefined
  /** # 表单配置 */
  formFieldConfig: IFormFieldConfig
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: number | undefined): void
  (event: 'change', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

function onChange(value: string) {
  emits('change', value)
}
</script>
