<template>
  <van-field v-model="res" input-align="right" v-bind="$attrs">
    <template #input>
      <div v-if="!$attrs.disabled || formFieldConfig.isUploadOffline" class="flex flex-col">
        <van-uploader
          v-model="value"
          :disabled="!!$attrs.disabled"
          @oversize="onOversize"
        >
          <div />
        </van-uploader>
        <div class="flex items-start justify-end gap-1">
          <van-uploader
            v-if="formFieldConfig.uploadType !== EUploadType.CAMERA || !isAndroid"
            v-model="value"
            :disabled="!!$attrs.disabled"
            :max-size="formFieldConfig.maxSize || AppConfig.MAX_UPLOAD_SIZE"
            :max-count="formFieldConfig.maxCount || AppConfig.MAX_UPLOAD_COUNT"
            :accept="formFieldConfig.accept?.join(',')"
            :after-read="formFieldConfig?.isUploadOffline ? offlineAfterRead : afterRead"
            :preview-image="false"
            @oversize="onOversize"
          >
            <div v-if="!$attrs.disabled">
              <van-button icon="plus" size="small">
                上传文件
              </van-button>
            </div>
          </van-uploader>
          <van-button v-if="(formFieldConfig.uploadType !== EUploadType.FILE && !$attrs.disabled) && isAndroid" size="small" @click="handleTakePhoto">
            <Camera />
          </van-button>
        </div>
        <div v-if="!$attrs.disabled && formFieldConfig.uploadType !== EUploadType.CAMERA">
          <div class="text-xs text-gray-500 ">
            <div>最大上传数量:{{ formFieldConfig.maxCount || AppConfig.MAX_UPLOAD_COUNT }}</div>
            <div>单文件限制大小:{{ AnyFileHelper.getFileSizeFriendly(formFieldConfig.maxSize || AppConfig.MAX_UPLOAD_SIZE, 0) }}</div>
            <div v-if="formFieldConfig.accept?.length">
              支持类型{{ formFieldConfig.accept?.join(',') }}
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        <div v-for="i in value " :key="i.id">
          {{ i.name }}
        </div>
      </template>
    </template>
  </van-field>
</template>

<script lang="ts" setup>
import type { IFormFieldConfig } from '../../../interface/IFormFieldConfig'
import { AppConfig } from '@/config/AppConfig'
import { EUploadType } from '@/enum/EUploadType'
import { AnyFileHelper } from '@/helper/AnyFileHelper'
import { useCordovaCameraHooks } from '@/hooks/useCordovaCameraHooks'
import { Camera } from 'lucide-vue-next'
import { computed } from 'vue'
import { useUploadHooks } from '../../../hooks/useUploadHooks'

type ValueType = any[] | undefined

const props = defineProps<{
  modelValue: ValueType
  /** # 表单配置 */
  formFieldConfig: IFormFieldConfig
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: ValueType): void
  (event: 'change', value: Omit<ValueType, 'undefined'>): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

/** 临时方案:保证校验正常 */
const res = computed({
  get: () => {
    return props.modelValue?.length ? 'validated' : ''
  },
  set: (_val) => {
  },
})

const { afterRead, offlineAfterRead, onOversize } = useUploadHooks()

const { takePhoto } = useCordovaCameraHooks()

const isAndroid = computed(() => {
  return (window as any).cordova.platformId === 'android'
})

/**
 * 处理拍摄照片并通过afterRead/offlineAfterRead桥接上传
 */
async function handleTakePhoto() {
  try {
    const photoLocalUrl = await takePhoto()
    if (photoLocalUrl) {
      // 获取本地文件
      const file = await new Promise((resolve, reject) => {
        (window as any).resolveLocalFileSystemURL(photoLocalUrl, (fileEntry: any) => {
          fileEntry.file((res: File) => resolve(res), (err: Error) => reject(err))
        })
      }) as any

      const uploadFile = {
        file,
        url: file.localURL,
      }

      // 更新上传列表
      value.value = [...(value.value || []), uploadFile]

      if (props.formFieldConfig?.isUploadOffline) {
        await offlineAfterRead(uploadFile)
      }
      else {
        // ！在线的还有问题
        await afterRead(uploadFile)
      }
      value.value = [...value.value]

      emits('change', value.value)
    }
  }
  catch (error) {
    console.error('处理拍摄照片失败:', error)
  }
}
</script>
