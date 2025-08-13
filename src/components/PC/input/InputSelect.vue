<template>
  <a-select
    v-model:value="value"
    v-bind="$attrs"
    style="width: 100%;"
    show-search
    :filter-option="filterOption"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import type { SelectValue } from 'ant-design-vue/es/select'

const props = defineProps<{
  modelValue: string | number | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string | number | undefined): void
  (event: 'change', value: SelectValue): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  },
})
function filterOption(input: string, option: any) {
  return option.label.toLowerCase().includes(input.trim().toLowerCase())
}

function onChange(value: SelectValue) {
  emits('change', value)
}
</script>
