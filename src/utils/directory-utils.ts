import {reactive} from 'vue'

export type DirectoryNode = {
  name: string
  path: string
  children?: DirectoryNode[]
  parent?: DirectoryNode
  isOpen: boolean
}

type DirectoryNodeRaw = {
  name: string
  children?: DirectoryNodeRaw[]
  parent?: DirectoryNodeRaw
}

export const canOpenDirectory = (directory: DirectoryNode) => directory.children && directory.children.length > 0

export const calculateDirectoryPath = (directory: DirectoryNode) => {
  const path = []
  for (
    let node: DirectoryNode | undefined = directory;
    node;
    node = node.parent
  ) {
    path.unshift(node.name)
  }
  return `/${path.join(`/`)}`
}

export const patchDirectoriesDeep = (directories: DirectoryNodeRaw[], parent?: DirectoryNode): DirectoryNode[] => {
  for (const directory of directories as DirectoryNode[]) {
    directory.parent = parent
    directory.path = calculateDirectoryPath(directory)
    if (!directory.children) {
      continue
    }
    patchDirectoriesDeep(directory.children, directory)
  }
  return directories as DirectoryNode[]
}

export const DIRECTORY_MOCKS: DirectoryNode[] = reactive(patchDirectoriesDeep([
  {
    name: `Home`,
    children: [
      {
        name: `Documents`,
        children: [
          {
            name: `Work`,
            children: [
              {name: `Subfolder 1`},
              {name: `Subfolder 2`}
            ]
          },
          {name: `Recipes`}
        ]
      },
      {
        name: `Pictures`,
        children: [
          {name: `Vacations`},
          {
            name: `Birthdays`,
            children: [
              {name: `John`},
              {name: `Jane`}
            ]
          }
        ]
      }
    ]
  },
  {
    name: `Downloads`,
    children: [
      {
        name: `WorkInProgress`,
        children: [
          {name: `Folder 1`},
          {name: `Folder 2`}
        ]
      },
    ]
  },
]))
