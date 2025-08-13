<template>
  <van-field
    v-bind="$attrs"
    v-model="res"
    readonly
    @click="!$attrs.disabled && handleSelect()"
  >
    <template #right-icon>
      <Transition
        enter-active-class="animate-in fade-in zoom-in"
        leave-active-class="animate-out fade-out zoom-out"
        @click.stop="handleClear"
      >
        <CircleX v-show="!$attrs.disabled && selectedValue?.length" />
      </Transition>
    </template>
    <template #input>
      <template v-if="selectedValue?.length">
        <template v-if="selectorConfig.multiple">
          <div class="flex flex-wrap gap-1">
            <van-tag
              v-for="item in selectedValue"
              :key="item[valueKey]"
              :name="item[labelKey]"
              size="medium"
              :closeable="!$attrs.disabled"
              plain
              @close="handleClose(item)"
            >
              {{ item[labelKey] }}
            </van-tag>
          </div>
        </template>
        <template v-else>
          <div>{{ selectedValue?.[0]?.[labelKey] }}</div>
        </template>
      </template>
      <div v-else class="text-[#ccc]">
        {{ $attrs.placeholder }}
      </div>
    </template>
  </van-field>
</template>

<script lang="ts" setup>
import type { IFormFieldConfig } from '../../../interface/IFormFieldConfig'
import type { IInputSelectorConfig } from '../../../interface/IInputSelectorConfig'
import { CircleX } from 'lucide-vue-next'
import { computed, nextTick, ref } from 'vue'
import { AnyDialogHelper } from '../../../helper/AnyDialogHelper'

type ValueType = Record<string, any>[] | undefined

const props = defineProps<{
  modelValue: ValueType
  /** # 表单配置 */
  formFieldConfig: IFormFieldConfig
  /** # 表单数据 */
  formData?: Record<string, any>
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: ValueType): void
  (event: 'change', value: any): void
}>()

const valueKey = computed(() => {
  return selectorConfig.value.valueKey || 'id'
})

const labelKey = computed(() => {
  return selectorConfig.value.labelKey || 'name'
})

const selectedValue = computed({
  get: () => props.modelValue,
  set(value) {
    emits('update:modelValue', value)
  },
})

/** 临时方案:保证校验正常 */
const res = computed({
  get: () => {
    return selectedValue.value?.map(i => i[labelKey.value])?.join(',')
  },
  set: (_val) => {
  },
})

async function handleSelect() {
  let payload = {}
  let checkedRows = [] as any[]
  if (selectorConfig.value?.payload) {
    payload = await selectorConfig.value.payload(props.formData)
  }
  if (selectorConfig.value.checkedRows) {
    checkedRows = await selectorConfig.value.checkedRows(props.formData)
  }

  let res = await AnyDialogHelper.showSelector(selectorConfig.value.selectorView, {
    payload,
    checkedRows,
    multiple: selectorConfig.value.multiple,
    title: selectorConfig.value.title,
    initData: selectorConfig.value.initData,
    isCacheSelect: selectorConfig.value.isCacheSelect,
  })
  if (selectorConfig.value.multiple) {
    // 过滤出selectedValue中已有的数据
    res = res.filter(item => !selectedValue.value?.some(selectedItem => selectedItem[valueKey.value] === item[valueKey.value]))
    selectedValue.value = [
      ...(selectedValue.value?.length ? selectedValue.value : []),
      ...res,
    ]
  }
  else {
    selectedValue.value = res
  }
  emitData()
}

async function handleClose(item: any) {
  selectedValue.value = selectedValue.value?.filter((i: any) => i[valueKey.value] !== item[valueKey.value])
  emitData()
}

function handleClear() {
  selectedValue.value = undefined
  emitData()
}

function emitData() {
  nextTick(() => {
    if (selectorConfig.value.onSelect) {
      selectorConfig.value.onSelect(selectedValue.value || [], props.formData)
    }
    emits('change', selectedValue.value)
  })
}
</script>
