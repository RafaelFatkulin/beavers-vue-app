<script setup lang="ts">
import { useAsideStore } from '@/stores/aside'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import {
  TooltipTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { useNavigationLinks } from '@/composables/navigation-links'

const { isCollapsed, toggle } = useAsideStore()
const { links } = useNavigationLinks()
</script>

<template>
  <aside
    class="relative py-4 px-2 transition-[width] border-r hidden sm:block"
    :class="isCollapsed ? 'w-14' : 'w-40 md:w-52 lg:w-60'"
  >
    <nav class="flex flex-col gap-2 text-sm font-medium">
      <TooltipProvider :disabled="!isCollapsed">
        <Tooltip v-for="link in links">
          <TooltipTrigger as-child>
            <RouterLink
              class="flex flex-row items-center gap-3 px-2 py-2 overflow-hidden transition-colors rounded hover:text-primary hover:bg-primary/10 active:text-primary-foreground active:bg-primary"
              exact-active-class="text-secondary bg-primary"
              :to="link.path"
            >
              <component
                class="w-6 h-6 min-w-6 min-h-6"
                v-if="link.meta.icon"
                :is="link.meta.icon"
              />
              <span
                class="transition-[width] flex-1 whitespace-nowrap"
                :class="isCollapsed && 'w-0'"
                >{{ link.meta.title }}</span
              >
            </RouterLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{{ link.meta.title }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>

    <button
      class="absolute right-0 p-2 transition-colors translate-x-1/2 -translate-y-1/2 border rounded-full top-1/2 bg-background hover:border-primary hover:text-primary hover:border-2"
      @click="toggle"
    >
      <ChevronRight class="w-4 h-4" v-if="isCollapsed" />
      <ChevronLeft class="w-4 h-4" v-else />
    </button>
  </aside>
</template>
