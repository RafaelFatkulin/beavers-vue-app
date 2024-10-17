<script setup lang="ts">
import { useRouter } from 'vue-router'
import { UserNav } from '@/components/user-nav'

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
    <div class="flex items-center justify-end py-4 px-6">
      <UserNav />
    </div>
  </header>

  <main class="flex-1 flex flex-row">
    <aside class="p-4 border-r">
      <nav class="flex flex-col text-sm font-medium gap-2">
        <RouterLink
          v-for="link in links"
          class="transition-colors hover:text-foreground/80 text-foreground/60 flex flex-row items-center gap-2"
          exact-active-class="text-primary"
          :to="link.path"
        >
          <component
            class="h-5 w-5"
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
