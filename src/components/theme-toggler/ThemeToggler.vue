<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-vue-next'

const mode = useColorMode()

const handleTheme = () => {
  if (mode.value === 'light') {
    return (mode.value = 'dark')
  }

  return (mode.value = 'light')
}
</script>

<template>
  <Button variant="ghost" size="icon" class="rounded-full" @click="handleTheme">
    <MoonIcon
      class="w-5 h-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0"
    />
    <SunIcon
      class="absolute w-5 h-5 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
