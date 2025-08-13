<template>
  <a-time-picker
    v-model:value="value"
    v-bind="$attrs"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs'

const props = defineProps<{
  modelValue: string | Dayjs | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string | Dayjs | undefined): void
  (event: 'change', value: string | Dayjs | null): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  },
})

function onChange(e: string | Dayjs | null) {
  emits('change', e)
}
</script>
