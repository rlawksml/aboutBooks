// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    kakaoAPI: process.env.NUXT_PUBLIC_API_KEY,
    public: {
      kakaoAPI: process.env.NUXT_PUBLIC_API_KEY,
    }
  },
  components: true,
  devtools: { enabled: true },
  app: {
    baseURL: '/',
  },
  css: [
    '@/assets/css/reset.css',
    "@/assets/css/tailwind.css",
    'quasar/dist/quasar.css',
    '@quasar/extras/material-icons/material-icons.css',
  ],
  build: {
    transpile: [],
  },
  postcss: {
    plugins: {
      tailwindcss: {},  // Tailwind CSS 활성화
      autoprefixer: {}, // 자동 접두사 추가
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
  vite: {
    optimizeDeps: {
      include: ['quasar', '@quasar/extras/material-icons'],
    },
  },

})
