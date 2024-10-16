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
    <div class="flex items-center justify-between h-16 px-4">
      <nav
        class="flex items-center space-x-6 text-sm font-medium max-lg:space-x-4"
      >
        <RouterLink
          v-for="link in links"
          class="transition-colors hover:text-foreground/80 text-foreground/60"
          exact-active-class="text-primary"
          :to="link.path"
        >
          {{ link.meta.title }}
        </RouterLink>
      </nav>

      <UserNav />
    </div>
  </header>

  <main class="flex-1 py-8">
    <RouterView />
  </main>
</template>
