<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    <div v-if="user">
      <div v-if="userType === 'member'">
        <h2 class="text-2xl font-semibold mb-4">My Bookings</h2>
        <div v-if="bookings.length === 0" class="text-center">
          You have no bookings yet.
        </div>
        <div v-else class="space-y-4">
          <UCard v-for="booking in bookings" :key="booking.id">
            <template #title>
              {{ booking.workspace.name }}
            </template>
            <template #description>
              <p><strong>Date:</strong> {{ formatDate(booking.startTime) }}</p>
              <p><strong>Duration:</strong> {{ formatDuration(booking.duration) }}</p>
              <p><strong>Status:</strong> {{ booking.status }}</p>
            </template>
            <template #footer>
              <UButton v-if="booking.status === 'upcoming'" color="red" variant="soft" @click="cancelBooking(booking.id)">Cancel</UButton>
            </template>
          </UCard>
        </div>
      </div>
      <div v-else-if="userType === 'venue'">
        <h2 class="text-2xl font-semibold mb-4">My Listings</h2>
        <UButton color="primary" class="mb-4" @click="showAddListingModal = true">Add New Listing</UButton>
        <div v-if="listings.length === 0" class="text-center">
          You have no listings yet.
        </div>
        <div v-else class="space-y-4">
          <UCard v-for="listing in listings" :key="listing.id">
            <template #title>
              {{ listing.name }}
            </template>
            <template #description>
              <p>{{ listing.description }}</p>
              <p><strong>Price:</strong> ${{ listing.price }} / hour</p>
            </template>
            <template #footer>
              <UButton color="primary" variant="soft" @click="editListing(listing.id)">Edit</UButton>
            </template>
          </UCard>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      Please <NuxtLink to="/auth/login" class="text-blue-500 hover:underline">login</NuxtLink> to view your dashboard.
    </div>

    <!-- Add Listing Modal -->
    <UModal v-model="showAddListingModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Add New Listing</h3>
        </template>
        <form @submit.prevent="addListing">
          <UInput v-model="newListing.name" label="Name" class="mb-4" />
          <UTextarea v-model="newListing.description" label="Description" class="mb-4" />
          <UInput v-model="newListing.price" label="Price per hour" type="number" class="mb-4" />
          <UButton type="submit" color="primary">Add Listing</UButton>
        </form>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { Booking, Listing } from '~/types'

const user = useSupabaseUser()
const userStore = useUserStore()
const userType = computed(() => userStore.userType)

const bookings = ref<Booking[]>([])
const listings = ref<Listing[]>([])
const showAddListingModal = ref(false)
const newListing = ref({
  name: '',
  description: '',
  price: 0,
})

onMounted(async () => {
  if (user.value) {
    await userStore.fetchUserType()
    if (userType.value === 'member') {
      await fetchBookings()
    } else if (userType.value === 'venue') {
      await fetchListings()
    }
  }
})

const fetchBookings = async () => {
  const { data } = await useFetch('/api/bookings')
  bookings.value = data.value as Booking[]
}

const fetchListings = async () => {
  const { data } = await useFetch('/api/listings')
  listings.value = data.value as Listing[]
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString()
}

const formatDuration = (duration: number) => {
  return `${duration} hour${duration > 1 ? 's' : ''}`
}

const cancelBooking = async (bookingId: string) => {
  await useFetch(`/api/bookings/${bookingId}`, { method: 'DELETE' })
  await fetchBookings()
}

const addListing = async () => {
  await useFetch('/api/listings', {
    method: 'POST',
    body: newListing.value,
  })
  showAddListingModal.value = false
  newListing.value = { name: '', description: '', price: 0 }
  await fetchListings()
}

const editListing = (listingId: string) => {
  // Implement edit listing logic
}
</script>