import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    app: {
        head: {
            link: [
                { rel: 'manifest', href: '/manifest.webmanifest' },
            ],
        },
    },
    devtools: {enabled: true},
    modules: ['@nuxt/eslint', '@nuxt/image', '@pinia/nuxt', '@vite-pwa/nuxt'],
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    ssr: false,
    pwa: {
        strategies: 'generateSW',
        registerType: 'autoUpdate',
        srcDir: './public',
        filename: 'sw.js',
        manifest: {
            name: 'دفترچه',
            short_name: 'دفترچه',
            description: 'این دفترچه رو برای تست نوشتم امیدوارم که خوشتون بیاد.',
            start_url: '/',
            display: 'standalone',
            lang: 'fa',
            dir: 'rtl',
            orientation: 'natural',
            background_color: '#f7f7f7',
            theme_color: '#1d4ed8',
            icons: [
                {
                    src: "/favicon/web-app-manifest-144x144.png",
                    sizes: "144x144",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/favicon/web-app-manifest-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/favicon/web-app-manifest-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable"
                },
            ],
        },
        devOptions: {
            enabled: true,
        }
    },
    runtimeConfig: {
        public: {
            apiBase: 'https://note-app-backend-theta.vercel.app',
        }
    }
})