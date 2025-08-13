<template>
  <van-field
    v-model="fieldValue"
    v-bind="$attrs"
    readonly
    @click="!canInput && !$attrs.disabled && (showPicker = true)"
  >
    <template #right-icon>
      <Transition
        enter-active-class="animate-in fade-in zoom-in"
        leave-active-class="animate-out fade-out zoom-out"
        @click.stop="value = [''];inputValue = ''"
      >
        <CircleX v-show="!$attrs.disabled && fieldValue" />
      </Transition>
    </template>
    <template v-if="canInput" #input>
      <van-field
        v-model="inputValue"
        class="p-0!"
        :placeholder="$attrs.placeholder as unknown as string"
        @blur="handleBlur"
      />
      <van-icon name="arrow" @click="!$attrs.disabled && (showPicker = true)" />
    </template>
  </van-field>
  <van-popup
    v-model:show="showPicker"
    destroy-on-close
    round
    position="bottom"
  >
    <van-picker
      :columns="(options as any)"
      :columns-field-names="{ text: 'label' }"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import type { IDictionary } from '../../../interface/IDictionary'
import { CircleX } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string | number | undefined
  options: IDictionary[]
  canInput?: boolean
  /** # 开启选项缓存需要该字段 */
  cachefield?: string
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string | number | undefined): void
  (event: 'change', value: string | number | undefined): void
}>()

const value = computed({
  get: () => {
    return [props.modelValue]
  },
  set: (val) => {
    emits('update:modelValue', val?.[0])
  },
})

const showPicker = ref(false)

const inputValue = ref('') // 手动输入的值

const options = ref([...props.options])

watch(() => props.options, () => {
  options.value = props.options
  initByCacheOptions()
}, { deep: true, immediate: true })

const fieldValue = computed(() => {
  const item = options.value?.find(item => String(item.value) === String(value.value?.[0]))
  return item?.label || ''
})

/** # option缓存（仅缓存手动输入内容） */
function setCacheOptions(option: IDictionary) {
  if (!props.cachefield) {
    console.warn('未传入cachefield，将不会缓存options')
    return
  }
  const cached = localStorage.getItem(`options-${props.cachefield}`)
  const cachedOptions = cached ? JSON.parse(cached) : []
  const newData = [...cachedOptions, option]
  localStorage.setItem(`options-${props.cachefield}`, JSON.stringify(newData))
}

function initByCacheOptions() {
  if (!props.cachefield) {
    console.warn('未传入cachefield，将不会获取缓存options')
    return
  }
  const cached = localStorage.getItem(`options-${props.cachefield}`)
  const cachedOptions = cached ? JSON.parse(cached) : []
  options.value = [...options.value, ...cachedOptions]
}

function handleBlur() {
  if (!options.value?.some(i => i.value === inputValue.value)) {
    options.value?.push({
      value: inputValue.value,
      label: inputValue.value,
    })
  }
  value.value = [inputValue.value]
  setCacheOptions({ value: inputValue.value, label: inputValue.value })
}

function onConfirm({ selectedValues }: any) {
  showPicker.value = false
  value.value = selectedValues
  inputValue.value = selectedValues[0]
  emits('change', selectedValues[0])
}
</script>
