<template>
  <a-range-picker
    v-model:value="value"
    v-bind="$attrs"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs'

const props = defineProps<{
  modelValue: [string, string] | [Dayjs, Dayjs] | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: [string, string] | [Dayjs, Dayjs] | undefined): void
  (event: 'change', value: [string, string] | [Dayjs, Dayjs] | undefined): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  },
})

function onChange(e: [string, string] | [Dayjs, Dayjs] | undefined) {
  emits('change', e)
}
</script>
