<template>
  <ul>
    <li
      v-for="item of items"
      :key="item.path"
    >
      <DirectoryItem
        :item="item"
        :isActive="item === value"
        @toggleActive="value = item"
      />
      <DirectoryList
        v-if="item.isOpen"
        :items="item.children!"
        v-model="value"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import DirectoryItem from './DirectoryItem.vue'

import {DirectoryNode} from '../utils/directory-utils.ts'
import {useProp} from '../hooks/use-prop.ts'

const props = defineProps<{
  items: DirectoryNode[]
  modelValue: DirectoryNode | undefined,
}>()

const emit = defineEmits<{
  (type: `update:modelValue`, value: DirectoryNode | undefined): void,
}>()

const value = useProp<DirectoryNode | undefined>(props, emit, `modelValue`)
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column;
}

li {
  display: flex;
  flex-flow: column;
}
</style>
