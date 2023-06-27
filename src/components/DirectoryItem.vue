<template>
  <div class="DirectoryTitle">
    <button
      type="button"
      aria-label="Показать"
      class="open"
      :class="{active: item.isOpen}"
      :disabled="!canOpen"
      @click="item.isOpen = !item.isOpen"
    >
      <ChevronIcon/>
    </button>

    <button
      type="button"
      class="select"
      :class="{active: isActive}"
      @click="emit(`toggleActive`, item)"
    >
      {{ item.path }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import ChevronIcon from '../assets/icons/chevron.svg?component'
import {canOpenDirectory, DirectoryNode} from '../utils/directory-utils.ts'
import {computed} from 'vue'

const props = defineProps<{
  item: DirectoryNode
  isActive: boolean
}>()

const emit = defineEmits<{
  (type: `toggleOpen`, value: DirectoryNode): void,
  (type: `toggleActive`, value: DirectoryNode): void,
}>()

const canOpen = computed(() => canOpenDirectory(props.item))
</script>

<style lang="scss" scoped>
.DirectoryTitle {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  margin: 0;
  padding: 0;
  display: flex;

  border: none;
  background: none;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
}

.open {
  color: green;
  transform: rotate(180deg);

  &.active {
    color: red;
    transform: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    filter: grayscale(1);
  }
}

.select {
  &.active {
    font-weight: bold;
  }
}
</style>
