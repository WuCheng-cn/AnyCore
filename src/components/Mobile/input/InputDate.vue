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
      v-if="props.showTime"
      title="日期时间"
      next-step-text="下一步"
      :tabs="['选择日期', '选择时间']"
      @confirm="onDateTimeChange"
      @cancel="showPicker = false"
    >
      <van-date-picker v-model="date" />
      <van-time-picker v-model="time" />
    </van-picker-group>
    <van-date-picker
      v-else
      v-model="datePickerBind"
      title="选择日期"
      @confirm="onChange"
      @cancel="showPicker = false"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import type { IFormFieldConfig } from '../../../interface/IFormFieldConfig'
import dayjs from 'dayjs'
import { CircleX } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { AnyDateTimeHelper } from '../../../helper/AnyDateTimeHelper'

const props = defineProps<{
  modelValue: string[] | undefined
  /** # 显示时间 */
  showTime?: boolean
  /** # 表单配置 */
  formFieldConfig: IFormFieldConfig
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string[] | undefined): void
  (event: 'change', value: string[] | undefined): void
}>()

const defaultDate = ref([dayjs().year().toString(), (dayjs().month() + 1).toString(), dayjs().date().toString()])

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

if (!props.modelValue?.length) {
  value.value = defaultDate.value
}

const datePickerBind = ref(defaultDate.value)

const showPicker = ref(false)

const date = ref<string[]>(defaultDate.value)

const time = ref<string[]>([])

const fieldValue = computed(() => {
  if (props.showTime) {
    const dateTime = [date.value.join('-'), time.value.join(':')].join(' ')
    return AnyDateTimeHelper.format(dateTime, props.formFieldConfig.dateFormat)
  }
  else {
    if (value.value?.length) {
      return AnyDateTimeHelper.format(
        new Date(Number(value.value[0]), Number(value.value[1]) - 1, Number(value.value[2]), Number(value.value?.[3]) || 0, Number(value.value?.[4]) || 0),
        props.formFieldConfig.dateFormat,
      )
    }
    return ''
  }
})

function onChange({ selectedValues }: any) {
  showPicker.value = false
  value.value = selectedValues
  emits('change', value.value)
}

function onDateTimeChange() {
  showPicker.value = false
  value.value = [...date.value, ...time.value]
  emits('change', value.value)
}

function onClear() {
  if (props.showTime) {
    date.value = []
    time.value = []
    emits('change', [])
  }
  else {
    value.value = []
    emits('change', value.value)
  }
}
</script>
