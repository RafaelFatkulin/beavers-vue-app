<script setup lang="ts">
import { RouterView } from 'vue-router'

const links: { title: string; href: string }[] = [
  { title: 'SignIn', href: '/sign-in' },
  { title: 'SignUp', href: '/sign-up' },
]
</script>

<template>
  <main class="flex items-center justify-center flex-1 w-full py-8">
    <RouterView />
  </main>
</template>
