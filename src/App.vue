<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Toaster } from './components/ui/toast'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="flex flex-row gap-2">
        <RouterLink class="transition-colors hover:text-primary" to="/"
          >Home</RouterLink
        >
        <RouterLink class="transition-colors hover:text-primary" to="/about"
          >About</RouterLink
        >
        <RouterLink class="transition-colors hover:text-primary" to="/sign-in"
          >SignIn</RouterLink
        >
        <RouterLink class="transition-colors hover:text-primary" to="/sign-up"
          >SignUp</RouterLink
        >
      </nav>
    </div>
  </header>

  <RouterView />
  <Toaster />
</template>
