import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'

export const useAsideStore = defineStore('aside', () => {
  const isCollapsed: RemovableRef<boolean> = useLocalStorage(
    'is-collapsed',
    false,
  )

  const toggle = () => {
    isCollapsed.value = !isCollapsed.value
  }

  return {
    isCollapsed,
    toggle,
  }
})
