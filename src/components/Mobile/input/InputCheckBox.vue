<template>
  <van-field>
    <template #input>
      <van-checkbox-group
        v-model="value"
        v-bind="$attrs"
        @click="onChange"
      >
        <div class="checkbox-group">
          <van-checkbox
            v-for="item in options"
            :key="item.value.toString()"
            :name="item.value"
            shape="square"
          >
            {{ item.label }}
          </van-checkbox>
        </div>
      </van-checkbox-group>
    </template>
  </van-field>
</template>

<script lang="ts" setup>
import type { IDictionary } from '../../../interface/IDictionary'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number[] | string[] | undefined
  options: IDictionary[]
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: number[] | string[] | undefined | undefined): void
  (event: 'change', value: number[] | string[] | undefined): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

function onChange(e: number[] | string[] | undefined) {
  emits('change', e)
}
</script>

<style scoped>
.checkbox-group{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
