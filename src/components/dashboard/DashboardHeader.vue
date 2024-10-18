<script setup lang="ts">
import { UserNav } from '@/components/user-nav'
import { ThemeToggler } from '@/components/theme-toggler'
import { ShellIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { DashboardLogo, DashboardSheet } from '.'
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg border-border"
  >
    <div class="flex items-center justify-between p-2 pr-4">
      <DashboardLogo class-name="hidden sm:block" />
      <DashboardSheet />

      <div class="flex flex-row items-center gap-4">
        <ThemeToggler />
        <UserNav />
      </div>
    </div>
  </header>
</template>
