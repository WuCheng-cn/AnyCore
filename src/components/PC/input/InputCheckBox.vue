<template>
  <a-checkbox-group
    v-model:value="value"
    v-bind="$attrs"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import type { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface'

const props = defineProps<{
  modelValue: CheckboxValueType[] | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: CheckboxValueType[] | undefined): void
  (event: 'change', value: CheckboxValueType[]): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  },
})

function onChange(e: CheckboxValueType[]) {
  emits('change', e)
}
</script>
