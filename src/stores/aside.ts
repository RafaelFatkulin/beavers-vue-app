import { useLocalStorage, type RemovableRef } from '@vueuse/core'

export const useAsideStore = () => {
  const isCollapsed = useLocalStorage<boolean>('aside', false)

  const toggle = () => {
    isCollapsed.value = !isCollapsed.value
  }

  return {
    isCollapsed,
    toggle,
  }
}
