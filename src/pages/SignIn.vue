<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { Input } from '@/components/ui/input'
import { useSignInMutation } from '@/queries/auth'
import { signInSchema } from '@/services/auth'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const formSchema = toTypedSchema(signInSchema)

const form = useForm({
  validationSchema: formSchema,
})

const { mutate } = useSignInMutation()

const onSubmit = form.handleSubmit(values => {
  mutate(values)
})
</script>

<template>
  <form @submit="onSubmit">
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

    <Button type="submit">Войти</Button>
  </form>
</template>
