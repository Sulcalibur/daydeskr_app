<template>
  <UCard>
    <template #header>
      <img :src="workspace.image" :alt="workspace.name" class="w-full h-48 object-cover" />
    </template>
    <template #title>
      {{ workspace.name }}
    </template>
    <template #description>
      <p>{{ workspace.description }}</p>
      <p class="mt-2"><strong>Price:</strong> ${{ workspace.price }} / hour</p>
    </template>
    <template #footer>
      <UButton color="primary" @click="bookWorkspace">Book Now</UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { Workspace } from '~/types'

const props = defineProps<{
  workspace: Workspace
}>()

const bookWorkspace = () => {
  // Implement booking logic
  navigateTo(`/booking/${props.workspace.id}`)
}
</script>