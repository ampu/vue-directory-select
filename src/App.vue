<template>
  <MainButton
    @click="activatePopup"
  />
  <DirectoryPopup
    v-if="isPopupActive"
    title="Выберите директорию"
    @select="onDirectorySelect"
    @close="deactivatePopup"
  />
</template>

<script lang="ts" setup>
import MainButton from './components/MainButton.vue'
import DirectoryPopup from './components/DirectoryPopup.vue'

import {useBoolean} from './books/use-boolean.ts'
import {DirectoryNode} from './utils/directory-utils.ts'

const [isPopupActive, activatePopup, deactivatePopup] = useBoolean(true)

const onDirectorySelect = (directory: DirectoryNode) => {
  alert(`Выбрана папка ${directory.path}`)
}
</script>

<style lang="scss" scoped>
</style>
