<template>
  <a-upload-dragger
    v-model:file-list="value"
    v-bind="$attrs"
    :action="formFieldConfig.action"
    :accept="formFieldConfig.accept?.join(',')"
    :max-count="formFieldConfig.maxCount || AppConfig.MAX_UPLOAD_COUNT"
    :multiple="maxCount !== 1"
    :before-upload="beforeUpload"
    @change="onChange"
  >
    <div class="flex flex-col items-center justify-center">
      <HardDriveUpload :size="32" :stroke-width="2" />
      <div> 单击或拖动文件到此区域进行上传 </div>
      <div>
        {{
          `最大允许上传数量：${maxCount}，
          支持格式：${formFieldConfig.accept || '不限'}`
        }}
      </div>
    </div>
  </a-upload-dragger>
</template>

<script lang="ts" setup>
import type { IFormFieldConfig } from '@/anyThing/interface/IFormFieldConfig'
import type { UploadChangeParam, UploadFile } from 'ant-design-vue'
import { AppConfig } from '@/anyThing/config/AppConfig'
import { message } from 'ant-design-vue'
import { HardDriveUpload } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: UploadFile[]
  formFieldConfig: IFormFieldConfig
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: UploadFile[]): void
  (event: 'change', value: UploadFile[]): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  },
})

const maxCount = computed(() => {
  return props.formFieldConfig.maxCount || AppConfig.MAX_UPLOAD_COUNT
})

const maxSize = computed(() => {
  return props.formFieldConfig.maxSize || AppConfig.MAX_UPLOAD_SIZE
})

function onChange(info: UploadChangeParam) {
  const status = info.file.status
  if (status === 'done') {
    message.success(`${info.file.name} 上传成功`)
  }
  if (status === 'error') {
    message.error(`${info.file.name} 上传失败`)
  }
  emits('change', value.value)
}

function beforeUpload(_file: File) {
  if (_file.size > maxSize.value) {
    message.warning(`文件尺寸超过${maxSize.value},请重新选择`)
    return false
  }

  if (props.formFieldConfig.accept?.length) {
    const extension = _file.name.split('.').pop()?.toLowerCase()
    if (extension && !props.formFieldConfig.accept.includes(extension)) {
      message.warning(`文件格式不支持，请重新选择`)
      return false
    }
  }

  return true
}
</script>
