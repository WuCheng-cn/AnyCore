<template>
  <a-time-range-picker
    v-model:value="value"
    v-bind="$attrs"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import type { EventValue } from 'ant-design-vue/es/vc-picker/interface'
import type { Dayjs } from 'dayjs'

const props = defineProps<{
  modelValue: [EventValue<Dayjs>, EventValue<Dayjs>] | [EventValue<string>, EventValue<string>] | null | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: [EventValue<Dayjs>, EventValue<Dayjs>] | [EventValue<string>, EventValue<string>] | null | undefined): void
  (event: 'change', value: [EventValue<Dayjs>, EventValue<Dayjs>] | [EventValue<string>, EventValue<string>] | null | undefined): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  },
})

function onChange(e: [EventValue<Dayjs>, EventValue<Dayjs>] | [EventValue<string>, EventValue<string>] | null | undefined) {
  emits('change', e)
}
</script>
