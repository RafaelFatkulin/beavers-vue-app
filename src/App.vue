<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Toaster } from './components/ui/toast'

const links: { title: string; href: string }[] = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'SignIn', href: '/sign-in' },
  { title: 'SignUp', href: '/sign-up' },
]
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg border-border"
  >
    <div class="container flex items-center h-14 max-w-screen-2xl">
      <nav
        class="flex items-center space-x-6 text-sm font-medium max-lg:space-x-4"
      >
        <RouterLink
          v-for="link in links"
          class="transition-colors hover:text-foreground/80 text-foreground/60"
          :to="link.href"
        >
          {{ link.title }}
        </RouterLink>
      </nav>
    </div>
  </header>

  <main class="flex-1 py-8">
    <RouterView />
  </main>
  <Toaster />
</template>
