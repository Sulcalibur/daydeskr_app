<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-6">Register</h1>
    <form @submit.prevent="handleRegister">
      <UInput v-model="email" type="email" label="Email" class="mb-4" />
      <UInput v-model="password" type="password" label="Password" class="mb-4" />
      <UInput v-model="confirmPassword" type="password" label="Confirm Password" class="mb-4" />
      <URadio v-model="userType" :options="userTypeOptions" class="mb-4" />
      <UButton type="submit" color="primary" class="w-full">Register</UButton>
    </form>
    <p class="mt-4 text-center">
      Already have an account?
      <NuxtLink to="/auth/login" class="text-blue-500 hover:underline">Login</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const userType = ref('member')
const userTypeOptions = [
  { label: 'Member', value: 'member' },
  { label: 'Venue Owner', value: 'venue' },
]

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    console.error('Passwords do not match')
    return
  }

  const supabase = useSupabaseClient()
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        user_type: userType.value,
      },
    },
  })

  if (error) {
    console.error('Error registering:', error.message)
  } else {
    navigateTo('/auth/confirm')
  }
}
</script>