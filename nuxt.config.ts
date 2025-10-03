import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    app: {
        head: {
            title: 'Zuma',
            link: [
                { rel: 'manifest', href: '/manifest.webmanifest' },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' }
            ],
            meta: [
                {name: 'description', content: 'زوما دفترچه‌ی دیجیتالی توست؛ هر جا، هر زمان، بدون نیاز به اپلیکیشن سنگین'},
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
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
        manifest: {
            name: 'Zuma App',
            short_name: 'Zuma',
            description: 'زوما دفترچه‌ی دیجیتالی توست؛ هر جا، هر زمان، بدون نیاز به اپلیکیشن سنگین',
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
                    purpose: "any"
                },
                {
                    src: "/favicon/web-app-manifest-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "any"
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
                    purpose: "any"
                },
                {
                    src: "/favicon/web-app-manifest-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable"
                },
            ],
            screenshots: {
                src: "/screenshot-wide.png",
                sizes: "1920x1080",
                type: "image/png",
                form_factor: "wide",
            },
            id: "https://zuma-app.vercel.app/",
            categories: ["education"],
            prefer_related_applications: false,
            display_override: ["fullscreen", "standalone", "minimal-ui"],
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