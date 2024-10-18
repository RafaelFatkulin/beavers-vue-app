<script setup lang="ts">
import { ShellIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

defineProps<{
  className?: string
}>()
</script>

<template>
  <RouterLink
    to="/dashboard"
    class="p-2 transition-colors hover:text-primary active:text-primary/75"
    :class="className"
  >
    <ShellIcon class="w-6 h-6" />
    <span class="sr-only">Иконка логотипа</span>
  </RouterLink>
</template>
