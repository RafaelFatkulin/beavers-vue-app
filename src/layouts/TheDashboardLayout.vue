<script setup lang="ts">
import { useRouter } from 'vue-router'
import { UserNav } from '@/components/user-nav'
import { ThemeToggler } from '@/components/theme-toggler'

const router = useRouter()

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
    <aside class="p-4 border-r">
      <nav class="flex flex-col gap-2 text-sm font-medium">
        <RouterLink
          v-for="link in links"
          class="flex flex-row items-center gap-2 transition-colors hover:text-foreground/80 text-foreground/60"
          exact-active-class="text-primary"
          :to="link.path"
        >
          <component
            class="w-5 h-5"
            v-if="link.meta.icon"
            :is="link.meta.icon"
          />
          {{ link.meta.title }}
        </RouterLink>
      </nav>
    </aside>
    <RouterView />
  </main>
</template>
