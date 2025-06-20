<template>
  <van-field
    v-model="fieldValue"
    v-bind="$attrs"
    is-link
    readonly
    @click="showPicker = true"
  >
    <template #right-icon>
      <Transition
        enter-active-class="animate-in fade-in zoom-in"
        leave-active-class="animate-out fade-out zoom-out"
        @click.stop="onClear()"
      >
        <CircleX
          v-show="fieldValue"
          :size="16"
        />
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
      title="时间范围"
      next-step-text="下一步"
      :tabs="['开始时间', '结束时间']"
      @confirm="onChange"
      @cancel="showPicker = false "
    >
      <van-time-picker
        v-model="startTime"
        :formatter="formatter"
      />
      <van-time-picker
        v-model="endTime"
        :formatter="formatter"
      />
    </van-picker-group>
  </van-popup>
</template>

<script lang="ts" setup>
import { CircleX } from 'lucide-vue-next'
import { EDateFormatType } from '../../../enum/EDateFormatType'
import { AnyDateTimeHelper } from '../../../helper/AnyDateTimeHelper'

type VanTimeRangeValue = [string[], string[]]

const props = defineProps<{
  modelValue: VanTimeRangeValue | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: VanTimeRangeValue | undefined): void
  (event: 'change', value: VanTimeRangeValue | undefined): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

const showPicker = ref(false)

const fieldValue = ref('')

const startTime = ref(AnyDateTimeHelper.format(Date.now(), EDateFormatType.YYYY_MM_DD_HH_MM).split(' ')?.[1]?.split(':'))
const endTime = ref(AnyDateTimeHelper.format(Date.now(), EDateFormatType.YYYY_MM_DD_HH_MM).split(' ')?.[1]?.split(':'))

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

function onChange() {
  showPicker.value = false
  fieldValue.value = `${startTime.value?.join(':')} - ${endTime.value?.join(':')}`
  value.value = [startTime.value, endTime.value]
  emits('change', value.value)
}

function onClear() {
  fieldValue.value = ''
  value.value = [] as any
  emits('change', value.value)
}
</script>
