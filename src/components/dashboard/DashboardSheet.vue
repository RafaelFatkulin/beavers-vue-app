<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { PanelLeftIcon } from 'lucide-vue-next'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { DashboardLogo } from '.'
import { useNavigationLinks } from '@/composables/navigation-links'
import { ref } from 'vue'

const { links } = useNavigationLinks()

const isOpened = ref<boolean>(false)
const toggle = () => (isOpened.value = !isOpened.value)
</script>

<template>
  <Sheet :open="isOpened" @update:open="toggle">
    <SheetTrigger as-child>
      <Button size="icon" variant="outline" class="sm:hidden">
        <PanelLeftIcon class="w-5 h-5" />
        <span class="sr-only">Переключение меню</span>
      </Button>
    </SheetTrigger>

    <SheetContent side="left" class="flex flex-col gap-6">
      <SheetHeader>
        <DashboardLogo class-name="w-fit w-8 h-8" />
      </SheetHeader>

      <nav class="grid gap-1">
        <RouterLink
          v-for="link in links"
          class="flex flex-row items-center gap-3 px-4 py-2 overflow-hidden transition-colors rounded hover:text-primary hover:bg-primary/10 active:text-primary/80"
          exact-active-class="text-secondary bg-primary"
          :to="link.path"
          @click="toggle"
        >
          <component
            class="w-5 h-5 min-w-5 min-h-5"
            v-if="link.meta.icon"
            :is="link.meta.icon"
          />
          <span class="flex-1 text-sm whitespace-nowrap">{{
            link.meta.title
          }}</span>
        </RouterLink>
      </nav>
    </SheetContent>
  </Sheet>
</template>
