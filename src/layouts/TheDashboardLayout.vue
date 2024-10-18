<script setup lang="ts">
import { useAsideStore } from '@/stores/aside'
import { DashboardHeader, DashboardSidebar } from '@/components/dashboard'

const { isCollapsed } = useAsideStore()
</script>

<template>
  <DashboardHeader />
  <main
    class="grid flex-1 grid-cols-1 sm:grid-cols-[160px_1fr] md:grid-cols-[208px_1fr] lg:grid-cols-[240px_1fr] transition-all"
    :class="isCollapsed ? '!grid-cols-[auto_1fr]' : ''"
  >
    <DashboardSidebar />
    <div class="w-full px-4 py-6">
      <RouterView />
    </div>
  </main>
</template>
