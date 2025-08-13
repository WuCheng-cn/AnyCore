<template>
  <div class="flex items-center gap-0">
    <ColorPicker
      v-model:pure-color="value"
      format="hex"
      @pure-color-change="onChange"
    />
    <Copy
      v-if="isSupported"
      :size="12"
      :stroke-width="3"
      class="cursor-pointer hover:opacity-70"
      @click="copy(value);message.success('复制成功')"
    />
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { Copy } from 'lucide-vue-next'
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'change', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  },
})

const { copy, isSupported } = useClipboard({ source: value })

function onChange(e: string) {
  emits('change', e)
}
</script>
