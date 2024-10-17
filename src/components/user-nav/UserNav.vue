<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetCurrentUserQuery, useSignOutMutation } from '@/queries/auth'
import { computed } from 'vue'
import { Loader2Icon, LogOutIcon } from 'lucide-vue-next'

const { data, isLoading, isPending } = useGetCurrentUserQuery()

const shortName = computed(() => {
  return data?.value?.data.fullName
    ? data.value.data.fullName
        .split(' ')
        .map(name => name.charAt(0))
        .join('.')
    : 'U'
})

const { mutate, isPending: isSignOutPending } = useSignOutMutation()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative w-8 h-8 rounded-full">
        <Loader2Icon
          class="text-primary animate-spin"
          v-if="isLoading || isPending"
        />
        <Avatar v-else>
          <AvatarImage
            :src="data?.data.avatar || ''"
            :alt="data?.data.fullName"
          />
          <AvatarFallback>{{ shortName }}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel>
        <div class="flex flex-col gap-1">
          <p class="text-sm font-medium leading-none">
            {{ data?.data.fullName }}
          </p>
          <p class="text-xs leading-none text-muted-foreground">
            {{ data?.data.email }}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>Профиль</DropdownMenuItem>
        <DropdownMenuItem>Настройки</DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem class="flex-row items-center w-full gap-2" as-child>
        <button class="w-full" @click="mutate">
          <Loader2Icon
            v-if="isSignOutPending"
            class="w-4 h-4 animate-spin text-primary"
          />
          <LogOutIcon class="w-4 h-4" v-else /> Выйти
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
