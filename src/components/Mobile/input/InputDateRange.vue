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
    <van-picker-group
      title="日期范围"
      next-step-text="下一步"
      :tabs="['开始日期', '结束日期']"
      @confirm="onChange"
      @cancel="showPicker = false"
    >
      <van-date-picker v-model="startDate" />
      <van-date-picker v-model="endDate" />
    </van-picker-group>
  </van-popup>
</template>

<script lang="ts" setup>
import { CircleX } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { EDateFormatType } from '../../../enum/EDateFormatType'
import { AnyDateTimeHelper } from '../../../helper/AnyDateTimeHelper'

type VanDateRangeValue = [string[], string[]]

const props = defineProps<{
  modelValue: VanDateRangeValue | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: VanDateRangeValue | undefined): void
  (event: 'change', value: VanDateRangeValue | undefined): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

const showPicker = ref(false)

const startDate = ref(AnyDateTimeHelper.format(Date.now(), EDateFormatType.YYYY_MM_DD).split('-'))

const endDate = ref(AnyDateTimeHelper.format(Date.now(), EDateFormatType.YYYY_MM_DD).split('-'))

const fieldValue = computed(() => {
  if (value.value?.length === 2) {
    return `${startDate.value.join('-')} - ${endDate.value.join('-')}`
  }
  return ''
})

function onChange() {
  showPicker.value = false
  value.value = [startDate.value, endDate.value]
  emits('change', value.value)
}

function onClear() {
  startDate.value = []
  endDate.value = []
  value.value = [] as any
  emits('change', value.value)
}
</script>
