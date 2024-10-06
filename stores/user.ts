import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userType: null as string | null,
  }),
  actions: {
    async fetchUserType() {
      const supabase = useSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        this.userType = user.user_metadata.user_type
      }
    },
  },
})