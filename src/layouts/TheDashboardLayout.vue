<script setup lang="ts">
import { useRouter } from 'vue-router'
import { UserNav } from '@/components/user-nav'
import { ThemeToggler } from '@/components/theme-toggler'
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useAsideStore } from '@/stores/aside'

const router = useRouter()

const asideStore = useAsideStore()
const { isCollapsed, toggle } = asideStore

const links = router
  .getRoutes()
  .filter(item => item.meta.type === 'dashboard')
  .sort((a, b) => {
    if (a.meta.order && b.meta.order) {
      return a.meta.order - b.meta.order
    }
    return 0
  })
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg border-border"
  >
    <div class="flex items-center justify-end px-6 py-4">
      <UserNav />
    </div>
  </header>

  <main class="flex flex-row flex-1">
    <aside class="relative py-4 px-2 transition-[width] border-r">
      <nav class="flex flex-col text-sm font-medium">
        <RouterLink
          v-for="link in links"
          class="flex flex-row items-center gap-3 px-2 py-2 transition-colors hover:text-foreground/80 text-foreground/60"
          exact-active-class="text-primary"
          :to="link.path"
        >
          <component
            class="w-6 h-6"
            v-if="link.meta.icon"
            :is="link.meta.icon"
          />
          <span v-if="!isCollapsed">{{ link.meta.title }}</span>
        </RouterLink>
      </nav>
      <button
        class="absolute right-0 p-2 translate-x-1/2 -translate-y-1/2 border rounded-full top-1/2 bg-background"
        @click="toggle"
      >
        <ChevronRight class="w-4 h-4" v-if="isCollapsed" />
        <ChevronLeft class="w-4 h-4" v-else />
      </button>
    </aside>
    <div class="p-4">
      <RouterView />
    </div>
  </main>
</template>
