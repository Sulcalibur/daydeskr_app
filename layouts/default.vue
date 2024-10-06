<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-800 text-white p-4">
      <nav class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold">WorkSpace Booking</NuxtLink>
        <div class="space-x-4">
          <NuxtLink to="/search">Search</NuxtLink>
          <NuxtLink to="/dashboard">Dashboard</NuxtLink>
          <NuxtLink to="/auth/login" v-if="!user">Login</NuxtLink>
          <UButton v-else @click="logout" color="red" variant="soft">Logout</UButton>
        </div>
      </nav>
    </header>
    <main class="flex-grow container mx-auto p-4">
      <slot />
    </main>
    <footer class="bg-gray-800 text-white p-4 mt-8">
      <div class="container mx-auto text-center">
        &copy; {{ new Date().getFullYear() }} WorkSpace Booking. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const logout = async () => {
  await auth.signOut()
  navigateTo('/auth/login')
}
</script>