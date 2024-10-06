<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Search Workspaces</h1>
    <form @submit.prevent="searchWorkspaces" class="mb-8">
      <div class="flex space-x-4">
        <UInput v-model="searchQuery" placeholder="Search by location or venue name" class="flex-grow" />
        <UButton type="submit" color="primary">Search</UButton>
      </div>
    </form>
    <div v-if="loading" class="text-center">
      <USpinner />
    </div>
    <div v-else-if="workspaces.length === 0" class="text-center">
      No workspaces found.
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <WorkspaceCard v-for="workspace in workspaces" :key="workspace.id" :workspace="workspace" />
    </div>
    <div class="mt-8">
      <GMapMap :center="mapCenter" :zoom="12" style="width: 100%; height: 400px;">
        <GMapMarker v-for="workspace in workspaces" :key="workspace.id" :position="workspace.location" />
      </GMapMap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Workspace } from '~/types'

const searchQuery = ref('')
const workspaces = ref<Workspace[]>([])
const loading = ref(false)
const mapCenter = ref({ lat: 0, lng: 0 })

const searchWorkspaces = async () => {
  loading.value = true
  try {
    const { data } = await useFetch('/api/workspaces/search', {
      method: 'POST',
      body: { query: searchQuery.value },
    })
    workspaces.value = data.value as Workspace[]
    if (workspaces.value.length > 0) {
      mapCenter.value = workspaces.value[0].location
    }
  } catch (error) {
    console.error('Error searching workspaces:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      mapCenter.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }
})
</script>