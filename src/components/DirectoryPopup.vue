<template>
  <div
    class="overlay"
    @mousedown="onOverlayMouseDown"
  >
    <form
      @submit.prevent="submit"
    >
      <h2>{{ props.title }}</h2>

      <DirectoryList
        class="list"
        :items="DIRECTORY_MOCKS"
        :modelValue="activeDirectory"
        @update:modelValue="toggleActiveDirectory"
      />

      <button
        class="close"
        type="button"
        @click="close"
        aria-label="Отмена"
      >
        <TimesIcon/>
      </button>

      <button
        class="submit"
        type="submit"
        :disabled="!activeDirectory"
      >
        Ok
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {ref, watchEffect} from 'vue'

import {DirectoryNode, DIRECTORY_MOCKS} from '../utils/directory-utils.ts'

import DirectoryList from './DirectoryList.vue'
import TimesIcon from '../assets/icons/times.svg?component'

const props = defineProps<{
  title: string,
}>()

const emit = defineEmits<{
  (type: `select`, value: DirectoryNode): void
  (type: `close`): void
}>()

const activeDirectory = ref<DirectoryNode>()

const toggleActiveDirectory = (directory?: DirectoryNode) => {
  activeDirectory.value = activeDirectory.value === directory ? undefined : directory
}

const close = () => {
  emit(`close`)
}

const submit = () => {
  if (!activeDirectory.value) {
    return
  }
  emit(`select`, activeDirectory.value!)
  close()
}

const onOverlayMouseDown = ({target, currentTarget, button}: MouseEvent) => {
  if (button === 0 && target === currentTarget) {
    close()
  }
}

watchEffect((onCleanup) => {
  const onDocumentKeyDown = ({key}: KeyboardEvent) => {
    if (key === `Escape`) {
      close()
    }
  }

  document.body.classList.add(`modal`)
  document.addEventListener(`keydown`, onDocumentKeyDown)

  onCleanup(() => {
    document.body.classList.remove(`modal`)
    document.removeEventListener(`keydown`, onDocumentKeyDown)
  })
})
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.7);
}

form {
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 30px;
  width: 600px;
  height: 70%;
  gap: 30px;

  background: #eeeeee;
  color: #444444;
}

h2 {
  margin: 0;
  padding: 0;
}

.list {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.close {
  position: absolute;
  right: 30px;
  top: 30px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 1em;
  height: 1em;

  font-size: 2em;
  line-height: 1;
  vertical-align: center;

  cursor: pointer;
  background: none;
  border: none;
}

.submit {
  width: 100%;
  padding: 5px 10px;
  margin-top: auto;
  align-self: flex-end;

  cursor: pointer;

  &:disabled {
    cursor: default;
  }
}
</style>
