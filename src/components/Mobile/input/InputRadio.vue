<template>
  <van-field>
    <template #input>
      <van-radio-group
        v-model="value"
        v-bind="$attrs"
        @click="onChange"
      >
        <div class="radio-group">
          <van-radio
            v-for="item in options"
            :key="item.value.toString()"
            :name="item.value"
          >
            {{ item.label }}
          </van-radio>
        </div>
      </van-radio-group>
    </template>
  </van-field>
</template>

<script lang="ts" setup>
import type { IDictionary } from '../../../interface/IDictionary'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number | string | undefined
  options: IDictionary[]
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: number | string | undefined): void
  (event: 'change', value: number | string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

function onChange(name: string) {
  emits('change', name)
}
</script>

<style scoped>
.radio-group{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
