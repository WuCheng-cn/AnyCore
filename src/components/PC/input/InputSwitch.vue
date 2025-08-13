<template>
  <span>
    <a-switch
      v-model:checked="value"
      v-bind="$attrs"
      style="min-width:50px;width:50px"
      @change="onChange"
    />
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: number | string | boolean | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: number | string | boolean | undefined): void
  (event: 'change', value: number | string | boolean): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  },
})

function onChange(e: string | number | boolean) {
  emits('change', e)
}
</script>
