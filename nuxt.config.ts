import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/eslint', '@nuxt/image', '@pinia/nuxt'],
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    ssr: false,
    runtimeConfig: {
        public: {
            apiBase: 'https://note-app-backend-theta.vercel.app',
        }
    }
})