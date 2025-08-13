<template>
  <van-field
    v-model="fieldValue"
    v-bind="$attrs"
    readonly
    @click="!$attrs.disabled && (showPicker = true)"
  >
    <template #right-icon>
      <Transition
        enter-active-class="animate-in fade-in zoom-in"
        leave-active-class="animate-out fade-out zoom-out"
        @click.stop="onClear()"
      >
        <CircleX v-show="!$attrs.disabled && fieldValue" />
      </Transition>
    </template>
  </van-field>
  <van-popup
    v-model:show="showPicker"
    destroy-on-close
    round
    position="bottom"
  >
    <van-time-picker
      v-bind="$attrs"
      title="选择时间"
      :formatter="formatter"
      @confirm="onChange"
      @cancel="showPicker = false"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import { CircleX } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue: string[] | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string[] | undefined): void
  (event: 'change', value: string[] | null): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

const showPicker = ref(false)

const fieldValue = computed(() => {
  return value.value?.join(':')
})

function formatter(type: string, option: any) {
  if (type === 'hour') {
    option.text += '时'
  }
  if (type === 'minute') {
    option.text += '分'
  }
  if (type === 'second') {
    option.text += '秒'
  }
  return option
}

function onChange({ selectedValues }: any) {
  showPicker.value = false
  value.value = selectedValues

  emits('change', selectedValues)
}

function onClear() {
  value.value = []
  emits('change', value.value)
}
</script>
