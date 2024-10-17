<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSignInMutation } from '@/queries/auth'
import { signInSchema } from '@/services/auth'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2Icon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'

const formSchema = toTypedSchema(signInSchema)

const form = useForm({
  validationSchema: formSchema,
})

const { mutate, isPending } = useSignInMutation()

const onSubmit = form.handleSubmit(values => {
  mutate(values)
})
</script>

<template>
  <Card class="max-w-[420px] w-full">
    <CardHeader>
      <CardTitle>Войти</CardTitle>
      <CardDescription>Для входа введите e-mail и пароль</CardDescription>
    </CardHeader>
    <CardContent>
      <form class="flex flex-col gap-3" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Введите email"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Пароль</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Введите пароль"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" :disabled="isPending">
          <Loader2Icon
            v-if="isPending"
            class="animate-spin w-5 h-5 text-white"
          />
          <span v-else>Войти</span>
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
