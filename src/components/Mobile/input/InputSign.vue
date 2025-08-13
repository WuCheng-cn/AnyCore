<template>
  <van-field input-align="right" v-bind="$attrs">
    <template #input>
      <img
        v-if="value"
        :src="value"
        class="w-12 mr-3 border border-[#f2f2f2] rounded-sm"
        alt=""
        @click="showImagePreview([value])"
      >
      <van-button v-if="!$attrs.disabled" size="mini" @click="showSign">
        点击签字
      </van-button>
    </template>
  </van-field>
  <div v-show="show" class=" fixed top-0 left-0 flex w-[100vw] h-[100vh] bg-white z-99999">
    <div class="w-[40px] flex items-center justify-center">
      <div class="rotate-90 whitespace-nowrap">
        <van-button
          size="small"
          type="danger"
          class="mr-3!"
          @click="show = false"
        >
          退出
        </van-button>
        <van-button size="small" class="mr-3!" @click="handleClear">
          清除
        </van-button>
        <van-button size="small" type="primary" @click="handleSign">
          保存
        </van-button>
      </div>
    </div>
    <canvas
      ref="canvasRef"
      width="100%"
      height="100%"
      class="flex-1"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IFormFieldConfig } from '../../../interface/IFormFieldConfig'
import SmoothSignature from 'smooth-signature'
import { showDialog, showImagePreview, showToast } from 'vant'
import { computed, onMounted, ref } from 'vue'

type ValueType = string | undefined

const props = defineProps<{
  modelValue: ValueType
  /** # 表单配置 */
  formFieldConfig: IFormFieldConfig
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: ValueType): void
  (event: 'change', value: ValueType): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

const show = ref(false)

const canvasRef = ref()

let signatureIns: SmoothSignature | undefined

function showSign() {
  if (!signatureIns) {
    showDialog({
      message: '签名组件初始化失败',
    })
    return
  }
  show.value = true
}

function handleSign() {
  if (signatureIns?.isEmpty()) {
    showToast('请签名')
    return
  }
  const canvas = signatureIns?.getRotateCanvas(-90)
  value.value = canvas?.toDataURL()
  show.value = false
  emits('change', value.value)
}

function handleClear() {
  signatureIns?.clear()
}

onMounted(() => {
  signatureIns = new SmoothSignature(canvasRef.value, {
    width: window.innerWidth - 40,
    height: window.innerHeight,
    scale: 2,
    minWidth: 4,
    maxWidth: 10,
    color: '#1890ff',
    bgColor: '#efefef',
  })
})
</script>

<style lang="less" scoped>

</style>
