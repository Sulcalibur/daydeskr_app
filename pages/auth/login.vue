<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-6">Login</h1>
    <form @submit.prevent="handleLogin">
      <UInput v-model="email" type="email" label="Email" class="mb-4" />
      <UInput v-model="password" type="password" label="Password" class="mb-4" />
      <UButton type="submit" color="primary" class="w-full">Login</UButton>
    </form>
    <p class="mt-4 text-center">
      Don't have an account?
      <NuxtLink to="/auth/register" class="text-blue-500 hover:underline">Register</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const supabase = useSupabaseClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    console.error('Error logging in:', error.message)
  } else {
    navigateTo('/dashboard')
  }
}
</script>