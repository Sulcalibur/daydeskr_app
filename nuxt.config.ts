// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  ui: {
    global: true,
  },
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/'],
    },
  },
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
  },
  app: {
    head: {
      title: 'WorkSpace Booking',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Book workspace in various venues' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  typescript: {
    strict: true,
  },
})