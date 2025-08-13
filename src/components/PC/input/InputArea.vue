<template>
  <a-textarea
    v-model:value.trim="value"
    v-bind="$attrs"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string | number | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string | number | undefined): void
  (event: 'change', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  },
})

function onChange(e: Event) {
  emits('change', (e.target as HTMLInputElement).value)
}
</script>
