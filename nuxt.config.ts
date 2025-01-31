// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    baseURL: '/', 
  },
  css:[
    '@/assets/css/reset.css',
    "@/assets/css/tailwind.css"
  ],
  build: {
    transpile: ["sass"],
  }, 
  postcss: {
    plugins: {
      tailwindcss: {},  // Tailwind CSS 활성화
      autoprefixer: {}, // 자동 접두사 추가
    },
  },
})
