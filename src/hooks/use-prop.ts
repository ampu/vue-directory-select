import {computed} from 'vue'

export const useProp = <T = string>(
  props: any,
  emit: (type: string, value: T) => void,
  name: string,
) => {
  return computed({
    get() {
      return props[name] as T
    },
    set(value: T) {
      emit(`update:${name}`, value)
    }
  })
}
