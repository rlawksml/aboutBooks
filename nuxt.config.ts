// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: 'https://github.com/rlawksml/aboutBooks.git', // Replace <repository-name> with your actual GitHub repository name
  },
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    kakaoAPI: process.env.NUXT_PUBLIC_API_KEY,
    kakaoMapAPI: process.env.NUXT_PUBLIC_MAP_API_KEY,
    public: {
      kakaoAPI: process.env.NUXT_PUBLIC_API_KEY,
      kakaoMapAPI: process.env.NUXT_PUBLIC_MAP_API_KEY,
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
    }
  },
  components: true,
  devtools: { enabled: true },
  // app: {
  //   baseURL: '/',
  // },
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
  plugins: ['@/plugins/firebase.client.ts'],
  vite: {
    optimizeDeps: {
      include: ['quasar', '@quasar/extras/material-icons'],
    },
  },

})
