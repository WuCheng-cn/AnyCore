<template>
  <a-segmented
    v-model:value="value"
    v-bind="$attrs"
    class="w-[unset]! min-w-[unset]! max-w-[unset]!"
    :options="props.options?.map(i => i.label)"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import type { IDictionary } from '@/anyThing/interface/IDictionary'
import type { SelectValue } from 'ant-design-vue/es/select'

const props = defineProps<{
  modelValue: string | number | undefined
  options: IDictionary[]
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string | number | undefined): void
  (event: 'change', value: SelectValue): void
}>()

const value = computed({
  get: () => {
    return props.options.find(item => item.value === props.modelValue)?.label
  },
  set: (value) => {
    const item = props.options.find(item => item.label === value)
    emits('update:modelValue', item!.value as string | number | undefined)
  },
})

function onChange(value: SelectValue) {
  const item = props.options.find(item => item.label === value)
  emits('change', item!.value as string | number | undefined)
}
</script>
